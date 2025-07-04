import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema, updateTaskSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new task
  app.post("/api/tarefas", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Get all tasks or filter by status
  app.get("/api/tarefas", async (req, res) => {
    try {
      const { status } = req.query;
      
      if (status && !["pendente", "realizando", "concluída"].includes(status as string)) {
        return res.status(400).json({ 
          message: "Status inválido. Use: pendente, realizando ou concluída" 
        });
      }

      const tasks = await storage.getAllTasks(status as string);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Get a task by ID
  app.get("/api/tarefas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const task = await storage.getTaskById(id);
      
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Update a task
  app.put("/api/tarefas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const validatedData = updateTaskSchema.parse(req.body);
      
      // Check if at least one field is provided
      if (Object.keys(validatedData).length === 0) {
        return res.status(400).json({ 
          message: "Pelo menos um campo deve ser fornecido para atualização" 
        });
      }

      const updatedTask = await storage.updateTask(id, validatedData);
      
      if (!updatedTask) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Delete a task
  app.delete("/api/tarefas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const deleted = await storage.deleteTask(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      res.json({ message: "Tarefa excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
