"use client";

import { CreditCard } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, DeleteIconButton, ItemCard } from "../shared/CostFormUI";

export default function PricingOptionsSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const po = formData.pricingOptions || {};

  const handleFeatureAdd = (cardIndex) => {
    const item = po.items?.[cardIndex] || {};
    const current = item.features || [];
    updateArrayItem("pricingOptions.items", cardIndex, "features", [...current, ""]);
  };

  const handleFeatureRemove = (cardIndex, fIdx) => {
    const item = po.items?.[cardIndex] || {};
    const current = item.features || [];
    updateArrayItem(
      "pricingOptions.items",
      cardIndex,
      "features",
      current.filter((_, i) => i !== fIdx)
    );
  };

  const handleFeatureChange = (cardIndex, fIdx, val) => {
    const item = po.items?.[cardIndex] || {};
    const current = [...(item.features || [])];
    current[fIdx] = val;
    updateArrayItem("pricingOptions.items", cardIndex, "features", current);
  };

  return (
    <SectionCard
      icon={CreditCard}
      title="11. Pricing Options — Per-Session / Package Cards"
      subtitle="Per-session or per-package pricing cards for PRP, DHI, etc. (Hair Transplant graft pricing uses section 7 above)"
    >
      {/* Section Header Fields */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <Field label="Section Badge" className="md:col-span-4">
          <input
            type="text"
            value={po.badge || ""}
            onChange={(e) => updateField("pricingOptions.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Transparent Pricing"
          />
        </Field>
        <Field label="Section Heading" className="md:col-span-8">
          <input
            type="text"
            value={po.heading || ""}
            onChange={(e) => updateField("pricingOptions.heading", e.target.value)}
            className={`${inputCls} font-semibold`}
            placeholder="e.g. PRP Hair Treatment Cost in Delhi"
          />
        </Field>
      </div>

      <Field label="Section Sub-Description" subtitle="optional paragraph above the pricing cards">
        <textarea
          rows={2}
          value={po.description || ""}
          onChange={(e) => updateField("pricingOptions.description", e.target.value)}
          className={textareaCls}
          placeholder="Optional paragraph shown between the heading and the pricing cards..."
        />
      </Field>

      {/* Pricing Cards */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Pricing Cards ({(po.items || []).length})
          </label>
          <AddButton
            onClick={() =>
              addItem("pricingOptions.items", {
                title: "",
                subtitle: "",
                price: "",
                priceSuffix: "",
                description: "",
                badge: "",
                features: [],
                ctaText: "Book Consultation",
                ctaLink: "/contact",
                displayOrder: (po.items || []).length,
                active: true,
              })
            }
            label="Add Pricing Card"
          />
        </div>

        {(po.items || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <p className="text-xs text-gray-400">No pricing cards added yet. Click &quot;Add Pricing Card&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(po.items || []).map((item, i) => (
              <ItemCard
                key={i}
                title={item.title || `Pricing Card ${i + 1}`}
                badge={item.price ? `₹${item.price}` : ""}
                active={item.active}
                onToggleActive={(val) => updateArrayItem("pricingOptions.items", i, "active", val)}
                onDelete={() => removeItem("pricingOptions.items", i)}
              >
                {/* Row 1: Title, Subtitle, Badge */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Card Title" required>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "title", e.target.value)}
                      className={`${inputCls} font-semibold`}
                      placeholder="e.g. Single PRP Session"
                    />
                  </Field>
                  <Field label="Subtitle">
                    <input
                      type="text"
                      value={item.subtitle || ""}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "subtitle", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Doctor consultation + complete treatment"
                    />
                  </Field>
                  <Field label="Badge Tag">
                    <input
                      type="text"
                      value={item.badge || ""}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "badge", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Recommended"
                    />
                  </Field>
                </div>

                {/* Row 2: Price, Suffix, Order */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Price" subtitle="leave blank if unverified">
                    <input
                      type="text"
                      value={item.price || ""}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "price", e.target.value)}
                      className={`${inputCls} font-semibold text-indigo-600`}
                      placeholder="e.g. 4500"
                    />
                  </Field>
                  <Field label="Price Suffix" subtitle="shown after price">
                    <input
                      type="text"
                      value={item.priceSuffix || ""}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "priceSuffix", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. per session"
                    />
                  </Field>
                  <Field label="Display Order" subtitle="lower = shown first">
                    <input
                      type="number"
                      value={item.displayOrder ?? i}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "displayOrder", parseInt(e.target.value) || i)}
                      className={`${inputCls} w-32`}
                    />
                  </Field>
                </div>

                {/* Card Description */}
                <Field label="Card Description" subtitle="paragraph text below the price on the card">
                  <textarea
                    rows={2}
                    value={item.description || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "description", e.target.value)}
                    className={textareaCls}
                    placeholder="e.g. At Ryan Clinic, your PRP session cost covers the complete treatment process."
                  />
                </Field>

                {/* CTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="CTA Button Text">
                    <input
                      type="text"
                      value={item.ctaText || ""}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "ctaText", e.target.value)}
                      className={inputCls}
                      placeholder="Book Consultation"
                    />
                  </Field>
                  <Field label="CTA Button Link">
                    <input
                      type="text"
                      value={item.ctaLink || ""}
                      onChange={(e) => updateArrayItem("pricingOptions.items", i, "ctaLink", e.target.value)}
                      className={inputCls}
                      placeholder="/contact"
                    />
                  </Field>
                </div>

                {/* Bullet Features */}
                <div className="space-y-2 pt-2 border-t border-gray-200/60">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Bullet Points / Inclusions ({(item.features || []).length})
                    </label>
                    <AddButton onClick={() => handleFeatureAdd(i)} label="Add Bullet" />
                  </div>
                  {(item.features || []).length === 0 && (
                    <p className="text-xs text-gray-400 italic">No bullet points yet.</p>
                  )}
                  {(item.features || []).map((feat, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat || ""}
                        onChange={(e) => handleFeatureChange(i, fi, e.target.value)}
                        className={inputCls}
                        placeholder="e.g. Doctor-led — not technician-administered"
                      />
                      <DeleteIconButton onClick={() => handleFeatureRemove(i, fi)} />
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
