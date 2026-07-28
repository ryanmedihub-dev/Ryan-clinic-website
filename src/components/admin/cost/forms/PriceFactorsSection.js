"use client";

export default function PriceFactorsSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const pf = formData.priceFactors || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Price Factors & EMI Plans</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={pf.badge || ""}
            onChange={(e) => updateField("priceFactors.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Cost Determinants"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={pf.heading || ""}
            onChange={(e) => updateField("priceFactors.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Factors That Determine Your Final Cost"
          />
        </div>
      </div>

      {/* Price Factors */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("priceFactors.factors", { title: "", description: "", number: (pf.factors || []).length + 1 })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Price Factor
        </button>

        {(pf.factors || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <p className="text-gray-500 text-sm">No price factors added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(pf.factors || []).map((factor, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Factor {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("priceFactors.factors", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="w-24 shrink-0">
                    <label className="block text-xs font-semibold text-gray-700">Number</label>
                    <input
                      type="number"
                      value={factor.number ?? i + 1}
                      onChange={(e) => updateArrayItem("priceFactors.factors", i, "number", parseInt(e.target.value) || i + 1)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-700">Title *</label>
                    <input
                      type="text"
                      value={factor.title || ""}
                      onChange={(e) => updateArrayItem("priceFactors.factors", i, "title", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Number of Grafts Required"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-700">Description</label>
                    <input
                      type="text"
                      value={factor.description || ""}
                      onChange={(e) => updateArrayItem("priceFactors.factors", i, "description", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Short description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EMI Plans */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">EMI / Financing Plans</h4>

        <div className="flex gap-6 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">EMI Section Badge</label>
            <input
              type="text"
              value={pf.emiBadge || ""}
              onChange={(e) => updateField("priceFactors.emiBadge", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g. Easy EMI Options"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">EMI Section Heading</label>
            <input
              type="text"
              value={pf.emiHeading || ""}
              onChange={(e) => updateField("priceFactors.emiHeading", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g. Affordable EMI Plans"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => addItem("priceFactors.emiPlans", { bank: "", tenure: "", interest: "", monthly: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add EMI Plan
        </button>

        {(pf.emiPlans || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <p className="text-gray-500 text-sm">No EMI plans added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(pf.emiPlans || []).map((plan, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">EMI Plan {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("priceFactors.emiPlans", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Bank / Provider</label>
                    <input
                      type="text"
                      value={plan.bank || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "bank", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="HDFC Bank"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Tenure</label>
                    <input
                      type="text"
                      value={plan.tenure || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "tenure", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="12 Months"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Interest Rate</label>
                    <input
                      type="text"
                      value={plan.interest || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "interest", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="0% / 12%"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Monthly Amount</label>
                    <input
                      type="text"
                      value={plan.monthly || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "monthly", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="₹3,500/mo"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
