"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export default function SurgeonRoleSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const surgeonRole = formData.surgeonRole || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Surgeon Role / Timeline Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={surgeonRole.badge?.text || ""}
            onChange={(e) => updateField("surgeonRole.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. The Surgeon's Role"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={surgeonRole.heading || ""}
            onChange={(e) => updateField("surgeonRole.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={surgeonRole.description || ""}
          onChange={(e) => updateField("surgeonRole.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Timeline Steps */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("surgeonRole.steps", {
            stepNumber: "",
            title: "",
            description: "",
            image: { url: "", alt: "" },
            displayOrder: 0,
            active: true,
          })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Timeline Step
        </button>

        {(surgeonRole.steps || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No timeline steps added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(surgeonRole.steps || []).map((step, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Step {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("surgeonRole.steps", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Step Number</label>
                    <input
                      type="text"
                      value={step.stepNumber || ""}
                      onChange={(e) => updateArrayItem("surgeonRole.steps", i, "stepNumber", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Title</label>
                    <input
                      type="text"
                      value={step.title || ""}
                      onChange={(e) => updateArrayItem("surgeonRole.steps", i, "title", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Display Order</label>
                    <input
                      type="number"
                      value={step.displayOrder ?? 0}
                      onChange={(e) => updateArrayItem("surgeonRole.steps", i, "displayOrder", parseInt(e.target.value) || 0)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-gray-700">Description</label>
                    <textarea
                      rows={2}
                      value={step.description || ""}
                      onChange={(e) => updateArrayItem("surgeonRole.steps", i, "description", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Step Image</label>
                  <ImageUploader
                    initialImage={step.image?.url || ""}
                    onUpload={(url) => updateArrayItem("surgeonRole.steps", i, { ...step, image: { url, alt: step.image?.alt || "" } })}
                  />
                  <input
                    type="text"
                    value={step.image?.alt || ""}
                    onChange={(e) => updateArrayItem("surgeonRole.steps", i, { ...step, image: { url: step.image?.url || "", alt: e.target.value } })}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="Image alt text"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 border rounded-xl p-5 bg-blue-50 space-y-4">
        <h4 className="text-lg font-bold text-gray-700">Bottom CTA</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700">CTA Title</label>
            <input
              type="text"
              value={surgeonRole.bottomCTA?.title || ""}
              onChange={(e) => updateField("surgeonRole.bottomCTA.title", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">CTA Description</label>
            <input
              type="text"
              value={surgeonRole.bottomCTA?.description || ""}
              onChange={(e) => updateField("surgeonRole.bottomCTA.description", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Button Text</label>
            <input
              type="text"
              value={surgeonRole.bottomCTA?.button?.text || ""}
              onChange={(e) => updateField("surgeonRole.bottomCTA.button.text", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Button Link</label>
            <input
              type="text"
              value={surgeonRole.bottomCTA?.button?.link || ""}
              onChange={(e) => updateField("surgeonRole.bottomCTA.button.link", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
