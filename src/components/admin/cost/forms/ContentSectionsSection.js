"use client";

import { Layers } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, ItemCard } from "../shared/CostFormUI";

export default function ContentSectionsSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const sections = formData.contentSections || [];

  const handleItemAdd = (sIdx) => {
    const sec = sections[sIdx] || {};
    const current = sec.items || [];
    const updated = [...sections];
    updated[sIdx] = {
      ...sec,
      items: [
        ...current,
        {
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
          displayOrder: current.length,
          active: true,
        },
      ],
    };
    updateField("contentSections", updated);
  };

  const handleItemRemove = (sIdx, iIdx) => {
    const sec = sections[sIdx] || {};
    const updated = [...sections];
    updated[sIdx] = {
      ...sec,
      items: (sec.items || []).filter((_, i) => i !== iIdx),
    };
    updateField("contentSections", updated);
  };

  const handleItemChange = (sIdx, iIdx, field, val) => {
    const sec = sections[sIdx] || {};
    const items = [...(sec.items || [])];
    items[iIdx] = { ...items[iIdx], [field]: val };
    const updated = [...sections];
    updated[sIdx] = { ...sec, items };
    updateField("contentSections", updated);
  };

  const handleSectionChange = (sIdx, field, val) => {
    const updated = [...sections];
    updated[sIdx] = { ...updated[sIdx], [field]: val };
    updateField("contentSections", updated);
  };

  return (
    <SectionCard
      icon={Layers}
      title="12. Content Sections (Educational & Custom Layouts)"
      subtitle="Dynamic educational sections with unique sectionKeys — the frontend selects the visual layout"
    >
      <div className="pt-1 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Content Sections ({sections.length})
          </label>
          <AddButton
            onClick={() =>
              addItem("contentSections", {
                sectionKey: "",
                badge: "",
                heading: "",
                description: "",
                layout: "cards",
                items: [],
                displayOrder: sections.length,
                enabled: true,
              })
            }
            label="Add Content Section"
          />
        </div>

        {sections.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <p className="text-xs text-gray-400">No content sections added yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {sections.map((sec, sIdx) => (
              <ItemCard
                key={sIdx}
                title={sec.heading || sec.sectionKey || `Content Section ${sIdx + 1}`}
                badge={sec.sectionKey || ""}
                active={sec.enabled}
                onToggleActive={(val) => handleSectionChange(sIdx, "enabled", val)}
                onDelete={() => removeItem("contentSections", sIdx)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Section Key" required subtitle="e.g. session-vs-package, total-sessions-cost">
                    <input
                      type="text"
                      value={sec.sectionKey || ""}
                      onChange={(e) => handleSectionChange(sIdx, "sectionKey", e.target.value)}
                      className={`${inputCls} font-mono text-indigo-600`}
                      placeholder="e.g. session-vs-package"
                    />
                  </Field>
                  <Field label="Layout Variant">
                    <select
                      value={sec.layout || "cards"}
                      onChange={(e) => handleSectionChange(sIdx, "layout", e.target.value)}
                      className={inputCls}
                    >
                      <option value="cards">Cards Grid</option>
                      <option value="comparison">Package / Option Comparison</option>
                      <option value="timeline">Treatment Plan / Timeline</option>
                      <option value="suitability">Suitability / Candidate Comparison</option>
                      <option value="checklist">Checklist</option>
                      <option value="highlight">Highlight Banner</option>
                      <option value="content">Content (Text Only Info Panel)</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Badge">
                    <input
                      type="text"
                      value={sec.badge || ""}
                      onChange={(e) => handleSectionChange(sIdx, "badge", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Treatment Planning"
                    />
                  </Field>
                  <Field label="Heading">
                    <input
                      type="text"
                      value={sec.heading || ""}
                      onChange={(e) => handleSectionChange(sIdx, "heading", e.target.value)}
                      className={inputCls}
                      placeholder="Section H2 heading"
                    />
                  </Field>
                </div>

                <Field label="Description">
                  <textarea
                    rows={3}
                    value={sec.description || ""}
                    onChange={(e) => handleSectionChange(sIdx, "description", e.target.value)}
                    className={textareaCls}
                    placeholder="Main section content/description..."
                  />
                </Field>

                <Field label="Display Order">
                  <input
                    type="number"
                    value={sec.displayOrder ?? sIdx}
                    onChange={(e) => handleSectionChange(sIdx, "displayOrder", parseInt(e.target.value) || sIdx)}
                    className={`${inputCls} w-32`}
                  />
                </Field>

                {/* Section Items */}
                <div className="space-y-3 pt-3 border-t border-gray-200/60">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Items / Cards ({(sec.items || []).length})
                    </label>
                    <AddButton onClick={() => handleItemAdd(sIdx)} label="Add Item Card" />
                  </div>

                  {(sec.items || []).length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No items yet. Add cards to render visual components inside this section.</p>
                  ) : (
                    <div className="space-y-3">
                      {(sec.items || []).map((item, iIdx) => (
                        <ItemCard
                          key={iIdx}
                          title={item.title || `Item ${iIdx + 1}`}
                          onDelete={() => handleItemRemove(sIdx, iIdx)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <Field label="Title">
                              <input type="text" value={item.title || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "title", e.target.value)} className={inputCls} placeholder="e.g. Single Session" />
                            </Field>
                            <Field label="Subtitle / Category">
                              <input type="text" value={item.subtitle || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "subtitle", e.target.value)} className={inputCls} placeholder="e.g. Flexibility" />
                            </Field>
                            <Field label="Badge">
                              <input type="text" value={item.badge || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "badge", e.target.value)} className={inputCls} placeholder="e.g. Save 25%" />
                            </Field>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Field label="Primary Value">
                              <input type="text" value={item.value || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "value", e.target.value)} className={`${inputCls} font-semibold text-indigo-600`} placeholder="e.g. ₹4,500" />
                            </Field>
                            <Field label="Primary Label">
                              <input type="text" value={item.label || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "label", e.target.value)} className={inputCls} placeholder="e.g. Initial Sessions" />
                            </Field>
                            <Field label="Secondary Value">
                              <input type="text" value={item.secondaryValue || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "secondaryValue", e.target.value)} className={inputCls} placeholder="e.g. 1 Session" />
                            </Field>
                            <Field label="Secondary Label">
                              <input type="text" value={item.secondaryLabel || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "secondaryLabel", e.target.value)} className={inputCls} placeholder="e.g. Maintenance" />
                            </Field>
                          </div>

                          <Field label="Description">
                            <textarea rows={2} value={item.description || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "description", e.target.value)} className={textareaCls} placeholder="Card description..." />
                          </Field>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <Field label="Icon / Emoji">
                              <input type="text" value={item.icon || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "icon", e.target.value)} className={inputCls} placeholder="e.g. ✓" />
                            </Field>
                            <Field label="Card Type">
                              <select value={item.type || "neutral"} onChange={(e) => handleItemChange(sIdx, iIdx, "type", e.target.value)} className={inputCls}>
                                <option value="neutral">Neutral Card</option>
                                <option value="positive">Positive / Candidate</option>
                                <option value="negative">Limitation / Caveat</option>
                              </select>
                            </Field>
                            <div className="flex items-end pb-2">
                              <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer select-none">
                                <input type="checkbox" checked={!!item.highlight} onChange={(e) => handleItemChange(sIdx, iIdx, "highlight", e.target.checked)} className="w-4 h-4 text-indigo-600 rounded border-gray-300" />
                                <span className="font-medium text-gray-700">Highlight Card</span>
                              </label>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-gray-200/60">
                            <Field label="CTA Text" subtitle="optional">
                              <input type="text" value={item.ctaText || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "ctaText", e.target.value)} className={inputCls} placeholder="e.g. Book Consultation" />
                            </Field>
                            <Field label="CTA Link" subtitle="optional">
                              <input type="text" value={item.ctaLink || ""} onChange={(e) => handleItemChange(sIdx, iIdx, "ctaLink", e.target.value)} className={inputCls} placeholder="e.g. /contact" />
                            </Field>
                          </div>
                        </ItemCard>
                      ))}
                    </div>
                  )}
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
