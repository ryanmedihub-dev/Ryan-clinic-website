"use client";

import { use, useState, useCallback } from "react";
import { useCostForm } from "@/hooks/useCostForm";
import ToastContainer from "@/components/admin/Toast";
import AdminHeader from "@/components/admin/adminHeader";

import GeneralSection from "@/components/admin/cost/forms/GeneralSection";
import SEOSection from "@/components/admin/cost/forms/SEOSection";
import HeroSection from "@/components/admin/cost/forms/HeroSection";
import IntroSection from "@/components/admin/cost/forms/IntroSection";
import ServicesSection from "@/components/admin/cost/forms/ServicesSection";
import GraftPricingSection from "@/components/admin/cost/forms/GraftPricingSection";
import TechniqueComparisonSection from "@/components/admin/cost/forms/TechniqueComparisonSection";
import IncludedSection from "@/components/admin/cost/forms/IncludedSection";
import PriceFactorsSection from "@/components/admin/cost/forms/PriceFactorsSection";
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
    handleSubmit,
  } = useCostForm({ mode: "edit", id, toast });

  const sectionProps = {
    formData,
    updateField,
    updateArrayItem,
    addItem,
    removeItem,
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

        <GeneralSection {...sectionProps} />
        <SEOSection {...sectionProps} />
        <HeroSection {...sectionProps} />
        <IntroSection {...sectionProps} />
        <ServicesSection {...sectionProps} />
        <GraftPricingSection {...sectionProps} />
        <TechniqueComparisonSection {...sectionProps} />
        <IncludedSection {...sectionProps} />
        <PriceFactorsSection {...sectionProps} />
        <ConsultationSection {...sectionProps} />
        <FAQSection {...sectionProps} />

        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Update Cost Page"}
          </button>
        </div>

      </form>
    </section>
  );
}
