"use client";

import { Save, CheckCircle2, Clock } from "lucide-react";
import FormActions from "@/components/admin/shared/FormActions";

export default function PublishSidebar({
  formData,
  setFormData,
  updateField,
  onSave,
  submitting,
  isEdit = false,
  onDelete,
}) {
  const isPublished = formData.settings?.status === "published";

  const handleStatusChange = (status) => {
    if (updateField) {
      updateField("settings.status", status);
    } else {
      setFormData((prev) => ({
        ...prev,
        settings: { ...prev.settings, status },
      }));
    }
  };

  const handleSettingToggle = (field, val) => {
    if (updateField) {
      updateField(`settings.${field}`, val);
    } else {
      setFormData((prev) => ({
        ...prev,
        settings: { ...prev.settings, [field]: val },
      }));
    }
  };

  return (
    <div className="space-y-6 sticky top-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Sidebar Header */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Save className="w-4 h-4 text-blue-600" />
            Publication Settings
          </h3>
          <span
            className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider ${
              isPublished
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {formData.settings?.status || "draft"}
          </span>
        </div>

        <div className="p-5 space-y-4">
          {/* Status Select Buttons */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange("draft")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isPublished
                    ? "bg-amber-50 text-amber-800 border-amber-300 shadow-2xs"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Draft
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("published")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Published
              </button>
            </div>
          </div>

          {/* Visibility & Indexing Toggles */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="flex items-center justify-between text-xs font-medium text-gray-700 cursor-pointer">
              <span>Featured Page</span>
              <input
                type="checkbox"
                checked={!!formData.settings?.featured}
                onChange={(e) => handleSettingToggle("featured", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between text-xs font-medium text-gray-700 cursor-pointer">
              <span>Include in Sitemap</span>
              <input
                type="checkbox"
                checked={formData.settings?.showInSitemap !== false}
                onChange={(e) => handleSettingToggle("showInSitemap", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between text-xs font-medium text-gray-700 cursor-pointer">
              <span>Allow Search Indexing</span>
              <input
                type="checkbox"
                checked={formData.settings?.allowIndexing !== false}
                onChange={(e) => handleSettingToggle("allowIndexing", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>

          {/* Display Order */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={formData.settings?.displayOrder ?? 0}
              onChange={(e) => handleSettingToggle("displayOrder", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Separated Form Actions Component */}
          <div className="pt-3 border-t border-gray-100">
            <FormActions
              onSave={onSave}
              submitting={submitting}
              isEdit={isEdit}
              slug={formData.slug}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
