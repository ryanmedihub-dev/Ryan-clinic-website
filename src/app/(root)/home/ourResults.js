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

export default function OurResults() {
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
            Ryan&apos;s Results
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
          className="or-mosaic pr-10 pl-6 mb-10"
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
      </section>
    </>
  );
}