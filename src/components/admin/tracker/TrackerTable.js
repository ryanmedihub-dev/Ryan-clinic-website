import React from "react";
import { Eye, ExternalLink } from "lucide-react";

const TYPE_CONFIG = {
  whatsapp: {
    label: "WhatsApp",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
  call: {
    label: "Call",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  form: {
    label: "Form",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
};

function TypeBadge({ type }) {
  const config = TYPE_CONFIG[type?.toLowerCase()] || {
    label: type || "Unknown",
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function formatTime(dateStr) {
  try {
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "—";
  }
}

export default function TrackerTable({ leads = [], onView }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Table header label */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 text-sm">All Lead Interactions</h2>
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
          {leads.length} record{leads.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-8">
                #
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Page Name
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                CTA Name
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Slug
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Time
              </th>
              <th className="text-center px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead, i) => (
              <tr
                key={lead._id || i}
                className="group hover:bg-blue-50/30 transition-colors"
              >
                {/* Index */}
                <td className="px-5 py-4 text-gray-400 text-xs font-medium">
                  {i + 1}
                </td>

                {/* Type Badge */}
                <td className="px-5 py-4">
                  <TypeBadge type={lead.type} />
                </td>

                {/* Page Name */}
                <td className="px-5 py-4 max-w-[180px]">
                  <p className="font-semibold text-gray-900 truncate leading-snug">
                    {lead.pageName || "—"}
                  </p>
                </td>

                {/* CTA Name */}
                <td className="px-5 py-4 max-w-[160px]">
                  <p className="text-gray-700 font-medium truncate">
                    {lead.ctaName || "—"}
                  </p>
                </td>

                {/* Slug */}
                <td className="px-5 py-4 max-w-[160px]">
                  <span className="text-xs text-gray-400 font-mono truncate block">
                    /{lead.slug || "—"}
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className="text-gray-600 text-xs font-medium">
                    {formatDate(lead.createdAt)}
                  </span>
                </td>

                {/* Time */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className="text-gray-400 text-xs">
                    {formatTime(lead.createdAt)}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => onView && onView(lead)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
