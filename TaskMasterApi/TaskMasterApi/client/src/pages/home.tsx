import { useState } from "react";
import { FileCheck } from "lucide-react";
import { ApiTester } from "@/components/api-tester";
import { TasksList } from "@/components/task-list";
import { Toast } from "@/components/toast";

interface ToastState {
  show: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export default function Home() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = (type: "success" | "error" | "info", title: string, message: string) => {
    setToast({ show: true, type, title, message });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileCheck className="text-blue-600 h-8 w-8 mr-3" />
              <h1 className="text-xl font-semibold text-slate-900">API de Gerenciamento de Tarefas</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-500">Ambiente: Desenvolvimento</span>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                API Online
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Tester (Left Column - 2/3 width) */}
          <div className="lg:col-span-2">
            <ApiTester onToast={showToast} />
          </div>

          {/* Tasks List (Right Column - 1/3 width) */}
          <div>
            <TasksList />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast {...toast} onHide={hideToast} />
    </div>
  );
}
