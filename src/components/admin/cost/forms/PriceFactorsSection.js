"use client";

import { TrendingUp } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, AddButton, ItemCard } from "../shared/CostFormUI";

export default function PriceFactorsSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const pf = formData.priceFactors || {};

  return (
    <SectionCard
      icon={TrendingUp}
      title="10. Price Factors & EMI Financing Plans"
      subtitle="Cost determinants, breakdown factors and easy-EMI financing options"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={pf.badge || ""}
            onChange={(e) => updateField("priceFactors.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Cost Determinants"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={pf.heading || ""}
            onChange={(e) => updateField("priceFactors.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Factors That Determine Your Final Cost"
          />
        </Field>
      </div>

      {/* Price Factors */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Price Factor Cards ({(pf.factors || []).length})
          </label>
          <AddButton
            onClick={() => addItem("priceFactors.factors", { title: "", description: "", number: (pf.factors || []).length + 1 })}
            label="Add Price Factor"
          />
        </div>

        {(pf.factors || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-400">No price factors added yet. Click &quot;Add Price Factor&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(pf.factors || []).map((factor, i) => (
              <ItemCard
                key={i}
                title={factor.title || `Price Factor ${i + 1}`}
                onDelete={() => removeItem("priceFactors.factors", i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <Field label="#" className="md:col-span-2">
                    <input
                      type="number"
                      value={factor.number ?? i + 1}
                      onChange={(e) => updateArrayItem("priceFactors.factors", i, "number", parseInt(e.target.value) || i + 1)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Factor Title" required className="md:col-span-5">
                    <input
                      type="text"
                      value={factor.title || ""}
                      onChange={(e) => updateArrayItem("priceFactors.factors", i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Number of Grafts Required"
                    />
                  </Field>
                  <Field label="Short Description" className="md:col-span-5">
                    <input
                      type="text"
                      value={factor.description || ""}
                      onChange={(e) => updateArrayItem("priceFactors.factors", i, "description", e.target.value)}
                      className={inputCls}
                      placeholder="Brief explanation..."
                    />
                  </Field>
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </div>

      {/* EMI Plans */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-3">
          <Field label="EMI Section Badge">
            <input
              type="text"
              value={pf.emiBadge || ""}
              onChange={(e) => updateField("priceFactors.emiBadge", e.target.value)}
              className={inputCls}
              placeholder="e.g. Easy EMI Options"
            />
          </Field>
          <Field label="EMI Section Heading">
            <input
              type="text"
              value={pf.emiHeading || ""}
              onChange={(e) => updateField("priceFactors.emiHeading", e.target.value)}
              className={inputCls}
              placeholder="e.g. Affordable EMI Plans Available"
            />
          </Field>
        </div>

        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            EMI / Financing Plans ({(pf.emiPlans || []).length})
          </label>
          <AddButton
            onClick={() => addItem("priceFactors.emiPlans", { bank: "", tenure: "", interest: "", monthly: "" })}
            label="Add EMI Plan"
          />
        </div>

        {(pf.emiPlans || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">No EMI plans added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(pf.emiPlans || []).map((plan, i) => (
              <ItemCard
                key={i}
                title={plan.bank ? `${plan.bank} — ${plan.tenure || "EMI Plan"}` : `EMI Plan ${i + 1}`}
                onDelete={() => removeItem("priceFactors.emiPlans", i)}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Field label="Bank / Provider">
                    <input
                      type="text"
                      value={plan.bank || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "bank", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. HDFC Bank"
                    />
                  </Field>
                  <Field label="Tenure">
                    <input
                      type="text"
                      value={plan.tenure || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "tenure", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 12 Months"
                    />
                  </Field>
                  <Field label="Interest Rate">
                    <input
                      type="text"
                      value={plan.interest || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "interest", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 0% / 12%"
                    />
                  </Field>
                  <Field label="Monthly Amount">
                    <input
                      type="text"
                      value={plan.monthly || ""}
                      onChange={(e) => updateArrayItem("priceFactors.emiPlans", i, "monthly", e.target.value)}
                      className={`${inputCls} font-semibold text-indigo-600`}
                      placeholder="e.g. ₹3,500/mo"
                    />
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
