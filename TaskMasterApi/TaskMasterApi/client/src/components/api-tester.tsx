import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Code, Copy, List, Plus, Search, Edit, Trash2, Send, Terminal } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Task, InsertTask, UpdateTask } from "@shared/schema";

type TabType = "create" | "list" | "get" | "update" | "delete";

interface ApiResponse {
  status: number;
  data: any;
  responseTime: number;
}

export function ApiTester({ onToast }: { onToast: (type: "success" | "error" | "info", title: string, message: string) => void }) {
  const [activeTab, setActiveTab] = useState<TabType>("create");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const queryClient = useQueryClient();

  // Form states
  const [createForm, setCreateForm] = useState<InsertTask>({
    titulo: "",
    descricao: "",
    status: "pendente",
    data_vencimento: "",
  });

  const [taskId, setTaskId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [updateForm, setUpdateForm] = useState<UpdateTask & { id: string }>({
    id: "",
    titulo: "",
    descricao: "",
    status: "pendente",
    data_vencimento: "",
  });
  const [deleteId, setDeleteId] = useState("");

  const tabs = [
    { id: "create", label: "Criar Tarefa", icon: Plus, method: "POST" },
    { id: "list", label: "Listar Tarefas", icon: List, method: "GET" },
    { id: "get", label: "Buscar por ID", icon: Search, method: "GET" },
    { id: "update", label: "Atualizar", icon: Edit, method: "PUT" },
    { id: "delete", label: "Excluir", icon: Trash2, method: "DELETE" },
  ];

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (task: InsertTask) => {
      const startTime = Date.now();
      const res = await apiRequest("POST", "/api/tarefas", task);
      const data = await res.json();
      return { data, responseTime: Date.now() - startTime, status: res.status };
    },
    onSuccess: (result) => {
      setResponse(result);
      queryClient.invalidateQueries({ queryKey: ["/api/tarefas"] });
      onToast("success", "Sucesso!", "Tarefa criada com sucesso.");
      setCreateForm({ titulo: "", descricao: "", status: "pendente", data_vencimento: "" });
    },
    onError: (error: any) => {
      setResponse({ data: { message: error.message }, responseTime: 0, status: 400 });
      onToast("error", "Erro!", "Falha ao criar tarefa.");
    },
  });

  // List tasks query/mutation
  const listTasksMutation = useMutation({
    mutationFn: async (status?: string) => {
      const startTime = Date.now();
      const url = status ? `/api/tarefas?status=${status}` : "/api/tarefas";
      const res = await apiRequest("GET", url);
      const data = await res.json();
      return { data, responseTime: Date.now() - startTime, status: res.status };
    },
    onSuccess: (result) => {
      setResponse(result);
    },
    onError: (error: any) => {
      setResponse({ data: { message: error.message }, responseTime: 0, status: 500 });
    },
  });

  // Get task by ID mutation
  const getTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const startTime = Date.now();
      const res = await apiRequest("GET", `/api/tarefas/${id}`);
      const data = await res.json();
      return { data, responseTime: Date.now() - startTime, status: res.status };
    },
    onSuccess: (result) => {
      setResponse(result);
    },
    onError: (error: any) => {
      setResponse({ data: { message: error.message }, responseTime: 0, status: 404 });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, ...task }: UpdateTask & { id: string }) => {
      const startTime = Date.now();
      const res = await apiRequest("PUT", `/api/tarefas/${id}`, task);
      const data = await res.json();
      return { data, responseTime: Date.now() - startTime, status: res.status };
    },
    onSuccess: (result) => {
      setResponse(result);
      queryClient.invalidateQueries({ queryKey: ["/api/tarefas"] });
      onToast("success", "Sucesso!", "Tarefa atualizada com sucesso.");
    },
    onError: (error: any) => {
      setResponse({ data: { message: error.message }, responseTime: 0, status: 400 });
      onToast("error", "Erro!", "Falha ao atualizar tarefa.");
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const startTime = Date.now();
      const res = await apiRequest("DELETE", `/api/tarefas/${id}`);
      const data = await res.json();
      return { data, responseTime: Date.now() - startTime, status: res.status };
    },
    onSuccess: (result) => {
      setResponse(result);
      queryClient.invalidateQueries({ queryKey: ["/api/tarefas"] });
      onToast("success", "Sucesso!", "Tarefa excluída com sucesso.");
      setDeleteId("");
    },
    onError: (error: any) => {
      setResponse({ data: { message: error.message }, responseTime: 0, status: 404 });
      onToast("error", "Erro!", "Falha ao excluir tarefa.");
    },
  });

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      onToast("info", "Copiado!", "Resposta copiada para a área de transferência.");
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
    if (status >= 400 && status < 500) return "bg-red-100 text-red-800";
    if (status >= 500) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "POST": return "bg-green-100 text-green-800";
      case "GET": return "bg-blue-100 text-blue-800";
      case "PUT": return "bg-orange-100 text-orange-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* API Endpoints Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Code className="mr-2 h-5 w-5 text-blue-600" />
            Endpoints da API
          </CardTitle>
          <p className="text-sm text-slate-600">Teste todas as operações CRUD da API RESTful</p>
        </CardHeader>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <CardContent className="p-6">
          {/* Create Task Tab */}
          {activeTab === "create" && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</span>
                  <code className="text-sm text-slate-600">/api/tarefas</code>
                </div>
                <p className="text-sm text-slate-600">Criar uma nova tarefa no sistema</p>
              </div>

              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  createTaskMutation.mutate(createForm);
                }}
              >
                <div>
                  <Label htmlFor="titulo">Título <span className="text-red-600">*</span></Label>
                  <Input
                    id="titulo"
                    value={createForm.titulo}
                    onChange={(e) => setCreateForm({ ...createForm, titulo: e.target.value })}
                    placeholder="Ex: Estudar API RESTful"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={createForm.descricao || ""}
                    onChange={(e) => setCreateForm({ ...createForm, descricao: e.target.value })}
                    placeholder="Descrição detalhada da tarefa..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status <span className="text-red-600">*</span></Label>
                    <Select value={createForm.status} onValueChange={(value: "pendente" | "realizando" | "concluída") => setCreateForm({ ...createForm, status: value })}>
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
                      value={createForm.data_vencimento}
                      onChange={(e) => setCreateForm({ ...createForm, data_vencimento: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setCreateForm({ titulo: "", descricao: "", status: "pendente", data_vencimento: "" })}
                  >
                    Limpar
                  </Button>
                  <Button type="submit" disabled={createTaskMutation.isPending}>
                    <Send className="mr-2 h-4 w-4" />
                    {createTaskMutation.isPending ? "Enviando..." : "Enviar Requisição"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* List Tasks Tab */}
          {activeTab === "list" && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">GET</span>
                  <code className="text-sm text-slate-600">/api/tarefas</code>
                </div>
                <p className="text-sm text-slate-600">Listar todas as tarefas ou filtrar por status</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="filter_status">Filtrar por Status (opcional)</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="realizando">Realizando</SelectItem>
                      <SelectItem value="concluída">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => listTasksMutation.mutate(filterStatus === "all" ? undefined : filterStatus || undefined)}
                    disabled={listTasksMutation.isPending}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {listTasksMutation.isPending ? "Buscando..." : "Buscar Tarefas"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Get Task by ID Tab */}
          {activeTab === "get" && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">GET</span>
                  <code className="text-sm text-slate-600">/api/tarefas/{"{id}"}</code>
                </div>
                <p className="text-sm text-slate-600">Buscar uma tarefa específica pelo ID</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="task_id">ID da Tarefa <span className="text-red-600">*</span></Label>
                  <Input
                    id="task_id"
                    type="number"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    placeholder="Ex: 1"
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => getTaskMutation.mutate(taskId)}
                    disabled={getTaskMutation.isPending || !taskId}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {getTaskMutation.isPending ? "Buscando..." : "Buscar Tarefa"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Update Task Tab */}
          {activeTab === "update" && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">PUT</span>
                  <code className="text-sm text-slate-600">/api/tarefas/{"{id}"}</code>
                </div>
                <p className="text-sm text-slate-600">Atualizar uma tarefa existente</p>
              </div>

              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateTaskMutation.mutate(updateForm);
                }}
              >
                <div>
                  <Label htmlFor="update_id">ID da Tarefa <span className="text-red-600">*</span></Label>
                  <Input
                    id="update_id"
                    type="number"
                    value={updateForm.id}
                    onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
                    placeholder="Ex: 1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="update_titulo">Título</Label>
                  <Input
                    id="update_titulo"
                    value={updateForm.titulo}
                    onChange={(e) => setUpdateForm({ ...updateForm, titulo: e.target.value })}
                    placeholder="Ex: Estudar API RESTful - Revisão"
                  />
                </div>

                <div>
                  <Label htmlFor="update_descricao">Descrição</Label>
                  <Textarea
                    id="update_descricao"
                    value={updateForm.descricao}
                    onChange={(e) => setUpdateForm({ ...updateForm, descricao: e.target.value })}
                    placeholder="Descrição atualizada..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="update_status">Status</Label>
                    <Select value={updateForm.status} onValueChange={(value: "pendente" | "realizando" | "concluída") => setUpdateForm({ ...updateForm, status: value })}>
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
                    <Label htmlFor="update_data_vencimento">Data de Vencimento</Label>
                    <Input
                      id="update_data_vencimento"
                      type="date"
                      value={updateForm.data_vencimento}
                      onChange={(e) => setUpdateForm({ ...updateForm, data_vencimento: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setUpdateForm({ id: "", titulo: "", descricao: "", status: "pendente", data_vencimento: "" })}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={updateTaskMutation.isPending}>
                    <Edit className="mr-2 h-4 w-4" />
                    {updateTaskMutation.isPending ? "Atualizando..." : "Atualizar Tarefa"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Delete Task Tab */}
          {activeTab === "delete" && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">DELETE</span>
                  <code className="text-sm text-slate-600">/api/tarefas/{"{id}"}</code>
                </div>
                <p className="text-sm text-slate-600">Excluir uma tarefa permanentemente</p>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <AlertTriangle className="text-red-400 mt-0.5 mr-3 h-5 w-5" />
                    <div>
                      <h4 className="text-red-800 font-medium">Atenção</h4>
                      <p className="text-red-700 text-sm mt-1">Esta ação não pode ser desfeita. A tarefa será permanentemente removida do sistema.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="delete_id">ID da Tarefa <span className="text-red-600">*</span></Label>
                  <Input
                    id="delete_id"
                    type="number"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    placeholder="Ex: 1"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setDeleteId("")}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => deleteTaskMutation.mutate(deleteId)}
                    disabled={deleteTaskMutation.isPending || !deleteId}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {deleteTaskMutation.isPending ? "Excluindo..." : "Excluir Tarefa"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Terminal className="mr-2 h-5 w-5 text-blue-600" />
            Resposta da API
          </CardTitle>
        </CardHeader>
        <CardContent>
          {response ? (
            <>
              {/* Response Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(response.status)}`}>
                    {response.status} {response.status === 200 ? "OK" : response.status === 201 ? "Created" : "Error"}
                  </span>
                  <span className="text-sm text-slate-600">Tempo de resposta: {response.responseTime}ms</span>
                </div>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-1 h-4 w-4" />
                  Copiar
                </Button>
              </div>

              {/* Response Body */}
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{JSON.stringify(response.data, null, 2)}</code>
                </pre>
              </div>
            </>
          ) : (
            <div className="text-center text-slate-500 py-8">
              Nenhuma requisição realizada ainda. Selecione uma operação acima e envie uma requisição.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
