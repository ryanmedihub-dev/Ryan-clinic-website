"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ResultOne from "../../../../public/uploads/results/1-new.jpg";
import ResultTwo from "../../../../public/uploads/results/2-new.jpg";
import ResultThree from "../../../../public/uploads/results/3-new.jpg";
import ResultFour from "../../../../public/uploads/results/4-new.jpg";
import ResultFive from "../../../../public/uploads/results/5-new.jpg";
import ResultSix from "../../../../public/uploads/results/6-new.jpg";
import ResultSeven from "../../../../public/uploads/results/7-new.jpg";
import ResultEight from "../../../../public/uploads/results/8-new.jpg";
import ResultNine from "../../../../public/uploads/results/9-new.jpg";
import ResultTen from "../../../../public/uploads/results/10-new.jpg";
import ResultEleven from "../../../../public/uploads/results/11-new.jpg";
import ResultTwelve from "../../../../public/uploads/results/12-new.jpg";
import ResultThirteen from "../../../../public/uploads/results/13-new.jpg";
import ResultFourteen from "../../../../public/uploads/results/14-new.jpg";
import ResultFifteen from "../../../../public/uploads/results/15-new.jpg";
import ResultSixteen from "../../../../public/uploads/results/16-new.jpg";
import ResultSeventeen from "../../../../public/uploads/results/17-new.jpg";

const images = [
  ResultOne, ResultFour, ResultFive, ResultSix, ResultSeven,
  ResultEight, ResultNine, ResultTen, ResultEleven, ResultTwelve,
  ResultThirteen, ResultFourteen, ResultFifteen, ResultSixteen,
  ResultSeventeen, ResultTwo, ResultThree, ResultSeventeen,
];

// Desktop mosaic layout — same grid positions as before
const tiles = [
  { col: "1 / 4",   row: "4 / 9",  showInfo: false },
  { col: "3 / 7",   row: "3 / 7",  showInfo: true,  grafts: "2800 Grafts" },
  { col: "6 / 8",   row: "1 / 6",  showInfo: false },
  { col: "8 / 10",  row: "2 / 6",  showInfo: false },
  { col: "10 / 13", row: "1 / 6",  showInfo: false },
  { col: "13 / 15", row: "2 / 5",  showInfo: false },
  { col: "15 / 19", row: "1 / 5",  showInfo: true,  grafts: "4200 Grafts" },
  { col: "8 / 14",  row: "5 / 9",  showInfo: true,  grafts: "3500 Grafts" },
  { col: "14 / 19", row: "5 / 9",  showInfo: true,  grafts: "3200 Grafts" },
  { col: "19 / 22", row: "3 / 6",  showInfo: false },
  { col: "21 / 24", row: "4 / 7",  showInfo: false },
  { col: "3 / 7",   row: "7 / 10", showInfo: false },
  { col: "6 / 8",   row: "6 / 9",  showInfo: false },
  { col: "7 / 9",   row: "8 / 11", showInfo: false },
  { col: "9 / 13",  row: "8 / 11", showInfo: false },
  { col: "13 / 16", row: "8 / 10", showInfo: false },
  { col: "19 / 23", row: "6 / 10", showInfo: false },
  { col: "15 / 19", row: "9 / 11", showInfo: false },
];

// Stagger delay per tile (seconds) — shorter = reveals faster
const staggerDelay = [
  0.05, 0.10, 0.08, 0.14, 0.12,
  0.18, 0.06, 0.20, 0.16, 0.22,
  0.26, 0.24, 0.30, 0.28, 0.32,
  0.34, 0.38, 0.36,
];

// Mobile grid
const mobileGrid = [
  { span: 2, showInfo: true,  grafts: "2800 Grafts" },
  { span: 1, showInfo: false },
  { span: 1, showInfo: false },
  { span: 1, showInfo: false },
  { span: 1, showInfo: false },
  { span: 2, showInfo: true,  grafts: "4200 Grafts" },
  { span: 1, showInfo: false },
  { span: 1, showInfo: false },
  { span: 1, showInfo: false },
  { span: 1, showInfo: false },
  { span: 2, showInfo: true,  grafts: "3500 Grafts" },
  { span: 1, showInfo: false },
];

