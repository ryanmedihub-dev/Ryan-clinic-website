"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function SEOSection({ formData, updateField, errors = {} }) {
  const seo = formData.seo || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Meta Details</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Meta Title *</label>
          <input
            type="text"
            value={seo.metaTitle || ""}
            onChange={(e) => updateField("seo.metaTitle", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Meta Title"
            required
          />
          {errors["seo.metaTitle"] && <p className="text-xs text-red-500 mt-1">{errors["seo.metaTitle"]}</p>}
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Meta Description *</label>
          <textarea
            rows={4}
            value={seo.metaDescription || ""}
            onChange={(e) => updateField("seo.metaDescription", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Meta Description"
            required
          />
          {errors["seo.metaDescription"] && <p className="text-xs text-red-500 mt-1">{errors["seo.metaDescription"]}</p>}
        </div>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Keywords</label>
          <input
            type="text"
            value={Array.isArray(seo.keywords) ? seo.keywords.join(", ") : seo.keywords || ""}
            onChange={(e) =>
              updateField(
                "seo.keywords",
                e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
              )
            }
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="hair transplant, FUE, hair loss clinic"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Canonical URL</label>
          <input
            type="text"
            value={seo.canonical || ""}
            onChange={(e) => updateField("seo.canonical", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://ryanclinic.in/..."
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Robots</label>
          <input
            type="text"
            value={seo.robots || "index,follow"}
            onChange={(e) => updateField("seo.robots", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="index,follow"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OG Share Image</label>
        <ImageUploader
          initialImage={seo.ogImage || ""}
          onUpload={(url) => updateField("seo.ogImage", url)}
        />
      </div>
    </div>
  );
}
