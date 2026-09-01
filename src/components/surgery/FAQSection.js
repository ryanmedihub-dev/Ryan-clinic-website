"use client";

import { useState } from "react";
import useTrackCTA from "@/lib/useTrackCTA";

const WA =
    "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20have%20a%20question%20about%20hair%20transplant%20surgery";

export default function FAQSection({ 
    faqs = [], 
    heading = "Frequently asked questions about hair transplant doctors in Delhi",
    sectionLabel = "Got Questions?",
    description = "Everything you need to know about hair transplant surgery at Ryan Clinic — costs, procedure, recovery and results. Still have a question? Our doctors answer within 24 hours."
}) {
    const [open, setOpen] = useState(null);
    const trackCTA = useTrackCTA();

    return (
        <section className="py-16 md:py-24" style={{ background: "var(--bg-main)" }} suppressHydrationWarning>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
                {/* ── Two-column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start" suppressHydrationWarning>

                    {/* ── Left sticky panel ── */}
                    <div className="lg:col-span-2 lg:sticky lg:top-28" suppressHydrationWarning>
                        {/* Section label */}
                        <div className="flex items-center gap-3 mb-5">
                            <span
                                className="block w-8 h-px"
                                style={{ background: "var(--primary-red)" }}
                            />
                            <span
                                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                                style={{ color: "var(--primary-red)" }}
                            >
                                {sectionLabel}
                            </span>
                        </div>

                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5"
                            style={{ color: "var(--text-primary)" }}
                            suppressHydrationWarning
                        >
                            {heading}
                        </h2>

                        <p
                            className="text-sm md:text-base leading-relaxed mb-8"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {description}
                        </p>

                        {/* Stats */}
                        <div
                            className="rounded-2xl p-6 mb-6"
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-light)",
                            }}
                        >
                            <div className="grid grid-cols-2 gap-5">
                                {[
                                    { num: "95%+", label: "Graft Survival Rate" },
                                    { num: "4.9★", label: "Google Rating" },
                                    { num: "10K+", label: "Happy Patients" },
                                    { num: "0%", label: "EMI Available" },
                                ].map((s) => (
                                    <div key={s.label}>
                                        <p
                                            className="text-2xl font-bold"
                                            style={{ color: "var(--text-primary)" }}
                                        >
                                            {s.num}
                                        </p>
                                        <p
                                            className="text-[11px] font-medium mt-0.5"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <a
                            href={WA}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl text-white w-full justify-center transition-opacity hover:opacity-90"
                            style={{ background: "var(--primary-red)" }}
                            onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Ask a Doctor", buttonLocation: "FAQ Section" })}
                        >
                            Ask a Doctor — Free
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
                            className="rounded-2xl overflow-hidden"
                            style={{ border: "1px solid var(--border-light)" }}
                        >
                            {faqs.map((faq, i) => {
                                const isOpen = open === i;
                                // Support both { q, a } (doctors page) and { question, answer } (surgery CMS)
                                const question = faq.question || faq.q || "";
                                const answer = faq.answer || faq.a || "";
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            borderBottom:
                                                i < faqs.length - 1
                                                    ? "1px solid var(--border-light)"
                                                    : "none",
                                        }}
                                    >
                                        <button
                                            onClick={() => setOpen(isOpen ? null : i)}
                                            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                                            style={{
                                                background: isOpen
                                                    ? "var(--bg-card)"
                                                    : "var(--bg-main)",
                                            }}
                                        >
                                            {/* Number + question */}
                                            <div className="flex items-start gap-4 min-w-0">
                                                <span
                                                    className="text-[11px] font-semibold tracking-[0.12em] shrink-0 pt-0.5"
                                                    style={{
                                                        color: isOpen
                                                            ? "var(--primary-red)"
                                                            : "var(--border-soft)",
                                                    }}
                                                >
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span
                                                    className="font-semibold text-sm md:text-[15px] leading-snug"
                                                    style={{
                                                        color: isOpen
                                                            ? "var(--text-primary)"
                                                            : "var(--text-secondary)",
                                                    }}
                                                >
                                                    {question}
                                                </span>
                                            </div>

                                            {/* Toggle icon */}
                                            <span
                                                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200"
                                                style={{
                                                    background: isOpen
                                                        ? "var(--primary-red)"
                                                        : "transparent",
                                                    borderColor: isOpen
                                                        ? "var(--primary-red)"
                                                        : "var(--border-soft)",
                                                    color: isOpen ? "#fff" : "var(--text-muted)",
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
                                                maxHeight: isOpen ? "300px" : "0",
                                                opacity: isOpen ? 1 : 0,
                                                background: "var(--bg-card)",
                                            }}
                                        >
                                            <div className="px-6 pb-5 pl-14">
                                                {/* Red accent rule */}
                                                <span
                                                    className="block w-6 h-0.5 mb-3 rounded-full"
                                                    style={{ background: "var(--primary-red)" }}
                                                />
                                                {typeof answer === "string" && answer.includes("<") ? (
                                                    <div
                                                        className="text-sm leading-relaxed text-gray-600 prose max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                                                        dangerouslySetInnerHTML={{ __html: answer }}
                                                    />
                                                ) : (
                                                    <p
                                                        className="text-sm leading-relaxed"
                                                        style={{ color: "var(--text-muted)" }}
                                                    >
                                                        {answer}
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
                            className="text-xs mt-5 text-center"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Can&apos;t find your answer?{" "}
                            <a
                                href={WA}
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold underline"
                                style={{ color: "var(--primary-red)" }}
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Chat on WhatsApp", buttonLocation: "FAQ Section" })}
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
