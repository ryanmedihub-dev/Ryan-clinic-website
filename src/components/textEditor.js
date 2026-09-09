"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />,
});

export default function TextEditor({
  value = "",
  onChange,                // (html) => void
  onReady,                 // optional: (instance) => void
  height = "400px",
  imageUploadUrl = "/api/upload/editor",
  placeholder = "Start writing...",
  options = {},            // optional extra SunEditor options
}) {
  const editorRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [didInject, setDidInject] = useState(false);

  const handleGetInstance = (instance) => {
    editorRef.current = instance;
    setReady(true);
    if (typeof onReady === "function") onReady(instance);
  };

  // Inject initial value ONCE after ready
  useEffect(() => {
    if (ready && !didInject) {
      try {
        editorRef.current && editorRef.current.setContents && editorRef.current.setContents(value || "");
        setDidInject(true);
      } catch (e) {
        console.error("SunEditor initial setContents failed:", e);
      }
    }
  }, [ready, didInject, value]);

  // Keep in sync if parent value changes later (e.g., switching records)
  useEffect(() => {
    if (!ready) return;
    try {
      const current = (editorRef.current && editorRef.current.getContents && editorRef.current.getContents()) || "";
      if (value !== current) {
        editorRef.current && editorRef.current.setContents && editorRef.current.setContents(value || "");
      }
    } catch (e) {
      console.error("SunEditor setContents on value update failed:", e);
    }
  }, [value, ready]);

  return (
    <div className="w-full">
      <SunEditor
        getSunEditorInstance={handleGetInstance}
        onChange={(html) => onChange && onChange(html)}
        setOptions={{
          height,
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
          defaultStyle:
            "font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif; font-size:16px;",
          ...(imageUploadUrl ? { imageUploadUrl } : {}),
          ...options,
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
