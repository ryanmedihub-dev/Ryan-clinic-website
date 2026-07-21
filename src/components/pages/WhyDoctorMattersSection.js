"use client";

// WhyDoctorMattersSection.js
// Usage: <WhyDoctorMattersSection risks={[{number,title,body,type:'check'|'warn'}]} comparison={[{aspect,doctorLed,techLed}]} />
// Icons are derived from the `type` field; all text fields can come from DB.
import useTrackCTA from "@/lib/useTrackCTA";

const CHECK_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const WARN_ICON = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const DEFAULT_RISKS = [
  { number: "01", title: "Confirm who operates", body: "Always verify that a qualified, registered hair transplant doctor performs your surgery — not a technician. At Ryan Clinic, every step — extraction, channel creation, and implantation — is done exclusively by a certified doctor.", type: "check", icon: CHECK_ICON },
  { number: "02", title: "Beware of ₹15–25 per graft quotes", body: "Very low per-graft pricing almost always signals technician-led, rushed work. A hair transplant is permanent — and a poor result is very hard to correct. Never book on price alone without verifying the surgeon.", type: "warn", icon: WARN_ICON },
  { number: "03", title: "Check for a sterile facility", body: "Confirm single-use, surgical-grade instruments and a properly maintained operating theatre. Poor hygiene and reused tools are avoidable risks. Ryan Clinic operates in a NABH-compliant, fully sterile OT — always.", type: "check", icon: CHECK_ICON },
  { number: "04", title: "Expect realistic survival figures", body: "Be wary of any clinic claiming '100% guaranteed' graft survival. Ryan Clinic achieves 90%+ graft survival — one of the highest in India — but we'll never mislead you with impossible promises.", type: "warn", icon: WARN_ICON },
  { number: "05", title: "Review genuine before/after cases", body: "Ask for real, consented patient cases — not stock photos. Ryan Clinic's 500+ verified Google reviews and 10,000+ documented procedures are available for you to inspect before booking.", type: "check", icon: CHECK_ICON },
];

const DEFAULT_COMPARISON = [
  { aspect: "Who operates",    doctorLed: "Certified doctor at every step",          techLed: "Technician performs extraction + implant" },
  { aspect: "Graft survival",  doctorLed: "90%+ (Ryan Clinic standard)",             techLed: "Often 50–70% — rushed, less precise" },
  { aspect: "Naturalness",     doctorLed: "Precise angle, depth & direction",        techLed: "Variable — uneven, patchy results" },
  { aspect: "Safety",          doctorLed: "Sterile OT, single-use instruments",      techLed: "Risk of infection, poor hygiene" },
  { aspect: "Accountability",  doctorLed: "Licensed, registered, legally liable",    techLed: "No medical accountability" },
  { aspect: "Price signal",    doctorLed: "₹40–₹120 per graft (transparent)",        techLed: "₹15–25 per graft (corner-cutting)" },
];

export default function WhyDoctorMattersSection({ risks: risksOverride, comparison: comparisonOverride }) {
  const trackCTA = useTrackCTA();
  const risks = risksOverride?.length
    ? risksOverride.map((r) => ({ ...r, icon: r.type === "warn" ? WARN_ICON : CHECK_ICON }))
    : DEFAULT_RISKS;
  const comparison = comparisonOverride?.length ? comparisonOverride : DEFAULT_COMPARISON;
  return (
    <section className="py-20 bg-[#F7F5F2]">
      <div className="containerFull px-4 md:px-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            Protect Yourself
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              Why a{" "}
              <span className="text-[#D32F2F]">Doctor-Led</span>
              {" "}Clinic Matters
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
              A hair transplant is permanent — so a poor result is too. The biggest risks come from clinics cutting corners to offer the lowest price. Here's how to protect yourself.
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 shrink-0">
            <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span className="text-[12px] font-semibold text-amber-800">Always verify before you book</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-12">

          {/* ── Left: Checklist ── */}
          <div className="flex flex-col gap-4">
            {risks.map((item) => (
              <div
                key={item.number}
                className={`flex gap-4 bg-white rounded-2xl p-5 border shadow-xs transition-transform hover:-translate-y-0.5 ${
                  item.type === "warn" ? "border-amber-200" : "border-gray-100"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.type === "warn" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-[#D32F2F]"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black tracking-[0.15em] shrink-0 ${item.type === "warn" ? "text-amber-600" : "text-[#D32F2F]"}`}>
                      {item.number}
                    </span>
                    <p className="font-bold text-sm text-gray-900 leading-snug">{item.title}</p>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: Comparison table ── */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">

              {/* Column headers */}
              <div className="grid grid-cols-3 border-b border-gray-100">
                <div className="px-4 py-4 bg-gray-50 flex items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Aspect</span>
                </div>

                {/* Doctor-led */}
                <div className="px-4 py-4 border-l border-red-100 relative" style={{ background: "rgba(211,47,47,0.03)" }}>
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-[#D32F2F]" />
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <svg className="w-3 h-3 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#D32F2F]">Doctor-Led</p>
                  </div>
                  <p className="text-[9px] text-gray-400">Ryan Clinic</p>
                </div>

                {/* Technician */}
                <div className="px-4 py-4 border-l border-gray-100 bg-amber-50/50">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">Technician</p>
                  </div>
                  <p className="text-[9px] text-gray-400">Common elsewhere</p>
                </div>
              </div>

              {/* Rows */}
              {comparison.map((row, i) => (
                <div key={row.aspect} className="grid grid-cols-3 border-t border-gray-50">
                  <div className={`px-4 py-3.5 flex items-start ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                    <span className="text-[12px] font-semibold text-gray-700 leading-snug">{row.aspect}</span>
                  </div>
                  <div
                    className="px-4 py-3.5 border-l border-red-100"
                    style={{ background: i % 2 === 0 ? "rgba(211,47,47,0.025)" : "rgba(211,47,47,0.04)" }}
                  >
                    <p className="text-[11.5px] leading-snug font-medium text-[#D32F2F]">{row.doctorLed}</p>
                  </div>
                  <div className={`px-4 py-3.5 border-l border-gray-50 ${i % 2 === 0 ? "bg-amber-50/30" : "bg-amber-50/50"}`}>
                    <p className="text-[11.5px] leading-snug text-amber-800">{row.techLed}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-400 mt-4 text-center leading-relaxed">
              At Ryan Clinic, every procedure is 100% doctor-led.{" "}
              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20verify%20your%20surgeon%20credentials%20before%20booking"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#D32F2F] underline underline-offset-2"
                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Why Doctor Matters Inline Verify", buttonLocation: "Why Doctor Matters Section" })}
              >
                Ask us to verify →
              </a>
            </p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-wrap gap-3 justify-center">
          <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20verify%20your%20surgeon%20credentials%20before%20booking"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-7 text-sm tracking-wide transition-colors rounded-xl"
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "Why Doctor Matters Verify", buttonLocation: "Why Doctor Matters Section" })}
          >
            Book at a Doctor-Led Clinic →
          </a>
          <a
            href="/blog/doctor-led-vs-technician-hair-transplant/"
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-4 px-7 text-sm tracking-wide transition-all rounded-xl"
            onClick={() => trackCTA({ type: "page_view", ctaName: "Doctor vs Technician Guide", buttonLocation: "Why Doctor Matters Section" })}
          >
            Doctor vs Technician Guide →
          </a>
        </div>
      </div>
    </section>
  );
}
