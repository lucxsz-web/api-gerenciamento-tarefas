import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";

export interface ToastProps {
  type: "success" | "error" | "info";
  title: string;
  message: string;
  show: boolean;
  onHide: () => void;
}

export function Toast({ type, title, message, show, onHide }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        onHide();
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, onHide]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (!show) return null;

  return (
    <div className={`fixed top-4 right-4 max-w-sm w-full bg-white border border-slate-200 rounded-lg shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-50 ${
      isVisible ? "translate-x-0" : "translate-x-full"
    }`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="text-sm text-slate-600 mt-1">{message}</p>
        </div>
        <button 
          className="ml-4 text-slate-400 hover:text-slate-600" 
          onClick={onHide}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
