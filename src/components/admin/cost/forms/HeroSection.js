"use client";

import { Image as ImageIcon } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, AddButton, ItemCard } from "../shared/CostFormUI";

export default function HeroSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const hero = formData.hero || {};

  return (
    <SectionCard
      icon={ImageIcon}
      title="4. Hero Banner & Key Highlights"
      subtitle="Main banner heading, pricing tagline, background image, hero stats and CTAs"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Banner Title">
          <input
            type="text"
            value={hero.title || ""}
            onChange={(e) => updateField("hero.title", e.target.value)}
            className={inputCls}
            placeholder="e.g. Transparent Hair Transplant Cost in Delhi"
          />
        </Field>

        <Field label="Pricing Highlight Tagline">
          <input
            type="text"
            value={hero.pricingLine || ""}
            onChange={(e) => updateField("hero.pricingLine", e.target.value)}
            className={inputCls}
            placeholder="e.g. Starting from ₹35 per Graft"
          />
        </Field>
      </div>

      <Field label="Breadcrumbs" subtitle="comma-separated text">
        <input
          type="text"
          value={Array.isArray(hero.breadcrumbs) ? hero.breadcrumbs.join(", ") : hero.breadcrumbs || ""}
          onChange={(e) =>
            updateField(
              "hero.breadcrumbs",
              e.target.value.split(",").map((b) => b.trim()).filter(Boolean)
            )
          }
          className={inputCls}
          placeholder="Home > Cost > Hair Transplant"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Banner Image">
          <ImageUploader
            initialImage={hero.heroImage || ""}
            onUpload={(url) => updateField("hero.heroImage", url)}
          />
        </Field>

        <Field label="Banner Image Alt Text">
          <input
            type="text"
            value={hero.heroImageAlt || ""}
            onChange={(e) => updateField("hero.heroImageAlt", e.target.value)}
            className={inputCls}
            placeholder="Image Alt text"
          />
        </Field>
      </div>

      {/* Hero Stats */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Hero Stat Badges / Counter Cards ({(hero.stats || []).length})
          </label>
          <AddButton
            onClick={() => addItem("hero.stats", { value: "", label: "" })}
            label="Add Stat Badge"
          />
        </div>

        {(hero.stats || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">No stat badges added yet. Click &quot;Add Stat Badge&quot; above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(hero.stats || []).map((stat, i) => (
              <ItemCard
                key={i}
                title={`Stat ${i + 1}`}
                onDelete={() => removeItem("hero.stats", i)}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Value">
                    <input
                      type="text"
                      value={stat.value || ""}
                      onChange={(e) => updateArrayItem("hero.stats", i, "value", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 15,000+"
                    />
                  </Field>
                  <Field label="Label">
                    <input
                      type="text"
                      value={stat.label || ""}
                      onChange={(e) => updateArrayItem("hero.stats", i, "label", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Surgeries Done"
                    />
                  </Field>
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Banner Action Buttons ({(hero.buttons || []).length})
          </label>
          <AddButton
            onClick={() => addItem("hero.buttons", { text: "", link: "", variant: "primary" })}
            label="Add Action Button"
          />
        </div>

        {(hero.buttons || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">No banner buttons added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(hero.buttons || []).map((btn, i) => (
              <ItemCard
                key={i}
                title={`Button ${i + 1}`}
                onDelete={() => removeItem("hero.buttons", i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field label="Button Text">
                    <input
                      type="text"
                      value={btn.text || ""}
                      onChange={(e) => updateArrayItem("hero.buttons", i, "text", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Book Consultation"
                    />
                  </Field>
                  <Field label="Button Link">
                    <input
                      type="text"
                      value={btn.link || ""}
                      onChange={(e) => updateArrayItem("hero.buttons", i, "link", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. /contact"
                    />
                  </Field>
                  <Field label="Style Variant">
                    <select
                      value={btn.variant || "primary"}
                      onChange={(e) => updateArrayItem("hero.buttons", i, "variant", e.target.value)}
                      className={inputCls}
                    >
                      <option value="primary">Primary (Red / Solid)</option>
                      <option value="secondary">Secondary (Outline / Light)</option>
                    </select>
                  </Field>
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}

