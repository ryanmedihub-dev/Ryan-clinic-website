"use client";

/**
 * Loading skeleton for the surgeon list table.
 * Props:
 *   columns — array of column defs (used only for column count)
 *   rows    — number of skeleton rows to show (default: 7)
 */
export default function LoadingSkeleton({ columns = [], rows = 7 }) {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-3.5 flex gap-6">
        {columns.map((col, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded w-20" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="border-b border-gray-100 px-6 py-4 flex items-center gap-6"
        >
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-3.5 bg-gray-200 rounded w-48" />
            <div className="h-2.5 bg-gray-100 rounded w-24" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-28" />
          <div className="h-5 bg-gray-200 rounded-full w-20" />
          <div className="h-3 bg-gray-200 rounded w-8" />
          <div className="h-3 bg-gray-200 rounded w-8" />
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      ))}
    </div>
  );
}
