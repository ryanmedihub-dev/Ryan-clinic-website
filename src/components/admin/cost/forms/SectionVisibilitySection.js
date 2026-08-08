"use client";

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

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            👁️ Section Visibility
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Choose which sections appear on the public page HTML for <span className="font-semibold text-blue-600 uppercase">{formData.pageType || "hair-transplant"}</span>.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAll(true)}
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={() => setAll(false)}
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Hide All
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition"
          >
            ↺ Reset Recommended Defaults
          </button>
        </div>
      </div>

      {/* Grid of Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS_CONFIG.map((sec) => {
          const isVisible = currentVisibility[sec.key] !== false;

          return (
            <label
              key={sec.key}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isVisible
                  ? "bg-blue-50/40 border-blue-200 shadow-xs"
                  : "bg-gray-50 border-gray-200 opacity-60 hover:opacity-100"
              }`}
            >
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => updateField(`sectionVisibility.${sec.key}`, e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900">{sec.label}</span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isVisible ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isVisible ? "ON" : "OFF"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{sec.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
