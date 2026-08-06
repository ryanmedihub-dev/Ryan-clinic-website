"use client";

export default function MythsFactsSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const mf = formData.mythsFacts || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Myths vs Facts</h3>
      <p className="text-sm text-gray-500 mb-4">
        Each pair contains a common myth and the corresponding fact. Use only content from the approved marketing brief.
      </p>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={mf.badge || ""}
            onChange={(e) => updateField("mythsFacts.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Common Misconceptions"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={mf.heading || ""}
            onChange={(e) => updateField("mythsFacts.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Myths vs facts about PRP cost in Delhi"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Section Description</label>
        <textarea
          rows={2}
          value={mf.description || ""}
          onChange={(e) => updateField("mythsFacts.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="Optional intro paragraph..."
        />
      </div>

      <button
        type="button"
        onClick={() =>
          addItem("mythsFacts.pairs", {
            myth: "",
            fact: "",
            displayOrder: (mf.pairs || []).length,
            active: true,
          })
        }
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm transition cursor-pointer"
      >
        + Add Myth / Fact Pair
      </button>

      {(mf.pairs || []).length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mt-4">
          <p className="text-gray-500 text-sm">No myth/fact pairs added yet.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {(mf.pairs || []).map((pair, i) => (
            <div key={i} className="border rounded-xl p-5 bg-white shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-sm">Pair {i + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeItem("mythsFacts.pairs", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-red-700">Myth</label>
                <textarea
                  rows={2}
                  value={pair.myth || ""}
                  onChange={(e) => updateArrayItem("mythsFacts.pairs", i, "myth", e.target.value)}
                  className="w-full mt-1 p-2 border border-red-200 rounded-md text-sm bg-red-50"
                  placeholder="e.g. PRP is too expensive for regular people"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-green-700">Fact</label>
                <textarea
                  rows={2}
                  value={pair.fact || ""}
                  onChange={(e) => updateArrayItem("mythsFacts.pairs", i, "fact", e.target.value)}
                  className="w-full mt-1 p-2 border border-green-200 rounded-md text-sm bg-green-50"
                  placeholder="e.g. A full initial course costs..."
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pair.active !== false}
                  onChange={(e) => updateArrayItem("mythsFacts.pairs", i, "active", e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Active</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
