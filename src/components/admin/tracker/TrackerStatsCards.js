import React from "react";
import { LayoutDashboard, MessageCircle, Phone, FileText } from "lucide-react";

export default function TrackerStatsCards({ stats = {} }) {
  const cards = [
    {
      label: "Total Leads",
      value: stats.total ?? 0,
      description: "Recorded user interactions",
      icon: LayoutDashboard,
      bg: "bg-white",
      border: "border-gray-200",
      iconBg: "bg-gray-50",
      iconColor: "text-gray-600",
      textColor: "text-gray-900",
    },
    {
      label: "WhatsApp Leads",
      value: stats.whatsapp ?? 0,
      description: "Direct chat referrals",
      icon: MessageCircle,
      bg: "bg-green-50/40",
      border: "border-green-100",
      iconBg: "bg-green-100/80",
      iconColor: "text-green-600",
      textColor: "text-green-700",
    },
    {
      label: "Call Leads",
      value: stats.call ?? 0,
      description: "Telephone call referrals",
      icon: Phone,
      bg: "bg-blue-50/40",
      border: "border-blue-100",
      iconBg: "bg-blue-100/80",
      iconColor: "text-blue-600",
      textColor: "text-blue-700",
    },
    {
      label: "Form Leads",
      value: stats.form ?? 0,
      description: "Direct form submissions",
      icon: FileText,
      bg: "bg-orange-50/40",
      border: "border-orange-100",
      iconBg: "bg-orange-100/80",
      iconColor: "text-orange-600",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`${card.bg} rounded-2xl p-5 border ${card.border} hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[140px]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">{card.label}</p>
                <p className={`text-3xl font-extrabold mt-2 ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.iconBg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 font-medium">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
