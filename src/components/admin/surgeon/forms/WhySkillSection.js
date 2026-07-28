"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function WhySkillSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const whySkill = formData.whySkill || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Why Skill Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={whySkill.badge?.text || ""}
            onChange={(e) => updateField("whySkill.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Why Skill Matters"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={whySkill.heading || ""}
            onChange={(e) => updateField("whySkill.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Section heading"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={whySkill.description || ""}
          onChange={(e) => updateField("whySkill.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="Section description"
        />
      </div>

      {/* Highlight Box */}
      <div className="border rounded-xl p-4 bg-yellow-50 space-y-3">
        <h4 className="font-bold text-sm text-gray-700">Highlight Box</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={whySkill.highlightBox?.title || ""}
              onChange={(e) => updateField("whySkill.highlightBox.title", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Description</label>
            <input
              type="text"
              value={whySkill.highlightBox?.description || ""}
              onChange={(e) => updateField("whySkill.highlightBox.description", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Icon (name or emoji)</label>
            <input
              type="text"
              value={whySkill.highlightBox?.icon || ""}
              onChange={(e) => updateField("whySkill.highlightBox.icon", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="e.g. Shield"
            />
          </div>
        </div>
      </div>

      {/* Skill Cards */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("whySkill.cards", {
            image: { url: "", alt: "" },
            number: "",
            title: "",
            description: "",
            button: { text: "", link: "", variant: "primary" },
            displayOrder: 0,
            active: true,
          })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Skill Card
        </button>

        {(whySkill.cards || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No skill cards added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(whySkill.cards || []).map((card, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Card {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("whySkill.cards", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Number/Step</label>
                    <input
                      type="text"
                      value={card.number || ""}
                      onChange={(e) => updateArrayItem("whySkill.cards", i, "number", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Title</label>
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(e) => updateArrayItem("whySkill.cards", i, "title", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Card title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700">Description</label>
                    <textarea
                      rows={2}
                      value={card.description || ""}
                      onChange={(e) => updateArrayItem("whySkill.cards", i, "description", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Button Text</label>
                    <input
                      type="text"
                      value={card.button?.text || ""}
                      onChange={(e) => updateArrayItem("whySkill.cards", i, { ...card, button: { ...card.button, text: e.target.value } })}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Button Link</label>
                    <input
                      type="text"
                      value={card.button?.link || ""}
                      onChange={(e) => updateArrayItem("whySkill.cards", i, { ...card, button: { ...card.button, link: e.target.value } })}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Display Order</label>
                    <input
                      type="number"
                      value={card.displayOrder ?? 0}
                      onChange={(e) => updateArrayItem("whySkill.cards", i, "displayOrder", parseInt(e.target.value) || 0)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Card Image</label>
                  <ImageUploader
                    initialImage={card.image?.url || ""}
                    onUpload={(url) => updateArrayItem("whySkill.cards", i, { ...card, image: { url, alt: card.image?.alt || "" } })}
                  />
                  <input
                    type="text"
                    value={card.image?.alt || ""}
                    onChange={(e) => updateArrayItem("whySkill.cards", i, { ...card, image: { url: card.image?.url || "", alt: e.target.value } })}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="Image alt text"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
