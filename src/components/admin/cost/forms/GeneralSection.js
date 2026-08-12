"use client";

import { Settings2 } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls } from "../shared/CostFormUI";

export default function GeneralSection({ formData, updateField, errors = {} }) {
  return (
    <SectionCard
      icon={Settings2}
      title="1. General Information & Page Type"
      subtitle="Basic page title, URL slug, and treatment classification"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <Field label="Page Title" required error={errors.title} className="md:col-span-8">
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Hair Transplant Cost in Delhi"
            className={inputCls}
            required
          />
        </Field>

        <Field label="Page Type" required className="md:col-span-4">
          <select
            value={formData.pageType || "hair-transplant"}
            onChange={(e) => updateField("pageType", e.target.value)}
            className={`${inputCls} font-semibold`}
          >
            <option value="hair-transplant">Hair Transplant Cost</option>
            <option value="prp">PRP Hair Treatment Cost</option>
            <option value="dhi">DHI Treatment Cost</option>
            <option value="beard-transplant">Beard Transplant Cost</option>
            <option value="other">Other Treatment Cost</option>
          </select>
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 mt-2">
        <Field label="Slug (URL)" required error={errors.slug}>
          <input
            type="text"
            value={formData.slug || ""}
            onChange={(e) => updateField("slug", e.target.value)}
            className={`${inputCls} font-mono text-indigo-600 font-semibold`}
            placeholder="auto-generated from page title"
            required
          />
          {formData.slug && (
            <p className="text-xs text-gray-400 mt-1.5 font-sans">
              Public URL preview: <span className="text-indigo-600 font-mono font-semibold">/cost/{formData.slug}</span>
            </p>
          )}
        </Field>
      </div>
    </SectionCard>
  );
}

