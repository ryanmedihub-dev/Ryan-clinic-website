// RecoveryTimeline.js
// Usage: <RecoveryTimeline phases={[{period,phase,color,progress,points:[],tip}]} />
// Icons are built-in and cycle by index; all text fields can be overridden from DB.

const DEFAULT_TIMELINE = [
  {
    period: "Day 1 – 10",
    phase: "Initial Healing",
    color: "#D32F2F",
    points: [
      "Mild redness and tiny scabs form around grafts",
      "Scabs naturally fall off by ~day 10",
      "Mild forehead swelling for 2–3 days — completely normal",
      "Return to desk work in 5–7 days",
    ],
    tip: "Avoid touching, picking or wetting the grafts in the first 48 hours.",
    progress: 15,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    period: "Week 2 – 4",
    phase: "Shock Shedding",
    color: "#b45309",
    points: [
      "Transplanted hairs begin to shed — this is completely normal",
      "Follicles remain healthy and intact beneath the scalp",
      "Do NOT panic — this is expected and temporary",
      "Avoid gym and strenuous activity for ~3 weeks",
    ],
    tip: "Shock shedding is not failure — follicles are going dormant before the growth phase.",
    progress: 30,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    period: "Month 3 – 4",
    phase: "New Growth Begins",
    color: "#15803d",
    points: [
      "Fine, soft new hairs emerge from transplanted follicles",
      "Growth is slow but steady — expect gradual improvement",
      "Hair may appear thin at first — this is normal",
      "Resume all normal activities including gym",
    ],
    tip: "Photograph your progress monthly — it helps you see how far you've come.",
    progress: 55,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    period: "Month 6 – 9",
    phase: "Noticeable Density",
    color: "#1d4ed8",
    points: [
      "Clear, visible improvement in hair density",
      "Hairline shape becomes defined and natural-looking",
      "Hair thickens and gains texture and body",
      "Most patients see 60–70% of final results by month 9",
    ],
    tip: "PRP therapy during this phase can accelerate growth — ask your doctor.",
    progress: 75,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    period: "Month 12 – 18",
    phase: "Final Results",
    color: "#D32F2F",
    points: [
      "Full, mature, permanent results are now visible",
      "Hair grows, waves, and parts naturally",
      "Completely undetectable — even to your barber",
      "Permanent results for life (DHT-resistant donor follicles)",
    ],
    tip: "Your results are permanent. Follow up with your doctor for hair health maintenance.",
    progress: 100,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

export default function RecoveryTimeline({ phases }) {
  const timeline = phases?.length
    ? phases.map((p, i) => ({ ...p, icon: DEFAULT_TIMELINE[i % DEFAULT_TIMELINE.length].icon }))
    : DEFAULT_TIMELINE;
  return (
    <section className="py-20 bg-white">
      <div className="containerFull px-4 md:px-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            What to Expect
          </span>
        </div>

        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
            Recovery Timeline
            <span className="block text-[#D32F2F]">After Your Transplant</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Month-by-month guide from day 1 scabs to permanent, natural results at 12–18 months.
          </p>
        </div>

        {/* ── Desktop 2-col grid / Mobile single-col ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-0.5 transition-transform"
            >
              {/* Top accent */}
              <div className="h-1" style={{ background: item.color }} />

              <div className="p-5 md:p-6">
                {/* Card header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Step number */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold"
                      style={{ background: item.color }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.2em] block mb-0.5"
                        style={{ color: item.color }}
                      >
                        {item.period}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 leading-tight">{item.phase}</h3>
                    </div>
                  </div>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}12`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium text-gray-400">Progress toward final result</span>
                    <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.progress}%`, background: item.color }}
                    />
                  </div>
                </div>

                {/* Points */}
                <ul className="space-y-2 mb-4">
                  {item.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <svg
                        className="w-3.5 h-3.5 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={item.color}
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[13px] text-gray-600 leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tip */}
                <div
                  className="rounded-xl p-3.5 flex gap-2.5 items-start"
                  style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}
                >
                  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={item.color} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                  <p className="text-[12px] leading-relaxed font-medium" style={{ color: item.color }}>
                    {item.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End cap */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-full px-5 py-2.5">
            <div className="w-3 h-3 rounded-full bg-[#D32F2F]" />
            <p className="text-sm font-semibold text-[#D32F2F]">Permanent, Natural Results for Life</p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20consultation"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-7 text-sm tracking-wide transition-colors rounded-xl"
          >
            Book Free Consultation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
          <a
            href="/blog/hair-transplant-recovery-timeline/"
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-4 px-7 text-sm tracking-wide transition-all rounded-xl"
          >
            Full Recovery Guide →
          </a>
        </div>
      </div>
    </section>
  );
}
