"use client";

import { useState } from "react";
import Link from "next/link";

/* ══════════════════════════════════════════════════════
   SECTION A — Features Overview
══════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════
   SECTION B — Why Choose Us  (premium redesign)
══════════════════════════════════════════════════════ */

const whyItems = [
  {
    title: "India's Only Turkey Sapphire FUE Clinic",
    body: "Ryan Clinic is the exclusive provider of Turkey's authentic Sapphire FUE with the original Choi Pen in India. The same procedure that made Turkey the world's hair transplant capital — delivering sharper sapphire-tipped blades, less scalp trauma, faster healing, and dramatically higher graft survival. No other clinic in India offers this. Now available in Delhi, Mumbai & Hyderabad.",
  },
  {
    title: "90%+ Graft Survival Rate",
    body: "The original Choi Pen minimizes the time grafts spend outside the body during implantation. Combined with our proprietary graft preservation protocol and sapphire blade precision, Ryan Clinic consistently achieves 90%+ graft survival rate — far above the industry average of 60–70%. More surviving grafts means denser, fuller, and more permanent results.",
  },
  {
    title: "100% Doctor-Led Surgery — No Technicians",
    body: "At Ryan Clinic, every single surgical step — graft extraction, channel creation, and implantation — is performed exclusively by certified doctors. We never allow technicians to perform any surgical procedure. This is rare across Indian clinics, and it is the single biggest reason our hair transplant results in Delhi, Mumbai, and Hyderabad are consistently superior.",
  },
  {
    title: "Completely Pain-Free Procedure",
    body: "Our Sapphire FUE uses micro-instruments of just 0.7–0.9mm diameter. Combined with premium local anaesthesia, the hair transplant procedure is virtually pain-free from start to finish. Most patients watch movies, listen to music, or nap comfortably throughout the 6–8 hour surgery. Zero general anaesthesia. Zero hospital admission.",
  },
  {
    title: "Natural-Looking, Undetectable Results",
    body: "Every graft at Ryan Clinic is placed with precise control over angle, depth, and direction — mimicking the exact natural hair growth pattern unique to each patient. The result is hair that grows, waves, and parts exactly like it always did. After a Ryan Clinic hair transplant, even your barber won't know. That is our standard — not our promise.",
  },
  {
    title: "Transparent Pricing + 0% EMI Available",
    body: "Hair transplant at Ryan Clinic starts from ₹35,000. Your complete cost — based on exact graft count after free scalp analysis — is confirmed before you commit to anything. No hidden charges. No surprise bills. We offer 0% EMI on 6 and 12-month plans via HDFC, ICICI, and Axis Bank. Affordable hair transplant in Delhi, Mumbai & Hyderabad without compromising on quality.",
  },
  {
    title: "Fastest Recovery — Back to Work in 5–7 Days",
    body: "Ryan Clinic's Sapphire FUE technique creates smaller, more precise recipient channels than traditional steel-blade FUE. This means significantly less tissue trauma, less swelling, and faster scalp healing. Most patients return to desk work within 5–7 days. Strenuous activity resumes at 3 weeks. Full, permanent results are visible at 12–18 months post-procedure.",
  },
  {
    title: "Lifetime Follow-Up Support",
    body: "Our relationship with you does not end at discharge. Ryan Clinic provides free follow-up consultations for 18 months post-procedure across all three branches — Delhi, Mumbai, and Hyderabad. Our dedicated WhatsApp support team is available 7 days a week to answer every recovery question, track your growth progress, and ensure your results are everything you expected.",
  },
  {
    title: "Trusted by Celebrities, Influencers & NRI Patients",
    body: "Ryan Clinic has been trusted by Bollywood actors, Instagram influencers, and public figures for their personal hair restoration journeys. Patients from the UK, Dubai, USA, Canada, and Australia choose Ryan Clinic because Turkey-quality Sapphire FUE results at Indian prices is an opportunity available nowhere else. Over 10,000 successful procedures across Delhi, Mumbai & Hyderabad speak for themselves.",
  },
  {
    title: "Sterile OT Standards & NABH-Compliant Facility",
    body: "Every hair transplant at Ryan Clinic is performed in a fully sterile, NABH-compliant operation theatre. All instruments are single-use and surgical-grade. Our clinical protocols meet international OT hygiene standards — the same standards applied in Turkey's leading hair transplant centres. Your safety is not a checkbox at Ryan Clinic. It is the foundation everything else is built on.",
  },
];



export default function WhyChooseUs() {
  const [open, setOpen] = useState(0);

  return (
    <section className=" py-16 md:py-24">
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
              Here's Why
              <br />
              <span className="text-[#D32F2F]">10,000+ Patients</span>
              <br />
              Choose Ryan Clinic
            </h2>
            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md">
              Ryan Clinic stands out as the ultimate choice in hair restoration
              — combining Turkey's finest technique with 12+ years of
              India-specific expertise.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { num: "90%+", label: "Graft Survival Rate" },
                { num: "12+", label: "Years of Excellence" },
                { num: "0%", label: "EMI Available" },
                { num: "4.9★", label: "Google Rating" },
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

            {/* Image panel placeholder */}
            <div className="relative bg-red-900 rounded-2xl overflow-hidden h-60 sm:h-80 flex items-end">
              {/* linear overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-red-200 to-red-300" />
              {/* Decorative lines */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    'url("uploads/one.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Bottom text */}
              <div className="relative z-10 p-6 w-full">
                <p className="text-black/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-1">
                  Clinic / Doctor Image
                </p>
                <p className="text-black text-bold text-sm leading-snug max-w-xs">
                  We understand that hair loss can significantly impact your
                  confidence.
                </p>
              </div>
              {/* Red accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D32F2F]" />
            </div>
          </div>

          {/* ── Right panel — numbered accordion ── */}
          <div>
            <div className="divide-y divide-gray-100">
              {whyItems.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-start gap-5 py-6 text-left group"
                  >
                    {/* Number */}
                    <span
                      className={`text-xs font-semibold tracking-[0.15em] shrink-0 pt-0.5 transition-colors duration-200 ${
                        open === i
                          ? "text-[#D32F2F]"
                          : "text-gray-600 group-hover:text-[#D32F2F]"
                      }`}
                    >
                      0{i + 1}
                    </span>

                    {/* Title + toggle */}
                    <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                      <span
                        className={`font-semibold text-sm md:text-base leading-snug tracking-tight transition-colors duration-200 ${
                          open === i
                            ? "text-gray-900"
                            : "text-gray-700 group-hover:text-gray-900"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                          open === i
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
                              open === i ? "rotate(45deg)" : "rotate(0deg)",
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

                  {/* Body */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
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
                  href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I want a free hair transplant consultation"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-7 text-sm tracking-wide transition-colors rounded-xl justify-center"
                >
                  Book Free Consultation
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
                <a
                  href="tel:+919217958539"
                  className="inline-flex items-center gap-3 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-4 px-7 text-sm tracking-wide transition-all rounded-xl justify-center"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call Now
                </a>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Free scalp analysis · Graft count · Full cost breakdown — zero
                obligation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

