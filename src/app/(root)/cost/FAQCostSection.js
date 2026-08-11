"use client";

import { useState } from "react";
import useTrackCTA from "@/lib/useTrackCTA";

export default function FAQCostSection({
  heading = "",
  faqs = [],
  pageType = "hair-transplant",
  cityName = "Delhi",
  description = "",
  stats = null,
  whatsappUrl = "",
}) {
  const [open, setOpen] = useState(0);
  const trackCTA = useTrackCTA();

  const isPrp = pageType === "prp";

  const defaultDescription = isPrp
    ? `Everything you need to know about PRP hair treatment costs in ${cityName} — session pricing, packages, what affects cost, and maintenance.`
    : `Everything you need to know about hair transplant costs in ${cityName} — per-graft pricing, EMI plans, procedure breakdown, and hidden charge guarantees.`;

  const defaultStats = isPrp
    ? [
        { num: "Doctor-Led", label: "PRP Treatment" },
        { num: "3–4", label: "Sessions in Course" },
        { num: "0% EMI", label: "Available Plans" },
        { num: "100%", label: "Written Cost Guarantee" },
      ]
    : [
        { num: "₹40–₹120", label: "Per Graft Price" },
        { num: "0% EMI", label: "Interest-Free Plans" },
        { num: "100%", label: "Written Cost Guarantee" },
        { num: "18 Months", label: "Free Follow-Up" },
      ];

  const targetWaUrl =
    whatsappUrl ||
    `https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(
      isPrp
        ? `Hi, I want a free PRP consultation in ${cityName}`
        : `Hi, I want a free hair transplant consultation in ${cityName}`
    )}`;

  const activeStats = stats && stats.length > 0 ? stats : defaultStats;
  const activeDescription = description || defaultDescription;

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg-main, #ffffff)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── Left sticky panel ── */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-8 h-px"
                style={{ background: "var(--primary-red, #D32F2F)" }}
              />
              <span
                className="text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ color: "var(--primary-red, #D32F2F)" }}
              >
                Cost &amp; Pricing FAQs
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: "var(--text-primary, #111827)" }}
            >
              {heading || (
                <>
                  Frequently
                  <br />
                  Asked <span style={{ color: "var(--primary-red, #D32F2F)" }}>Questions</span>
                </>
              )}
            </h2>

            <p
              className="text-sm md:text-base leading-relaxed mb-8 font-sans"
              style={{ color: "var(--text-muted, #4B5563)" }}
            >
              {activeDescription}
            </p>

            {/* Trust stats card */}
            <div
              className="rounded-2xl p-6 mb-6 shadow-sm"
              style={{
                background: "var(--bg-card, #F9FAFB)",
                border: "1px solid var(--border-light, #E5E7EB)",
              }}
            >
              <div className="grid grid-cols-2 gap-5">
                {activeStats.map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: "var(--primary-red, #D32F2F)" }}
                    >
                      {s.num || s.value}
                    </p>
                    <p
                      className="text-[11px] font-medium mt-0.5"
                      style={{ color: "var(--text-muted, #6B7280)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={targetWaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm py-4 px-7 rounded-xl text-white w-full justify-center transition-all shadow-lg hover:opacity-95"
              style={{ background: "var(--primary-red, #D32F2F)", boxShadow: "0 4px 14px rgba(211,47,47,0.3)" }}
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Cost Ask A Doctor", buttonLocation: "Cost FAQ Section" })}
            >
              Ask a Doctor on WhatsApp
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>

          {/* ── Right accordion ── */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ border: "1px solid var(--border-light, #E5E7EB)" }}
            >
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    style={{
                      borderBottom:
                        i < faqs.length - 1
                          ? "1px solid var(--border-light, #E5E7EB)"
                          : "none",
                    }}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors cursor-pointer"
                      style={{
                        background: isOpen
                          ? "rgba(211,47,47,0.03)"
                          : "#ffffff",
                      }}
                    >
                      {/* Number + question */}
                      <div className="flex items-start gap-4 min-w-0">
                        <span
                          className="text-[11px] font-bold tracking-[0.12em] shrink-0 pt-0.5"
                          style={{
                            color: isOpen
                              ? "var(--primary-red, #D32F2F)"
                              : "#9CA3AF",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-semibold text-sm md:text-[15px] leading-snug"
                          style={{
                            color: isOpen
                              ? "var(--primary-red, #D32F2F)"
                              : "#1F2937",
                          }}
                        >
                          {faq.q}
                        </span>
                      </div>

                      {/* Toggle icon */}
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200"
                        style={{
                          background: isOpen
                            ? "var(--primary-red, #D32F2F)"
                            : "transparent",
                          borderColor: isOpen
                            ? "var(--primary-red, #D32F2F)"
                            : "#D1D5DB",
                          color: isOpen ? "#ffffff" : "#6B7280",
                        }}
                      >
                        <svg
                          className="w-3 h-3 transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          style={{
                            transform: isOpen
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen ? "400px" : "0",
                        opacity: isOpen ? 1 : 0,
                        background: isOpen ? "rgba(211,47,47,0.02)" : "transparent",
                      }}
                    >
                      <div className="px-6 pb-5 pl-14">
                        {/* Red accent rule */}
                        <span
                          className="block w-6 h-0.5 mb-3 rounded-full"
                          style={{ background: "var(--primary-red, #D32F2F)" }}
                        />
                        {typeof faq.a === "string" && faq.a.includes("<") ? (
                          <div
                            className="text-sm leading-relaxed text-gray-600 prose max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                            dangerouslySetInnerHTML={{ __html: faq.a }}
                          />
                        ) : (
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#4B5563" }}
                          >
                            {faq.a}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom note */}
            <p
              className="text-xs mt-6 text-center font-sans"
              style={{ color: "#6B7280" }}
            >
              {isPrp
                ? "Have a specific question about your PRP treatment or cost? "
                : "Have a specific question about your graft requirement? "}
              <a
                href={targetWaUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline"
                style={{ color: "var(--primary-red, #D32F2F)" }}
                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Cost FAQ Chat With Doctor", buttonLocation: "Cost FAQ Section" })}
              >
                Chat directly with our doctor on WhatsApp →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
