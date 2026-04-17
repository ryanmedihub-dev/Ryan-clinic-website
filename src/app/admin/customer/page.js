"use client";

import { useState, useCallback } from "react";
import {
  Users, ExternalLink, Search, RefreshCw,
  Phone, Mail, MapPin, Tag, MessageSquare,
} from "lucide-react";

const CRM_URL = "https://www.ryanmedihub.com";

export default function CustomerPage() {
  const [query, setQuery] = useState("");

  const stats = [
    { label: "All leads managed via Ryan CRM", note: "External System" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Customers & Leads</h1>
              <p className="text-xs text-gray-500">Managed via Ryan MediHub CRM</p>
            </div>
          </div>
          <a
            href={CRM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open CRM
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* CRM Info Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold mb-1">Ryan MediHub CRM</h2>
              <p className="text-purple-200 text-sm max-w-lg">
                All customer leads, consultations, and patient data are managed through the Ryan MediHub CRM platform. Click below to access the full dashboard.
              </p>
            </div>
            <a
              href={CRM_URL}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white text-purple-700 text-sm font-bold rounded-xl hover:bg-purple-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Go to CRM
            </a>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Phone, label: "Call Leads", desc: "View and manage incoming call inquiries from website visitors.", color: "blue" },
            { icon: Mail, label: "Email Leads", desc: "Track email enquiries from contact and consultation forms.", color: "green" },
            { icon: MapPin, label: "Location Tracking", desc: "See where your leads are coming from across India.", color: "orange" },
            { icon: Tag, label: "Lead Tagging", desc: "Categorize leads by source, service type, and priority.", color: "red" },
            { icon: MessageSquare, label: "Remarks & Notes", desc: "Add follow-up notes and remarks to each customer record.", color: "purple" },
            { icon: Users, label: "Patient Records", desc: "Manage patient information, history, and consultation status.", color: "indigo" },
          ].map(({ icon: Icon, label, desc, color }) => (
            <a
              key={label}
              href={CRM_URL}
              target="_blank"
              rel="noreferrer"
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-${color}-50 flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              <div className={`mt-3 text-xs font-semibold text-${color}-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                Open in CRM <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>

        {/* Quick Link Row */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-1 text-sm">Quick Access</h3>
          <p className="text-xs text-gray-400 mb-4">Direct links to CRM sections</p>
          <div className="flex flex-wrap gap-2">
            {["Dashboard", "All Leads", "New Lead", "Reports", "Settings"].map((item) => (
              <a
                key={item}
                href={CRM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-purple-200 hover:text-purple-700 transition-colors"
              >
                {item}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
