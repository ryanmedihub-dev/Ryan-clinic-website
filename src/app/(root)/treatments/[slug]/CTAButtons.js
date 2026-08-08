"use client";

import { MessageCircle, Phone } from "lucide-react";
import useTrackCTA from "@/lib/useTrackCTA";

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation";
const TEL = "tel:+919911111247";


export default function CTAButtons({ primary = "Book Doctor Consultation", waLink = "", telLink = "", center = false }) {
  const trackCTA = useTrackCTA();
  const wa = waLink || WA;
  const tel = telLink || TEL;

  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-lg shadow-red-200 hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => trackCTA({ type: "whatsapp", ctaName: `Hair Fall: ${primary}`, buttonLocation: "Hair Fall Page Content" })}
      >
        <MessageCircle className="w-4 h-4" />
        {primary}
      </a>
      <a
        href={tel}
        className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#e30a17] text-[#302658] hover:text-[#e30a17] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all duration-200 rounded-xl hover:-translate-y-0.5"
        onClick={() => trackCTA({ type: "call", ctaName: `Hair Fall: Call ${tel.replace("tel:", "")}`, buttonLocation: "Hair Fall Page Content" })}
      >
        <Phone className="w-4 h-4" />
        {tel.startsWith("tel:") ? `Call ${tel.replace("tel:", "")}` : "Call Now"}
      </a>
    </div>
  );
}
