import Image from "next/image";

const highlights = [
  "Original Turkey Choi Pen — exclusively in India",
  "Certified doctors perform every surgical step",
  "95%+ graft survival rate, far above industry average",
  "Serving Delhi, Mumbai & Hyderabad since 2012",
];

const stats = [
  { num: "12+", label: "Years of Excellence" },
  { num: "10K+", label: "Successful Procedures" },
  { num: "95%+", label: "Graft Survival Rate" },
  { num: "4.9★", label: "Google Rating" },
];

export default function TurkeySpecialists() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "var(--bg-soft)" }}
    >
      <div className="max-w-8xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4 md:mb-8">
          <span className="block w-8 h-px" style={{ background: "var(--primary-red)" }} />
          <span
            className="text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: "var(--primary-red)" }}
          >
            Our Specialists
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left — images ── */}
          <div className="relative">
            {/* Primary image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/uploads/turkey-1.jpeg"
                alt="Ryan Clinic Turkey Specialist"
                width={640}
                height={480}
                className="w-full h-80 md:h-175 object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                }}
              />
              {/* Bottom badge */}
              <div className="absolute bottom-5 left-5 right-5">
                <span
                  className="block w-8 h-0.5 mb-2 rounded-full"
                  style={{ background: "var(--accent-gold)" }}
                />
                <p className="text-white font-bold text-lg leading-snug">
                  Turkey's Original Technique — Now in India
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--accent-gold-light)" }}
                >
                  Exclusively at Ryan Clinic
                </p>
              </div>
            </div>

            {/* Floating secondary image */}
            <div
              className="hidden md:block absolute -bottom-6 -right-6 w-52 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="/uploads/turkey-2.jpeg"
                alt="Ryan Clinic Procedure"
                fill
                className="object-cover"
              />
            </div>

            {/* Red accent bar */}
            <div
              className="absolute top-0 left-0 w-1 h-24 rounded-r-full"
              style={{ background: "var(--primary-red)" }}
            />
          </div>

          {/* ── Right — content ── */}
          <div className="lg:pl-4">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              India's Only
              <br />
              <span style={{ color: "var(--primary-red)" }}>
                Turkey-Certified
              </span>
              <br />
              Hair Specialists
            </h2>

            <p
              className="text-sm md:text-[15px] leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Ryan Clinic is the only clinic in India exclusively operating with
              Turkey's authentic Sapphire FUE technique and the original Choi
              Pen. Our certified doctors trained in Turkey's leading hair
              restoration centres deliver results that are unmatched anywhere
              else in India — combining Turkey-level precision with 12+ years of
              India-specific expertise.
            </p>

            {/* Highlight list */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "var(--primary-red)" }}
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span
                    className="text-sm leading-snug"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "var(--bg-main)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <p
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="text-[10px] font-medium mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I want to learn more about the Turkey technique at Ryan Clinic."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 font-semibold text-sm py-4 px-7 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{
                  background: "var(--primary-red)",
                  boxShadow: "0 4px 14px rgba(227,10,23,0.35)",
                }}
              >
                Book Free Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
              <a
                href="tel:+919217958539"
                className="inline-flex items-center gap-2.5 font-semibold text-sm py-4 px-7 rounded-xl border border-gray-200 text-gray-600 hover:border-[#D32F2F] hover:text-[#D32F2F] transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Now
              </a>
            </div>
            <p
              className="text-[11px] mt-3"
              style={{ color: "var(--text-muted)" }}
            >
              Free scalp analysis · Graft count · Full cost breakdown — zero
              obligation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
