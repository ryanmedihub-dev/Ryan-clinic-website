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
import ExperienceSpecializationSection from "@/components/admin/surgeon/forms/ExperienceSpecializationSection";
import SkillEvaluationSection  from "@/components/admin/surgeon/forms/SkillEvaluationSection";
import HairlineArtistrySection from "@/components/admin/surgeon/forms/HairlineArtistrySection";
import RevisionRepairSection   from "@/components/admin/surgeon/forms/RevisionRepairSection";
import CostConsultationSection from "@/components/admin/surgeon/forms/CostConsultationSection";
import VisitSurgeonSection     from "@/components/admin/surgeon/forms/VisitSurgeonSection";

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

        {/* UI Section 1: Lead Surgeon (Top Hero) */}
        <LeadSurgeonSection      {...sectionProps} />

        {/* UI Section 2: Why Surgical Skill Matters */}
        <WhySkillSection         {...sectionProps} />

        {/* UI Section 3: Surgical Journey */}
        <SurgeonRoleSection      {...sectionProps} />

        {/* UI Section 4: Surgeon vs Technician Comparison */}
        <ComparisonSection       {...sectionProps} />

        {/* UI Section 5: What Makes A Great Surgeon */}
        <BenefitsSection         {...sectionProps} />

        {/* UI Section 6: Why Choose Ryan Clinic */}
        <WhyClinicSection        {...sectionProps} />

        {/* UI Section 7: Procedures & Techniques */}
        <ProceduresSection       {...sectionProps} />

        {/* UI Section 8: Doctor Intro Spotlight (Best Hair Transplant Surgeon Banner) */}
        <HeroSection             {...sectionProps} />

        {/* UI Section 9: Due Diligence Checklist, CTA & FAQ */}
        <BookingChecklistSection {...sectionProps} />
        <ConsultationCTASection  {...sectionProps} />
        <FAQSection              {...sectionProps} />

        {/* New Marketing Sections */}
        <ExperienceSpecializationSection {...sectionProps} />
        <SkillEvaluationSection  {...sectionProps} />
        <HairlineArtistrySection {...sectionProps} />
        <RevisionRepairSection   {...sectionProps} />
        <CostConsultationSection {...sectionProps} />
        <VisitSurgeonSection     {...sectionProps} />

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
