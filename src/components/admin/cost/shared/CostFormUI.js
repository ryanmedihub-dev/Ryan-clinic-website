"use client";

import { Plus, Trash2 } from "lucide-react";

export const inputCls =
  "w-full mt-1.5 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors bg-white font-sans";

export const textareaCls = `${inputCls} resize-y min-h-[90px]`;

export const labelCls =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wide";

export function Field({ label, subtitle, error, required, children, className = "" }) {
  return (
    <div className={className}>
      {label && (
        <label className={labelCls}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {subtitle && (
            <span className="ml-1 text-[11px] font-normal text-gray-400 normal-case tracking-normal">
              ({subtitle})
            </span>
          )}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
}

export function AddButton({ onClick, label = "Add Item", className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-colors cursor-pointer ${className}`}
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

export function DeleteButton({ onClick, label = "Delete", className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-bold transition-colors cursor-pointer ${className}`}
    >
      <Trash2 className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

export function DeleteIconButton({ onClick, title = "Delete" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer shrink-0"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}

export function ItemCard({ title, onDelete, active, onToggleActive, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-gray-50/70 p-5 space-y-4 shadow-xs ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
        <div className="flex items-center gap-2.5">
          <h5 className="text-xs font-bold text-gray-600 uppercase tracking-wide">{title}</h5>
          {active === false && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
              Hidden
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {onToggleActive && (
            <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={active !== false}
                onChange={(e) => onToggleActive(e.target.checked)}
                className="w-3.5 h-3.5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
              />
              <span className="font-medium text-xs">Active</span>
            </label>
          )}
          {onDelete && <DeleteIconButton onClick={onDelete} />}
        </div>
      </div>
      {children}
    </div>
  );
}

export function HighlightedBox({ title, subtitle, color = "amber", children, className = "" }) {
  const colorStyles = {
    amber: "bg-amber-50/70 border-amber-200/80 text-amber-900",
    indigo: "bg-indigo-50/70 border-indigo-200/80 text-indigo-900",
    blue: "bg-blue-50/70 border-blue-200/80 text-blue-900",
    emerald: "bg-emerald-50/70 border-emerald-200/80 text-emerald-900",
  };

  return (
    <div className={`border rounded-xl p-4 ${colorStyles[color] || colorStyles.amber} ${className}`}>
      {title && (
        <div className="mb-2">
          <h5 className="text-xs font-bold uppercase tracking-wide">{title}</h5>
          {subtitle && <p className="text-xs opacity-75 mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
