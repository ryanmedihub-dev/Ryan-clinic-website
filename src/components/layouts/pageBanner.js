"use client";

import Image from "next/image";

export default function PageBanner({
  title,
  description,
  breadcrumbLabel,
  bgImage,
}) {
  const crumbText = breadcrumbLabel || title || "";

  return (
    <header className="relative w-full overflow-hidden">

      {/* ============================================================ */}
      {/*  DESKTOP LAYOUT — hidden below md, rendered FIRST in DOM    */}
      {/*  (keeps <h1> as the first heading crawlers encounter)        */}
      {/* ============================================================ */}
      <div className="hidden md:block">
        <div className="relative w-full h-132 overflow-hidden flex items-center">

          {/* RIGHT SIDE IMAGE (49%) */}
          <div className="absolute right-0 top-0 h-full w-[49%]">
            <Image
              src={bgImage || "/uploads/banner.jpg"}
              alt="Banner background"
              fill
              className="object-cover object-center"
              unoptimized
              priority
            />
          </div>

          {/* LEFT RED PANEL WITH DIAGONAL CUT */}
          <div className="absolute inset-0 flex">
            <div
              className="w-[74%] h-full relative"
              style={{
                background:
                  "linear-gradient(135deg, #2b0b0b 0%, #8B1414 40%, #D32F2F 85%)",
                clipPath: "polygon(0 0, 85% 0, 70% 100%, 0% 100%)",
              }}
            >
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Content */}
              <div className="relative max-w-200 z-10 px-16 py-20 text-white">
                {/* Breadcrumb */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-px bg-white/40" />
                  <p className="text-xs uppercase tracking-widest text-white/60">
                    Home / {crumbText}
                  </p>
                </div>

                {/* Title */}
                <h1
                  className="text-6xl font-bold mb-4"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {title}
                </h1>

                {/* Description */}
                <p className="text-base text-white/70 max-w-md mb-6">
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
          <div className="absolute left-[54.5%] top-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-4 border-white/20">
              <span className="text-white text-xl">❤</span>
            </div>
          </div>

          {/* FLOATING STATS CARD */}
          <div className="absolute bottom-6 right-20 bg-white rounded-xl shadow-xl px-6 py-4 flex gap-8 z-30">
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

        </div>
      </div>

      {/* ============================================================ */}
      {/*  MOBILE LAYOUT — full redesign, hidden on md+               */}
      {/* ============================================================ */}
      <div className="block md:hidden relative min-h-120 h-[80vh] max-h-155">

        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src={bgImage || "/uploads/banner.jpg"}
            alt="Banner background"
            fill
            className="object-cover object-center"
            unoptimized
            priority
          />
        </div>

        {/* Dark red gradient overlay — transparent top, near-opaque bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(43,11,11,0.25) 0%, rgba(43,11,11,0.55) 35%, rgba(43,11,11,0.93) 65%, rgba(27,6,6,0.98) 100%)",
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Left accent line */}
        <div
          className="absolute top-0 left-0 w-[3px] h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #D32F2F 25%, #D32F2F 75%, transparent 100%)",
          }}
        />

        {/* Breadcrumb — top left */}
        <div className="absolute top-8 left-6 flex items-center gap-3 z-10">
          <span className="w-5 h-px bg-white/35" />
          <p className="text-[9px] uppercase tracking-[2.5px] text-white/45">
            Home / {crumbText}
          </p>
        </div>

        {/* Main content — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 z-10">

          {/* Clinic badge */}
          <div className="inline-flex items-center gap-2 bg-red-800/25 border border-red-500/35 rounded-full px-3 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[9px] uppercase tracking-[2px] text-red-300">
              India's Only Turkey Sapphire FUE
            </span>
          </div>

          {/* Title — h2 here because the desktop layout below already has the h1; both are mutually exclusive via CSS but crawlers see both */}
          <h2
            className="text-[34px] font-bold text-white mb-3 leading-[1.15]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {title}
          </h2>

          {/* Description */}
          <p className="text-[13px] text-white/60 mb-5 leading-relaxed max-w-[300px]">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 mb-5">
            <a
              href="#"
              className="flex-1 text-center bg-[#D32F2F] py-3.5 rounded-xl text-[13px] font-semibold text-white active:scale-95 transition-transform"
            >
              WhatsApp Us
            </a>
            
            <a  href="#"
              className="flex-1 text-center border border-white/25 py-3.5 rounded-xl text-[13px] font-semibold text-white active:scale-95 transition-transform"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              Call Now
            </a>
          </div>

          {/* Stats — glassmorphism strip */}
          <div
            className="flex items-center rounded-2xl py-3.5"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.11)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex-1 text-center">
              <p className="font-bold text-[17px] text-white leading-none mb-0.5">
                10,000+
              </p>
              <p className="text-[9.5px] text-white/45">Happy Patients</p>
            </div>

            <div className="w-px h-8 bg-white/15" />

            <div className="flex-1 text-center">
              <p className="font-bold text-[17px] text-white leading-none mb-0.5">
                99%
              </p>
              <p className="text-[9.5px] text-white/45">Satisfaction Rate</p>
            </div>

            <div className="w-px h-8 bg-white/15" />

            <div className="flex-1 text-center">
              <p className="font-bold text-[17px] text-white leading-none mb-0.5">
                5 Star
              </p>
              <p className="text-[9.5px] text-white/45">Patient Reviews</p>
            </div>
          </div>

        </div>
      </div>


    </header>
  );
}