import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Task, InsertTask, UpdateTask } from "@shared/schema";

interface TaskFormProps {
  task?: Task;
  onSuccess?: () => void;
  onCancel?: () => void;
  onToast?: (type: "success" | "error" | "info", title: string, message: string) => void;
}

export function TaskForm({ task, onSuccess, onCancel, onToast }: TaskFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!task;

  const [formData, setFormData] = useState({
    titulo: task?.titulo || "",
    descricao: task?.descricao || "",
    status: task?.status || "pendente" as const,
    data_vencimento: task?.data_vencimento || "",
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: InsertTask) => {
      const res = await apiRequest("POST", "/api/tarefas", taskData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tarefas"] });
      onToast?.("success", "Sucesso!", "Tarefa criada com sucesso.");
      onSuccess?.();
      if (!isEditing) {
        setFormData({ titulo: "", descricao: "", status: "pendente", data_vencimento: "" });
      }
    },
    onError: (error: any) => {
      onToast?.("error", "Erro!", error.message || "Falha ao criar tarefa.");
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async (taskData: UpdateTask) => {
      const res = await apiRequest("PUT", `/api/tarefas/${task!.id}`, taskData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tarefas"] });
      onToast?.("success", "Sucesso!", "Tarefa atualizada com sucesso.");
      onSuccess?.();
    },
    onError: (error: any) => {
      onToast?.("error", "Erro!", error.message || "Falha ao atualizar tarefa.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      data_vencimento: formData.data_vencimento || undefined,
    };

    if (isEditing) {
      updateTaskMutation.mutate(submitData);
    } else {
      createTaskMutation.mutate(submitData);
    }
  };

  const handleReset = () => {
    if (isEditing && task) {
      setFormData({
        titulo: task.titulo,
        descricao: task.descricao || "",
        status: task.status,
        data_vencimento: task.data_vencimento || "",
      });
    } else {
      setFormData({ titulo: "", descricao: "", status: "pendente", data_vencimento: "" });
    }
  };

  const isPending = createTaskMutation.isPending || updateTaskMutation.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titulo">
              Título <span className="text-red-600">*</span>
            </Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Estudar API RESTful"
              required
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descrição detalhada da tarefa..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">
                Status <span className="text-red-600">*</span>
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: "pendente" | "realizando" | "concluída") => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="realizando">Realizando</SelectItem>
                  <SelectItem value="concluída">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="data_vencimento">Data de Vencimento</Label>
              <Input
                id="data_vencimento"
                type="date"
                value={formData.data_vencimento}
                onChange={(e) => setFormData({ ...formData, data_vencimento: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            )}
            <Button type="button" variant="outline" onClick={handleReset}>
              Limpar
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending 
                ? (isEditing ? "Atualizando..." : "Criando...") 
                : (isEditing ? "Atualizar" : "Criar Tarefa")
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
