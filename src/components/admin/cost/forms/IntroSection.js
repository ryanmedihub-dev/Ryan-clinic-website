"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

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
  imageUploadUrl: "/api/upload",
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
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Introduction Section</h3>

      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Small Badge</label>
          <input
            type="text"
            value={intro.badge || ""}
            onChange={(e) => updateField("intro.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. TRANSPARENT PRICING"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={intro.heading || ""}
            onChange={(e) => updateField("intro.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="What Determines Hair Transplant Cost?"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Rich Text)</label>
        <SunEditor
          setContents={intro.description || ""}
          onChange={(val) => updateField("intro.description", val)}
          setOptions={sunEditorOptions}
        />
      </div>

      {/* Summary Rows */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addItem("intro.summaryRows", { label: "", value: "", icon: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Summary Row
        </button>

        {(intro.summaryRows || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No summary rows added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(intro.summaryRows || []).map((row, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Summary Row {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("intro.summaryRows", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Icon / Emoji</label>
                    <input
                      type="text"
                      value={row.icon || ""}
                      onChange={(e) => updateArrayItem("intro.summaryRows", i, "icon", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Icon"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Label</label>
                    <input
                      type="text"
                      value={row.label || ""}
                      onChange={(e) => updateArrayItem("intro.summaryRows", i, "label", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Average Grafts"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Value</label>
                    <input
                      type="text"
                      value={row.value || ""}
                      onChange={(e) => updateArrayItem("intro.summaryRows", i, "value", e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. 2,000 Grafts"
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
