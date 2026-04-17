"use client";
import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const variants = {
  success: {
    icon: CheckCircle,
    bar: "bg-green-500",
    icon_color: "text-green-500",
    bg: "bg-white",
    border: "border-green-200",
    title: "text-green-800",
    msg: "text-green-600",
  },
  error: {
    icon: XCircle,
    bar: "bg-red-500",
    icon_color: "text-red-500",
    bg: "bg-white",
    border: "border-red-200",
    title: "text-red-800",
    msg: "text-red-600",
  },
  warning: {
    icon: AlertTriangle,
    bar: "bg-yellow-400",
    icon_color: "text-yellow-500",
    bg: "bg-white",
    border: "border-yellow-200",
    title: "text-yellow-800",
    msg: "text-yellow-600",
  },
  info: {
    icon: Info,
    bar: "bg-blue-500",
    icon_color: "text-blue-500",
    bg: "bg-white",
    border: "border-blue-200",
    title: "text-blue-800",
    msg: "text-blue-600",
  },
};

function ToastItem({ toast, onRemove }) {
  const v = variants[toast.type] || variants.info;
  const Icon = v.icon;

  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(t);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`flex items-start gap-3 w-full max-w-sm rounded-xl shadow-xl border ${v.bg} ${v.border} overflow-hidden animate-slide-in`}
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Left accent bar */}
      <div className={`w-1 self-stretch shrink-0 ${v.bar}`} />

      <div className="flex-1 py-3 pr-1">
        <div className="flex items-start gap-2.5">
          <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${v.icon_color}`} />
          <div className="flex-1 min-w-0">
            {toast.title && (
              <p className={`text-sm font-semibold ${v.title}`}>{toast.title}</p>
            )}
            {toast.message && (
              <p className={`text-xs mt-0.5 leading-relaxed ${v.msg}`}>{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors shrink-0 mt-0.5"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <>
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(110%); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        .animate-slide-in { animation: slide-in 0.32s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </>
  );
}
