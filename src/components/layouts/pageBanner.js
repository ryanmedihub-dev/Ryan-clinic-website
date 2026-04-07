"use client";

import Link from "next/link";

export default function PageBanner({
  title,
  titleLight,
  description,
  breadcrumbLabel,
  bgImage,
}) {
  const crumbText = breadcrumbLabel || title || "";

  return (
    <section className="relative overflow-hidden min-h-[320px] md:min-h-[380px] flex items-center">

      {/* ── Background image ── */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: bgImage
            ? `url(${bgImage})`
            : "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=80')",
        }}
        aria-hidden="true"
      />

      {/* ── Red gradient overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(17,3,3,0.96) 0%, rgba(139,20,20,0.88) 38%, rgba(211,47,47,0.55) 68%, rgba(211,47,47,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Subtle grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Radial corner glow ── */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(211,47,47,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-14 md:py-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-5 md:mb-7">
          <span className="block w-9 h-px bg-white/25" />
          <nav className="flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase text-white/45">
            <Link
              href="/"
              className="hover:text-white/70 transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{crumbText}</span>
          </nav>
        </div>

        {/* Heading */}
        <h1
          className="leading-[1.08] text-white mb-5 tracking-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 6vw, 70px)",
          }}
        >
          <span className="font-black">{title}</span>
          {titleLight && (
            <>
              <br />
              <span
                className="font-bold italic text-white/55"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {titleLight}
              </span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p
            className="text-sm md:text-base leading-relaxed text-white/55 max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span
              className="inline-block w-[6px] h-[6px] rounded-full bg-[#D32F2F] mr-2.5 mb-0.5 align-middle"
              style={{ boxShadow: "0 0 0 3px rgba(211,47,47,0.25)" }}
              aria-hidden="true"
            />
            {description}
          </p>
        )}
      </div>
    </section>
  );
}