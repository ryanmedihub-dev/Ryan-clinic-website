"use client";

import { MapPin } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, DeleteIconButton } from "../shared/CostFormUI";

export default function VisitClinicSection({ formData, updateField, addItem, removeItem }) {
  const vc = formData.visitClinic || {};

  return (
    <SectionCard
      icon={MapPin}
      title="14. Visit Clinic (Location & Address Block)"
      subtitle="CMS-controlled clinic address, phone, WhatsApp, map embed and nearby areas"
    >
      {/* Info callout */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 flex items-start gap-3 mb-2">
        <span className="text-blue-500 text-lg shrink-0 mt-0.5">ℹ️</span>
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Smart defaults are active.</strong> Every field below has a pre-filled city-specific default
          (Delhi, Mumbai or Hyderabad). Only fill in a field if you want to <em>override</em> the default.
          The section will always show a real map and full clinic details on the public page even if left blank.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={vc.badge || ""}
            onChange={(e) => updateField("visitClinic.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Our Delhi Clinic"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={vc.heading || ""}
            onChange={(e) => updateField("visitClinic.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Visiting Ryan Clinic for PRP in Delhi"
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          rows={2}
          value={vc.description || ""}
          onChange={(e) => updateField("visitClinic.description", e.target.value)}
          className={textareaCls}
          placeholder="Brief intro for the visit section..."
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Address">
          <textarea
            rows={2}
            value={vc.address || ""}
            onChange={(e) => updateField("visitClinic.address", e.target.value)}
            className={textareaCls}
            placeholder="e.g. CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034"
          />
        </Field>
        <div className="space-y-4">
          <Field label="City">
            <input
              type="text"
              value={vc.city || ""}
              onChange={(e) => updateField("visitClinic.city", e.target.value)}
              className={inputCls}
              placeholder="e.g. Delhi"
            />
          </Field>
          <Field label="Landmark">
            <input
              type="text"
              value={vc.landmark || ""}
              onChange={(e) => updateField("visitClinic.landmark", e.target.value)}
              className={inputCls}
              placeholder="Leave blank if unverified"
            />
          </Field>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Phone Number" subtitle="confirm correct number first">
          <input
            type="text"
            value={vc.phone || ""}
            onChange={(e) => updateField("visitClinic.phone", e.target.value)}
            className={inputCls}
            placeholder="Leave blank until verified"
          />
        </Field>
        <Field label="WhatsApp Number" subtitle="confirm correct number first">
          <input
            type="text"
            value={vc.whatsapp || ""}
            onChange={(e) => updateField("visitClinic.whatsapp", e.target.value)}
            className={inputCls}
            placeholder="Leave blank until verified"
          />
        </Field>
      </div>

      <Field label="Clinic Hours / Timings">
        <input
          type="text"
          value={vc.timings || ""}
          onChange={(e) => updateField("visitClinic.timings", e.target.value)}
          className={inputCls}
          placeholder="e.g. Mon–Sat: 9 AM – 7 PM"
        />
      </Field>

      <Field label="Google Maps Embed URL">
        <input
          type="text"
          value={vc.mapEmbedUrl || ""}
          onChange={(e) => updateField("visitClinic.mapEmbedUrl", e.target.value)}
          className={inputCls}
          placeholder="https://maps.google.com/embed?pb=..."
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="CTA Button Text">
          <input
            type="text"
            value={vc.buttonText || "Get Directions"}
            onChange={(e) => updateField("visitClinic.buttonText", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="CTA Button Link">
          <input
            type="text"
            value={vc.buttonLink || ""}
            onChange={(e) => updateField("visitClinic.buttonLink", e.target.value)}
            className={inputCls}
            placeholder="Google Maps link or /contact"
          />
        </Field>
      </div>

      {/* Nearby Areas */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Nearby Areas ({(vc.nearbyAreas || []).length})
            <span className="ml-2 text-gray-400 font-normal normal-case">leave empty if unverified</span>
          </label>
          <AddButton onClick={() => addItem("visitClinic.nearbyAreas", "")} label="Add Area" />
        </div>

        {(vc.nearbyAreas || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400">No nearby areas listed.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(vc.nearbyAreas || []).map((area, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={area || ""}
                  onChange={(e) => {
                    const updated = [...(vc.nearbyAreas || [])];
                    updated[i] = e.target.value;
                    updateField("visitClinic.nearbyAreas", updated);
                  }}
                  className={inputCls}
                  placeholder="e.g. Pitampura, Rohini"
                />
                <DeleteIconButton onClick={() => removeItem("visitClinic.nearbyAreas", i)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
