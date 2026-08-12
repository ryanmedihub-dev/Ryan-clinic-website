"use client";

import { ShieldCheck } from "lucide-react";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls, AddButton, ItemCard } from "../shared/CostFormUI";

export default function MythsFactsSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const mf = formData.mythsFacts || {};

  return (
    <SectionCard
      icon={ShieldCheck}
      title="13. Myths vs Facts"
      subtitle="Common misconceptions paired with medically accurate facts — use only approved marketing content"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={mf.badge || ""}
            onChange={(e) => updateField("mythsFacts.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. Common Misconceptions"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={mf.heading || ""}
            onChange={(e) => updateField("mythsFacts.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Myths vs Facts about PRP Cost"
          />
        </Field>
      </div>

      <Field label="Section Description" subtitle="optional intro paragraph">
        <textarea
          rows={2}
          value={mf.description || ""}
          onChange={(e) => updateField("mythsFacts.description", e.target.value)}
          className={textareaCls}
          placeholder="Optional intro paragraph..."
        />
      </Field>

      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Myth / Fact Pairs ({(mf.pairs || []).length})
          </label>
          <AddButton
            onClick={() =>
              addItem("mythsFacts.pairs", {
                myth: "",
                fact: "",
                displayOrder: (mf.pairs || []).length,
                active: true,
              })
            }
            label="Add Myth / Fact Pair"
          />
        </div>

        {(mf.pairs || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-400">No myth/fact pairs added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(mf.pairs || []).map((pair, i) => (
              <ItemCard
                key={i}
                title={`Myth/Fact Pair ${i + 1}`}
                active={pair.active}
                onToggleActive={(val) => updateArrayItem("mythsFacts.pairs", i, "active", val)}
                onDelete={() => removeItem("mythsFacts.pairs", i)}
              >
                <Field label="Myth" subtitle="the misconception">
                  <textarea
                    rows={2}
                    value={pair.myth || ""}
                    onChange={(e) => updateArrayItem("mythsFacts.pairs", i, "myth", e.target.value)}
                    className="w-full mt-1.5 px-3.5 py-2.5 border border-red-200 rounded-xl text-sm bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition"
                    placeholder="e.g. PRP is too expensive for regular people"
                  />
                </Field>
                <Field label="Fact" subtitle="the truth">
                  <textarea
                    rows={2}
                    value={pair.fact || ""}
                    onChange={(e) => updateArrayItem("mythsFacts.pairs", i, "fact", e.target.value)}
                    className="w-full mt-1.5 px-3.5 py-2.5 border border-emerald-200 rounded-xl text-sm bg-emerald-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition"
                    placeholder="e.g. A full initial course costs..."
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
