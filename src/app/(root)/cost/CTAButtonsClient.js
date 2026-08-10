"use client";

import useTrackCTA from "@/lib/useTrackCTA";

const TEL = "tel:+919911111247";

export default function CTAButtonsClient({
  primary = "Get Free Cost Estimate",
  center = false,
  city = "",
  title = "",
  pageType = "hair-transplant",
  whatsappUrl = "",
}) {
  const trackCTA = useTrackCTA();

  const cityName =
    city || (title ? (title.match(/in\s+([A-Za-z\s]+?)(?:\s*[-–,|]|$)/i)?.[1]?.trim() || "") : "");

  const isPrp = pageType === "prp" || (title && title.toLowerCase().includes("prp"));

  const defaultText = isPrp
    ? (cityName
        ? `Hi, I want a free PRP consultation in ${cityName}`
        : "Hi, I want a free PRP consultation")
    : (cityName
        ? `Hi, I want a free hair transplant consultation in ${cityName}`
        : "Hi, I want a free hair transplant consultation");

  const targetWaUrl =
    whatsappUrl ||
    `https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(defaultText)}`;

  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <a
        href={targetWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl shadow-sm"
        onClick={() =>
          trackCTA({
            type: "whatsapp",
            ctaName: `Cost Page: ${primary}`,
            buttonLocation: "Cost Page Content",
          })
        }
      >
        {primary}
      </a>
      <a
        href={TEL}
        className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all rounded-xl"
        onClick={() =>
          trackCTA({
            type: "call",
            ctaName: "Cost Page: Call +91-9911111247",
            buttonLocation: "Cost Page Content",
          })
        }
      >
        Call +91-9911111247
      </a>
    </div>
  );
}
