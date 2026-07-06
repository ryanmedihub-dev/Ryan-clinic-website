"use client";

import { useState } from "react";

/* ══════════════════════════════════════════════════════
   WHY CHOOSE US
══════════════════════════════════════════════════════ */

function getWhyItems(city) {
  return [
    {
      title: "100% Doctor-Led Surgery — Never Technicians",
      body: `This is the most important thing to verify at any ${city} clinic. At Ryan Clinic, every surgical step — extraction, channel creation, and implantation — is performed by a certified hair transplant doctor in ${city}. We never hand any part of your surgery to a technician. Technician-led surgery is a leading cause of poor survival and unnatural hairlines across India — and it's exactly what we refuse to do.`,
    },
    {
      title: "95%+ Graft Survival Rate",
      body: "Using the original Choi Pen and a careful graft-preservation protocol, our grafts spend minimal time outside the body. The result is a graft survival rate of 95%+ — well above the Indian industry average of roughly 60–70%. Higher graft survival means denser, fuller, and more natural-looking hair.",
    },
    {
      title: "Sterile, Surgical-Grade Operating Theatre",
      body: "Every procedure is performed in a sterile operating theatre with single-use, surgical-grade instruments while following recognised safety standards. Patient safety, hygiene, and precision remain at the heart of every procedure we perform.",
    },
    {
      title: "Transparent Pricing & 0% EMI",
      body: "Your complete cost — based on your exact graft count after a free scalp analysis — is confirmed before you commit. No hidden charges. Hair transplant procedures start from ₹40,000, with 0% EMI available on both 6 and 12-month plans.",
    },
    {
      title: "18-Month Follow-Up Support",
      body: "Ryan Clinic provides free follow-up consultations for 18 months after your procedure. Our WhatsApp support team is available 7 days a week to answer your questions, monitor progress, and help ensure the best possible outcome from your hair transplant.",
    },
    {
      title: "Fastest Recovery — Back to Work in 5–7 Days",
      body: "Ryan Clinic's Sapphire FUE technique creates smaller, more precise recipient channels than traditional steel-blade FUE. This means significantly less tissue trauma, less swelling, and faster scalp healing. Most patients return to desk work within 5–7 days. Strenuous activity resumes at 3 weeks. Full, permanent results are visible at 12–18 months post-procedure.",
    },
    {
      title: "Lifetime Follow-Up Support",
      body: `Our relationship with you does not end at discharge. Ryan Clinic provides free follow-up consultations for 18 months post-procedure across all our branches. Our dedicated WhatsApp support team is available 7 days a week to answer every recovery question, track your growth progress, and ensure your results are everything you expected.`,
    },
    {
      title: "Trusted by Celebrities, Influencers & NRI Patients",
      body: `Ryan Clinic has been trusted by Bollywood actors, Instagram influencers, and public figures for their personal hair restoration journeys. Patients from the UK, Dubai, USA, Canada, and Australia choose Ryan Clinic because Turkey-quality Sapphire FUE results at Indian prices is an opportunity available nowhere else. Over 10,000 successful procedures across India speak for themselves.`,
    },
    {
      title: "Sterile OT Standards & NABH-Compliant Facility",
      body: "Every hair transplant at Ryan Clinic is performed in a fully sterile, NABH-compliant operation theatre. All instruments are single-use and surgical-grade. Our clinical protocols meet international OT hygiene standards — the same standards applied in Turkey's leading hair transplant centres. Your safety is not a checkbox at Ryan Clinic. It is the foundation everything else is built on.",
    },
  ];
}

export default function WhyChooseUs({ city = "Delhi" }) {
  const [open, setOpen] = useState(0);
  const whyItems = getWhyItems(city);

  return (
    <section className="py-16 md:py-24 bg-[#fff5ec]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section top label */}
        <div className="flex items-center gap-3 mb-4 md:mb-8">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            Why Choose Ryan Clinic
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Left panel ── */}
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Why Ryan Clinic Is
              <br />
              <span className="text-[#D32F2F]">
                The Best Hair Transplant
                <br />
              </span>
              Clinic In {city}
            </h2>

            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md">
              Among the many options for a hair transplant in {city}, here's what
              makes Ryan Clinic the choice of 10,000+ patients.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { num: "10,000+", label: "Patients Treated" },
                { num: "95%+", label: "Graft Survival Rate" },
                { num: "₹40,000", label: "Starting Price" },
                { num: "18 Months", label: "Follow-Up Support" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-1"
                >
                  <span className="text-2xl font-bold text-gray-900">
                    {s.num}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Clinic image */}
            <div className="relative rounded-2xl overflow-hidden h-60 sm:h-72 shadow-sm border border-gray-100">
              <img
                src="/uploads/gallery.jpg"
                alt={`Ryan Clinic Hair Transplant ${city}`}
                className="w-full h-full object-cover object-top"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
                }}
              />

              <div className="absolute inset-y-0 left-0 w-1 bg-[#D32F2F]" />

              <div className="absolute bottom-0 inset-x-0 p-5">
                <span className="block w-6 h-0.5 mb-2 rounded-full bg-yellow-400/80" />
                <p className="text-sm font-bold text-white leading-snug">
                  Trusted By 10,000+ Patients
                </p>
                <p className="text-[11px] text-white/55 mt-0.5">
                  {city} Hair Transplant Specialists
                </p>
              </div>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div>
            <div className="divide-y divide-gray-100">
              {whyItems.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-start gap-5 py-6 text-left group"
                  >
                    <span
                      className={`text-xs font-semibold tracking-[0.15em] shrink-0 pt-0.5 transition-colors duration-200 ${open === i
                        ? "text-[#D32F2F]"
                        : "text-gray-600 group-hover:text-[#D32F2F]"
                        }`}
                    >
                      0{i + 1}
                    </span>

                    <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                      <span
                        className={`font-semibold text-sm md:text-base leading-snug tracking-tight transition-colors duration-200 ${open === i
                          ? "text-gray-900"
                          : "text-gray-700 group-hover:text-gray-900"
                          }`}
                      >
                        {item.title}
                      </span>

                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${open === i
                          ? "bg-[#D32F2F] border-[#D32F2F] text-white"
                          : "border-gray-200 text-gray-400 group-hover:border-gray-400"
                          }`}
                      >
                        <svg
                          className="w-3 h-3 transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          style={{
                            transform:
                              open === i
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
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="pl-10 pb-6 text-xs md:text-sm text-gray-500 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=919217958539&text=Hi,%20I%20want%20a%20free%20scalp%20analysis%20in%20${encodeURIComponent(city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-7 text-sm tracking-wide transition-colors rounded-xl justify-center"
                >
                  Book Your Free Scalp Analysis

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

                <a
                  href="tel:+919911111247"
                  className="inline-flex items-center gap-3 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-4 px-7 text-sm tracking-wide transition-all rounded-xl justify-center"
                >
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  Call Now
                </a>
              </div>

              <p className="text-[11px] text-gray-400 mt-3">
                Free scalp analysis · Personalized graft count · Transparent
                pricing · No obligation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

