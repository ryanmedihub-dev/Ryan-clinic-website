import Link from "next/link";


export function SplitCTA() {
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

            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I want a free hair transplant consultation"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-5 text-sm tracking-wide transition-colors rounded-xl w-full"
            >
              Book Free Consultation
            </a>
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
                backgroundPosition : "center",
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
              href="/results"
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