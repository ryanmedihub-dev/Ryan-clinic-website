"use client";

import { useState } from "react";
import useTrackCTA from "@/lib/useTrackCTA";

const faqs = [
  {
    q: "What is the cost of a hair transplant in Delhi?",
    a: "The cost of a hair transplant in Delhi varies according to the number of grafts required, the extent of hair loss, donor-area quality, technique and treatment complexity. A scalp and graft assessment is the best way to obtain an individual estimate. For detailed pricing, see the Hair Transplant Cost in Delhi page.",
  },
  {
    q: "How many grafts do I need for a hair transplant?",
    a: "The required graft count depends on the size of the thinning or bald area, donor density, hair characteristics, hairline design and desired coverage. A doctor can estimate the graft requirement after examining the scalp and donor area.",
  },
  {
    q: "What is Sapphire FUE hair transplant?",
    a: "Sapphire FUE is an FUE-based hair transplant approach in which sapphire blades are used to create recipient channels for transplanted follicular units. Suitability depends on the individual treatment plan and should be assessed by a qualified clinician.",
  },
  {
    q: "Is a hair transplant permanent?",
    a: "Transplanted follicles are generally selected from donor areas that are more resistant to pattern hair loss. Long-term growth can be durable, but individual outcomes vary and existing non-transplanted hair may continue to thin over time.",
  },
  {
    q: "Is a hair transplant painful?",
    a: "Hair transplant procedures are usually performed under local anaesthesia. Patients may experience pressure, mild discomfort or temporary soreness, and individual experiences vary. Your doctor can explain pain control and aftercare before treatment.",
  },
  {
    q: "How long does a hair transplant procedure take?",
    a: "Procedure time depends on the number of grafts, technique and complexity of the case. Larger sessions generally take longer. The clinic should provide an estimated session duration after graft planning.",
  },
  {
    q: "How long is the recovery after a hair transplant?",
    a: "Early redness, swelling, scabbing or tenderness can occur after a hair transplant. Many patients resume routine non-strenuous activities within several days, but recovery varies. Follow the treating doctor's aftercare instructions for washing, exercise, sun exposure and medication.",
  },
  {
    q: "When will I see hair transplant results?",
    a: "Transplanted hair commonly goes through shedding and regrowth phases. Visible growth develops gradually over several months, while maturation can continue for a year or longer. Timelines vary between patients.",
  },
  {
    q: "How do I choose a hair transplant clinic in Delhi?",
    a: "Compare the treating doctor's qualifications and role in the procedure, donor assessment, hairline planning, hygiene standards, technique, transparent pricing, documented results and follow-up care. Ask who performs each surgical step before booking.",
  },
  {
    q: "Can women get a hair transplant?",
    a: "Some women with suitable donor hair and specific patterns of hair loss may be candidates for hair transplantation. Because female hair loss has multiple possible causes, clinical assessment is important before deciding on surgery.",
  },
  {
    q: "What is the difference between FUE and Sapphire FUE?",
    a: "FUE describes the individual extraction of follicular units from the donor area. Sapphire FUE commonly refers to using sapphire blades during recipient-channel creation. The appropriate technique depends on the treatment plan and the clinician's assessment.",
  },
  {
    q: "Where is Ryan Clinic located in Delhi?",
    a: "Ryan Clinic lists its Delhi centre in Pitampura, New Delhi. Keep the exact address, phone number and opening hours consistent across the website, Google Business Profile and structured data.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  const trackCTA = useTrackCTA();

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg-main)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── Left sticky panel ── */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
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
                Got Questions?
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Hair Transplant in{" "}
              <span style={{ color: "var(--primary-red)" }}>Delhi – FAQs</span>
            </h2>

            <p
              className="text-sm md:text-base leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Everything you need to know about hair transplant at Ryan Clinic
              — costs, procedure, recovery and results. Still have a question?
              Our doctors answer within 24 hours.
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
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I have a question about hair transplant at Ryan Clinic."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl text-white w-full justify-center transition-opacity hover:opacity-90"
              style={{ background: "var(--primary-red)" }}
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Ask A Doctor", buttonLocation: "FAQ Section" })}
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
                          {faq.q}
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
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {faq.a}
                        </p>
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
              Can't find your answer?{" "}
              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I have a question about hair transplant."
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
                style={{ color: "var(--primary-red)" }}
                onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Chat With Doctor", buttonLocation: "FAQ Section" })}
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
