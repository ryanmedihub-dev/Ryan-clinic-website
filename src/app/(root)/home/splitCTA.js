"use client";

import Link from "next/link";
import useTrackCTA from "@/lib/useTrackCTA";

export function SplitCTA() {
  const trackCTA = useTrackCTA();
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* ── Left card — main CTA copy ── */}
          <div className="flex flex-col justify-between rounded-2xl p-2 md:p-8">
            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                <span className="text-[11px] font-semibold text-[#D32F2F] uppercase tracking-[0.18em]">
                  Ryan Clinic
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-[1.2] tracking-tight mb-4">
                Start Your Hair
                <br />
                Transplant Journey
                <br />
                <span className="text-[#D32F2F]">Today — Free Consult</span>
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed mb-7">
                Turkey's exclusive Sapphire FUE, 10,000+ patients, 4.9★ Google
                rating. Get your free scalp analysis, exact graft count &amp;
                cost breakdown — zero obligation.
              </p>

              {/* Mini stats */}
              <div className="flex gap-6 mb-7">
                {[
                  { num: "12+", label: "Years" },
                  { num: "4.9★", label: "Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-xl font-bold text-[#D32F2F]">{s.num}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I want a free hair transplant consultation"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-5 text-sm tracking-wide transition-colors rounded-xl flex-1"
                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Split CTA Book Consultation", buttonLocation: "Split CTA Section" })}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Book Free Consultation
              </a>
              <a
                href="tel:+919911111247"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-5 text-sm tracking-wide transition-all rounded-xl"
                onClick={() => trackCTA({ type: "call", ctaName: "Split CTA Call Now", buttonLocation: "Split CTA Section" })}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>

          {/* ── Center — large image ── */}
          <div className="relative rounded-2xl overflow-hidden min-h-90 bg-red-900">
            <div className="absolute inset-0 bg-linear-to-b from-red-500 to-red-900" />
            {/* Decorative */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: 'url("/uploads/images/image2.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#FFC107] text-black text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest rounded-md">
                Our Specialist
              </span>
            </div>

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent pt-16 pb-5 px-5 z-10">
              <p className="text-white text-xs font-semibold uppercase tracking-wider">
                Real Patient Result
              </p>
              <p className="text-gray-400 text-[10px] mt-1">
                3,200 grafts · Sapphire FUE · 14 months · Delhi
              </p>
            </div>

            {/* Placeholder label */}

          </div>

          {/* ── Right card — feature highlight ── */}
          <div className="flex flex-col justify-between bg-red-700 rounded-2xl p-7 md:p-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-semibold text-[#FFC107] uppercase tracking-[0.18em]">
                  Why Ryan Clinic?
                </span>
                <div className="w-8 h-8 rounded-full bg-[#D32F2F] flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                Results So Natural —<br />
                <span className="text-[#FFC107]">Nobody Will Know</span>
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Every graft is placed with precise control over angle, depth
                &amp; direction — mimicking your natural hair growth pattern
                exactly.
              </p>

              <ul className="space-y-2.5 mb-7">
                {[
                  "Original Turkey Choi Pen",
                  "90%+ graft survival rate",
                  "Zero visible scarring",
                  "Permanent for life",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-xs text-gray-300"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#FFC107] flex items-center justify-center shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-[#FFC107] text-gray-300 hover:text-[#FFC107] font-semibold py-3.5 px-5 text-sm tracking-wide transition-all rounded-xl w-full"
            >
              View All Patient Results →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}