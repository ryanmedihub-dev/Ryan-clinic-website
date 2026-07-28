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
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Hero / Banner Section</h3>

      {/* Badge + Title */}
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={hero.badge?.text || ""}
            onChange={(e) => updateField("hero.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Expert Surgeon"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Hero Title</label>
          <input
            type="text"
            value={hero.title || ""}
            onChange={(e) => updateField("hero.title", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Hero Title"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700">Hero Description</label>
        <textarea
          rows={3}
          value={hero.description || ""}
          onChange={(e) => updateField("hero.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief description shown below the hero title"
        />
      </div>

      {/* Feature Pills */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("hero.featurePills", { text: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Feature Pill
        </button>

        {(hero.featurePills || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No feature pills added yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(hero.featurePills || []).map((pill, i) => (
              <div key={i} className="flex items-center gap-3 border rounded-xl p-3 bg-white">
                <input
                  type="text"
                  value={pill.text || ""}
                  onChange={(e) => updateArrayItem("hero.featurePills", i, "text", e.target.value)}
                  className="flex-1 p-2 border rounded-md text-sm"
                  placeholder="e.g. ISHRS Certified"
                />
                <button
                  type="button"
                  onClick={() => removeItem("hero.featurePills", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
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
                      placeholder="e.g. 7500+"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Label</label>
                    <input
                      type="text"
                      value={stat.label || ""}
                      onChange={(e) => updateArrayItem("hero.stats", i, "label", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Procedures Done"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hero Buttons */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("hero.buttons", { text: "", link: "", variant: "primary" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Hero Button
        </button>

        {(hero.buttons || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No buttons added yet.</p>
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

      {/* Doctor Card */}
      <div className="mt-6 border rounded-xl p-5 bg-gray-50 space-y-4">
        <h4 className="text-lg font-bold text-gray-700">Doctor Card (Hero)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Doctor Name</label>
            <input
              type="text"
              value={hero.doctorCard?.doctorName || ""}
              onChange={(e) => updateField("hero.doctorCard.doctorName", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="Dr. Aman Singh Gosain"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Qualification</label>
            <input
              type="text"
              value={hero.doctorCard?.qualification || ""}
              onChange={(e) => updateField("hero.doctorCard.qualification", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="MBBS, MS, MCh"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Designation</label>
            <input
              type="text"
              value={hero.doctorCard?.designation || ""}
              onChange={(e) => updateField("hero.doctorCard.designation", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="Lead Hair Transplant Surgeon"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Experience</label>
            <input
              type="text"
              value={hero.doctorCard?.experience || ""}
              onChange={(e) => updateField("hero.doctorCard.experience", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="12+ Years"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Doctor Card Image</label>
          <ImageUploader
            initialImage={hero.doctorCard?.image?.url || ""}
            onUpload={(url) => updateField("hero.doctorCard.image.url", url)}
          />
          <input
            type="text"
            value={hero.doctorCard?.image?.alt || ""}
            onChange={(e) => updateField("hero.doctorCard.image.alt", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md text-sm"
            placeholder="Image Alt Text"
          />
        </div>
      </div>
    </div>
  );
}
