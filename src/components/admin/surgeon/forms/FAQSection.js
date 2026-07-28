"use client";

export default function FAQSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const faq = formData.faq || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">FAQ Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={faq.badge?.text || ""}
            onChange={(e) => updateField("faq.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Frequently Asked Questions"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={faq.heading || ""}
            onChange={(e) => updateField("faq.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={2}
          value={faq.description || ""}
          onChange={(e) => updateField("faq.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* FAQ Items */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("faq.faqs", {
            question: "",
            answer: "",
            displayOrder: 0,
            active: true,
          })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add FAQ
        </button>

        {(faq.faqs || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No FAQs added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(faq.faqs || []).map((item, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">FAQ {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("faq.faqs", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Question *</label>
                    <input
                      type="text"
                      value={item.question || ""}
                      onChange={(e) => updateArrayItem("faq.faqs", i, "question", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Will the surgeon personally perform the procedure?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Answer *</label>
                    <textarea
                      rows={4}
                      value={item.answer || ""}
                      onChange={(e) => updateArrayItem("faq.faqs", i, "answer", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Write the full FAQ answer here…"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <label className="block text-xs font-semibold text-gray-700">Display Order</label>
                      <input
                        type="number"
                        value={item.displayOrder ?? 0}
                        onChange={(e) => updateArrayItem("faq.faqs", i, "displayOrder", parseInt(e.target.value) || 0)}
                        className="w-full mt-1 p-2 border rounded-md text-sm"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer select-none mt-4">
                      <input
                        type="checkbox"
                        checked={item.active !== false}
                        onChange={(e) => updateArrayItem("faq.faqs", i, "active", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-xs font-semibold text-gray-700">Active</span>
                    </label>
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
