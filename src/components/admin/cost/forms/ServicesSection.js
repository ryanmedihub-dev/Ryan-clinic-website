"use client";

import { Sparkles } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, DeleteIconButton, ItemCard } from "../shared/CostFormUI";

export default function ServicesSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const services = formData.services || {};

  const handleFeatureAdd = (cardIndex) => {
    const card = services.cards?.[cardIndex] || {};
    const current = card.features || [];
    updateArrayItem("services.cards", cardIndex, "features", [...current, { text: "" }]);
  };

  const handleFeatureRemove = (cardIndex, fIdx) => {
    const card = services.cards?.[cardIndex] || {};
    const current = card.features || [];
    updateArrayItem(
      "services.cards",
      cardIndex,
      "features",
      current.filter((_, i) => i !== fIdx)
    );
  };

  const handleFeatureChange = (cardIndex, fIdx, text) => {
    const card = services.cards?.[cardIndex] || {};
    const current = [...(card.features || [])];
    current[fIdx] = { text };
    updateArrayItem("services.cards", cardIndex, "features", current);
  };

  return (
    <SectionCard
      icon={Sparkles}
      title="6. Procedure Cost Options"
      subtitle="Treatment options & procedure pricing cards displayed on front-end"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={services.badge || ""}
            onChange={(e) => updateField("services.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Procedures & Pricing"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={services.heading || ""}
            onChange={(e) => updateField("services.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Surgery Cost Options"
          />
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Procedure Cards ({(services.cards || []).length})
          </label>
          <AddButton
            onClick={() =>
              addItem("services.cards", {
                title: "",
                description: "",
                badge: "",
                startingPrice: "",
                image: "",
                features: [],
                displayOrder: (services.cards || []).length,
                active: true,
              })
            }
            label="Add Procedure Card"
          />
        </div>

        {(services.cards || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-400">No procedure cards added yet. Click &quot;Add Procedure Card&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(services.cards || []).map((card, i) => (
              <ItemCard
                key={i}
                title={card.title ? `Procedure ${i + 1}: ${card.title}` : `Procedure Card ${i + 1}`}
                active={card.active}
                onToggleActive={(val) => updateArrayItem("services.cards", i, "active", val)}
                onDelete={() => removeItem("services.cards", i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Procedure Title" required>
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(e) => updateArrayItem("services.cards", i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Sapphire FUE Hair Transplant"
                    />
                  </Field>
                  <Field label="Badge Tag">
                    <input
                      type="text"
                      value={card.badge || ""}
                      onChange={(e) => updateArrayItem("services.cards", i, "badge", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Most Popular"
                    />
                  </Field>
                  <Field label="Starting Price">
                    <input
                      type="text"
                      value={card.startingPrice || ""}
                      onChange={(e) => updateArrayItem("services.cards", i, "startingPrice", e.target.value)}
                      className={`${inputCls} font-semibold text-indigo-600`}
                      placeholder="e.g. ₹35,000"
                    />
                  </Field>
                </div>

                <Field label="Description">
                  <textarea
                    rows={2}
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("services.cards", i, "description", e.target.value)}
                    className={textareaCls}
                    placeholder="Short description of the procedure..."
                  />
                </Field>

                <Field label="Procedure Card Image">
                  <ImageUploader
                    initialImage={card.image || ""}
                    onUpload={(url) => updateArrayItem("services.cards", i, "image", url)}
                  />
                </Field>

                {/* Bullet Features */}
                <div className="space-y-2 pt-2 border-t border-gray-200/60">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Included Bullet Features ({(card.features || []).length})
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
                        placeholder="Feature point..."
                      />
                      <DeleteIconButton onClick={() => handleFeatureRemove(i, bi)} />
                    </div>
                  ))}
                </div>

                <Field label="Display Order">
                  <input
                    type="number"
                    value={card.displayOrder ?? i}
                    onChange={(e) => updateArrayItem("services.cards", i, "displayOrder", parseInt(e.target.value) || 0)}
                    className={`${inputCls} w-32`}
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

