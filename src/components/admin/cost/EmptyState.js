"use client";

import { FileSearch } from "lucide-react";

/**
 * Generic reusable empty state component.
 *
 * Props:
 *   title       — headline text
 *   description — body description text
 *   buttonText  — CTA button label
 *   onAction    — () => void — called when CTA button is clicked
 *   icon        — optional JSX override for the illustration
 */
export default function EmptyState({
  title = "No Items Found",
  description = "Get started by creating your first item.",
  buttonText = "Create New",
  onAction,
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center select-none">

      {/* Illustration / Icon placeholder */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-blue-50 scale-150 opacity-60 blur-xl" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-inner flex items-center justify-center">
          {icon ?? <FileSearch className="w-10 h-10 text-gray-400" strokeWidth={1.5} />}
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-8">
        {description}
      </p>

      {/* CTA Button */}
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                     text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all
                     shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span className="text-lg leading-none">+</span>
          {buttonText}
        </button>
      )}
    </div>
  );
}
