"use client";

import { AlertTriangle } from "lucide-react";
import SpecificContentSection from "./SpecificContentSection";

export default function CheapFueSection({ formData, updateField }) {
  return (
    <SpecificContentSection
      targetKey="cheap-fue"
      sectionNumber={13}
      title="Affordable / Cheap Treatment Considerations"
      subtitle="Is a cheap hair transplant worth it? Pitfalls of low-cost technician clinics"
      icon={AlertTriangle}
      defaultLayout="suitability"
      formData={formData}
      updateField={updateField}
    />
  );
}
