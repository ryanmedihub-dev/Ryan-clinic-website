"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const defaultOptions = {
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
  defaultStyle: "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:15px; color:#1f2937;",
  imageUploadUrl: "/api/upload",
};

export default function RichTextEditor({ label, value = "", onChange, height = "250px", placeholder = "" }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-gray-700">{label}</label>}
      <div className="rounded-xl overflow-hidden border border-gray-300">
        <SunEditor
          setContents={value}
          onChange={onChange}
          placeholder={placeholder}
          setOptions={{ ...defaultOptions, height }}
        />
      </div>
    </div>
  );
}
