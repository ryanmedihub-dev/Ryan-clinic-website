"use client";
import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(-10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
        .modal-card { animation: modal-in 0.25s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onCancel}
      >
        {/* Card */}
        <div
          className="modal-card bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                {title || "Are you sure?"}
              </h3>
            </div>
            <button
              onClick={onCancel}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            <p className="text-sm text-gray-500 leading-relaxed">
              {message || "This action cannot be undone."}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-6" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4">
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
