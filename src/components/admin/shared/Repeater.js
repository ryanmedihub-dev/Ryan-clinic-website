"use client";

import { Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

/**
 * Generic reusable Repeater component.
 * Supports Add, Remove, Move Up, Move Down reordering.
 */
export default function Repeater({
  title,
  description,
  items = [],
  renderItem,
  onAdd,
  onRemove,
  onMove,
  addButtonText = "Add Item",
  className = "",
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with Title & Add Button */}
      {(title || onAdd) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h4 className="font-bold text-gray-800 text-sm">{title}</h4>}
            {description && <p className="text-xs text-gray-500">{description}</p>}
          </div>

          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-blue-200 transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {addButtonText}
            </button>
          )}
        </div>
      )}

      {/* Items List */}
      {items.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
          <p className="text-xs text-gray-400">No items added yet. Click &quot;{addButtonText}&quot; to start.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl bg-gray-50/70 hover:bg-gray-50 transition-colors p-4 space-y-3 relative group"
            >
              {/* Item Card Actions Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Item #{idx + 1}
                </span>

                <div className="flex items-center gap-1">
                  {onMove && (
                    <>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => onMove(idx, idx - 1)}
                        className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === items.length - 1}
                        onClick={() => onMove(idx, idx + 1)}
                        className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(idx)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors ml-1 cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Render Custom Item Content */}
              <div>{renderItem ? renderItem(item, idx) : null}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
