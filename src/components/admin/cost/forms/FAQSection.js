"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

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
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Frequently Asked Questions</h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={faq.badge || ""}
            onChange={(e) => updateField("faq.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. FAQ"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={faq.heading || ""}
            onChange={(e) => updateField("faq.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Common Questions About Hair Transplant Cost"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          addItem("faq.items", {
            question: "",
            answer: "",
            displayOrder: (faq.items || []).length,
            active: true,
          })
        }
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm transition cursor-pointer mb-4"
      >
        + Add FAQ Item
      </button>

      {(faq.items || []).length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
          <p className="text-gray-500">No FAQ items added yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {(faq.items || []).map((item, i) => (
            <div key={i} className="border rounded-xl p-6 bg-white shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">FAQ Item {i + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeItem("faq.items", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm font-semibold cursor-pointer"
                >
                  Delete FAQ
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Question *</label>
                  <input
                    type="text"
                    value={item.question || ""}
                    onChange={(e) => updateArrayItem("faq.items", i, "question", e.target.value)}
                    className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter FAQ Question"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Answer (Rich Text)</label>
                  <SunEditor
                    setContents={item.answer || ""}
                    onChange={(val) => updateArrayItem("faq.items", i, "answer", val)}
                    setOptions={sunEditorOptions}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Display Order</label>
                  <input
                    type="number"
                    value={item.displayOrder ?? 0}
                    onChange={(e) => updateArrayItem("faq.items", i, "displayOrder", parseInt(e.target.value) || 0)}
                    className="w-full mt-2 p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
