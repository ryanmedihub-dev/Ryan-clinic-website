"use client";

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
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">
        Generic Pricing Options (PRP Sessions / Packages / Future Types)
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Use this section for per-session or per-package pricing (PRP, FUE, etc). Hair Transplant graft pricing uses the &quot;Graft Count Pricing&quot; section above.
      </p>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={po.badge || ""}
            onChange={(e) => updateField("pricingOptions.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Transparent Pricing"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={po.heading || ""}
            onChange={(e) => updateField("pricingOptions.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. PRP Hair Treatment Cost in Delhi"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Section Description</label>
        <textarea
          rows={3}
          value={po.description || ""}
          onChange={(e) => updateField("pricingOptions.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="Optional description shown below the heading..."
        />
      </div>

      <button
        type="button"
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
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm transition cursor-pointer"
      >
        + Add Pricing Option
      </button>

      {(po.items || []).length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4">
          <p className="text-gray-500">No pricing options added yet.</p>
        </div>
      ) : (
        <div className="space-y-5 mt-4">
          {(po.items || []).map((item, i) => (
            <div key={i} className="border rounded-xl p-6 bg-white shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Pricing Option {i + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeItem("pricingOptions.items", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold text-sm cursor-pointer"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "title", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. Single PRP Session"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    value={item.subtitle || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "subtitle", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. Doctor Assessment + Treatment"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Badge</label>
                  <input
                    type="text"
                    value={item.badge || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "badge", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. Most Popular"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Price (leave blank if unverified)</label>
                  <input
                    type="text"
                    value={item.price || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "price", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md font-semibold text-blue-600"
                    placeholder="e.g. ₹4,500 — leave blank until verified"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Price Suffix</label>
                  <input
                    type="text"
                    value={item.priceSuffix || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "priceSuffix", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. per session"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Display Order</label>
                  <input
                    type="number"
                    value={item.displayOrder ?? i}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "displayOrder", parseInt(e.target.value) || i)}
                    className="w-full mt-2 p-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={item.description || ""}
                  onChange={(e) => updateArrayItem("pricingOptions.items", i, "description", e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Describe this pricing option..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">CTA Button Text</label>
                  <input
                    type="text"
                    value={item.ctaText || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "ctaText", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Book Consultation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">CTA Link</label>
                  <input
                    type="text"
                    value={item.ctaLink || ""}
                    onChange={(e) => updateArrayItem("pricingOptions.items", i, "ctaLink", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="/contact"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Bullet Points (inclusions)</label>
                  <button
                    type="button"
                    onClick={() => handleFeatureAdd(i)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition font-semibold cursor-pointer"
                  >
                    + Add Bullet
                  </button>
                </div>
                {(item.features || []).map((feat, fi) => (
                  <div key={fi} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={feat || ""}
                      onChange={(e) => handleFeatureChange(i, fi, e.target.value)}
                      className="flex-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Doctor consultation included"
                    />
                    <button
                      type="button"
                      onClick={() => handleFeatureRemove(i, fi)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.active !== false}
                  onChange={(e) => updateArrayItem("pricingOptions.items", i, "active", e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Active (visible on page)</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
