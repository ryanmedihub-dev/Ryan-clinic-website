"use client";

export default function IncludedSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const included = formData.includedSection || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">What&apos;s Included in the Price</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={included.badge || ""}
            onChange={(e) => updateField("includedSection.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. All-Inclusive Package"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={included.heading || ""}
            onChange={(e) => updateField("includedSection.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Everything Included In Our Price"
          />
        </div>
      </div>

      {/* Included Items */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("includedSection.items", { icon: "", title: "", description: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Included Item
        </button>

        {(included.items || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <p className="text-gray-500 text-sm">No included items added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(included.items || []).map((item, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Item {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("includedSection.items", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Icon / Emoji</label>
                    <input
                      type="text"
                      value={item.icon || ""}
                      onChange={(e) => updateArrayItem("includedSection.items", i, "icon", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="✓"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Title</label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => updateArrayItem("includedSection.items", i, "title", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Pre-op Blood Tests"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Description</label>
                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) => updateArrayItem("includedSection.items", i, "description", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Short description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Disclosures */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => addItem("includedSection.disclosures", { text: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Disclosure Note
        </button>

        {(included.disclosures || []).map((d, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              type="text"
              value={d.text || ""}
              onChange={(e) => updateArrayItem("includedSection.disclosures", i, "text", e.target.value)}
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="e.g. No hidden charges at Ryan Clinic"
            />
            <button
              type="button"
              onClick={() => removeItem("includedSection.disclosures", i)}
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
