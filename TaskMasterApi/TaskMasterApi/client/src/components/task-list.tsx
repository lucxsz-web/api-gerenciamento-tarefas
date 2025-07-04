import { useQuery } from "@tanstack/react-query";
import { ChevronRight, BarChart3, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@shared/schema";
import { formatDate, getStatusColor, getStatusText } from "@/lib/utils";

export function TasksList() {
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tarefas"],
  });

  const stats = {
    total: tasks.length,
    pendente: tasks.filter(t => t.status === "pendente").length,
    realizando: tasks.filter(t => t.status === "realizando").length,
    concluída: tasks.filter(t => t.status === "concluída").length,
  };

  const recentTasks = tasks.slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total de Tarefas</span>
              <span className="font-semibold text-slate-900">{stats.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Pendentes</span>
              <span className="font-semibold text-yellow-600">{stats.pendente}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Em Andamento</span>
              <span className="font-semibold text-blue-600">{stats.realizando}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Concluídas</span>
              <span className="font-semibold text-green-600">{stats.concluída}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <List className="mr-2 h-5 w-5 text-blue-600" />
            Tarefas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentTasks.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              Nenhuma tarefa encontrada
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {recentTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 text-sm">{task.titulo}</h4>
                      {task.descricao && (
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{task.descricao}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                        {task.data_vencimento && (
                          <span className="text-xs text-slate-500">
                            {formatDate(task.data_vencimento)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 ml-2">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {tasks.length > 5 && (
                <div className="p-4 text-center">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Ver todas as tarefas
                    <ChevronRight className="inline ml-1 h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documentation Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <i className="fas fa-book mr-2 text-blue-600"></i>
            Documentação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-between p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <i className="fas fa-file-code text-blue-600 mr-3"></i>
                <span className="text-sm font-medium text-slate-900">Documentação da API</span>
              </div>
              <i className="fas fa-external-link-alt text-xs text-slate-400"></i>
            </a>
            <a href="#" className="flex items-center justify-between p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <i className="fab fa-github text-blue-600 mr-3"></i>
                <span className="text-sm font-medium text-slate-900">Código no GitHub</span>
              </div>
              <i className="fas fa-external-link-alt text-xs text-slate-400"></i>
            </a>
            <a href="#" className="flex items-center justify-between p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <i className="fas fa-download text-blue-600 mr-3"></i>
                <span className="text-sm font-medium text-slate-900">Coleção Postman</span>
              </div>
              <i className="fas fa-external-link-alt text-xs text-slate-400"></i>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
