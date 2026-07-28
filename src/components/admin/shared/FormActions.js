"use client";

import { Save, Eye, Trash2 } from "lucide-react";

/**
 * Reusable FormActions component.
 * Responsible ONLY for form save/publish/preview/delete buttons & loading states.
 */
export default function FormActions({
  onSave,
  submitting = false,
  isEdit = false,
  slug,
  onDelete,
  className = "",
}) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <button
        type="button"
        onClick={onSave}
        disabled={submitting}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Saving Page…
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            {isEdit ? "Update Cost Page" : "Publish Cost Page"}
          </>
        )}
      </button>

      {slug && (
        <a
          href={`/${slug}`}
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview
        </a>
      )}

      {isEdit && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="w-full py-2 px-4 text-red-600 hover:bg-red-50 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete Cost Page
        </button>
      )}
    </div>
  );
}
