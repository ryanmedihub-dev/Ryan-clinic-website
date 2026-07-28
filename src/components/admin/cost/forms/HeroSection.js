"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function HeroSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const hero = formData.hero || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Banner Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Banner Title</label>
          <input
            type="text"
            value={hero.title || ""}
            onChange={(e) => updateField("hero.title", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Banner Title"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Pricing Highlight Line</label>
          <input
            type="text"
            value={hero.pricingLine || ""}
            onChange={(e) => updateField("hero.pricingLine", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Starting from ₹35 per Graft"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700">Breadcrumb</label>
        <input
          type="text"
          value={Array.isArray(hero.breadcrumbs) ? hero.breadcrumbs.join(", ") : hero.breadcrumbs || ""}
          onChange={(e) =>
            updateField(
              "hero.breadcrumbs",
              e.target.value.split(",").map((b) => b.trim()).filter(Boolean)
            )
          }
          className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Home > Cost > Hair Transplant"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Banner Image</label>
        <ImageUploader
          initialImage={hero.heroImage || ""}
          onUpload={(url) => updateField("hero.heroImage", url)}
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700">Banner Image Alt</label>
        <input
          type="text"
          value={hero.heroImageAlt || ""}
          onChange={(e) => updateField("hero.heroImageAlt", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter Banner Image Alt"
        />
      </div>

      {/* Hero Stats */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("hero.stats", { value: "", label: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Hero Stat
        </button>

        {(hero.stats || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No hero stats added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(hero.stats || []).map((stat, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Stat {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("hero.stats", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Value</label>
                    <input
                      type="text"
                      value={stat.value || ""}
                      onChange={(e) => updateArrayItem("hero.stats", i, "value", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. 15k+"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Label</label>
                    <input
                      type="text"
                      value={stat.label || ""}
                      onChange={(e) => updateArrayItem("hero.stats", i, "label", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Happy Patients"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("hero.buttons", { text: "", link: "", variant: "primary" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Action Button
        </button>

        {(hero.buttons || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No action buttons added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(hero.buttons || []).map((btn, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Button {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("hero.buttons", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Text</label>
                    <input
                      type="text"
                      value={btn.text || ""}
                      onChange={(e) => updateArrayItem("hero.buttons", i, "text", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Button Text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Link</label>
                    <input
                      type="text"
                      value={btn.link || ""}
                      onChange={(e) => updateArrayItem("hero.buttons", i, "link", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="/contact"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Variant</label>
                    <select
                      value={btn.variant || "primary"}
                      onChange={(e) => updateArrayItem("hero.buttons", i, "variant", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm bg-white"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                    </select>
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
