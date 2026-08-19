"use client";

// DifferencesSection.js
// Usage: <DifferencesSection features={[{label, fut:{value,bad?}, fue:{value}, sapphire:{value}}]} />
import useTrackCTA from "@/lib/useTrackCTA";

const DEFAULT_FEATURES = [
  { label: "Scarring", fut: { value: "Linear donor scar", bad: true }, fue: { value: "Tiny dot scars only" }, sapphire: { value: "Tiny dots + finer channels" } },
  { label: "Healing Speed", fut: { value: "Slowest (stitches)", bad: true }, fue: { value: "Faster — no stitches" }, sapphire: { value: "Fastest — sapphire precision" } },
  { label: "Naturalness", fut: { value: "Good" }, fue: { value: "Very Good" }, sapphire: { value: "Most natural / undetectable" } },
  { label: "Graft Density", fut: { value: "High (one session)" }, fue: { value: "High" }, sapphire: { value: "High with less trauma" } },
  { label: "Recovery Time", fut: { value: "10–14 days", bad: true }, fue: { value: "7–10 days" }, sapphire: { value: "5–7 days" } },
  { label: "Pain Level", fut: { value: "Moderate (sutures)", bad: true }, fue: { value: "Low" }, sapphire: { value: "Lowest" } },
  { label: "Graft Survival", fut: { value: "~70–80%" }, fue: { value: "~75–85%" }, sapphire: { value: "90%+ (Ryan Clinic)" } },
  { label: "Best For", fut: { value: "Very large / budget cases" }, fue: { value: "Most patients" }, sapphire: { value: "Best result + fast recovery" } },
];

export default function DifferencesSection({ features: featuresOverride }) {
  const trackCTA = useTrackCTA();
  const features = featuresOverride?.length ? featuresOverride : DEFAULT_FEATURES;
  return (
    <section className="py-20 bg-[#F7F5F2]">
      <div className="containerFull px-4 md:px-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            Technique Comparison
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              FUE vs FUT vs{" "}
              <span className="text-[#D32F2F]">Sapphire FUE</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
              For most patients, Sapphire FUE offers the best balance of natural results, density, and quick recovery.
            </p>
          </div>

          {/* Recommended badge */}
          <div className="inline-flex items-center gap-3 bg-gray-900 rounded-2xl px-5 py-3.5 shrink-0">
            <svg className="w-5 h-5 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
            </svg>
            <div>
              <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wide">Our Recommendation</p>
              <p className="text-sm font-bold text-white">Sapphire FUE</p>
            </div>
          </div>
        </div>

        {/* ── Desktop: comparison table ── */}
        <div className="hidden md:block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-8">
          {/* Column headers */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="px-5 py-4 bg-gray-50 flex items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Feature</span>
            </div>

            {/* FUT */}
            <div className="px-5 py-4 border-l border-gray-100">
              <p className="text-sm font-bold text-gray-900 mb-0.5">FUT</p>
              <p className="text-xs text-gray-400">Strip Method</p>
            </div>

            {/* Standard FUE */}
            <div className="px-5 py-4 border-l border-gray-100">
              <p className="text-sm font-bold text-gray-900 mb-0.5">Standard FUE</p>
              <p className="text-xs text-gray-400">Steel Punch Method</p>
            </div>

            {/* Sapphire FUE — highlighted */}
            <div className="px-5 py-4 border-l border-red-100 relative" style={{ background: "rgba(211,47,47,0.03)" }}>
              <div className="absolute top-0 inset-x-0 h-0.5 bg-[#D32F2F]" />
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-bold text-[#D32F2F]">Sapphire FUE</p>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#D32F2F] text-white uppercase tracking-wide">Best</span>
              </div>
              <p className="text-xs text-gray-400">Ryan Clinic · Original Choi Pen</p>
            </div>
          </div>

          {/* Rows */}
          {features.map((row, i) => (
            <div key={i} className="grid grid-cols-4 border-t border-gray-50">
              <div className={`px-5 py-3.5 flex items-center ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <span className="text-sm font-semibold text-gray-700">{row.label}</span>
              </div>

              <div className={`px-5 py-3.5 flex items-center border-l border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <span className={`text-sm leading-snug ${row.fut.bad ? "text-amber-700" : "text-gray-600"}`}>
                  {row.fut.value}
                </span>
              </div>

              <div className={`px-5 py-3.5 flex items-center border-l border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <span className="text-sm leading-snug text-blue-700">{row.fue.value}</span>
              </div>

              <div
                className="px-5 py-3.5 flex items-center border-l border-red-100"
                style={{ background: i % 2 === 0 ? "rgba(211,47,47,0.025)" : "rgba(211,47,47,0.045)" }}
              >
                <span className="text-sm font-semibold text-[#D32F2F] leading-snug">{row.sapphire.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="md:hidden flex flex-col gap-4 mb-8">
          {/* Sapphire FUE — featured card */}
          <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#D32F2F] shadow-lg">
            <div className="bg-[#D32F2F] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Sapphire FUE</p>
                <p className="text-[11px] text-white/60">Ryan Clinic · Original Choi Pen</p>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/20 text-white uppercase tracking-wide">
                Recommended
              </span>
            </div>
            <div>
              {features.map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between px-5 py-3 border-t border-red-50"
                  style={{ background: i % 2 === 0 ? "#fff" : "rgba(211,47,47,0.02)" }}
                >
                  <span className="text-xs font-semibold text-gray-500 w-28 shrink-0">{row.label}</span>
                  <span className="text-sm font-semibold text-[#D32F2F] text-right leading-snug">{row.sapphire.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FUE & FUT compact */}
          {[
            { title: "Standard FUE", sub: "Steel Punch Method", key: "fue", textColor: "text-blue-700" },
            { title: "FUT Strip", sub: "Strip Method", key: "fut", textColor: "text-amber-700" },
          ].map((tech) => (
            <div key={tech.title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900">{tech.title}</p>
                <p className="text-xs text-gray-400">{tech.sub}</p>
              </div>
              {features.slice(0, 6).map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between px-5 py-2.5 border-t border-gray-50"
                  style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}
                >
                  <span className="text-xs text-gray-400 w-28 shrink-0">{row.label}</span>
                  <span className={`text-sm text-right leading-snug ${tech.textColor}`}>
                    {row[tech.key].value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-gray-400 mb-8">
          For most patients, Sapphire FUE offers the best combination of natural results, density, and quick recovery.
        </p>

        {/* ── CTA ── */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/fue-hair-transplant"
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-3 px-6 text-sm tracking-wide transition-all rounded-xl"
          >
            About FUE →
          </a>
          <a
            href="/blog/hair-transplant-techniques"
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-3 px-6 text-sm tracking-wide transition-all rounded-xl"
          >
            About FUT →
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20know%20which%20technique%20is%20right%20for%20me"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3 px-6 text-sm tracking-wide transition-colors rounded-xl"
            onClick={() => trackCTA({ type: "whatsapp", ctaName: "Differences Which Technique", buttonLocation: "Differences Section" })}
          >
            Which Is Right for Me? →
          </a>
        </div>
      </div>
    </section>
  );
}
