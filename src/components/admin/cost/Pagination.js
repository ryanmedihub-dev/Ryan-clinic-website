"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Generic reusable pagination bar.
 *
 * Props:
 *   pagination  — { total, page, limit, totalPages } from API response
 *   onPageChange — (newPage: number) => void
 *
 * Features:
 *   • Previous / Next buttons with disabled state
 *   • Smart page number list with ellipsis (…) for large ranges
 *   • "Showing X–Y of Z results" info label
 */
export default function PaginationBar({ pagination = {}, onPageChange }) {
  const {
    total = 0,
    page = 1,
    limit = 10,
    totalPages = 1,
  } = pagination;

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  /* Build the page number list with smart ellipsis */
  const pageList = buildPageList(page, totalPages);

  if (totalPages <= 1 && total === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

      {/* Info text */}
      <p className="text-sm text-gray-500 shrink-0">
        Showing{" "}
        <span className="font-semibold text-gray-700">{from}–{to}</span>
        {" "}of{" "}
        <span className="font-semibold text-gray-700">{total}</span>{" "}
        result{total !== 1 ? "s" : ""}
      </p>

      {/* Page controls */}
      {totalPages > 1 && (
        <nav className="flex items-center gap-1" aria-label="Pagination">

          {/* Previous */}
          <button
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className="p-2 rounded-lg border border-gray-200 text-gray-500
                       hover:bg-gray-100 hover:text-gray-700
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {pageList.map((item, idx) =>
            item === "…" ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 select-none"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange?.(item)}
                aria-label={`Go to page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={[
                  "w-9 h-9 rounded-lg text-sm font-semibold border transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/30",
                  item === page
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm cursor-default"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300",
                ].join(" ")}
              >
                {item}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            className="p-2 rounded-lg border border-gray-200 text-gray-500
                       hover:bg-gray-100 hover:text-gray-700
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      )}
    </div>
  );
}

/* ── Build smart page list with ellipsis ──────────────────────────────────── */
function buildPageList(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const delta = 2;
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);
  const pages = [1];

  if (left > 2) pages.push("…");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages - 1) pages.push("…");
  pages.push(totalPages);

  return pages;
}
