import React from "react";

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 min-h-[140px] flex flex-col justify-between animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-100 rounded-full" />
          <div className="h-8 w-16 bg-gray-100 rounded-lg mt-3" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-gray-100" />
      </div>
      <div className="h-2.5 w-32 bg-gray-100 rounded-full mt-4" />
    </div>
  );
}

function FilterSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col md:flex-row gap-3 animate-pulse">
      <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
      <div className="w-full md:w-40 h-10 bg-gray-100 rounded-xl" />
      <div className="w-full md:w-44 h-10 bg-gray-100 rounded-xl" />
      <div className="flex gap-2">
        <div className="w-28 h-10 bg-gray-100 rounded-xl" />
        <div className="w-32 h-10 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-gray-50">
      <td className="px-5 py-4">
        <div className="h-3 w-4 bg-gray-100 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="h-5 w-20 bg-gray-100 rounded-full" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-32 bg-gray-100 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-24 bg-gray-100 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-28 bg-gray-100 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-20 bg-gray-100 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-16 bg-gray-100 rounded" />
      </td>
      <td className="px-5 py-4">
        <div className="h-7 w-14 bg-gray-100 rounded-lg mx-auto" />
      </td>
    </tr>
  );
}

export default function TrackerSkeleton() {
  return (
    <div className="space-y-4">
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Filter skeleton */}
      <FilterSkeleton />

      {/* Table skeleton */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table header label */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 animate-pulse">
          <div className="h-4 w-40 bg-gray-100 rounded-full" />
          <div className="h-5 w-20 bg-gray-100 rounded-full" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["#", "Type", "Page Name", "CTA Name", "Slug", "Date", "Time", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left">
                    <div className="h-2.5 w-12 bg-gray-100 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
