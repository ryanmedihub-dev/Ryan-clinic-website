"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function WhyClinicSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const whyClinic = formData.whyClinic || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Why Our Clinic Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={whyClinic.badge?.text || ""}
            onChange={(e) => updateField("whyClinic.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Why Choose Ryan Clinic"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={whyClinic.heading || ""}
            onChange={(e) => updateField("whyClinic.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={whyClinic.description || ""}
          onChange={(e) => updateField("whyClinic.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Section Image */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Section Image</label>
        <ImageUploader
          initialImage={whyClinic.image?.url || ""}
          onUpload={(url) => updateField("whyClinic.image.url", url)}
        />
        <input
          type="text"
          value={whyClinic.image?.alt || ""}
          onChange={(e) => updateField("whyClinic.image.alt", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md text-sm"
          placeholder="Image Alt Text"
        />
      </div>

      {/* Stats */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("whyClinic.stats", { value: "", label: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Clinic Stat
        </button>

        {(whyClinic.stats || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No stats added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(whyClinic.stats || []).map((stat, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Value</label>
                  <input
                    type="text"
                    value={stat.value || ""}
                    onChange={(e) => updateArrayItem("whyClinic.stats", i, "value", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="7500+"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Label</label>
                  <input
                    type="text"
                    value={stat.label || ""}
                    onChange={(e) => updateArrayItem("whyClinic.stats", i, "label", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="Procedures Done"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem("whyClinic.stats", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition cursor-pointer shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordions */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("whyClinic.accordions", {
            title: "",
            content: "",
            displayOrder: 0,
            active: true,
          })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Accordion Item
        </button>

        {(whyClinic.accordions || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No accordion items added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(whyClinic.accordions || []).map((acc, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Accordion {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("whyClinic.accordions", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Title</label>
                    <input
                      type="text"
                      value={acc.title || ""}
                      onChange={(e) => updateArrayItem("whyClinic.accordions", i, "title", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Content</label>
                    <textarea
                      rows={3}
                      value={acc.content || ""}
                      onChange={(e) => updateArrayItem("whyClinic.accordions", i, "content", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
