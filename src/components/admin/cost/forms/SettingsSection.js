"use client";

import { Settings } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls } from "../shared/CostFormUI";

export default function SettingsSection({ formData, updateField }) {
  const settings = formData.settings || {};

  return (
    <SectionCard
      icon={Settings}
      title="22. Settings & Publish Status"
      subtitle="Publish status, indexation controls, sitemap settings and featured status"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Field label="Publish Status">
          <select
            value={settings.status || "draft"}
            onChange={(e) => updateField("settings.status", e.target.value)}
            className={`${inputCls} font-semibold`}
          >
            <option value="draft">Draft (Private)</option>
            <option value="published">Published (Live)</option>
          </select>
        </Field>

        <Field label="Display Order">
          <input
            type="number"
            value={settings.displayOrder ?? 0}
            onChange={(e) => updateField("settings.displayOrder", parseInt(e.target.value) || 0)}
            className={inputCls}
          />
        </Field>

        <Field label="Featured Page" className="flex items-center pt-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!settings.featured}
              onChange={(e) => updateField("settings.featured", e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
            />
            <div>
              <span className="text-xs font-bold text-gray-900 block">Featured Page</span>
              <span className="text-[11px] text-gray-500">Show popular badge in lists</span>
            </div>
          </label>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-gray-100 mt-3">
        <Field label="Search Indexing">
          <label className="flex items-center gap-2 cursor-pointer select-none mt-2">
            <input
              type="checkbox"
              checked={settings.allowIndexing !== false}
              onChange={(e) => updateField("settings.allowIndexing", e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
            />
            <span className="text-xs font-semibold text-gray-700">Allow search engine indexing (index, follow)</span>
          </label>
        </Field>

        <Field label="Sitemap Inclusion">
          <label className="flex items-center gap-2 cursor-pointer select-none mt-2">
            <input
              type="checkbox"
              checked={settings.showInSitemap !== false}
              onChange={(e) => updateField("settings.showInSitemap", e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
            />
            <span className="text-xs font-semibold text-gray-700">Include URL in sitemap.xml</span>
          </label>
        </Field>
      </div>
    </SectionCard>
  );
}
