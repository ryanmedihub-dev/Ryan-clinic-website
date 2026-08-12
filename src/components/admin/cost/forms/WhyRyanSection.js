"use client";

import { Award } from "lucide-react";
import SpecificContentSection from "./SpecificContentSection";

export default function WhyRyanSection({ formData, updateField }) {
  return (
    <SpecificContentSection
      targetKey="why-ryan"
      sectionNumber={16}
      title="Why Choose Ryan Clinic / Value"
      subtitle="Doctor-led care, high graft survival, written price guarantee & premium results"
      icon={Award}
      defaultLayout="highlight"
      formData={formData}
      updateField={updateField}
    />
  );
}
