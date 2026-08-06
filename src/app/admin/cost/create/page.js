"use client";

import { useState, useCallback } from "react";
import { useCostForm } from "@/hooks/useCostForm";
import ToastContainer from "@/components/admin/Toast";
import AdminHeader from "@/components/admin/adminHeader";

import GeneralSection from "@/components/admin/cost/forms/GeneralSection";
import SEOSection from "@/components/admin/cost/forms/SEOSection";
import HeroSection from "@/components/admin/cost/forms/HeroSection";
import IntroSection from "@/components/admin/cost/forms/IntroSection";
import ServicesSection from "@/components/admin/cost/forms/ServicesSection";
import GraftPricingSection from "@/components/admin/cost/forms/GraftPricingSection";
import PricingOptionsSection from "@/components/admin/cost/forms/PricingOptionsSection";
import TechniqueComparisonSection from "@/components/admin/cost/forms/TechniqueComparisonSection";
import IncludedSection from "@/components/admin/cost/forms/IncludedSection";
import PriceFactorsSection from "@/components/admin/cost/forms/PriceFactorsSection";
import ContentSectionsSection from "@/components/admin/cost/forms/ContentSectionsSection";
import MythsFactsSection from "@/components/admin/cost/forms/MythsFactsSection";
import VisitClinicSection from "@/components/admin/cost/forms/VisitClinicSection";
import ConsultationSection from "@/components/admin/cost/forms/ConsultationSection";
import FAQSection from "@/components/admin/cost/forms/FAQSection";

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

export default function CreateCostPage() {
  const toast = useToast();
  const {
    formData,
    submitting,
    errors,
    updateField,
    updateArrayItem,
    addItem,
    removeItem,
    handleSubmit,
  } = useCostForm({ mode: "create", toast });

  const sectionProps = {
    formData,
    updateField,
    updateArrayItem,
    addItem,
    removeItem,
    errors,
  };

  return (
    <section className="pb-24" suppressHydrationWarning>
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
      <AdminHeader title="/ Create Cost Page" />

      <form onSubmit={handleSubmit} className="space-y-6 px-6 mx-auto" suppressHydrationWarning>

        <GeneralSection {...sectionProps} />
        <SEOSection {...sectionProps} />
        <HeroSection {...sectionProps} />
        <IntroSection {...sectionProps} />
        <ServicesSection {...sectionProps} />
        <GraftPricingSection {...sectionProps} />
        <PricingOptionsSection {...sectionProps} />
        <TechniqueComparisonSection {...sectionProps} />
        <IncludedSection {...sectionProps} />
        <PriceFactorsSection {...sectionProps} />
        <ContentSectionsSection {...sectionProps} />
        <MythsFactsSection {...sectionProps} />
        <VisitClinicSection {...sectionProps} />
        <ConsultationSection {...sectionProps} />
        <FAQSection {...sectionProps} />

        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Create Cost Page"}
          </button>
        </div>

      </form>
    </section>
  );
}
