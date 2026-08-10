"use client";

import { Eye, RotateCcw } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { defaultSectionVisibility, getRecommendedSectionVisibility } from "@/hooks/useCostForm";

const SECTIONS_CONFIG = [
  { key: "hero", label: "Hero Section", description: "Top page banner, title, pricing line, action buttons" },
  { key: "intro", label: "Introduction", description: "Quick summary, badges, highlights & summary rows" },
  { key: "services", label: "Services / Procedures", description: "Available treatment options & procedure cards" },
  { key: "pricing", label: "Pricing (Generic)", description: "Per-session/package pricing cards for PRP, DHI, etc." },
  { key: "graftPricing", label: "Graft Pricing", description: "Graft-count tiers specifically for Hair Transplant" },
  { key: "priceFactors", label: "Price Factors & Financing", description: "Cost breakdown factors, EMI plans & comparison" },
  { key: "includedSection", label: "What's Included", description: "Disclosures, written price guarantee & hidden costs" },
  { key: "consultation", label: "Consultation & Lead Form", description: "Book free consultation CTA, doctor details & form" },
  { key: "faq", label: "FAQ Section", description: "Accordion with frequently asked questions" },
  { key: "clinic", label: "Clinic Information", description: "Address, timings, phone, WhatsApp & Google map" },
];

export default function SectionVisibilitySection({
  formData,
  updateField,
  resetSectionVisibilityDefaults,
}) {
  const currentVisibility = {
    ...defaultSectionVisibility,
    ...(formData.sectionVisibility || {}),
  };

  const setAll = (val) => {
    SECTIONS_CONFIG.forEach((sec) => {
      updateField(`sectionVisibility.${sec.key}`, val);
    });
  };

  const handleResetDefaults = () => {
    if (typeof resetSectionVisibilityDefaults === "function") {
      resetSectionVisibilityDefaults();
    } else {
      const rec = getRecommendedSectionVisibility(formData.pageType || "hair-transplant");
      SECTIONS_CONFIG.forEach((sec) => {
        updateField(`sectionVisibility.${sec.key}`, rec[sec.key] !== false);
      });
    }
  };

  const headerActions = (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setAll(true)}
        className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
      >
        Select All
      </button>
      <button
        type="button"
        onClick={() => setAll(false)}
        className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
      >
        Hide All
      </button>
      <button
        type="button"
        onClick={handleResetDefaults}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-xl transition cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" /> Reset Defaults
      </button>
    </div>
  );

  return (
    <SectionCard
      icon={Eye}
      title="2. Section Visibility & Customization"
      subtitle={`Choose which sections appear on the live page for ${formData.pageType || "hair-transplant"}`}
      headerActions={headerActions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS_CONFIG.map((sec) => {
          const isVisible = currentVisibility[sec.key] !== false;

          return (
            <label
              key={sec.key}
              className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isVisible
                  ? "bg-indigo-50/40 border-indigo-200/80 shadow-xs"
                  : "bg-gray-50 border-gray-200/60 opacity-60 hover:opacity-100"
              }`}
            >
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => updateField(`sectionVisibility.${sec.key}`, e.target.checked)}
                className="mt-0.5 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900">{sec.label}</span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isVisible ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{sec.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </SectionCard>
  );
}

