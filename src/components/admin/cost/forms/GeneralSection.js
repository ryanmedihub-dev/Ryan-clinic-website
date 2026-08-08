"use client";

export default function GeneralSection({ formData, updateField, errors = {} }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mb-5">General Info</h3>
      
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-semibold text-gray-700">
            Page Title *
          </label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Hair Transplant Cost in Delhi"
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div className="w-full md:w-1/4">
          <label className="block text-sm font-semibold text-gray-700">Page Type *</label>
          <select
            value={formData.pageType || "hair-transplant"}
            onChange={(e) => updateField("pageType", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 font-semibold"
          >
            <option value="hair-transplant">Hair Transplant Cost</option>
            <option value="prp">PRP Hair Treatment Cost</option>
            <option value="dhi">DHI Treatment Cost</option>
            <option value="beard-transplant">Beard Transplant Cost</option>
            <option value="other">Other Treatment Cost</option>
          </select>
        </div>

        <div className="w-full md:w-1/4">
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
        <label className="block text-sm font-semibold text-gray-700">
          Slug (URL) *
        </label>
        <input
          type="text"
          value={formData.slug || ""}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md font-mono focus:ring-blue-500 focus:border-blue-500"
          placeholder="auto-generated from page title"
          required
        />
        {formData.slug && (
          <p className="text-xs text-gray-400 mt-1">
            URL preview: <span className="text-blue-600 font-mono">/{formData.slug}</span>
          </p>
        )}
        {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
      </div>
    </div>
  );
}
