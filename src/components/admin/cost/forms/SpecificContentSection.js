"use client";

import { Layers } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, ItemCard } from "../shared/CostFormUI";

export default function SpecificContentSection({
  targetKey,
  sectionNumber,
  title,
  subtitle,
  icon: Icon = Layers,
  defaultLayout = "cards",
  formData,
  updateField,
}) {
  const sections = formData.contentSections || [];

  // Find index of existing item matching targetKey
  let sectionIndex = sections.findIndex((s) => s.sectionKey === targetKey);

  // Helper to ensure item exists in contentSections array
  const ensureSectionExists = () => {
    if (sectionIndex === -1) {
      const newSec = {
        sectionKey: targetKey,
        badge: "",
        heading: "",
        description: "",
        layout: defaultLayout,
        items: [],
        displayOrder: sections.length,
        enabled: true,
      };
      const updated = [...sections, newSec];
      updateField("contentSections", updated);
      return updated.length - 1;
    }
    return sectionIndex;
  };

  const currentSec = sectionIndex !== -1 ? sections[sectionIndex] : null;

  const handleFieldChange = (field, val) => {
    const idx = ensureSectionExists();
    const updated = [...(formData.contentSections || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField("contentSections", updated);
  };

  const handleAddItem = () => {
    const idx = ensureSectionExists();
    const updated = [...(formData.contentSections || [])];
    const sec = updated[idx];
    const items = [...(sec.items || [])];
    items.push({
      title: "",
      subtitle: "",
      description: "",
      value: "",
      label: "",
      secondaryValue: "",
      secondaryLabel: "",
      badge: "",
      icon: "",
      ctaText: "",
      ctaLink: "",
      highlight: false,
      type: "neutral",
      displayOrder: items.length,
      active: true,
    });
    updated[idx] = { ...sec, items };
    updateField("contentSections", updated);
  };

  const handleRemoveItem = (itemIdx) => {
    if (sectionIndex === -1) return;
    const updated = [...sections];
    const sec = updated[sectionIndex];
    const items = (sec.items || []).filter((_, i) => i !== itemIdx);
    updated[sectionIndex] = { ...sec, items };
    updateField("contentSections", updated);
  };

  const handleItemChange = (itemIdx, field, val) => {
    const idx = ensureSectionExists();
    const updated = [...(formData.contentSections || [])];
    const sec = updated[idx];
    const items = [...(sec.items || [])];
    items[itemIdx] = { ...items[itemIdx], [field]: val };
    updated[idx] = { ...sec, items };
    updateField("contentSections", updated);
  };

  return (
    <SectionCard
      icon={Icon}
      title={`${sectionNumber}. ${title}`}
      subtitle={subtitle || `Manages sectionKey "${targetKey}" in contentSections`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={currentSec?.badge || ""}
            onChange={(e) => handleFieldChange("badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Comparison Guide"
          />
        </Field>

        <Field label="Section Heading" className="md:col-span-2">
          <input
            type="text"
            value={currentSec?.heading || ""}
            onChange={(e) => handleFieldChange("heading", e.target.value)}
            className={inputCls}
            placeholder="Enter public heading..."
          />
        </Field>
      </div>

      <Field label="Section Description" className="mt-3">
        <textarea
          value={currentSec?.description || ""}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          className={textareaCls}
          placeholder="Brief explanatory text for this section..."
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        <Field label="Display Layout">
          <select
            value={currentSec?.layout || defaultLayout}
            onChange={(e) => handleFieldChange("layout", e.target.value)}
            className={inputCls}
          >
            <option value="cards">Cards Grid</option>
            <option value="comparison">Comparison Columns</option>
            <option value="timeline">Timeline / Process</option>
            <option value="suitability">Suitability / Diagnostic Split</option>
            <option value="highlight">Highlight Cards</option>
            <option value="checklist">Checklist</option>
            <option value="content">Simple Content</option>
          </select>
        </Field>

        <Field label="Section Status" className="flex items-center pt-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={currentSec?.enabled !== false}
              onChange={(e) => handleFieldChange("enabled", e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-400"
            />
            <span className="text-xs font-bold text-gray-800">Enabled for live page</span>
          </label>
        </Field>
      </div>

      {/* Items list */}
      <div className="pt-4 border-t border-gray-100 space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Content Items ({(currentSec?.items || []).length})
          </label>
          <AddButton onClick={handleAddItem} label="Add Content Item" />
        </div>

        {(currentSec?.items || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">No items in this section yet. Click &quot;Add Content Item&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(currentSec?.items || []).map((item, i) => (
              <ItemCard
                key={i}
                title={item.title || item.value ? `${item.title || "Item"} ${item.value ? `(${item.value})` : ""}` : `Item ${i + 1}`}
                onDelete={() => handleRemoveItem(i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field label="Item Title">
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => handleItemChange(i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. FUE Technique"
                    />
                  </Field>
                  <Field label="Subtitle / Tag">
                    <input
                      type="text"
                      value={item.subtitle || ""}
                      onChange={(e) => handleItemChange(i, "subtitle", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Minimally Invasive"
                    />
                  </Field>
                  <Field label="Primary Value / Price">
                    <input
                      type="text"
                      value={item.value || ""}
                      onChange={(e) => handleItemChange(i, "value", e.target.value)}
                      className={`${inputCls} font-semibold text-indigo-600`}
                      placeholder="e.g. ₹35 per graft"
                    />
                  </Field>
                </div>
                <Field label="Description" className="mt-3">
                  <textarea
                    value={item.description || ""}
                    onChange={(e) => handleItemChange(i, "description", e.target.value)}
                    className={textareaCls}
                    placeholder="Details about this item..."
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
