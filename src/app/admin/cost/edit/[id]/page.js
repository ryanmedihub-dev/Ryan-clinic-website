"use client";

import { use, useState, useCallback } from "react";
import { useCostForm } from "@/hooks/useCostForm";
import { Save, Loader2, Edit3 } from "lucide-react";
import ToastContainer from "@/components/admin/Toast";
import AdminHeader from "@/components/admin/adminHeader";

import GeneralSection from "@/components/admin/cost/forms/GeneralSection";
import SEOSection from "@/components/admin/cost/forms/SEOSection";
import HeroSection from "@/components/admin/cost/forms/HeroSection";
import IntroSection from "@/components/admin/cost/forms/IntroSection";
import ServicesSection from "@/components/admin/cost/forms/ServicesSection";
import PricingOptionsSection from "@/components/admin/cost/forms/PricingOptionsSection";
import GraftPricingSection from "@/components/admin/cost/forms/GraftPricingSection";
import IncludedSection from "@/components/admin/cost/forms/IncludedSection";
import PriceFactorsSection from "@/components/admin/cost/forms/PriceFactorsSection";
import TechniqueComparisonSection from "@/components/admin/cost/forms/TechniqueComparisonSection";
import FueVsFutSection from "@/components/admin/cost/forms/FueVsFutSection";
import DelhiVsTurkeySection from "@/components/admin/cost/forms/DelhiVsTurkeySection";
import CheapFueSection from "@/components/admin/cost/forms/CheapFueSection";
import EMISection from "@/components/admin/cost/forms/EMISection";
import RyanPricingSection from "@/components/admin/cost/forms/RyanPricingSection";
import WhyRyanSection from "@/components/admin/cost/forms/WhyRyanSection";
import MythsFactsSection from "@/components/admin/cost/forms/MythsFactsSection";
import VisitClinicSection from "@/components/admin/cost/forms/VisitClinicSection";
import ConsultationSection from "@/components/admin/cost/forms/ConsultationSection";
import FAQSection from "@/components/admin/cost/forms/FAQSection";
import SectionVisibilitySection from "@/components/admin/cost/forms/SectionVisibilitySection";
import ContentSectionsSection from "@/components/admin/cost/forms/ContentSectionsSection";
import SettingsSection from "@/components/admin/cost/forms/SettingsSection";

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);
  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return {
    toasts,
    remove,
    success: (title, message) => add("success", title, message),
    error: (title, message) => add("error", title, message),
  };
}

export default function EditCostPage({ params }) {
  const { id } = use(params);
  const toast = useToast();

  const {
    formData,
    loading,
    submitting,
    errors,
    updateField,
    updateArrayItem,
    addItem,
    removeItem,
    resetSectionVisibilityDefaults,
    handleSubmit,
  } = useCostForm({ mode: "edit", id, toast });

  const sectionProps = {
    formData,
    updateField,
    updateArrayItem,
    addItem,
    removeItem,
    resetSectionVisibilityDefaults,
    errors,
  };

  if (loading) {
    return (
      <section className="px-6 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
          <div className="h-32 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </section>
    );
  }

  return (
    <section className="pb-24" suppressHydrationWarning>
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
      <AdminHeader title="/ Edit Cost Page" />

      <form onSubmit={handleSubmit} className="space-y-6 px-6 mx-auto" suppressHydrationWarning>

        {/* Sticky Top Bar */}
        <div className="sticky top-4 z-40 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3.5 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Edit3 className="w-4.5 h-4.5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                {formData.title || "Editing Cost Page"}
              </h2>
              <p className="text-xs text-gray-500">
                {formData.slug ? `/cost/${formData.slug}` : "Edit mode"}
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Update Cost Page</>
            )}
          </button>
        </div>

        {/* 1. GENERAL INFORMATION */}
        <GeneralSection {...sectionProps} />

        {/* 2. SEO SETTINGS */}
        <SEOSection {...sectionProps} />

        {/* 3. HERO SECTION */}
        <HeroSection {...sectionProps} />

        {/* 4. INTRODUCTION */}
        <IntroSection {...sectionProps} />

        {/* 5. HOW MUCH DOES IT COST? */}
        <ServicesSection {...sectionProps} />

        {/* 6. PER GRAFT / SESSION PRICING */}
        <PricingOptionsSection {...sectionProps} />

        {/* 7. PRICING BY GRAFT COUNT / TREATMENT SIZE */}
        <GraftPricingSection {...sectionProps} />

        {/* 8. WHAT'S INCLUDED */}
        <IncludedSection {...sectionProps} />

        {/* 9. WHAT AFFECTS THE COST? */}
        <PriceFactorsSection {...sectionProps} />

        {/* 10. TECHNIQUE COMPARISON */}
        <TechniqueComparisonSection {...sectionProps} />

        {/* 11. FUE VS FUT */}
        <FueVsFutSection {...sectionProps} />

        {/* 12. DELHI VS TURKEY */}
        <DelhiVsTurkeySection {...sectionProps} />

        {/* 13. AFFORDABLE / CHEAP TREATMENT */}
        <CheapFueSection {...sectionProps} />

        {/* 14. EMI & PAYMENT OPTIONS */}
        <EMISection {...sectionProps} />

        {/* 15. RYAN CLINIC TRANSPARENT PRICING */}
        <RyanPricingSection {...sectionProps} />

        {/* 16. WHY RYAN CLINIC */}
        <WhyRyanSection {...sectionProps} />

        {/* 17. MYTHS VS FACTS */}
        <MythsFactsSection {...sectionProps} />

        {/* 18. CLINIC / LOCATION */}
        <VisitClinicSection {...sectionProps} />

        {/* 19. CONSULTATION / QUOTE */}
        <ConsultationSection {...sectionProps} />

        {/* 20. FAQ */}
        <FAQSection {...sectionProps} />

        {/* 21. SECTION VISIBILITY */}
        <SectionVisibilitySection {...sectionProps} />

        {/* 22. ADVANCED / CUSTOM CONTENT SECTIONS */}
        <ContentSectionsSection {...sectionProps} />

        {/* 23. SETTINGS & PUBLISH STATUS */}
        <SettingsSection {...sectionProps} />

        {/* Bottom Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 px-4 rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Update Cost Page</>
            )}
          </button>
        </div>

      </form>
    </section>
  );
}
