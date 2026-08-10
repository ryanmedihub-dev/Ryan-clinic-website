"use client";

import { Phone } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, DeleteIconButton } from "../shared/CostFormUI";

export default function ConsultationSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const cons = formData.consultation || {};

  return (
    <SectionCard
      icon={Phone}
      title="15. Consultation CTA & Lead Form"
      subtitle="Book consultation call-to-action, doctor image, perks and lead capture"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={cons.badge || ""}
            onChange={(e) => updateField("consultation.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Free Scalp Analysis"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={cons.heading || ""}
            onChange={(e) => updateField("consultation.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Get an Exact Graft Count & Cost Estimate"
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          rows={2}
          value={cons.description || ""}
          onChange={(e) => updateField("consultation.description", e.target.value)}
          className={textareaCls}
          placeholder="Book a confidential consultation with our hair restoration specialists..."
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="CTA Button Text">
          <input
            type="text"
            value={cons.buttonText || "Book Free Consultation"}
            onChange={(e) => updateField("consultation.buttonText", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="CTA Button Link">
          <input
            type="text"
            value={cons.buttonLink || ""}
            onChange={(e) => updateField("consultation.buttonLink", e.target.value)}
            className={inputCls}
            placeholder="e.g. https://wa.me/919911111247"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Image">
          <ImageUploader
            initialImage={typeof cons.image === "object" ? cons.image?.url || "" : cons.image || ""}
            onUpload={(url) => updateField("consultation.image", url)}
          />
        </Field>
        <Field label="Image Alt Text">
          <input
            type="text"
            value={(typeof cons.image === "object" ? cons.image?.alt : cons.imageAlt) || ""}
            onChange={(e) => updateField("consultation.imageAlt", e.target.value)}
            className={inputCls}
            placeholder="Describe the image for accessibility"
          />
        </Field>
      </div>

      {/* Perks */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Consultation Perks / Benefits ({(cons.features || []).length})
          </label>
          <AddButton
            onClick={() => addItem("consultation.features", { text: "" })}
            label="Add Perk"
          />
        </div>

        {(cons.features || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400">No consultation perks added yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(cons.features || []).map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feat.text || ""}
                  onChange={(e) => updateArrayItem("consultation.features", i, "text", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 3D Scalp Micro-Analysis Included"
                />
                <DeleteIconButton onClick={() => removeItem("consultation.features", i)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
