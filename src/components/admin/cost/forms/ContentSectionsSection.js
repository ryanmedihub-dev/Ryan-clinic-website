"use client";

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
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">
        Content Sections (Generic Educational &amp; Custom Layout Sections)
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Use these for educational sections unique to each treatment type. Each section has a unique sectionKey (e.g., &quot;session-vs-package&quot;, &quot;total-sessions-cost&quot;, &quot;worth-it&quot;, &quot;emi-payment&quot;). The frontend dynamically selects the visual component layout.
      </p>

      <button
        type="button"
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
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm transition cursor-pointer"
      >
        + Add Content Section
      </button>

      {sections.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4">
          <p className="text-gray-500">No content sections added yet.</p>
        </div>
      ) : (
        <div className="space-y-6 mt-4">
          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="border-2 rounded-xl p-6 bg-white shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Content Section {sIdx + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeItem("contentSections", sIdx)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold text-sm cursor-pointer"
                >
                  Delete Section
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Section Key * <span className="text-gray-400 font-normal">(e.g. &quot;session-vs-package&quot;, &quot;total-sessions-cost&quot;, &quot;worth-it&quot;, &quot;emi-payment&quot;)</span>
                  </label>
                  <input
                    type="text"
                    value={sec.sectionKey || ""}
                    onChange={(e) => handleSectionChange(sIdx, "sectionKey", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md font-mono text-sm"
                    placeholder="e.g. session-vs-package"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Layout Variant</label>
                  <select
                    value={sec.layout || "cards"}
                    onChange={(e) => handleSectionChange(sIdx, "layout", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                  >
                    <option value="cards">Cards Grid</option>
                    <option value="comparison">Package / Option Comparison</option>
                    <option value="timeline">Treatment Plan / Timeline</option>
                    <option value="suitability">Suitability / Candidate Comparison</option>
                    <option value="checklist">Checklist</option>
                    <option value="highlight">Highlight Banner</option>
                    <option value="content">Content (Text Only Info Panel)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Badge</label>
                  <input
                    type="text"
                    value={sec.badge || ""}
                    onChange={(e) => handleSectionChange(sIdx, "badge", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. Treatment Planning"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Heading</label>
                  <input
                    type="text"
                    value={sec.heading || ""}
                    onChange={(e) => handleSectionChange(sIdx, "heading", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Section H2 heading"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  rows={4}
                  value={sec.description || ""}
                  onChange={(e) => handleSectionChange(sIdx, "description", e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Main section content/description..."
                />
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <label className="block text-sm font-semibold text-gray-700">Display Order</label>
                  <input
                    type="number"
                    value={sec.displayOrder ?? sIdx}
                    onChange={(e) => handleSectionChange(sIdx, "displayOrder", parseInt(e.target.value) || sIdx)}
                    className="w-full mt-2 p-2 border rounded-md"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sec.enabled !== false}
                      onChange={(e) => handleSectionChange(sIdx, "enabled", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>Enabled (renders on page)</span>
                  </label>
                </div>
              </div>

              {/* Section Items */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-gray-700">Items / Cards</h5>
                  <button
                    type="button"
                    onClick={() => handleItemAdd(sIdx)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition font-semibold cursor-pointer"
                  >
                    + Add Item Card
                  </button>
                </div>

                {(sec.items || []).length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No items yet. Add cards to render visual components inside this section.</p>
                ) : (
                  <div className="space-y-4">
                    {(sec.items || []).map((item, iIdx) => (
                      <div key={iIdx} className="border rounded-xl p-4 bg-gray-50 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Card / Item {iIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleItemRemove(sIdx, iIdx)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm cursor-pointer"
                          >
                            Delete Card
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Title</label>
                            <input
                              type="text"
                              value={item.title || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "title", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. Single Session or Stage 1-2 Thinning"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Subtitle / Category</label>
                            <input
                              type="text"
                              value={item.subtitle || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "subtitle", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. Flexibility or Early Stage"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Badge</label>
                            <input
                              type="text"
                              value={item.badge || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "badge", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. Save 25% or Recommended"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Primary Value / Price</label>
                            <input
                              type="text"
                              value={item.value || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "value", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm font-semibold text-blue-600"
                              placeholder="e.g. ₹4,500 or 3 Sessions"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Primary Label</label>
                            <input
                              type="text"
                              value={item.label || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "label", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. Initial Sessions"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Secondary Value</label>
                            <input
                              type="text"
                              value={item.secondaryValue || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "secondaryValue", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. 1 Session / 6 Months"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Secondary Label</label>
                            <input
                              type="text"
                              value={item.secondaryLabel || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "secondaryLabel", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. Maintenance"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700">Description</label>
                          <textarea
                            rows={2}
                            value={item.description || ""}
                            onChange={(e) => handleItemChange(sIdx, iIdx, "description", e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md text-sm"
                            placeholder="Card description / details..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Icon / Emoji</label>
                            <input
                              type="text"
                              value={item.icon || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "icon", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. ✓ or 🩺"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">Card Type / Nature</label>
                            <select
                              value={item.type || "neutral"}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "type", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                            >
                              <option value="neutral">Neutral Card</option>
                              <option value="positive">Positive / Candidate (Green Check)</option>
                              <option value="negative">Limitation / Caveat (Amber/Red Indicator)</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-4 pt-4">
                            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!item.highlight}
                                onChange={(e) => handleItemChange(sIdx, iIdx, "highlight", e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                              <span className="font-semibold text-blue-800">Highlight Card</span>
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-gray-200 pt-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">CTA Text (optional)</label>
                            <input
                              type="text"
                              value={item.ctaText || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "ctaText", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. Book Consultation"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700">CTA Link (optional)</label>
                            <input
                              type="text"
                              value={item.ctaLink || ""}
                              onChange={(e) => handleItemChange(sIdx, iIdx, "ctaLink", e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              placeholder="e.g. /contact"
                            />
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
