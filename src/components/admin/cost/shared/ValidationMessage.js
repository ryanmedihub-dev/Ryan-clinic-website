"use client";

import { AlertCircle } from "lucide-react";

export default function ValidationMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-red-600 animate-fadeIn">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
