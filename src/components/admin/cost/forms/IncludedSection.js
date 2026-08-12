"use client";

import { CheckCircle } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, AddButton, DeleteIconButton, ItemCard } from "../shared/CostFormUI";

export default function IncludedSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const included = formData.includedSection || {};

  return (
    <SectionCard
      icon={CheckCircle}
      title="9. What's Included in the Price"
      subtitle="All-inclusive package items, benefits & transparency disclosure notes"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={included.badge || ""}
            onChange={(e) => updateField("includedSection.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. All-Inclusive Package"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={included.heading || ""}
            onChange={(e) => updateField("includedSection.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Everything Included In Our Price"
          />
        </Field>
      </div>

      {/* Included Items */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Included Items ({(included.items || []).length})
          </label>
          <AddButton
            onClick={() => addItem("includedSection.items", { icon: "", title: "", description: "" })}
            label="Add Included Item"
          />
        </div>

        {(included.items || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-400">No included items added yet. Click &quot;Add Included Item&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(included.items || []).map((item, i) => (
              <ItemCard
                key={i}
                title={item.title || `Included Item ${i + 1}`}
                onDelete={() => removeItem("includedSection.items", i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field label="Icon / Emoji">
                    <input
                      type="text"
                      value={item.icon || ""}
                      onChange={(e) => updateArrayItem("includedSection.items", i, "icon", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. ✓ or 💊"
                    />
                  </Field>
                  <Field label="Title">
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => updateArrayItem("includedSection.items", i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Pre-op Blood Tests"
                    />
                  </Field>
                  <Field label="Description">
                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) => updateArrayItem("includedSection.items", i, "description", e.target.value)}
                      className={inputCls}
                      placeholder="Short description..."
                    />
                  </Field>
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </div>

      {/* Disclosures */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Transparency Disclosure Notes ({(included.disclosures || []).length})
          </label>
          <AddButton
            onClick={() => addItem("includedSection.disclosures", { text: "" })}
            label="Add Disclosure Note"
          />
        </div>

        {(included.disclosures || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400">No disclosure notes added yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(included.disclosures || []).map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={d.text || ""}
                  onChange={(e) => updateArrayItem("includedSection.disclosures", i, "text", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. No hidden charges at Clinic Ryan"
                />
                <DeleteIconButton onClick={() => removeItem("includedSection.disclosures", i)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
