"use client";

import Image from "next/image";
import useTrackCTA from "@/lib/useTrackCTA";

const SURGERIES_DATA = [
  {
    id: "sapphire-fue",
    name: "Turkey Sapphire FUE",
    tag: "MOST POPULAR",
    perGraft: "₹55 – ₹120 / graft",
    totalRange: "₹55,000 – ₹3,50,000",
    image: "/uploads/1752733322451-Hair Transplant 4.jpg",
    description:
      "Gold-standard Sapphire FUE using micro-sapphire blades for microscopic channels, maximum density & zero linear scars.",
    features: [
      "Certified doctor performs procedure",
      "Sapphire micro-blades for precision",
      "95%+ graft survival rate guaranteed",
    ],
    whatsappText: "Hi,%20I%20want%20to%20know%20more%20about%20Sapphire%20FUE%20cost%20at%20Ryan%20Clinic",
  },
  {
    id: "dhi-choi-pen",
    name: Turkish Technique Choi Pen Transplant",
    tag: "PREMIUM",
    perGraft: "₹60 – ₹120 / graft",
    totalRange: "₹60,000 – ₹3,60,000",
    image: "/uploads/1752734248947-Hair Transplant 1.jpg",
    description:
      "Direct Hair Implantation using Choi Implanter Pens for 100% control over hair direction, angle & density.",
    features: [
      "Direct implanter pen insertion",
      "Zero prior channel slitting needed",
      "Ideal for hairline & crown density",
    ],
    whatsappText: "Hi,%20I%20want%20to%20know%20more%20about%20DHI%20Choi%20Pen%20cost%20at%20Ryan%20Clinic",
  },
  {
    id: "standard-fue",
    name: "Classic FUE Hair Transplant",
    tag: "AFFORDABLE",
    perGraft: "₹40 – ₹70 / graft",
    totalRange: "₹40,000 – ₹2,40,000",
    image: "/uploads/1752731223556-FUE 1.jpg",
    description:
      "Time-tested Follicular Unit Extraction offering reliable, seamless results without linear donor scars.",
    features: [
      "Zero linear donor scar",
      "Ideal for Norwood Grade 2 to 5",
      "Doctor-led extraction & planning",
    ],
    whatsappText: "Hi,%20I%20want%20to%20know%20more%20about%20Standard%20FUE%20cost%20at%20Ryan%20Clinic",
  },
  {
    id: "beard-transplant",
    name: "Beard & Moustache Transplant",
    tag: "SPECIALIST",
    perGraft: "₹50 – ₹100 / graft",
    totalRange: "₹50,000 – ₹1,80,000",
    image: "/uploads/1752743220084-Beard Transplant 5.jpg",
    description:
      "Custom facial hair micro-restoration for patchy or thin beards using strategically angled donor micro grafts.",
    features: [
      "Custom cheekline & jawline mapping",
      "Single-hair texture selection",
      "100% permanent growth",
    ],
    whatsappText: "Hi,%20I%20want%20to%20know%20more%20about%20Beard%20Transplant%20cost%20at%20Ryan%20Clinic",
  },
];

export default function SurgeriesCostCardsClient() {
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
                OUR SERVICES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Hair Transplant Procedures Available
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-xl font-sans">
              We offer a full spectrum of hair restoration procedures tailored to your specific needs and budget.
            </p>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20compare%20all%20procedure%20costs"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white text-xs font-bold py-3 px-6 rounded-full shadow-md transition-all"
            onClick={() => trackCTA({ type: "whatsapp", ctaName: "Compare All Procedures Header", buttonLocation: "Procedure Cards Section" })}
          >
            Compare All Procedures →
          </a>
        </div>

        {/* 4 Clean White Cards Grid (No Dark Blue Tint!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SURGERIES_DATA.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-3xl border border-[#E8E4DF] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Top Image Container */}
              {card.image && (
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {card.tag && (
                    <span className="absolute top-3.5 left-3.5 bg-[#e30a17] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {card.tag}
                    </span>
                  )}

                  {card.totalRange && (
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest block">Starting From</span>
                      <span className="text-xl font-black text-white">{card.totalRange.split("–")[0]}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-snug">
                    {card.name}
                  </h3>

                  {card.description && (
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4 font-sans">
                      {card.description}
                    </p>
                  )}

                  {card.features?.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {card.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="w-4 h-4 rounded-full bg-[#e30a17] flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <a
                  href={`https://api.whatsapp.com/send?phone=+919217958539&text=${card.whatsappText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold py-3 px-4 text-xs transition-colors rounded-xl shadow-md shadow-red-600/20 mt-auto"
                  onClick={() => trackCTA({ type: "whatsapp", ctaName: `Procedure Card Click: ${card.name}`, buttonLocation: "Procedure Grid" })}
                >
                  Book Consultation →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
