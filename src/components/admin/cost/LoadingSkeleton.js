"use client";

/**
 * Generic reusable table loading skeleton.
 * Renders shimmer placeholder rows that mirror the real table layout.
 *
 * Props:
 *   columns — same columns array passed to CostTable (uses key + className)
 *   rows    — number of skeleton rows to render (default: 7)
 */

function Shimmer({ className = "" }) {
  return (
    <div
      className={[
        "rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-shimmer",
        className,
      ].join(" ")}
    />
  );
}

/* Decide what shape each cell skeleton has based on column key */
function CellSkeleton({ columnKey }) {
  switch (columnKey) {
    case "title":
      return (
        <div className="space-y-1.5">
          <Shimmer className="h-4 w-44" />
          <Shimmer className="h-3 w-28" />
        </div>
      );
    case "slug":
      return <Shimmer className="h-6 w-36 rounded-lg" />;
    case "pageType":
      return <Shimmer className="h-6 w-24 rounded-full" />;
    case "status":
      return <Shimmer className="h-6 w-20 rounded-full" />;
    case "featured":
      return <Shimmer className="h-5 w-8" />;
    case "displayOrder":
      return <Shimmer className="h-4 w-8" />;
    case "updatedAt":
      return <Shimmer className="h-4 w-28" />;
    case "actions":
      return (
        <div className="flex justify-end gap-2">
          <Shimmer className="h-4 w-8" />
          <Shimmer className="h-4 w-12" />
        </div>
      );
    default:
      return <Shimmer className="h-4 w-24" />;
  }
}

export default function LoadingSkeleton({ columns = [], rows = 7 }) {
  return (
    <>
      {/* Inject shimmer keyframes via a style tag (Tailwind doesn't ship this by default) */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 100% 50%; }
          100% { background-position:   0% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>

      <div className="overflow-x-auto w-full" suppressHydrationWarning>
        <table className="w-full min-w-[720px]" suppressHydrationWarning>

          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200" suppressHydrationWarning>
            <tr suppressHydrationWarning>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={["px-6 py-3.5", col.className ?? ""].join(" ")}
                >
                  <Shimmer className="h-3 w-14" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Skeleton rows */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50/50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={["px-6 py-4", col.tdClassName ?? ""].join(" ")}
                  >
                    <CellSkeleton columnKey={col.key} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
