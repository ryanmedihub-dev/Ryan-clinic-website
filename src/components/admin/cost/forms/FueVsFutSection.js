"use client";

import { Scale } from "lucide-react";
import SpecificContentSection from "./SpecificContentSection";

export default function FueVsFutSection({ formData, updateField }) {
  return (
    <SpecificContentSection
      targetKey="fue-vs-fut"
      sectionNumber={11}
      title="FUE VS FUT Comparison"
      subtitle="Detailed comparison between FUE and FUT hair transplant techniques and pricing"
      icon={Scale}
      defaultLayout="comparison"
      formData={formData}
      updateField={updateField}
    />
  );
}
