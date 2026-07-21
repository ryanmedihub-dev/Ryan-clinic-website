import React from "react";
import {
  X,
  MessageCircle,
  Phone,
  FileText,
  Calendar,
  Clock,
  Link as LinkIcon,
  Tag,
} from "lucide-react";

const TYPE_CONFIG = {
  whatsapp: {
    label: "WhatsApp",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    Icon: MessageCircle,
  },
  call: {
    label: "Call",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    Icon: Phone,
  },
  form: {
    label: "Form",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    Icon: FileText,
  },
};

function DetailRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className={`text-sm font-semibold text-gray-900 break-all ${mono ? "font-mono" : ""}`}>
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export default function TrackerViewModal({ lead, onClose }) {
  if (!lead) return null;

  const config = TYPE_CONFIG[lead.type?.toLowerCase()] || {
    label: lead.type || "Unknown",
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    Icon: FileText,
  };
  const TypeIcon = config.Icon;

  const date = lead.createdAt
    ? new Date(lead.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  const time = lead.createdAt
    ? new Date(lead.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "—";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center`}>
                <TypeIcon className={`w-5 h-5 ${config.iconColor}`} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-base">Lead Details</h2>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border mt-0.5 ${config.bg} ${config.text} ${config.border}`}
                >
                  {config.label}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <DetailRow icon={Tag} label="Page Name" value={lead.pageName} />
            <DetailRow icon={Tag} label="CTA Name" value={lead.ctaName} />
            <DetailRow icon={LinkIcon} label="Slug" value={`/${lead.slug}`} mono />
            <DetailRow icon={Calendar} label="Date" value={date} />
            <DetailRow icon={Clock} label="Time" value={time} />
          </div>

          {/* Footer */}
          <div className="px-5 pb-5">
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
