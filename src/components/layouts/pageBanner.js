"use client";

import Link from "next/link";

export default function PageBanner({
  title,
  titleLight,
  description,
  breadcrumbLabel,
  bgImage,
  url,
}) {
  const crumbText = breadcrumbLabel || title || "";
  const raw = bgImage || url;
  const resolvedBg = raw
    ? typeof raw === "object"
      ? raw.src
      : raw
    : "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=80";

  return (
    <section className="relative overflow-hidden min-h-80 md:min-h-95 flex items-center">

      {/* ── Background image ── */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${resolvedBg})` }}
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
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#D32F2F] mr-2.5 mb-0.5 align-middle"
              style={{ boxShadow: "0 0 0 3px rgba(211,47,47,0.25)" }}
              aria-hidden="true"
            />
            {description}
          </p>
        )}

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-7">
          <a
            href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3 px-6 text-sm tracking-wide transition-colors rounded-xl"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp Us
          </a>
          <a
            href="tel:+919217958539"
            className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white/60 text-white hover:text-white font-semibold py-3 px-6 text-sm tracking-wide transition-all rounded-xl backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}