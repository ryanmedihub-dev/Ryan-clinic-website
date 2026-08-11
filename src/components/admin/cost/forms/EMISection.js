"use client";

import { CreditCard } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, AddButton, ItemCard } from "../shared/CostFormUI";

export default function EMISection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const pf = formData.priceFactors || {};

  return (
    <SectionCard
      icon={CreditCard}
      title="14. EMI & Payment Options"
      subtitle="Configure 0% EMI financing plans, section heading, and bank options"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={pf.emiBadge || ""}
            onChange={(e) => updateField("priceFactors.emiBadge", e.target.value)}
            className={inputCls}
            placeholder="e.g. 0% EMI Available"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={pf.emiHeading || ""}
            onChange={(e) => updateField("priceFactors.emiHeading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Flexible Monthly Installment Plans"
          />
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-3">
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
            <p className="text-xs text-gray-400">No EMI plans added yet. Click &quot;Add EMI Plan&quot; above.</p>
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
                      placeholder="e.g. 0% Interest"
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
