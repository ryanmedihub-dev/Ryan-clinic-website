"use client";

import Link from "next/link";
import { Search, Plus } from "lucide-react";

const DEFAULT_STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

export default function SurgeonToolbar({
  search = "",
  onSearch,
  status = "",
  onStatus,
  createHref = "#",
  title = "Surgeon Pages",
  description = "Manage all surgeon pages",
  statusOptions = DEFAULT_STATUS_OPTIONS,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        </div>

        <Link
          href={createHref}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-all shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          Create New
        </Link>
      </div>

      {/* Bottom row: search + filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search by title or slug…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm bg-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
          {search && (
            <button
              onClick={() => onSearch?.("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <select
          value={status}
          onChange={(e) => onStatus?.(e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
