"use client";

import useTrackCTA from "@/lib/useTrackCTA";

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20know%20the%20exact%20hair%20transplant%20cost%20in%20Delhi";
const TEL = "tel:+919911111247";

export default function CTAButtonsClient({ primary = "Get Free Cost Estimate", center = false }) {
  const trackCTA = useTrackCTA();

  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <a
        href={WA}
        className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl"
        onClick={() => trackCTA({ type: "whatsapp", ctaName: `Cost Page: ${primary}`, buttonLocation: "Cost Page Content" })}
      >
        {primary}
      </a>
      <a
        href={TEL}
        className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all rounded-xl"
        onClick={() => trackCTA({ type: "call", ctaName: "Cost Page: Call +91-9911111247", buttonLocation: "Cost Page Content" })}
      >
        Call +91-9911111247
      </a>
    </div>
  );
}
