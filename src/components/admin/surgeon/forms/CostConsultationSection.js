"use client";

export default function CostConsultationSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const section = formData.costConsultation || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">
        Cost &amp; Consultation Section
      </h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={section.badge?.text || ""}
            onChange={(e) => updateField("costConsultation.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Pricing"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={section.heading || ""}
            onChange={(e) => updateField("costConsultation.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Section heading"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={section.description || ""}
          onChange={(e) => updateField("costConsultation.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Disclaimer</label>
        <textarea
          rows={2}
          value={section.disclaimer || ""}
          onChange={(e) => updateField("costConsultation.disclaimer", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="e.g. Prices vary based on graft count..."
        />
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() =>
            addItem("costConsultation.items", {
              label: "",
              value: "",
              icon: "",
              displayOrder: 0,
              active: true,
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Cost Item
        </button>

        {(section.items || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No cost items added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(section.items || []).map((item, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Item {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("costConsultation.items", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Label</label>
                    <input
                      type="text"
                      value={item.label || ""}
                      onChange={(e) =>
                        updateArrayItem("costConsultation.items", i, "label", e.target.value)
                      }
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. FUE (2000 grafts)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Value</label>
                    <input
                      type="text"
                      value={item.value || ""}
                      onChange={(e) =>
                        updateArrayItem("costConsultation.items", i, "value", e.target.value)
                      }
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. ₹60,000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Icon</label>
                    <input
                      type="text"
                      value={item.icon || ""}
                      onChange={(e) =>
                        updateArrayItem("costConsultation.items", i, "icon", e.target.value)
                      }
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Emoji or icon"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Display Order</label>
                    <input
                      type="number"
                      value={item.displayOrder ?? 0}
                      onChange={(e) =>
                        updateArrayItem("costConsultation.items", i, "displayOrder", parseInt(e.target.value) || 0)
                      }
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
