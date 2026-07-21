import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TrackerPagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  pageSize = 10,
  onPageChange,
}) {
  const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);
  const end = Math.min(currentPage * pageSize, totalCount);

  // Build visible page numbers with ellipsis
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Showing summary */}
      <p className="text-sm text-gray-500 font-medium shrink-0">
        Showing{" "}
        <span className="font-semibold text-gray-800">{start}–{end}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-800">{totalCount}</span>{" "}
        Lead{totalCount !== 1 ? "s" : ""}
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-1">
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span
                key={`dots-${idx}`}
                className="px-2 py-1.5 text-gray-400 text-sm select-none"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange && onPageChange(page)}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                    : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
