"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useTrackCTA from "@/lib/useTrackCTA";


const DEFAULT_WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation";

const DEFAULT_STATS = [
  { num: "8+", label: "Causes We Screen For" },
  { num: "3–6", label: "Months to Results" },
  { num: "12+", label: "Years of Experience" },
  { num: "0%", label: "EMI Available" },
];

export default function FAQHairFallSection({
  faqs = [],
  heading = "Frequently Asked Questions",
  description = "Everything you need to know about hair fall causes, diagnosis, and treatment at Ryan Clinic. Still unsure? Our doctors answer within 24 hours.",
  stats = DEFAULT_STATS,
  waLink = "",
}) {
  const [open, setOpen] = useState(null);
  const trackCTA = useTrackCTA();
  const WA = waLink || DEFAULT_WA;
  const STATS = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── Left sticky panel ── */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-[#e30a17]" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#e30a17]">
                Got Questions?
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 text-[#302658]">
              {heading}
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-500">
              {description}
            </p>

            <div className="rounded-2xl p-6 mb-6 bg-[#F7F5F2] border border-[#E0D8CF]">
              <div className="grid grid-cols-2 gap-5">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-[#302658]">{s.num}</p>
                    <p className="text-[11px] font-medium mt-0.5 text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl text-white w-full justify-center transition-all hover:-translate-y-0.5 bg-[#e30a17] hover:bg-red-700"
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Ask a Doctor", buttonLocation: "Hair Fall FAQ Section" })}
            >
              Ask a Doctor — Free
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* ── Right accordion ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className={i < faqs.length - 1 ? "border-b border-gray-200" : ""}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${isOpen ? "bg-[#F7F5F2]" : "bg-white"}`}
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <span className={`text-[11px] font-semibold tracking-[0.12em] shrink-0 pt-0.5 ${isOpen ? "text-[#e30a17]" : "text-gray-300"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`font-semibold text-sm md:text-[15px] leading-snug ${isOpen ? "text-[#302658]" : "text-gray-700"}`}>
                          {faq.q}
                        </span>
                      </div>
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200"
                        style={{
                          background: isOpen ? "#e30a17" : "transparent",
                          borderColor: isOpen ? "#e30a17" : "#D6CFC7",
                          color: isOpen ? "#fff" : "#666",
                        }}
                      >
                        <svg
                          className="w-3 h-3 transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out bg-[#F7F5F2]"
                      style={{ maxHeight: isOpen ? "400px" : "0", opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="px-6 pb-5 pl-14">
                        <span className="block w-6 h-0.5 mb-3 rounded-full bg-[#e30a17]" />
                        <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs mt-5 text-center text-gray-500">
              Can&apos;t find your answer?{" "}
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline text-[#e30a17]"
                onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Chat on WhatsApp", buttonLocation: "Hair Fall FAQ Section" })}
              >
                Chat with our doctor on WhatsApp →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
