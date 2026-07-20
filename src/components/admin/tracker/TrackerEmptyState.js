import React from "react";
import { Activity, RefreshCw } from "lucide-react";

export default function TrackerEmptyState({ onRefresh, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        {/* Illustration */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Activity className="w-9 h-9 text-gray-300" />
          </div>
          {/* Decorative dots */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-200 rounded-full" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-200 rounded-full" />
        </div>

        {/* Heading */}
        <h3 className="text-base font-bold text-gray-900 mb-1.5">
          No Leads Found
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-6">
          No lead interactions have been recorded yet. Try adjusting your
          filters or check back later.
        </p>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
    </div>
  );
}
