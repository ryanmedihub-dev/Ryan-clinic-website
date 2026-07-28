"use client";

export default function ComparisonSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const comparison = formData.comparison || {};

  const renderCardEditor = (cardKey, label, defaultVariant) => {
    const card = comparison[cardKey] || {};
    const path = `comparison.${cardKey}`;

    return (
      <div className="border rounded-xl p-5 bg-white space-y-4">
        <h4 className="text-base font-bold text-gray-700">{label}</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Card Badge</label>
            <input
              type="text"
              value={card.badge || ""}
              onChange={(e) => updateField(`${path}.badge`, e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="e.g. ✓ Surgeon-Led"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Card Title</label>
            <input
              type="text"
              value={card.title || ""}
              onChange={(e) => updateField(`${path}.title`, e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Footer Text</label>
            <input
              type="text"
              value={card.footer || ""}
              onChange={(e) => updateField(`${path}.footer`, e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="e.g. What you actually get"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Button Text</label>
            <input
              type="text"
              value={card.button?.text || ""}
              onChange={(e) => updateField(`${path}.button.text`, e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Button Link</label>
            <input
              type="text"
              value={card.button?.link || ""}
              onChange={(e) => updateField(`${path}.button.link`, e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Button Variant</label>
            <select
              value={card.button?.variant || defaultVariant}
              onChange={(e) => updateField(`${path}.button.variant`, e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm bg-white"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
        </div>

        {/* Items List */}
        <div>
          <button
            type="button"
            onClick={() => addItem(`${path}.items`, { text: "" })}
            className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-3 transition font-semibold text-xs cursor-pointer"
          >
            + Add List Item
          </button>
          {(card.items || []).length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">No items added yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {(card.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.text || ""}
                    onChange={(e) => updateArrayItem(`${path}.items`, idx, "text", e.target.value)}
                    className="flex-1 p-2 border rounded-md text-sm"
                    placeholder="e.g. Surgeon performs all extractions"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(`${path}.items`, idx)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Surgeon vs Technician Comparison</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={comparison.badge?.text || ""}
            onChange={(e) => updateField("comparison.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Surgeon vs Technician"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={comparison.heading || ""}
            onChange={(e) => updateField("comparison.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={2}
          value={comparison.description || ""}
          onChange={(e) => updateField("comparison.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {renderCardEditor("surgeonCard", "✅ Surgeon Card", "primary")}
        {renderCardEditor("technicianCard", "⚠️ Technician Card", "secondary")}
      </div>
    </div>
  );
}
