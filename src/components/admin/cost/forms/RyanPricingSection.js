"use client";

import { ShieldCheck } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, ItemCard } from "../shared/CostFormUI";

export default function RyanPricingSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const p = formData.pricing || {};

  return (
    <SectionCard
      icon={ShieldCheck}
      title="15. Ryan Clinic Transparent Pricing"
      subtitle="Configure transparent clinic pricing overview heading, description, and pricing cards"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Heading">
          <input
            type="text"
            value={p.heading || ""}
            onChange={(e) => updateField("pricing.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Ryan Clinic Hair Transplant Cost in Delhi"
          />
        </Field>
        <Field label="Section Description">
          <textarea
            value={p.description || ""}
            onChange={(e) => updateField("pricing.description", e.target.value)}
            className={textareaCls}
            placeholder="Overview of transparent pricing philosophy..."
          />
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Pricing Cards ({(p.cards || []).length})
          </label>
          <AddButton
            onClick={() => addItem("pricing.cards", { title: "", price: "", subtitle: "", description: "", badge: "", features: [], active: true })}
            label="Add Pricing Card"
          />
        </div>

        {(p.cards || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">No pricing cards added yet. Click &quot;Add Pricing Card&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(p.cards || []).map((card, i) => (
              <ItemCard
                key={i}
                title={card.title ? `${card.title} — ${card.price || "Card"}` : `Pricing Card ${i + 1}`}
                onDelete={() => removeItem("pricing.cards", i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field label="Card Title" required>
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(e) => updateArrayItem("pricing.cards", i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Basic Package"
                    />
                  </Field>
                  <Field label="Price">
                    <input
                      type="text"
                      value={card.price || ""}
                      onChange={(e) => updateArrayItem("pricing.cards", i, "price", e.target.value)}
                      className={`${inputCls} font-semibold text-indigo-600`}
                      placeholder="e.g. ₹45,000"
                    />
                  </Field>
                  <Field label="Badge / Label">
                    <input
                      type="text"
                      value={card.badge || ""}
                      onChange={(e) => updateArrayItem("pricing.cards", i, "badge", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Best Value"
                    />
                  </Field>
                </div>
                <Field label="Description" className="mt-3">
                  <input
                    type="text"
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("pricing.cards", i, "description", e.target.value)}
                    className={inputCls}
                    placeholder="Short summary of what this includes..."
                  />
                </Field>
              </ItemCard>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
