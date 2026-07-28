"use client";

/**
 * Generic reusable status badge.
 *
 * Props:
 *   status    — string key (e.g. "published", "draft")
 *   colorMap  — optional override: { [status]: { label, className, dot } }
 *
 * Default mappings:
 *   published → green
 *   draft     → amber
 *   anything else → gray
 */

const DEFAULT_MAP = {
  published: {
    label: "Published",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  draft: {
    label: "Draft",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
  },
};

const FALLBACK = {
  label: "Unknown",
  className: "bg-gray-100 text-gray-500 border border-gray-200",
  dot: "bg-gray-400",
};

export default function StatusBadge({ status, colorMap }) {
  const map = colorMap ?? DEFAULT_MAP;
  const config = map[status] ?? { ...FALLBACK, label: status ?? "Unknown" };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "text-[11px] font-bold uppercase tracking-wider whitespace-nowrap",
        config.className,
      ].join(" ")}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}