// Intersection-observer hook — fires once when element enters viewport
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function TileContent({ index, showInfo, grafts }) {
  return (
    <div className="or-tile-inner">
      <Image
        src={images[index % images.length]}
        alt={`Hair transplant result ${index + 1}`}
        fill
        className="or-img object-cover"
        placeholder="blur"
        sizes="(max-width: 768px) 50vw, 12vw"
      />
      {/* gradient overlay — always subtle, intensifies on hover */}
      <div className="or-overlay" />

      {showInfo && (
        <div className="or-info">
          <span className="or-info-label">Hair Transplant</span>
          <span className="or-info-grafts">{grafts}</span>
        </div>
      )}

      <div className="or-tags">
        <span className="or-tag or-tag-before">Before</span>
        <span className="or-tag or-tag-after">After</span>
      </div>
    </div>
  );
}

export default function OurResults({ city = "Delhi" }) {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes or-rise {
          from { opacity: 0; transform: translateY(28px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes or-heading-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Tile wrapper — controls stagger & hover lift ── */
        .or-tile-wrap {
          position: relative;
          opacity: 0;
          border-radius: 6px;
          /* hover scale + z elevation live here so neighbors dim */
          transition:
            transform  0.38s cubic-bezier(0.22, 1, 0.36, 1),
            z-index    0s   linear 0.38s,
            filter     0.38s ease;
          will-change: transform, filter;
        }
        .or-tile-wrap.or-visible {
          animation: or-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          /* keep opacity:1 after animation ends */
          animation-fill-mode: both;
        }

        /* Hover: scale + elevate */
        .or-tile-wrap:hover {
          transform: scale(1.16) !important;
          z-index: 50 !important;
          transition:
            transform  0.38s cubic-bezier(0.22, 1, 0.36, 1),
            z-index    0s   linear 0s,
            filter     0.38s ease;
          filter: none !important;
        }

        /* Siblings slightly dim when a neighbour is hovered */
        .or-mosaic:has(.or-tile-wrap:hover) .or-tile-wrap:not(:hover) {
          filter: brightness(0.82) saturate(0.9);
        }

        /* ── Inner tile ── */
        .or-tile-inner {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          background: #1a1a1a;
          cursor: pointer;
        }

        /* Image zoom on hover */
        .or-img {
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        .or-tile-wrap:hover .or-img {
          transform: scale(1.08) !important;
        }

        /* ── Gradient overlay ── */
        .or-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.78) 0%,
            rgba(0,0,0,0.04) 48%,
            transparent 70%
          );
          opacity: 0.55;
          transition: opacity 0.38s ease;
          border-radius: 6px;
        }
        .or-tile-wrap:hover .or-overlay { opacity: 1; }

        /* ── Info badge (top) ── */
        .or-info {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 8px;
          opacity: 0;
          transform: translateY(-6px);
          transition:
            opacity   0.32s ease 0.06s,
            transform 0.32s cubic-bezier(0.22,1,0.36,1) 0.06s;
          pointer-events: none;
        }
        .or-tile-wrap:hover .or-info {
          opacity: 1;
          transform: translateY(0);
        }
        .or-info-label {
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-shadow: 0 1px 6px rgba(0,0,0,0.7);
        }
        .or-info-grafts {
          color: #ff6b6b;
          font-size: 8px;
          font-weight: 600;
          margin-top: 2px;
          text-shadow: 0 1px 6px rgba(0,0,0,0.7);
        }

        /* ── Before / After tags (bottom) ── */
        .or-tags {
          position: absolute;
          bottom: 8px; left: 0; right: 0;
          display: flex;
          justify-content: center;
          gap: 5px;
          pointer-events: none;
          opacity: 0;
          transform: translateY(7px);
          transition:
            opacity   0.30s ease 0.04s,
            transform 0.30s cubic-bezier(0.22,1,0.36,1) 0.04s;
        }
        .or-tile-wrap:hover .or-tags {
          opacity: 1;
          transform: translateY(0);
        }
        .or-tag {
          font-size: 8px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 3px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }
        .or-tag-before {
          background: rgba(15,15,15,0.88);
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff;
        }
        .or-tag-after {
          background: #D32F2F;
          border: 1px solid rgba(255,255,255,0.20);
          color: #fff;
        }

        /* Red glow on hovered tile */
        .or-tile-wrap:hover .or-tile-inner {
          box-shadow:
            0 0  0    1px rgba(211,47,47,0.35),
            0 12px 40px rgba(211,47,47,0.38),
            0 4px  16px rgba(0,0,0,0.22);
        }

        /* ── Mobile: always show tags & overlay ── */
        @media (max-width: 767px) {
          .or-tags,
          .or-info { opacity: 1; transform: none; }
          .or-overlay { opacity: 0.7; }
          .or-mosaic:has(.or-tile-wrap:hover) .or-tile-wrap:not(:hover) {
            filter: none;
          }
        }

        /* ── Heading animation ── */
        .or-heading {
          opacity: 0;
        }
        .or-heading.or-visible {
          animation: or-heading-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
        }

        /* ── CTA underline ── */
        .or-cta {
          position: relative;
          display: inline-block;
        }
        .or-cta::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          height: 1.5px; width: 0;
          background: #D32F2F;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .or-cta:hover::after { width: 100%; }
      `}</style>

      {/* ════════════════════════════
          MOBILE — static grid
      ════════════════════════════ */}
      <section className="md:hidden bg-[#fff5ec] py-10 px-3 overflow-hidden">
        {/* Heading */}
        <div className="text-center px-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Hair Transplant Results in &apos; {city}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-xs sm:text-sm leading-relaxed">
            Our results aren&apos;t just great — they&apos;re{" "}
            <strong className="text-gray-800">outstanding</strong>.{" "}
            <a href="#" className="or-cta text-red-600 font-medium hover:text-red-700 transition-colors">
              Explore all outcomes
            </a>{" "}
            and read feedback from our satisfied patients.
          </p>
        </div>

        {/* Grid */}
        <div
          className="or-mosaic pr-10 pl-6 mb-8"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "6px",
          }}
        >
          {mobileGrid.map((cell, i) => (
            <div
              key={i}
              className="or-tile-wrap or-visible"
              style={{
                gridColumn: `span ${cell.span}`,
                aspectRatio: cell.span === 2 ? "16/9" : "1/1",
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <TileContent index={i} showInfo={cell.showInfo} grafts={cell.grafts} />
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 pb-4">
          <a
            href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl w-full sm:w-auto"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Get Results Like These — Free Consult
          </a>
          <a
            href="tel:+919911111247"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all rounded-xl w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call +91-9911111247
          </a>
        </div>
      </section>

      {/* ════════════════════════════
          DESKTOP — mosaic (no scroll fx)
      ════════════════════════════ */}
      <section
        ref={sectionRef}
        className="hidden md:block bg-[#fff5ec] py-10 overflow-hidden"
      >
        {/* Heading */}
        <div className={`or-heading text-center px-4 mb-8 ${inView ? "or-visible" : ""}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            Ryan&apos;s Results
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
            Our results aren&apos;t just great — they&apos;re{" "}
            <strong className="text-gray-800">outstanding</strong>.{" "}
            <a href="#" className="or-cta text-red-600 font-medium hover:text-red-700 transition-colors">
              Explore all outcomes
            </a>{" "}
            and read feedback from our satisfied patients.
          </p>
        </div>

        {/* Mosaic */}
        <div
          className="or-mosaic w-full px-12 md:px-20 mt-0"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(24, 1fr)",
            gridTemplateRows: "repeat(11, clamp(24px, 4vw, 44px))",
            gap: "clamp(3px, 0.4vw, 6px)",
          }}
        >
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`or-tile-wrap ${inView ? "or-visible" : ""}`}
              style={{
                gridColumn: tile.col,
                gridRow: tile.row,
                animationDelay: inView ? `${staggerDelay[i]}s` : "0s",
                zIndex: 1,
              }}
            >
              <TileContent index={i} showInfo={tile.showInfo} grafts={tile.grafts} />
            </div>
          ))}
        </div>

        {/* Desktop CTA strip */}
        <div className="flex items-center justify-center gap-4 mt-10 pb-4 px-12 md:px-20">
          <a
            href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-7 text-sm tracking-wide transition-colors rounded-xl"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Get Results Like These — Free Consult
          </a>
          <a
            href="tel:+919911111247"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-7 text-sm tracking-wide transition-all rounded-xl"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call +91-9911111247
          </a>
        </div>
      </section>
    </>
  );
}