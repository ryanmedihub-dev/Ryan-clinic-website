"use client";

import Image from "next/image";
import Link from "next/link";

export default function PageBanner({
  title,
  description,
  breadcrumbLabel,
  bgImage,
}) {
  const crumbText = breadcrumbLabel || title || "";

  return (
    <section className="relative w-full min-h-[500px] md:h-[550px] overflow-hidden flex items-center">

      {/* ✅ MOBILE: FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={bgImage || "/uploads/banner.jpg"}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ✅ DESKTOP: RIGHT IMAGE */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-[40%] lg:w-[35%]">
        <Image
          src={bgImage || "/uploads/banner.jpg"}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ✅ LEFT CONTENT */}
      <div className="absolute inset-0 flex">
        <div
          className="w-full md:w-[65%] h-full relative flex items-center"
          style={{
            background:
              "linear-gradient(135deg, #2b0b0b 0%, #8B1414 40%, #D32F2F 85%)",
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          {/* DESKTOP CLIP PATH */}
          <div
            className="hidden md:block absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 85% 0, 70% 100%, 0% 100%)",
              background:
                "linear-gradient(135deg, #2b0b0b 0%, #8B1414 40%, #D32F2F 85%)",
            }}
          />

          {/* GRID */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* CONTENT */}
          <div className="relative z-10 px-5 md:px-16 py-16 md:py-20 text-white max-w-xl">
            
            {/* Breadcrumb */}
            <p className="text-xs uppercase tracking-widest text-white/60 mb-4">
              Home / {crumbText}
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-white/70 mb-6">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a className="bg-[#D32F2F] px-5 py-3 rounded-lg text-sm font-semibold hover:bg-red-700">
                WhatsApp Us
              </a>
              <a className="border border-white/40 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-white/10">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ❌ HIDE ICON ON MOBILE */}
      <div className="hidden md:block absolute left-[60%] top-1/2 -translate-y-1/2 z-20">
        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-4 border-white/20">
          <span className="text-white text-lg">❤</span>
        </div>
      </div>

      {/* ✅ FLOATING CARD */}
      <div className="absolute bottom-4 right-4 md:right-16 bg-white rounded-xl shadow-xl px-4 py-3 md:px-6 md:py-4 flex flex-col sm:flex-row gap-4 sm:gap-8 z-30">
        
        <div className="text-center">
          <p className="font-bold text-base md:text-lg text-gray-800">10,000+</p>
          <p className="text-xs text-gray-500">Happy Patients</p>
        </div>

        <div className="text-center sm:border-l sm:pl-6">
          <p className="font-bold text-base md:text-lg text-gray-800">99%</p>
          <p className="text-xs text-gray-500">Satisfaction</p>
        </div>

        <div className="text-center sm:border-l sm:pl-6">
          <p className="font-bold text-base md:text-lg text-gray-800">5 Star</p>
          <p className="text-xs text-gray-500">Reviews</p>
        </div>
      </div>
    </section>
  );
}