"use client";

export default function GeneralSection({ formData, updateField, errors = {} }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mb-5">General Info</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">
            Page Title *
          </label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Hair Transplant Surgeon in Delhi"
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Status</label>
          <select
            value={formData.settings?.status || "draft"}
            onChange={(e) => updateField("settings.status", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700">Slug (URL) *</label>
        <input
          type="text"
          value={formData.slug || ""}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md font-mono focus:ring-blue-500 focus:border-blue-500"
          placeholder="auto-generated from title"
          required
        />
        {formData.slug && (
          <p className="text-xs text-gray-400 mt-1">
            URL preview: <span className="text-blue-600 font-mono">/{formData.slug}</span>
          </p>
        )}
        {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
      </div>

      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700">Short Description</label>
        <textarea
          rows={3}
          value={formData.general?.shortDescription || ""}
          onChange={(e) => updateField("general.shortDescription", e.target.value)}
          placeholder="Brief description of this surgeon page"
          className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Display Order</label>
          <input
            type="number"
            value={formData.settings?.displayOrder ?? 0}
            onChange={(e) => updateField("settings.displayOrder", parseInt(e.target.value) || 0)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full flex flex-col justify-end gap-3 pb-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!formData.settings?.featured}
              onChange={(e) => updateField("settings.featured", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm font-semibold text-gray-700">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.settings?.showInSitemap !== false}
              onChange={(e) => updateField("settings.showInSitemap", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm font-semibold text-gray-700">Show in Sitemap</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.settings?.allowIndexing !== false}
              onChange={(e) => updateField("settings.allowIndexing", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm font-semibold text-gray-700">Allow Indexing</span>
          </label>
        </div>
      </div>
    </div>
  );
}
