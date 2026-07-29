"use client";

import { useState } from "react";
import useTrackCTA from "@/lib/useTrackCTA";

const faqs = [
  {
    q: "What is the cost of hair transplant in Delhi?",
    a: "Hair transplant cost in Delhi at Ryan Clinic ranges from ₹40,000 to ₹1,50,000 depending on the number of grafts required. We offer fully transparent per-graft pricing with zero hidden charges. Book a free consultation to get your personalised cost estimate.",
  },
  {
    q: "What is Turkey Sapphire FUE hair transplant?",
    a: "Turkey Sapphire FUE is an advanced hair transplant technique using sapphire-tipped blades instead of conventional steel. This creates smaller, more precise incisions — resulting in minimal tissue trauma, faster healing, denser graft packing, and significantly more natural-looking results.",
  },
  {
    q: "Why is Ryan Clinic the best hair transplant clinic in Delhi?",
    a: "Ryan Clinic is India's only clinic exclusively specialising in Turkey Sapphire FUE — Delhi's most advanced hair transplant technique. Every surgery is performed by certified doctors (never technicians), with 95%+ graft survival rates, natural hairline design, and complete pricing transparency.",
  },
  {
    q: "How many grafts do I need for a hair transplant?",
    a: "Graft count depends on your Norwood baldness grade. Grade 2–3 typically needs 1,000–2,000 grafts; Grade 4–5 needs 2,000–3,500 grafts; Grade 6–7 may need 4,000+ grafts. Our doctors assess your donor density and scalp condition during a free consultation before recommending a count.",
  },
  {
    q: "Is hair transplant permanent?",
    a: "Yes. Transplanted grafts are taken from the DHT-resistant donor area at the back and sides of the scalp, meaning they will not fall out due to pattern baldness. The transplanted hair grows naturally and permanently for life.",
  },
  {
    q: "What is the recovery time after hair transplant at Ryan Clinic?",
    a: "With Sapphire FUE, most patients return to desk work within 5–7 days. Scabs fall off by day 10. Shock shedding at 3–4 weeks is completely normal. New growth begins at 3–4 months, significant density at 6–9 months, and final results are visible at 12–18 months.",
  },
  {
    q: "Is the procedure painful?",
    a: "The procedure is performed under local anaesthesia — only the initial injections cause a brief sting. The surgery itself is completely painless. Most patients watch movies or listen to music throughout. Post-procedure mild soreness is easily managed with prescribed medication.",
  },
  {
    q: "Can women get hair transplant at Ryan Clinic?",
    a: "Absolutely. Ryan Clinic offers hair transplant for women with female pattern hair loss, traction alopecia, or high hairline concerns. We offer no-shave and partial-shave options for complete discretion — you can resume normal life almost immediately.",
  },
  {
    q: "How is Sapphire FUE better than regular FUE?",
    a: "Sapphire FUE uses precious sapphire-stone blades to create V-shaped micro incisions instead of conventional steel punches. This means less scalp trauma, faster healing, higher graft density per session, and far more natural-looking results — the gold standard in modern hair transplantation.",
  },
  {
    q: "What is the success rate of hair transplant at Ryan Clinic?",
    a: "Ryan Clinic consistently achieves over 95% graft survival rate — well above the industry average of 60–70%. This is due to precise extraction, minimal out-of-body time for grafts, the original Turkey Choi Pen technique, and expert implantation by certified hair restoration doctors.",
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
              Frequently
              <br />
              Asked{" "}
              <span style={{ color: "var(--primary-red)" }}>Questions</span>
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
              href="https://api.whatsapp.com/send?phone=+919911111247&text=Hi, I have a question about hair transplant at Ryan Clinic."
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
                href="https://api.whatsapp.com/send?phone=+919911111247&text=Hi, I have a question about hair transplant."
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
