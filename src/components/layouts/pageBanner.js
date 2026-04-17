"use client";

import Link from "next/link";

export default function PageBanner({
  title,
  description,
  breadcrumbLabel,
  bgImage,
}) {
  const crumbText = breadcrumbLabel || title || "";

  return (
    <section className="relative w-full h-[420px] md:h-[480px] overflow-hidden flex items-center">

      {/* Background Image (Right side visible) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage || "/images/1.jpg"})`,
        }}
      />

      {/* LEFT RED PANEL WITH DIAGONAL CUT */}
      <div className="absolute inset-0 flex">

        {/* Left Gradient Area */}
        <div
          className="w-full md:w-[65%] h-full relative"
          style={{
            background:
              "linear-gradient(135deg, #2b0b0b 0%, #8B1414 40%, #D32F2F 85%)",
            clipPath: "polygon(0 0, 85% 0, 70% 100%, 0% 100%)",
          }}
        >

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-6 md:px-16 py-14 text-white">

            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1px] bg-white/40" />
              <p className="text-xs uppercase tracking-widest text-white/60">
                Home / {crumbText}
              </p>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}>
              {title}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-white/70 max-w-md mb-6">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-[#D32F2F] px-5 py-3 rounded-lg text-sm font-semibold hover:bg-red-700"
              >
                WhatsApp Us
              </a>
              <a
                href="#"
                className="border border-white/40 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-white/10"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER CIRCLE ICON */}
      <div className="absolute left-[60%] top-1/2 -translate-y-1/2 z-20">
        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-4 border-white/20">
          <span className="text-white text-xl">❤</span>
        </div>
      </div>

      {/* RIGHT DOCTOR IMAGE (Optional overlay for better clarity) */}
      <div className="absolute right-0 top-0 h-full w-[40%] hidden md:block">
        <div className="w-full h-full bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* FLOATING STATS CARD */}
      <div className="absolute bottom-6 right-6 md:right-20 bg-white rounded-xl shadow-xl px-6 py-4 flex gap-8 z-30">

        <div className="text-center">
          <p className="font-bold text-lg text-gray-800">10,000+</p>
          <p className="text-xs text-gray-500">Happy Patients</p>
        </div>

        <div className="text-center border-l border-gray-200 pl-6">
          <p className="font-bold text-lg text-gray-800">99%</p>
          <p className="text-xs text-gray-500">Satisfaction Rate</p>
        </div>

        <div className="text-center border-l border-gray-200 pl-6">
          <p className="font-bold text-lg text-gray-800">5 Star</p>
          <p className="text-xs text-gray-500">Patient Reviews</p>
        </div>

      </div>
    </section>
  );
}