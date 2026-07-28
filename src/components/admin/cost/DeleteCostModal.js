"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

/**
 * Generic reusable delete confirmation modal.
 *
 * Props:
 *   isOpen    — boolean — controls visibility
 *   itemName  — string  — name of the item being deleted (shown in modal)
 *   onConfirm — () => void — called when user confirms deletion
 *   onCancel  — () => void — called when user cancels
 *   loading   — boolean — shows spinner on delete button while API call is in flight
 *   title     — string  — modal headline (default: "Delete this item?")
 *   description — string — body text override
 */
export default function DeleteCostModal({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
  loading = false,
  title = "Delete Cost Page?",
  description,
}) {
  const cancelBtnRef = useRef(null);

  /* ── Keyboard: Escape to close, trap focus ──────────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !loading) {
        onCancel?.();
      }
    };

    // Auto-focus cancel button for keyboard accessibility
    cancelBtnRef.current?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onCancel]);

  /* ── Prevent body scroll while open ────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const bodyText = description
    ?? "This action is permanent and cannot be undone.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !loading && onCancel?.()}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden">

        {/* Close button */}
        <button
          onClick={() => !loading && onCancel?.()}
          disabled={loading}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400
                     hover:text-gray-600 hover:bg-gray-100 transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal body */}
        <div className="p-6 pt-7">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-5 mx-auto">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>

          {/* Heading */}
          <h2
            id="delete-modal-title"
            className="text-lg font-bold text-gray-900 text-center mb-2"
          >
            {title}
          </h2>

          {/* Item name */}
          {itemName && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 mb-3 mx-1">
              <p className="text-sm font-semibold text-gray-800 text-center truncate">
                &ldquo;{itemName}&rdquo;
              </p>
            </div>
          )}

          {/* Warning text */}
          <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
            {bodyText}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* Cancel */}
            <button
              ref={cancelBtnRef}
              onClick={() => !loading && onCancel?.()}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold
                         text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100
                         disabled:opacity-40 disabled:cursor-not-allowed transition-colors
                         focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>

            {/* Delete / Confirm */}
            <button
              onClick={() => !loading && onConfirm?.()}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-red-600 hover:bg-red-700 active:bg-red-800
                         disabled:bg-red-400 disabled:cursor-not-allowed
                         transition-colors flex items-center justify-center gap-2
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin shrink-0"
                    aria-hidden="true"
                  />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
