"use client";

import Image from "next/image";
import { Fragment } from "react";
import useTrackCTA from "@/lib/useTrackCTA";

export default function PageBanner({
  breadcrumb,
  title,
  description,
  breadcrumbLabel,
  bgImage,
  hideBadge = false,
  stats,
}) {
  const trackCTA = useTrackCTA();
  return (
    <header className="relative w-full overflow-hidden">
      <div className="hidden md:block">
        <div className="relative w-full h-145 overflow-hidden flex items-center">
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
                  <p
                    className="text-xs uppercase tracking-widest text-white/60"
                    suppressHydrationWarning
                  >
                    Home / hair transplant / {breadcrumb}
                  </p>
                </div>

                {/* Title — single h1 lives only in desktop tree; mobile uses aria-hidden duplicate */}
                <h1
                  className="text-6xl font-bold mb-4"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {title}
                </h1>

                {/* Description */}
                <p className="text-base text-white/70 mb-6">{description}</p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20consultation%20in%20Delhi"
                    className="bg-[#D32F2F] px-5 py-3 rounded-lg text-sm font-semibold hover:bg-red-700"
                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Banner WhatsApp Us", buttonLocation: "Page Banner" })}
                  >
                    WhatsApp Us
                  </a>
                  <a
                    href="tel:+919911111247"
                    className="border border-white/40 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-white/10"
                    onClick={() => trackCTA({ type: "call", ctaName: "Banner Call Now", buttonLocation: "Page Banner" })}
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
          {stats && stats.length > 0 ? (
            <div className="absolute bottom-6 right-20 bg-white rounded-xl shadow-xl px-6 py-4 flex gap-8 z-30">
              {stats.map((stat, i) => (
                <div key={i} className={`text-center ${i > 0 ? "border-l border-gray-200 pl-6" : ""}`}>
                  <p className="font-bold text-lg text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="absolute bottom-6 right-20 bg-white rounded-xl shadow-xl px-6 py-4 flex gap-8 z-30"
              dangerouslySetInnerHTML={{
                __html:
                  '<div class="text-center"><p class="font-bold text-lg text-gray-800">12+</p><p class="text-xs text-gray-500">Years</p></div>' +
                  '<div class="text-center border-l border-gray-200 pl-6"><p class="font-bold text-lg text-gray-800">10,000+</p><p class="text-xs text-gray-500">Procedures</p></div>' +
                  '<div class="text-center border-l border-gray-200 pl-6"><p class="font-bold text-lg text-gray-800">4.9★</p><p class="text-xs text-gray-500">Google rating</p></div>' +
                  '<div class="text-center border-l border-gray-200 pl-6"><p class="font-bold text-lg text-gray-800">0%</p><p class="text-xs text-gray-500">EMI Available</p></div>',
              }}
            />
          )}
        </div>
      </div>

      <div className="md:hidden relative min-h-120 h-[80vh] max-h-155">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src={bgImage || "/uploads/banner.jpg"}
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center"
            unoptimized
            priority
          />
        </div>

        {/* Dark red gradient overlay */}
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
          className="absolute top-0 left-0 w-0.75 h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #D32F2F 25%, #D32F2F 75%, transparent 100%)",
          }}
        />

        {/* Breadcrumb — top left */}
        <div className="absolute top-8 left-6 flex items-center gap-3 z-10">
          <span className="w-5 h-px bg-white/35" />
          <p
            className="text-[9px] uppercase tracking-[2.5px] text-white/45"
            suppressHydrationWarning
          >
            Home / Hair Transplant / {breadcrumb}
          </p>
        </div>

        {/* Main content — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 z-10">
          {/* Clinic badge */}
          {!hideBadge && (
            <div className="inline-flex items-center gap-2 bg-red-800/25 border border-red-500/35 rounded-full px-3 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[2px] text-red-300">
                India&apos;s Only Turkey Sapphire FUE
              </span>
            </div>
          )}

          {/* 
            Use p instead of h2 to avoid duplicate heading in the DOM.
            The h1 in the desktop section is always in the DOM (SSR),
            so a second heading tag here triggers hydration conflicts.
            Screen readers won't reach this on desktop (md:hidden), but
            the SSR pass renders both trees — keep headings to one.
          */}
          <p
            className="text-[34px] font-bold text-white mb-3 leading-[1.15]"
            style={{ fontFamily: "Playfair Display, serif" }}
            aria-hidden="true"
          >
            {title}
          </p>

          {/* Description */}
          <p className="text-[13px] text-white/60 mb-5 leading-relaxed max-w-75">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 mb-5">
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20consultation%20in%20Delhi"
              className="flex-1 text-center bg-[#D32F2F] py-3.5 rounded-xl text-[13px] font-semibold text-white active:scale-95 transition-transform"
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "Banner WhatsApp Us", buttonLocation: "Page Banner Mobile" })}
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+919911111247"
              className="flex-1 text-center border border-white/25 py-3.5 rounded-xl text-[13px] font-semibold text-white active:scale-95 transition-transform"
              style={{ background: "rgba(255,255,255,0.07)" }}
              onClick={() => trackCTA({ type: "call", ctaName: "Banner Call Now", buttonLocation: "Page Banner Mobile" })}
            >
              Call Now
            </a>
          </div>

          {/* Stats — glassmorphism strip */}
          {stats && stats.length > 0 ? (
            <div
              className="flex items-center rounded-2xl py-3.5"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.11)",
                backdropFilter: "blur(12px)",
              }}
            >
              {stats.map((stat, i) => (
                <Fragment key={i}>
                  {i > 0 && <div className="w-px h-8 bg-white/15" />}
                  <div className="flex-1 text-center">
                    <p className="font-bold text-[17px] text-white leading-none mb-0.5">
                      {stat.value}
                    </p>
                    <p className="text-[9.5px] text-white/45">{stat.label}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          ) : (
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
                  12+
                </p>
                <p className="text-[9.5px] text-white/45">Years of Experience</p>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex-1 text-center">
                <p className="font-bold text-[17px] text-white leading-none mb-0.5">
                  10,000+
                </p>
                <p className="text-[9.5px] text-white/45">Procedures</p>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex-1 text-center">
                <p className="font-bold text-[17px] text-white leading-none mb-0.5">
                  4.9★
                </p>
                <p className="text-[9.5px] text-white/45">Google Rating</p>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex-1 text-center">
                <p className="font-bold text-[17px] text-white leading-none mb-0.5">
                  0%
                </p>
                <p className="text-[9.5px] text-white/45">EMI available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
