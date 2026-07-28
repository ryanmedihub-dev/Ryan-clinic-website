"use client";

export default function TechniqueComparisonSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const comp = formData.techniqueComparison || {};

  const handleRowLabelChange = (rIdx, label) => {
    updateArrayItem("techniqueComparison.rows", rIdx, "label", label);
  };

  const handleRowValueChange = (rIdx, cIdx, val) => {
    const currentRows = [...(comp.rows || [])];
    const rowVals = [...(currentRows[rIdx]?.values || [])];
    rowVals[cIdx] = { value: val };
    currentRows[rIdx] = { ...currentRows[rIdx], values: rowVals };
    updateField("techniqueComparison.rows", currentRows);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Technique Comparison Table</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={comp.badge || ""}
            onChange={(e) => updateField("techniqueComparison.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Technique Comparison"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={comp.heading || ""}
            onChange={(e) => updateField("techniqueComparison.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. FUE vs Turkish Technique vs FUT Cost & Results"
          />
        </div>
      </div>

      {/* Columns */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() =>
            addItem("techniqueComparison.columns", { name: "", badge: "", highlighted: false })
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Technique Column
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(comp.columns || []).map((col, cIdx) => (
            <div key={cIdx} className="border rounded-xl p-4 bg-white shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-sm">Column {cIdx + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeItem("techniqueComparison.columns", cIdx)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <input
                type="text"
                value={col.name || ""}
                onChange={(e) => updateArrayItem("techniqueComparison.columns", cIdx, "name", e.target.value)}
                placeholder="Name (e.g. FUE)"
                className="w-full p-2 border rounded-md text-sm"
              />
              <input
                type="text"
                value={col.badge || ""}
                onChange={(e) => updateArrayItem("techniqueComparison.columns", cIdx, "badge", e.target.value)}
                placeholder="Badge (e.g. Most Popular)"
                className="w-full p-2 border rounded-md text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!col.highlighted}
                  onChange={(e) => updateArrayItem("techniqueComparison.columns", cIdx, "highlighted", e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Highlight Column</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => {
            const colsCount = (comp.columns || []).length;
            const initialValues = Array.from({ length: colsCount }, () => ({ value: "" }));
            addItem("techniqueComparison.rows", { label: "", values: initialValues });
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Comparison Row
        </button>

        <div className="space-y-4">
          {(comp.rows || []).map((row, rIdx) => (
            <div key={rIdx} className="border rounded-xl p-4 bg-white shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-sm">Row {rIdx + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeItem("techniqueComparison.rows", rIdx)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                >
                  Delete Row
                </button>
              </div>

              <input
                type="text"
                value={row.label || ""}
                onChange={(e) => handleRowLabelChange(rIdx, e.target.value)}
                placeholder="Row Metric (e.g. Cost per Graft, Pain Level)"
                className="w-full p-2 border rounded-md text-sm font-semibold"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(comp.columns || []).map((col, cIdx) => (
                  <div key={cIdx}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
                      {col.name || `Col ${cIdx + 1}`}
                    </label>
                    <input
                      type="text"
                      value={row.values?.[cIdx]?.value || ""}
                      onChange={(e) => handleRowValueChange(rIdx, cIdx, e.target.value)}
                      placeholder="Value"
                      className="w-full p-2 border rounded-md text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
