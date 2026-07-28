"use client";

import useTrackCTA from "@/lib/useTrackCTA";

const GRAFT_TIERS = [
  {
    grafts: "1,000 – 1,500 Grafts",
    norwood: "Norwood Grade 2 – 3",
    cost: "₹45,000 – ₹75,000",
    coverage: "Frontal hairline recession & temples",
    duration: "4 – 5 Hours (Single Day)",
    badge: "STARTER PACKAGE",
    details: "Ideal for early hairline recession or defining an age-appropriate hairline with natural hair density.",
    featured: false,
  },
  {
    grafts: "2,000 – 2,500 Grafts",
    norwood: "Norwood Grade 3 – 4",
    cost: "₹1,00,000 – ₹1,50,000",
    coverage: "Frontal hairline + mid-scalp core",
    duration: "6 – 7 Hours (Single Day)",
    badge: "STANDARD PACKAGE",
    details: "Most popular choice for Norwood Grade III-IV hair loss with complete hairline reconstruction.",
    featured: true,
  },
  {
    grafts: "3,000 – 3,500 Grafts",
    norwood: "Norwood Grade 4 – 5",
    cost: "₹1,70,000 – ₹2,20,000",
    coverage: "Frontal third + mid-scalp + crown",
    duration: "8 – 9 Hours (Single Day)",
    badge: "ADVANCED PACKAGE",
    details: "For Grade IV-V hair loss offering comprehensive scalp coverage and high graft density preservation.",
    featured: false,
  },
  {
    grafts: "4,000 – 5,000 Grafts",
    norwood: "Norwood Grade 5 – 7",
    cost: "₹2,50,000 – ₹3,80,000",
    coverage: "Full scalp & crown reconstruction",
    duration: "9 – 10 Hours (Single / Staged)",
    badge: "PREMIUM PACKAGE",
    details: "For Grade V-VII hair loss offering maximum graft count & complete scalp restoration.",
    featured: false,
  },
];

export default function GraftTierCards() {
  const trackCTA = useTrackCTA();

  return (
    <section className="py-16 md:py-24 bg-[#FAF6F3] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="block w-5 h-px bg-[#e30a17]" />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#e30a17]">
                GRAFT PRICING TIERS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Hair Transplant Cost by Number of Grafts
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 max-w-xl font-sans">
              Choose the graft package that suits your hair loss stage. All packages include doctor consultation, anaesthesia, and post-op care.
            </p>
          </div>
          <div className="shrink-0 bg-white p-1 rounded-full border border-[#E8E4DF] shadow-sm inline-flex items-center gap-1">
            <span className="bg-[#e30a17] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              Graft Packages
            </span>
            <span className="text-gray-600 text-[10px] font-medium px-3 py-1">
              0% EMI
            </span>
          </div>
        </div>

        {/* Clean Light Pricing Cards Grid (No Dark Blue!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GRAFT_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl ${
                tier.featured
                  ? "border-2 border-[#e30a17] ring-4 ring-[#e30a17]/10"
                  : "border border-[#E8E4DF]"
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 left-6 right-6 h-1 bg-[#e30a17] rounded-b-full" />
              )}

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#e30a17]">
                    <span className="w-2 h-2 rounded-full bg-[#e30a17]" />
                    {tier.badge}
                  </span>
                  {tier.featured && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#e30a17] px-2.5 py-0.5 rounded-full shadow-sm">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-2xl sm:text-3xl font-black text-[#e30a17] tracking-tight">
                    {tier.cost}
                  </span>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {tier.grafts}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed mb-4 font-sans border-b border-gray-100 pb-3">
                  {tier.details}
                </p>

                {/* CTA Button */}
                <a
                  href={`https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20check%20pricing%20for%20${encodeURIComponent(tier.grafts)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold py-3 px-4 text-xs transition-colors rounded-xl shadow-md shadow-red-600/20 my-2"
                  onClick={() => trackCTA({ type: "whatsapp", ctaName: `Graft Tier Click: ${tier.grafts}`, buttonLocation: "Graft Tier Grid" })}
                >
                  Get Free Quote →
                </a>

                {/* Inclusions */}
                <div className="pt-4 mt-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Inclusions
                  </p>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#e30a17] flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5">✓</span>
                      <span><strong className="text-gray-900 font-semibold">Coverage:</strong> {tier.coverage}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#e30a17] flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5">✓</span>
                      <span><strong className="text-gray-900 font-semibold">Duration:</strong> {tier.duration}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#e30a17] flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5">✓</span>
                      <span>Free pre-op scalp analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#e30a17] flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5">✓</span>
                      <span>Local anaesthesia included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#e30a17] flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5">✓</span>
                      <span>0% EMI Available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
