"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function LeadSurgeonSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const leadSurgeon = formData.leadSurgeon || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Section 1: Lead Surgeon (Top Hero Section)</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={leadSurgeon.badge?.text || ""}
            onChange={(e) => updateField("leadSurgeon.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Meet the Surgeon"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={leadSurgeon.heading || ""}
            onChange={(e) => updateField("leadSurgeon.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={4}
          value={leadSurgeon.description || ""}
          onChange={(e) => updateField("leadSurgeon.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Doctor Image */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor Main Image</label>
        <ImageUploader
          initialImage={leadSurgeon.doctorImage?.url || ""}
          onUpload={(url) => updateField("leadSurgeon.doctorImage.url", url)}
        />
        <input
          type="text"
          value={leadSurgeon.doctorImage?.alt || ""}
          onChange={(e) => updateField("leadSurgeon.doctorImage.alt", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md text-sm"
          placeholder="Doctor Image Alt Text"
        />
      </div>

      {/* Qualifications */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("leadSurgeon.qualifications", { icon: "", text: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Qualification
        </button>
        {(leadSurgeon.qualifications || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No qualifications added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(leadSurgeon.qualifications || []).map((q, i) => (
              <div key={i} className="border rounded-xl p-3 bg-white flex gap-3 items-end">
                <div className="w-32">
                  <label className="block text-xs font-semibold text-gray-700">Icon</label>
                  <input
                    type="text"
                    value={q.icon || ""}
                    onChange={(e) => updateArrayItem("leadSurgeon.qualifications", i, "icon", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="🏥"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Text</label>
                  <input
                    type="text"
                    value={q.text || ""}
                    onChange={(e) => updateArrayItem("leadSurgeon.qualifications", i, "text", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="MBBS, MS, MCh (Plastic Surgery)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem("leadSurgeon.qualifications", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition cursor-pointer shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("leadSurgeon.stats", { value: "", label: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Stat
        </button>
        {(leadSurgeon.stats || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No stats added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(leadSurgeon.stats || []).map((stat, i) => (
              <div key={i} className="border rounded-xl p-3 bg-white flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Value</label>
                  <input
                    type="text"
                    value={stat.value || ""}
                    onChange={(e) => updateArrayItem("leadSurgeon.stats", i, "value", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="7500+"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Label</label>
                  <input
                    type="text"
                    value={stat.label || ""}
                    onChange={(e) => updateArrayItem("leadSurgeon.stats", i, "label", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="Procedures Done"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem("leadSurgeon.stats", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition cursor-pointer shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("leadSurgeon.buttons", { text: "", link: "", variant: "primary" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Button
        </button>
        {(leadSurgeon.buttons || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No buttons added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(leadSurgeon.buttons || []).map((btn, i) => (
              <div key={i} className="border rounded-xl p-3 bg-white flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Text</label>
                  <input
                    type="text"
                    value={btn.text || ""}
                    onChange={(e) => updateArrayItem("leadSurgeon.buttons", i, "text", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Link</label>
                  <input
                    type="text"
                    value={btn.link || ""}
                    onChange={(e) => updateArrayItem("leadSurgeon.buttons", i, "link", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-xs font-semibold text-gray-700">Variant</label>
                  <select
                    value={btn.variant || "primary"}
                    onChange={(e) => updateArrayItem("leadSurgeon.buttons", i, "variant", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm bg-white"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem("leadSurgeon.buttons", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition cursor-pointer shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("leadSurgeon.gallery", { image: { url: "", alt: "" }, caption: "", displayOrder: 0 })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Gallery Image
        </button>
        {(leadSurgeon.gallery || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No gallery images added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(leadSurgeon.gallery || []).map((gItem, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Gallery Image {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("leadSurgeon.gallery", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <ImageUploader
                  initialImage={gItem.image?.url || ""}
                  onUpload={(url) => updateArrayItem("leadSurgeon.gallery", i, { ...gItem, image: { url, alt: gItem.image?.alt || "" } })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Alt Text</label>
                    <input
                      type="text"
                      value={gItem.image?.alt || ""}
                      onChange={(e) => updateArrayItem("leadSurgeon.gallery", i, { ...gItem, image: { url: gItem.image?.url || "", alt: e.target.value } })}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Caption</label>
                    <input
                      type="text"
                      value={gItem.caption || ""}
                      onChange={(e) => updateArrayItem("leadSurgeon.gallery", i, "caption", e.target.value)}
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
