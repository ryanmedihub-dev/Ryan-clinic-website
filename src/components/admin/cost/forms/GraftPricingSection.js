"use client";

import ImageUploader from "@/components/admin/ImageUploader";

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
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Graft Count Pricing Tiers</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={graftPricing.badge || ""}
            onChange={(e) => updateField("graftPricing.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Cost by Graft Count"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={graftPricing.heading || ""}
            onChange={(e) => updateField("graftPricing.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. How much does 1000 - 4000 Grafts cost?"
          />
        </div>
      </div>

      <button
        type="button"
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
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm transition cursor-pointer"
      >
        + Add Graft Tier
      </button>

      {(graftPricing.cards || []).length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4">
          <p className="text-gray-500">No graft pricing tiers added yet.</p>
        </div>
      ) : (
        <div className="space-y-5 mt-4">
          {(graftPricing.cards || []).map((card, i) => (
            <div key={i} className="border rounded-xl p-6 bg-white shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Graft Tier {i + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeItem("graftPricing.cards", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold text-sm cursor-pointer"
                >
                  Delete Tier
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Tier Name *</label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateArrayItem("graftPricing.cards", i, "title", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. Stage 2 Baldness Tier"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Graft Range</label>
                  <input
                    type="text"
                    value={card.graftRange || ""}
                    onChange={(e) => updateArrayItem("graftPricing.cards", i, "graftRange", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. 1,500 - 2,000 Grafts"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Price</label>
                  <input
                    type="text"
                    value={card.price || ""}
                    onChange={(e) => updateArrayItem("graftPricing.cards", i, "price", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md font-semibold text-blue-600"
                    placeholder="e.g. ₹45,000 - ₹60,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Coverage Area</label>
                  <input
                    type="text"
                    value={card.coverage || ""}
                    onChange={(e) => updateArrayItem("graftPricing.cards", i, "coverage", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Receding Hairline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Session Duration</label>
                  <input
                    type="text"
                    value={card.duration || ""}
                    onChange={(e) => updateArrayItem("graftPricing.cards", i, "duration", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="4 - 6 Hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Recovery Time</label>
                  <input
                    type="text"
                    value={card.recovery || ""}
                    onChange={(e) => updateArrayItem("graftPricing.cards", i, "recovery", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="5 - 7 Days"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={card.description || ""}
                  onChange={(e) => updateArrayItem("graftPricing.cards", i, "description", e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Tier description..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tier Image</label>
                <ImageUploader
                  initialImage={card.image || ""}
                  onUpload={(url) => updateArrayItem("graftPricing.cards", i, "image", url)}
                />
              </div>

              {/* Bullet Features */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Included Features</label>
                  <button
                    type="button"
                    onClick={() => handleFeatureAdd(i)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition font-semibold cursor-pointer"
                  >
                    + Add Feature
                  </button>
                </div>
                {(card.features || []).map((bullet, bi) => (
                  <div key={bi} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={bullet.text || ""}
                      onChange={(e) => handleFeatureChange(i, bi, e.target.value)}
                      className="flex-1 p-2 border rounded-md text-sm"
                      placeholder="Bullet point..."
                    />
                    <button
                      type="button"
                      onClick={() => handleFeatureRemove(i, bi)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
