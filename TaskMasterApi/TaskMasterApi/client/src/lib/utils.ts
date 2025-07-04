import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return "";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800";
    case "realizando":
      return "bg-blue-100 text-blue-800";
    case "concluída":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getStatusText(status: string): string {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "realizando":
      return "Realizando";
    case "concluída":
      return "Concluída";
    default:
      return status;
  }
}
