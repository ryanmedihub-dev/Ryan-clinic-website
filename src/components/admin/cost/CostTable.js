"use client";

/**
 * Generic reusable admin data table.
 *
 * Props:
 *   columns  — Array of { key, label, className?, tdClassName?, render?(row) => JSX }
 *   data     — Array of row objects (each must have a unique _id)
 *
 * The `render` function on each column receives the full row object and
 * returns JSX. If `render` is omitted, the cell displays row[col.key].
 */
export default function CostTable({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[720px] border-collapse">

        {/* ── Sticky Header ─────────────────────────────────────────── */}
        <thead className="sticky top-0 z-10">
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={[
                  "px-6 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap select-none",
                  col.className ?? "",
                ].join(" ")}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row, rowIdx) => (
            <tr
              key={row._id ?? rowIdx}
              className="hover:bg-blue-50/30 transition-colors duration-100 group"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={[
                    "px-6 py-4 align-middle",
                    col.tdClassName ?? "",
                  ].join(" ")}
                >
                  {col.render
                    ? col.render(row)
                    : (
                      <span className="text-sm text-gray-700">
                        {row[col.key] != null ? String(row[col.key]) : "—"}
                      </span>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
