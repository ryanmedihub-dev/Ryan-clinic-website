"use client";

import { useState, useCallback } from "react";
import { useSurgeonForm } from "@/hooks/useSurgeonForm";
import ToastContainer from "@/components/admin/Toast";
import AdminHeader from "@/components/admin/adminHeader";

import GeneralSection        from "@/components/admin/surgeon/forms/GeneralSection";
import SEOSection            from "@/components/admin/surgeon/forms/SEOSection";
import HeroSection           from "@/components/admin/surgeon/forms/HeroSection";
import WhySkillSection       from "@/components/admin/surgeon/forms/WhySkillSection";
import BenefitsSection       from "@/components/admin/surgeon/forms/BenefitsSection";
import WhyClinicSection      from "@/components/admin/surgeon/forms/WhyClinicSection";
import SurgeonRoleSection    from "@/components/admin/surgeon/forms/SurgeonRoleSection";
import ComparisonSection     from "@/components/admin/surgeon/forms/ComparisonSection";
import LeadSurgeonSection    from "@/components/admin/surgeon/forms/LeadSurgeonSection";
import BookingChecklistSection from "@/components/admin/surgeon/forms/BookingChecklistSection";
import ProceduresSection     from "@/components/admin/surgeon/forms/ProceduresSection";
import ConsultationCTASection from "@/components/admin/surgeon/forms/ConsultationCTASection";
import FAQSection            from "@/components/admin/surgeon/forms/FAQSection";

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
    error:   (title, message) => add("error",   title, message),
  };
}

export default function CreateSurgeonPage() {
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
  } = useSurgeonForm({ mode: "create", toast });

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
      <AdminHeader title="/ Create Surgeon Page" />

      <form onSubmit={handleSubmit} className="space-y-6 px-6 mx-auto" suppressHydrationWarning>

        <GeneralSection          {...sectionProps} />
        <SEOSection              {...sectionProps} />
        <HeroSection             {...sectionProps} />
        <WhySkillSection         {...sectionProps} />
        <BenefitsSection         {...sectionProps} />
        <WhyClinicSection        {...sectionProps} />
        <SurgeonRoleSection      {...sectionProps} />
        <ComparisonSection       {...sectionProps} />
        <LeadSurgeonSection      {...sectionProps} />
        <BookingChecklistSection {...sectionProps} />
        <ProceduresSection       {...sectionProps} />
        <ConsultationCTASection  {...sectionProps} />
        <FAQSection              {...sectionProps} />

        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Create Surgeon Page"}
          </button>
        </div>

      </form>
    </section>
  );
}
