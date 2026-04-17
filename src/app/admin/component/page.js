"use client";

import { useState, useCallback } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";
import { Component, Image, Copy, Check, Trash2, Upload } from "lucide-react";

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, type, title, message }]);
  }, []);
  const remove = useCallback((id) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  return { toasts, remove, success: (t, m) => add("success", t, m), error: (t, m) => add("error", t, m) };
}

export default function ComponentsPage() {
  const toast = useToast();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const handleUpload = (url) => {
    setUploadedUrl(url);
    setHistory((prev) => [{ url, ts: Date.now() }, ...prev].slice(0, 10));
    toast.success("Image Uploaded!", "Your image is ready to use.");
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Copied!", "Image URL copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const removeFromHistory = (ts) => {
    setHistory((prev) => prev.filter((item) => item.ts !== ts));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Component className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Tools & Components</h1>
            <p className="text-xs text-gray-500">Image uploader and utility tools</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Image Uploader Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Upload className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Image Uploader</h2>
              <p className="text-xs text-gray-500">Upload images to Cloudinary and get shareable URLs</p>
            </div>
          </div>

          <div className="p-6">
            <ImageUploader onUpload={handleUpload} initialImage={uploadedUrl} />

            {uploadedUrl && (
              <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">Uploaded URL</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={uploadedUrl}
                    readOnly
                    className="flex-1 text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono truncate focus:outline-none"
                  />
                  <button
                    onClick={() => copyUrl(uploadedUrl)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload History */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-gray-500" />
                <h2 className="font-bold text-gray-900">Upload History</h2>
              </div>
              <span className="text-xs text-gray-400">{history.length} image{history.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="divide-y divide-gray-50">
              {history.map((item) => (
                <div key={item.ts} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/60 transition-colors group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                  />
                  <span className="flex-1 text-xs text-gray-500 font-mono truncate">{item.url}</span>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyUrl(item.url)}
                      className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeFromHistory(item.ts)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      title="Remove from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 text-sm mb-3">Upload Tips</h3>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              Recommended banner size: <strong className="text-gray-700">1200×630px</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              Use <strong className="text-gray-700">WebP or JPEG</strong> format for best performance
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              Keep file size under <strong className="text-gray-700">2MB</strong> for fast page loads
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              Copy the URL and paste it directly into blog or service image fields
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
