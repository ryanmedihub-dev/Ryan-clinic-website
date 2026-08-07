"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Scissors, Sparkles } from "lucide-react";

export default function SurgeryCarouselClient({ dbPages = [] }) {
  // Map dynamic MongoDB surgery pages directly
  const items = useMemo(() => {
    if (!dbPages || dbPages.length === 0) return [];

    return dbPages.map((page, idx) => {
      const rawSlug = (page.slug || "").replace(/^\/+/, "").replace(/^surgery\//, "");
      const targetHref = `/surgery/${rawSlug}`;

      const title = page.pageName || page.hero?.title || `Hair Transplant Surgery`;
      const description =
        page.hero?.description ||
        page.seo?.metaDescription ||
        page.introduction?.title ||
        "Doctor-led precision hair transplant procedure.";

      // Dedicated procedure/location image — admin-uploaded card image takes priority
      let image =
        page.landingCardImage?.image ||
        page.hero?.heroImage?.image ||
        page.seo?.openGraphImage?.image ||
        page.introduction?.mainImage?.image ||
        page.hero?.bgImage ||
        page.hero?.doctorCard?.image?.url ||
        page.introduction?.image?.url;
      if (!image) {
        const slugLower = (page.slug || "").toLowerCase();
        if (slugLower.includes("mumbai")) {
          image = "/uploads/Mumbai.jpg";
        } else if (slugLower.includes("delhi")) {
          image = "/uploads/Delhi.jpg";
        } else {
          image = "/uploads/1752734248947-Hair Transplant 1.jpg";
        }
      }

      // Badge label
      let badge = page.hero?.breadcrumb || page.hero?.badge?.text;
      if (!badge) {
        const slugLower = (page.slug || "").toLowerCase();
        if (slugLower.includes("mumbai")) badge = "Mumbai Clinic";
        else if (slugLower.includes("delhi")) badge = "Delhi Clinic";
        else badge = "Surgery Procedure";
      }

      return {
        id: page._id || page.slug || idx,
        title,
        badge,
        slug: targetHref,
        image,
        description,
      };
    });
  }, [dbPages]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Drag / Touch state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const handlePrev = useCallback(() => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 40) {
      handleNext();
    } else if (swipeDistance < -40) {
      handlePrev();
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    touchEndX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 40) {
      handleNext();
    } else if (swipeDistance < -40) {
      handlePrev();
    }
  };

  // Auto-play timer (if > 1 card)
  useEffect(() => {
    if (!isAutoplay || items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, items.length]);

  if (items.length === 0) {
    return (
      <section className="w-full bg-[#FAF6F3] py-16 text-center">
        <p className="text-gray-500 text-sm">No surgery pages currently active.</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-[#FAF6F3] via-white to-[#FAF6F3] py-16 sm:py-24 overflow-hidden font-sans select-none border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D32F2F]/10 border border-[#D32F2F]/20 text-[#D32F2F] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#D32F2F]" />
            Doctor-Led Surgery Pages
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight font-sans">
            Explore Hair Restoration <span className="text-[#D32F2F]">Surgeries</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-xl mx-auto font-sans">
            Doctor-led Sapphire FUE &amp; Turkish Technique procedures across Ryan Clinic centers. Click any card to read the complete surgery breakdown.
          </p>
        </div>

        {/* ── Dynamic Surgery Cards Showcase ────────────────────────────── */}
        {items.length <= 2 ? (
          /* Clean Centered Grid Layout for <= 2 Cards (Matches current DB state) */
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoplay(false);
                  }}
                  className={`w-full sm:w-[400px] relative rounded-[2rem] overflow-hidden bg-gray-900 border transition-all duration-500 cursor-pointer flex flex-col justify-end h-[470px] sm:h-[500px] group ${
                    isActive
                      ? "ring-4 ring-[#D32F2F] ring-offset-4 ring-offset-[#FAF6F3] shadow-[0_20px_50px_rgba(211,47,47,0.25)] scale-102"
                      : "border-gray-200 shadow-md hover:shadow-xl opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Cover Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    unoptimized
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />


                  {/* Floating Content Card */}
                  <div className="relative z-10 p-5 m-4 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl flex flex-col justify-between transition-all duration-300">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 font-sans leading-tight mb-2 group-hover:text-[#D32F2F] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer CTA Button linking directly to the Surgery Page */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D32F2F] group-hover:translate-x-1 transition-transform">
                        Read Surgery Details
                        <ArrowRight className="w-4 h-4" />
                      </span>

                      <Link
                        href={item.slug}
                        className="p-2.5 rounded-xl bg-[#D32F2F] hover:bg-red-800 text-white transition-all shadow-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Slider for > 2 Cards */
          <div
            className="w-full relative min-h-[520px] overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="flex items-center gap-7 transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(calc(50vw - ${activeIndex * 408 + 190}px))`,
              }}
            >
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                const distance = Math.abs(index - activeIndex);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!isActive) {
                        setIsAutoplay(false);
                        setActiveIndex(index);
                      }
                    }}
                    style={{ width: "380px" }}
                    className={`relative transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] shrink-0 cursor-pointer ${
                      isActive
                        ? "z-30 scale-105 opacity-100"
                        : distance === 1
                        ? "z-10 scale-90 opacity-50 hover:opacity-75"
                        : "z-0 scale-75 opacity-25"
                    }`}
                  >
                    <div
                      className={`relative rounded-[2rem] overflow-hidden bg-gray-900 h-[450px] flex flex-col justify-end transition-all duration-600 ${
                        isActive
                          ? "ring-4 ring-[#D32F2F] ring-offset-4 ring-offset-[#FAF6F3] shadow-[0_20px_50px_rgba(211,47,47,0.3)]"
                          : "border border-gray-200 shadow-md"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-center opacity-90"
                        unoptimized
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />


                      <div className="relative z-10 p-5 m-4 bg-white/95 rounded-2xl border border-gray-100 shadow-xl flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-black text-gray-900 leading-tight mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-xs line-clamp-3 mb-3">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#D32F2F]">
                            Read Surgery Details →
                          </span>
                          <Link
                            href={item.slug}
                            className="p-2 rounded-xl bg-[#D32F2F] text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Navigation Dots (only if > 1 card) ── */}
        {items.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous Surgery Page"
              className="w-11 h-11 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center shadow-md hover:bg-[#D32F2F] hover:border-[#D32F2F] hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 px-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoplay(false);
                    setActiveIndex(i);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === activeIndex
                      ? "w-8 h-2.5 bg-[#D32F2F]"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to surgery page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Surgery Page"
              className="w-11 h-11 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center shadow-md hover:bg-[#D32F2F] hover:border-[#D32F2F] hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
