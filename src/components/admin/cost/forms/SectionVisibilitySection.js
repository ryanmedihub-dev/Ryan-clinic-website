"use client";

import { Eye, RotateCcw } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { defaultSectionVisibility, getRecommendedSectionVisibility } from "@/hooks/useCostForm";

const SECTIONS_CONFIG = [
  { key: "hero", label: "3. Hero Section", description: "Top page banner, title, pricing line, action buttons" },
  { key: "intro", label: "4. Introduction", description: "Quick summary, badges, highlights & summary rows" },
  { key: "services", label: "5. How Much Does It Cost?", description: "Available treatment options & procedure cards" },
  { key: "pricing", label: "6. Per Graft / Session Pricing", description: "Per-session/package pricing cards for PRP, DHI, etc." },
  { key: "graftPricing", label: "7. Pricing by Graft Count", description: "Graft-count tiers specifically for Hair Transplant" },
  { key: "includedSection", label: "8. What's Included", description: "Disclosures, written price guarantee & hidden costs" },
  { key: "priceFactors", label: "9. What Affects the Cost?", description: "Cost breakdown factors & key cost driver cards" },
  { key: "techniqueComparison", label: "10. Technique Comparison", description: "FUE vs Sapphire FUE vs THT comparison table" },
  { key: "fueVsFut", label: "11. FUE vs FUT Comparison", description: "Detailed FUE vs FUT technique & price comparison" },
  { key: "delhiVsTurkey", label: "12. Delhi vs Turkey Comparison", description: "Cost, travel, quality & aftercare in Delhi vs Turkey" },
  { key: "cheapFue", label: "13. Affordable / Cheap Treatment", description: "Pitfalls of low-cost technician clinics" },
  { key: "emi", label: "14. EMI & Payment Options", description: "0% EMI financing plans & bank options" },
  { key: "ryanPricing", label: "15. Ryan Clinic Transparent Pricing", description: "Transparent clinic pricing overview & package cards" },
  { key: "whyRyan", label: "16. Why Choose Ryan Clinic", description: "Doctor-led care, high graft survival & written price guarantee" },
  { key: "mythsFacts", label: "17. Myths vs Facts", description: "Common misconceptions vs medical facts" },
  { key: "clinic", label: "18. Clinic / Location", description: "Address, timings, phone, WhatsApp & Google map" },
  { key: "consultation", label: "19. Consultation & Lead Form", description: "Book free consultation CTA, doctor details & form" },
  { key: "faq", label: "20. FAQ Section", description: "Accordion with frequently asked questions" },
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

