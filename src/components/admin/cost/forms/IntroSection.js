"use client";

import { FileText } from "lucide-react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, AddButton, ItemCard } from "../shared/CostFormUI";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const sunEditorOptions = {
  height: "250px",
  buttonList: [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor"],
    ["align", "horizontalRule", "list", "table"],
    ["link", "image", "video"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview", "print"],
  ],
  defaultStyle: "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:16px;",
  imageUploadUrl: "/api/upload/editor",
};

export default function IntroSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const intro = formData.intro || {};

  return (
    <SectionCard
      icon={FileText}
      title="5. Introduction & Cost Summary Rows"
      subtitle="Overview text, badges, and quick summary breakdown rows"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Small Badge">
          <input
            type="text"
            value={intro.badge || ""}
            onChange={(e) => updateField("intro.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. TRANSPARENT PRICING"
          />
        </Field>

        <Field label="Section Heading">
          <input
            type="text"
            value={intro.heading || ""}
            onChange={(e) => updateField("intro.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. What Determines Hair Transplant Cost?"
          />
        </Field>
      </div>

      <Field label="Description (Rich Text Content)">
        <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden">
          <SunEditor
            setContents={intro.description || ""}
            onChange={(val) => updateField("intro.description", val)}
            setOptions={sunEditorOptions}
          />
        </div>
      </Field>

      {/* Summary Rows */}
      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Cost Summary Rows / Highlights ({(intro.summaryRows || []).length})
          </label>
          <AddButton
            onClick={() => addItem("intro.summaryRows", { label: "", value: "", icon: "" })}
            label="Add Summary Row"
          />
        </div>

        {(intro.summaryRows || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">No summary rows added yet. Click &quot;Add Summary Row&quot; above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(intro.summaryRows || []).map((row, i) => (
              <ItemCard
                key={i}
                title={`Summary Row ${i + 1}`}
                onDelete={() => removeItem("intro.summaryRows", i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field label="Icon / Emoji">
                    <input
                      type="text"
                      value={row.icon || ""}
                      onChange={(e) => updateArrayItem("intro.summaryRows", i, "icon", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 💰 or ✓"
                    />
                  </Field>
                  <Field label="Label">
                    <input
                      type="text"
                      value={row.label || ""}
                      onChange={(e) => updateArrayItem("intro.summaryRows", i, "label", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Average Grafts Needed"
                    />
                  </Field>
                  <Field label="Value">
                    <input
                      type="text"
                      value={row.value || ""}
                      onChange={(e) => updateArrayItem("intro.summaryRows", i, "value", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 2,000 – 4,000 Grafts"
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

