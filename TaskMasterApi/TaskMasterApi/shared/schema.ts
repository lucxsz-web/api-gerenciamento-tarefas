import { pgTable, text, serial, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  status: text("status", { enum: ["pendente", "realizando", "concluída"] }).notNull(),
  data_vencimento: date("data_vencimento"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
}).extend({
  data_vencimento: z.string().optional().refine((date) => {
    if (!date) return true;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, {
    message: "Data de vencimento deve ser uma data válida"
  })
});

export const updateTaskSchema = insertTaskSchema.partial().extend({
  titulo: z.string().optional(),
  status: z.enum(["pendente", "realizando", "concluída"]).optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
