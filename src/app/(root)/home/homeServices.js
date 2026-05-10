"use client";

import Image from "next/image";
import { useState } from "react";
import Service1 from "../../../../public/uploads/service-one.jpg";
import Service2 from "../../../../public/uploads/service-two.jpg";
import Service3 from "../../../../public/uploads/service-three.jpg";

const cards = [
  {
    title: "Turkey's Best Technique",
    description:
      "We bring Turkey's most advanced hair restoration methods to India, delivering precise, natural-looking results that set us apart.",
    image: Service1,
  },
  {
    title: "90% Graft Survival",
    description:
      "Our graft survival rate exceeds 90% — nearly double the industry average — ensuring every follicle grows into permanent, healthy hair.",
    image: Service2,
  },
  {
    title: "Completely Pain-Free",
    description:
      "Using ultra-fine 1mm instruments in a sterile environment, our procedures are comfortable and safe, performed by certified doctors only.",
    image: Service3,
  },
  {
    title: "12 Years Strong",
    description:
      "Trusted by thousands of patients across Delhi, Mumbai, and Hyderabad, Ryan Clinic has built its reputation on consistent, lasting results.",
    image: Service1,
  },
];

export default function WhyRyanSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#fff5ec] py-10 md:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 mb-6 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 flex-1">
            What Makes <br /> Us The Best
          </h2>
          <p className="flex-1 text-gray-600 text-sm sm:text-base md:text-[17px] md:pt-6 leading-relaxed">
            At Ryan Clinic, excellence is not a promise — it&apos;s our track
            record. From Turkey&apos;s finest techniques to 12+ years of trusted
            results, here&apos;s why thousands choose us for their hair
            restoration journey.
          </p>
        </div>

        {/* ── Accordion Cards ── */}
        {/*
          Mobile  : flex-col, height-based expansion (h-[520px] container)
          Desktop : flex-row, width-based expansion  (h-[480px] container)
        */}
        <div className="flex flex-col md:flex-row h-140 sm:h-140 md:h-120 lg:h-130">
          {cards.map((card, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  flex: isActive ? 3 : 1,
                  transition: "flex 0.5s ease",
                }}
                className="relative overflow-hidden m-1.5 sm:m-2 md:m-3 lg:m-4 rounded-xl md:rounded-2xl cursor-pointer min-w-0 min-h-0"
              >
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 767px) 90vw, 30vw"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? "bg-linear-to-t from-red-600/70 via-red-600/30 to-transparent"
                      : "bg-linear-to-t from-red-600/90 via-red-600/50 to-transparent"
                  }`}
                />

                {/* Yellow top bar */}
                <div
                  className={`absolute top-0 left-0 h-0.75 bg-[#FFC107] transition-all duration-500 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />

                {/* Red left accent */}
                <div
                  className={`absolute left-0 top-0 w-0.75 h-full bg-[#D32F2F] transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6">

                  {/* Number */}
                  <span className="text-[#FFC107] text-3xl sm:text-4xl md:text-5xl font-bold tracking-[4px] uppercase mb-1.5 md:mb-2">
                    0{index + 1}
                  </span>

                  {/* Divider */}
                  <div
                    className={`h-px bg-[#FFC107] mb-2 md:mb-3 transition-all duration-500 ${
                      isActive ? "w-16 md:w-20 opacity-100" : "w-12 md:w-18 opacity-40"
                    }`}
                  />

                  {/* Title */}
                  <h3
                    className={`text-white font-hind font-semibold leading-snug transition-all duration-500 ${
                      isActive
                        ? "text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3"
                        : "text-sm sm:text-base mb-0"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Description + CTA */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-white text-xs sm:text-sm leading-relaxed mb-3 md:mb-4">
                      {card.description}
                    </p>

                    <a
                      href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I visited your website. Please guide me with the best treatment."
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 sm:px-4 py-2 bg-[#FFC107] text-black transition-all duration-300 hover:bg-yellow-400 active:scale-95"
                    >
                      Book Free Consult →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}