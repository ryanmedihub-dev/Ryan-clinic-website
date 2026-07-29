"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function ConsultationSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const cons = formData.consultation || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Consultation CTA Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge</label>
          <input
            type="text"
            value={cons.badge || ""}
            onChange={(e) => updateField("consultation.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Free Scalp Analysis"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={cons.heading || ""}
            onChange={(e) => updateField("consultation.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Get an Exact Graft Count & Cost Estimate"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={cons.description || ""}
          onChange={(e) => updateField("consultation.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="Book a confidential consultation with our hair restoration specialists..."
        />
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Button Text</label>
          <input
            type="text"
            value={cons.buttonText || "Book Free Consultation"}
            onChange={(e) => updateField("consultation.buttonText", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Button Link</label>
          <input
            type="text"
            value={cons.buttonLink || "https://wa.me/919911111247"}
            onChange={(e) => updateField("consultation.buttonLink", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Section Image</label>
        <ImageUploader
          initialImage={cons.image || ""}
          onUpload={(url) => updateField("consultation.image", url)}
        />
        <input
          type="text"
          value={cons.imageAlt || ""}
          onChange={(e) => updateField("consultation.imageAlt", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="Image Alt Text"
        />
      </div>

      {/* Perks */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("consultation.features", { text: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Consultation Perk
        </button>

        {(cons.features || []).map((feat, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              type="text"
              value={feat.text || ""}
              onChange={(e) => updateArrayItem("consultation.features", i, "text", e.target.value)}
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="e.g. 3D Scalp Micro-Analysis Included"
            />
            <button
              type="button"
              onClick={() => removeItem("consultation.features", i)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
