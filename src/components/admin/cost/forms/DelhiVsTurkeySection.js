"use client";

import { Globe } from "lucide-react";
import SpecificContentSection from "./SpecificContentSection";

export default function DelhiVsTurkeySection({ formData, updateField }) {
  return (
    <SpecificContentSection
      targetKey="delhi-vs-turkey"
      sectionNumber={12}
      title="Delhi vs Turkey Comparison"
      subtitle="Compare hair transplant cost, travel, quality, and aftercare in Delhi vs Turkey"
      icon={Globe}
      defaultLayout="comparison"
      formData={formData}
      updateField={updateField}
    />
  );
}
