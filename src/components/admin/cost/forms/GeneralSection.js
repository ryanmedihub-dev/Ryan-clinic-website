"use client";

import { Settings2 } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls } from "../shared/CostFormUI";

export default function GeneralSection({ formData, updateField, errors = {} }) {
  return (
    <SectionCard
      icon={Settings2}
      title="1. General Information & Page Type"
      subtitle="Basic page settings, URL slug, treatment classification and publish status"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <Field label="Page Title" required error={errors.title} className="md:col-span-6">
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Hair Transplant Cost in Delhi"
            className={inputCls}
            required
          />
        </Field>

        <Field label="Page Type" required className="md:col-span-3">
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

        <Field label="Status" className="md:col-span-3">
          <select
            value={formData.settings?.status || "draft"}
            onChange={(e) => updateField("settings.status", e.target.value)}
            className={inputCls}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <Field label="Slug (URL)" required error={errors.slug} className="flex-1">
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

        <div className="ml-6 flex items-center pt-3">
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50/80 hover:bg-gray-100/80 cursor-pointer select-none transition-colors">
            <input
              type="checkbox"
              checked={!!formData.settings?.featured}
              onChange={(e) => updateField("settings.featured", e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
            />
            <div>
              <span className="text-xs font-bold text-gray-900 block">Featured Page</span>
              <span className="text-[11px] text-gray-500">Shows "Popular" badge on /cost list</span>
            </div>
          </label>
        </div>
      </div>
    </SectionCard>
  );
}

