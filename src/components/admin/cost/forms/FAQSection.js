"use client";

import { HelpCircle } from "lucide-react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, AddButton, ItemCard } from "../shared/CostFormUI";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const sunEditorOptions = {
  height: "220px",
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
  imageUploadUrl: "/api/upload",
};

export default function FAQSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const faq = formData.faq || {};

  return (
    <SectionCard
      icon={HelpCircle}
      title="16. Frequently Asked Questions"
      subtitle="FAQ accordion items with rich-text answers for the cost page"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge">
          <input
            type="text"
            value={faq.badge || ""}
            onChange={(e) => updateField("faq.badge", e.target.value)}
            className={inputCls}
            placeholder="e.g. FAQ"
          />
        </Field>
        <Field label="Section Heading">
          <input
            type="text"
            value={faq.heading || ""}
            onChange={(e) => updateField("faq.heading", e.target.value)}
            className={inputCls}
            placeholder="e.g. Common Questions About Hair Transplant Cost"
          />
        </Field>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            FAQ Items ({(faq.items || []).length})
          </label>
          <AddButton
            onClick={() =>
              addItem("faq.items", {
                question: "",
                answer: "",
                displayOrder: (faq.items || []).length,
                active: true,
              })
            }
            label="Add FAQ Item"
          />
        </div>

        {(faq.items || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <p className="text-xs text-gray-400">No FAQ items added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(faq.items || []).map((item, i) => (
              <ItemCard
                key={i}
                title={item.question || `FAQ Item ${i + 1}`}
                onDelete={() => removeItem("faq.items", i)}
              >
                <Field label="Question" required>
                  <input
                    type="text"
                    value={item.question || ""}
                    onChange={(e) => updateArrayItem("faq.items", i, "question", e.target.value)}
                    className={`${inputCls} font-semibold`}
                    placeholder="Enter the FAQ question"
                    required
                  />
                </Field>

                <Field label="Answer (Rich Text)">
                  <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden">
                    <SunEditor
                      setContents={item.answer || ""}
                      onChange={(val) => updateArrayItem("faq.items", i, "answer", val)}
                      setOptions={sunEditorOptions}
                    />
                  </div>
                </Field>

                <Field label="Display Order">
                  <input
                    type="number"
                    value={item.displayOrder ?? i}
                    onChange={(e) => updateArrayItem("faq.items", i, "displayOrder", parseInt(e.target.value) || 0)}
                    className={`${inputCls} w-32`}
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
