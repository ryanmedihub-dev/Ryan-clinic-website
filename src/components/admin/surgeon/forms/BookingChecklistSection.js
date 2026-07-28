"use client";

export default function BookingChecklistSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const bookingChecklist = formData.bookingChecklist || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Booking Checklist Section</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={bookingChecklist.badge?.text || ""}
            onChange={(e) => updateField("bookingChecklist.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Before You Book"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={bookingChecklist.heading || ""}
            onChange={(e) => updateField("bookingChecklist.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={bookingChecklist.description || ""}
          onChange={(e) => updateField("bookingChecklist.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Questions */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("bookingChecklist.questions", { text: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Checklist Question
        </button>

        {(bookingChecklist.questions || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No questions added yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(bookingChecklist.questions || []).map((q, i) => (
              <div key={i} className="flex items-center gap-3 border rounded-xl p-3 bg-white">
                <span className="text-xs font-bold text-gray-400 shrink-0 w-5">{i + 1}.</span>
                <input
                  type="text"
                  value={q.text || ""}
                  onChange={(e) => updateArrayItem("bookingChecklist.questions", i, "text", e.target.value)}
                  className="flex-1 p-2 border rounded-md text-sm"
                  placeholder="e.g. Will the surgeon personally perform the extraction?"
                />
                <button
                  type="button"
                  onClick={() => removeItem("bookingChecklist.questions", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Warning Box */}
      <div className="mt-6 border rounded-xl p-5 bg-red-50 space-y-4">
        <h4 className="text-base font-bold text-gray-700">⚠️ Warning Box</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Icon (name or emoji)</label>
            <input
              type="text"
              value={bookingChecklist.warningBox?.icon || ""}
              onChange={(e) => updateField("bookingChecklist.warningBox.icon", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
              placeholder="AlertTriangle"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={bookingChecklist.warningBox?.title || ""}
              onChange={(e) => updateField("bookingChecklist.warningBox.title", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Description</label>
            <input
              type="text"
              value={bookingChecklist.warningBox?.description || ""}
              onChange={(e) => updateField("bookingChecklist.warningBox.description", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
