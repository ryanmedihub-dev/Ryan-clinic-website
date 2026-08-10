"use client";

import { DollarSign } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, DeleteIconButton, ItemCard } from "../shared/CostFormUI";

export default function GraftPricingSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const graftPricing = formData.graftPricing || {};

  const handleFeatureAdd = (cardIndex) => {
    const card = graftPricing.cards?.[cardIndex] || {};
    const current = card.features || [];
    updateArrayItem("graftPricing.cards", cardIndex, "features", [...current, { text: "" }]);
  };

  const handleFeatureRemove = (cardIndex, fIdx) => {
    const card = graftPricing.cards?.[cardIndex] || {};
    const current = card.features || [];
    updateArrayItem(
      "graftPricing.cards",
      cardIndex,
      "features",
      current.filter((_, i) => i !== fIdx)
    );
  };

  const handleFeatureChange = (cardIndex, fIdx, text) => {
    const card = graftPricing.cards?.[cardIndex] || {};
    const current = [...(card.features || [])];
    current[fIdx] = { text };
    updateArrayItem("graftPricing.cards", cardIndex, "features", current);
  };

  return (
    <SectionCard
      icon={DollarSign}
      title="7. Graft Count Pricing Tiers"
      subtitle="Per-graft pricing tiers for hair transplant (FUE/FUT) shown as comparison cards"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={graftPricing.badge || ""}
            onChange={(e) => updateField("graftPricing.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Cost by Graft Count"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={graftPricing.heading || ""}
            onChange={(e) => updateField("graftPricing.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. How much does 1000 - 4000 Grafts cost?"
          />
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Graft Pricing Tiers ({(graftPricing.cards || []).length})
          </label>
          <AddButton
            onClick={() =>
              addItem("graftPricing.cards", {
                title: "",
                graftRange: "",
                price: "",
                coverage: "",
                duration: "",
                recovery: "",
                description: "",
                image: "",
                features: [],
                displayOrder: (graftPricing.cards || []).length,
                active: true,
              })
            }
            label="Add Graft Tier"
          />
        </div>

        {(graftPricing.cards || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-400">No graft pricing tiers added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(graftPricing.cards || []).map((card, i) => (
              <ItemCard
                key={i}
                title={card.title ? `Tier ${i + 1}: ${card.title}` : `Graft Tier ${i + 1}`}
                onDelete={() => removeItem("graftPricing.cards", i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Tier Name" required>
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(e) => updateArrayItem("graftPricing.cards", i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Stage 2 Baldness Package"
                    />
                  </Field>
                  <Field label="Graft Range">
                    <input
                      type="text"
                      value={card.graftRange || ""}
                      onChange={(e) => updateArrayItem("graftPricing.cards", i, "graftRange", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 1,500 – 2,000 Grafts"
                    />
                  </Field>
                  <Field label="Price Range">
                    <input
                      type="text"
                      value={card.price || ""}
                      onChange={(e) => updateArrayItem("graftPricing.cards", i, "price", e.target.value)}
                      className={`${inputCls} font-semibold text-indigo-600`}
                      placeholder="e.g. ₹45,000 – ₹60,000"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Coverage Area">
                    <input
                      type="text"
                      value={card.coverage || ""}
                      onChange={(e) => updateArrayItem("graftPricing.cards", i, "coverage", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Receding Hairline"
                    />
                  </Field>
                  <Field label="Session Duration">
                    <input
                      type="text"
                      value={card.duration || ""}
                      onChange={(e) => updateArrayItem("graftPricing.cards", i, "duration", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 4 – 6 Hours"
                    />
                  </Field>
                  <Field label="Recovery Time">
                    <input
                      type="text"
                      value={card.recovery || ""}
                      onChange={(e) => updateArrayItem("graftPricing.cards", i, "recovery", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 5 – 7 Days"
                    />
                  </Field>
                </div>

                <Field label="Description">
                  <textarea
                    rows={2}
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("graftPricing.cards", i, "description", e.target.value)}
                    className={textareaCls}
                    placeholder="Brief description of this pricing tier..."
                  />
                </Field>

                <Field label="Tier Image">
                  <ImageUploader
                    initialImage={card.image || ""}
                    onUpload={(url) => updateArrayItem("graftPricing.cards", i, "image", url)}
                  />
                </Field>

                <div className="space-y-2 pt-2 border-t border-gray-200/60">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Included Features ({(card.features || []).length})
                    </label>
                    <AddButton onClick={() => handleFeatureAdd(i)} label="Add Feature" />
                  </div>
                  {(card.features || []).map((bullet, bi) => (
                    <div key={bi} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={bullet.text || ""}
                        onChange={(e) => handleFeatureChange(i, bi, e.target.value)}
                        className={inputCls}
                        placeholder="Bullet point..."
                      />
                      <DeleteIconButton onClick={() => handleFeatureRemove(i, bi)} />
                    </div>
                  ))}
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
