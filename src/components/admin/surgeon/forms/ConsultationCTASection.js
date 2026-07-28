"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function ConsultationCTASection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const cta = formData.consultationCTA || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Consultation CTA Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={cta.badge?.text || ""}
            onChange={(e) => updateField("consultationCTA.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Book a Free Consultation"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={cta.heading || ""}
            onChange={(e) => updateField("consultationCTA.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={cta.description || ""}
          onChange={(e) => updateField("consultationCTA.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* CTA Image */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">CTA Image</label>
        <ImageUploader
          initialImage={cta.image?.url || ""}
          onUpload={(url) => updateField("consultationCTA.image.url", url)}
        />
        <input
          type="text"
          value={cta.image?.alt || ""}
          onChange={(e) => updateField("consultationCTA.image.alt", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md text-sm"
          placeholder="Image Alt Text"
        />
      </div>

      {/* Feature Card */}
      <div className="mt-4 border rounded-xl p-5 bg-blue-50 space-y-3">
        <h4 className="font-bold text-sm text-gray-700">Feature Card</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Icon</label>
            <input
              type="text"
              value={cta.featureCard?.icon || ""}
              onChange={(e) => updateField("consultationCTA.featureCard.icon", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="🏥 or icon name"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={cta.featureCard?.title || ""}
              onChange={(e) => updateField("consultationCTA.featureCard.title", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Description</label>
            <input
              type="text"
              value={cta.featureCard?.description || ""}
              onChange={(e) => updateField("consultationCTA.featureCard.description", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("consultationCTA.stats", { value: "", label: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add CTA Stat
        </button>
        {(cta.stats || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No stats added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(cta.stats || []).map((stat, i) => (
              <div key={i} className="border rounded-xl p-3 bg-white flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Value</label>
                  <input
                    type="text"
                    value={stat.value || ""}
                    onChange={(e) => updateArrayItem("consultationCTA.stats", i, "value", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Label</label>
                  <input
                    type="text"
                    value={stat.label || ""}
                    onChange={(e) => updateArrayItem("consultationCTA.stats", i, "label", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem("consultationCTA.stats", i)}
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
          onClick={() => addItem("consultationCTA.buttons", { text: "", link: "", variant: "primary" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add CTA Button
        </button>
        {(cta.buttons || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No buttons added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(cta.buttons || []).map((btn, i) => (
              <div key={i} className="border rounded-xl p-3 bg-white flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Text</label>
                  <input
                    type="text"
                    value={btn.text || ""}
                    onChange={(e) => updateArrayItem("consultationCTA.buttons", i, "text", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700">Link</label>
                  <input
                    type="text"
                    value={btn.link || ""}
                    onChange={(e) => updateArrayItem("consultationCTA.buttons", i, "link", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-xs font-semibold text-gray-700">Variant</label>
                  <select
                    value={btn.variant || "primary"}
                    onChange={(e) => updateArrayItem("consultationCTA.buttons", i, "variant", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm bg-white"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem("consultationCTA.buttons", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition cursor-pointer shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
