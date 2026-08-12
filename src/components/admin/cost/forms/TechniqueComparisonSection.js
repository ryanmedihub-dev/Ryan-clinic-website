"use client";

import { BarChart2 } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, AddButton, ItemCard } from "../shared/CostFormUI";

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
    <SectionCard
      icon={BarChart2}
      title="8. Technique Comparison Table"
      subtitle="Side-by-side comparison matrix for FUE, DHI, FUT and other techniques"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={comp.badge || ""}
            onChange={(e) => updateField("techniqueComparison.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Technique Comparison"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={comp.heading || ""}
            onChange={(e) => updateField("techniqueComparison.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. FUE vs DHI vs FUT — Cost & Results"
          />
        </Field>
      </div>

      {/* Technique Columns */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Technique Columns ({(comp.columns || []).length})
          </label>
          <AddButton
            onClick={() => addItem("techniqueComparison.columns", { name: "", badge: "", highlighted: false })}
            label="Add Technique Column"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(comp.columns || []).map((col, cIdx) => (
            <ItemCard
              key={cIdx}
              title={col.name || `Column ${cIdx + 1}`}
              onDelete={() => removeItem("techniqueComparison.columns", cIdx)}
            >
              <Field label="Technique Name">
                <input
                  type="text"
                  value={col.name || ""}
                  onChange={(e) => updateArrayItem("techniqueComparison.columns", cIdx, "name", e.target.value)}
                  placeholder="e.g. FUE"
                  className={inputCls}
                />
              </Field>
              <Field label="Badge Label">
                <input
                  type="text"
                  value={col.badge || ""}
                  onChange={(e) => updateArrayItem("techniqueComparison.columns", cIdx, "badge", e.target.value)}
                  placeholder="e.g. Most Popular"
                  className={inputCls}
                />
              </Field>
              <label className="flex items-center gap-2.5 mt-1 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!!col.highlighted}
                  onChange={(e) => updateArrayItem("techniqueComparison.columns", cIdx, "highlighted", e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
                />
                <span className="font-medium text-gray-700">Highlight this column</span>
              </label>
            </ItemCard>
          ))}
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Comparison Rows ({(comp.rows || []).length})
          </label>
          <AddButton
            onClick={() => {
              const colsCount = (comp.columns || []).length;
              const initialValues = Array.from({ length: colsCount }, () => ({ value: "" }));
              addItem("techniqueComparison.rows", { label: "", values: initialValues });
            }}
            label="Add Comparison Row"
          />
        </div>

        <div className="space-y-3">
          {(comp.rows || []).map((row, rIdx) => (
            <ItemCard
              key={rIdx}
              title={row.label || `Comparison Row ${rIdx + 1}`}
              onDelete={() => removeItem("techniqueComparison.rows", rIdx)}
            >
              <Field label="Row Metric Label">
                <input
                  type="text"
                  value={row.label || ""}
                  onChange={(e) => handleRowLabelChange(rIdx, e.target.value)}
                  placeholder="e.g. Cost per Graft, Pain Level, Recovery Time"
                  className={`${inputCls} font-semibold`}
                />
              </Field>

              {(comp.columns || []).length > 0 && (
                <div className={`grid grid-cols-1 md:grid-cols-${Math.min(comp.columns.length, 4)} gap-3 mt-2`}>
                  {(comp.columns || []).map((col, cIdx) => (
                    <Field key={cIdx} label={col.name || `Column ${cIdx + 1}`}>
                      <input
                        type="text"
                        value={row.values?.[cIdx]?.value || ""}
                        onChange={(e) => handleRowValueChange(rIdx, cIdx, e.target.value)}
                        placeholder="Value for this cell"
                        className={inputCls}
                      />
                    </Field>
                  ))}
                </div>
              )}
            </ItemCard>
          ))}
        </div>

        {(comp.rows || []).length === 0 && (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">No comparison rows yet. Add technique columns first, then add rows.</p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
