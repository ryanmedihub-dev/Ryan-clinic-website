"use client";

import ImageUploader from "@/components/admin/ImageUploader";

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
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Procedure Cost Options</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={services.badge || ""}
            onChange={(e) => updateField("services.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Procedures & Pricing"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={services.heading || ""}
            onChange={(e) => updateField("services.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Surgery Cost Options"
          />
        </div>
      </div>

      <button
        type="button"
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
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm transition cursor-pointer"
      >
        + Add Procedure Card
      </button>

      {(services.cards || []).length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4">
          <p className="text-gray-500">No procedure cards added yet.</p>
        </div>
      ) : (
        <div className="space-y-5 mt-4">
          {(services.cards || []).map((card, i) => (
            <div key={i} className="border rounded-xl p-6 bg-white shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Procedure Card {i + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeItem("services.cards", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold text-sm cursor-pointer"
                >
                  Delete Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateArrayItem("services.cards", i, "title", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. FUE Hair Transplant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Badge</label>
                  <input
                    type="text"
                    value={card.badge || ""}
                    onChange={(e) => updateArrayItem("services.cards", i, "badge", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="e.g. Most Popular"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Starting Price</label>
                  <input
                    type="text"
                    value={card.startingPrice || ""}
                    onChange={(e) => updateArrayItem("services.cards", i, "startingPrice", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md font-semibold text-blue-600"
                    placeholder="e.g. ₹35,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={card.description || ""}
                  onChange={(e) => updateArrayItem("services.cards", i, "description", e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Procedure description..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Image</label>
                <ImageUploader
                  initialImage={card.image || ""}
                  onUpload={(url) => updateArrayItem("services.cards", i, "image", url)}
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
                      placeholder="Feature point..."
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

              <div>
                <label className="block text-sm font-semibold text-gray-700">Display Order</label>
                <input
                  type="number"
                  value={card.displayOrder ?? 0}
                  onChange={(e) => updateArrayItem("services.cards", i, "displayOrder", parseInt(e.target.value) || 0)}
                  className="w-full mt-2 p-2 border rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
