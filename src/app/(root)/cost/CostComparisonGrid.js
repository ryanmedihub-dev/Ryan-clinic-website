"use client";

import useTrackCTA from "@/lib/useTrackCTA";

const COMPARISON_DATA = [
  {
    technique: "Sapphire FUE",
    tag: "Ryan Specialty",
    perGraft: "₹55 – ₹120",
    scarring: "Zero Linear Scar (Micro Dots)",
    healing: "5 – 7 Days",
    survival: "95%+",
    blade: "Precious Sapphire Stone Micro-blade",
    doctorLed: "100% Doctor Performed",
    bestFor: "Denser packing, micro-incisions, fast recovery",
    highlight: true,
  },
  {
    technique: "Turkish Technique (Choi Pen)",
    tag: "Gold Standard",
    perGraft: "₹60 – ₹120",
    scarring: "Zero Linear Scar",
    healing: "5 – 7 Days",
    survival: "95%+",
    blade: "Choi Implanter Pen",
    doctorLed: "100% Doctor Performed",
    bestFor: "Max hairline control, direct graft insertion",
    highlight: false,
  },
  {
    technique: "Standard FUE",
    tag: "Popular",
    perGraft: "₹40 – ₹70",
    scarring: "Zero Linear Scar",
    healing: "7 – 10 Days",
    survival: "90%+",
    blade: "Steel Micro-Punch",
    doctorLed: "Doctor Supervised",
    bestFor: "Budget-friendly non-scarring option",
    highlight: false,
  },
  {
    technique: "FUT (Strip)",
    tag: "Traditional",
    perGraft: "₹25 – ₹60",
    scarring: "Linear Donor Scar",
    healing: "14 – 21 Days",
    survival: "75% – 85%",
    blade: "Surgical Scalpel Strip",
    doctorLed: "Varies by clinic",
    bestFor: "High graft count on tight budgets",
    highlight: false,
  },
];

export default function CostComparisonGrid() {
  const trackCTA = useTrackCTA();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#D32F2F]">
            Technique Comparison
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Comparing Techniques &amp; <span className="text-[#D32F2F]">Per-Graft Rates</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
              Understand why Sapphire FUE and Turkish Technique command premium per-graft pricing due to blade precision, follicle survival, and rapid healing.
            </p>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPARISON_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                item.highlight
                  ? "bg-red-50/70 border-2 border-[#D32F2F] text-gray-900 shadow-lg scale-[1.02]"
                  : "bg-gray-50 border border-gray-200 text-gray-900 hover:border-gray-300 shadow-xs"
              }`}
            >
              {item.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D32F2F] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Recommended Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    item.highlight ? "bg-[#D32F2F] text-white font-bold" : "bg-gray-200 text-gray-700"
                  }`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1 text-gray-900">
                  {item.technique}
                </h3>

                <div className="mb-6">
                  <span className="text-xs text-gray-500 block font-medium">Price per graft:</span>
                  <span className="text-2xl font-bold text-[#D32F2F]">
                    {item.perGraft}
                  </span>
                </div>

                <ul className="space-y-3.5 text-xs mb-6 border-t pt-4 border-gray-200/80">
                  <li className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Blade Type</span>
                    <span className="font-semibold text-gray-900">{item.blade}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Donor Scarring</span>
                    <span className="font-semibold text-gray-900">{item.scarring}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Healing Time</span>
                    <span className="font-semibold text-gray-900">{item.healing}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Graft Survival Rate</span>
                    <span className="font-semibold text-emerald-700">{item.survival}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Doctor Involvement</span>
                    <span className="font-semibold text-gray-900">{item.doctorLed}</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20compare%20techniques%20and%20costs%20at%20Ryan%20Clinic."
                target="_blank"
                rel="noreferrer"
                className={`w-full inline-flex items-center justify-center text-xs font-bold py-3 px-4 rounded-xl transition-all ${
                  item.highlight
                    ? "bg-[#D32F2F] text-white hover:bg-red-700 shadow-md"
                    : "bg-white border border-gray-300 text-gray-800 hover:border-[#D32F2F] hover:text-[#D32F2F]"
                }`}
                onClick={() => trackCTA({ type: "whatsapp", ctaName: `Compare Technique: ${item.technique}`, buttonLocation: "Technique Comparison Grid" })}
              >
                Discuss {item.technique} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
