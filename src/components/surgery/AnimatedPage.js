"use client";

import { useEffect, useRef, useState } from "react";

// --- Scroll-Triggered Animation Hook -----------------------------------------

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}

// --- Animated Section Wrapper -------------------------------------------------

export function RevealSection({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      suppressHydrationWarning
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// --- Staggered children reveal ------------------------------------------------

export function RevealList({ children, className = "", stagger = 80 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          suppressHydrationWarning
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Helper to get matching icon for a stat label
function getStatIcon(label = "") {
  const normalized = label.toLowerCase();
  if (normalized.includes("procedure") || normalized.includes("completed") || normalized.includes("done")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    );
  }
  if (normalized.includes("year") || normalized.includes("experience") || normalized.includes("clinical")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("starting")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  if (normalized.includes("emi") || normalized.includes("plan") || normalized.includes("finance")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    );
  }
  if (normalized.includes("survival") || normalized.includes("graft")) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (normalized.includes("rating") || normalized.includes("google") || normalized.includes("star")) {
    return (
      <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  // Default general medical icon
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

// --- Animated Stat Number (count-up) -----------------------------------------

export function AnimatedStat({ val, label }) {
  const ref = useRef(null);
  const [counted, setCounted] = useState(false);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          observer.unobserve(el);

          const match = val.replace(/,/g, "").match(/[\d.]+/);
          if (!match) {
            setDisplay(val);
            return;
          }
          const end = parseFloat(match[0]);
          const duration = 1400;
          const start = Date.now();

          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * end);
            setDisplay(val.replace(match[0], current.toLocaleString("en-IN")));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [val, counted]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center text-center rounded-2xl py-8 px-5 bg-white border border-gray-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:border-red-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="w-10 h-10 rounded-full bg-red-50 text-[#e30a17] flex items-center justify-center mb-4 ring-4 ring-red-50/50 group-hover:bg-[#e30a17] group-hover:text-white transition-all duration-300">
        {getStatIcon(label)}
      </div>
      <p className="text-3xl md:text-4xl font-extrabold text-[#302658] leading-none mb-2 tracking-tight group-hover:text-[#e30a17] transition-colors">
        {display}
      </p>
      <p className="text-[13px] font-medium text-gray-500 max-w-[150px] leading-snug">{label}</p>
    </div>
  );
}

// --- Animated Stat Grid (wraps 4 stats) --------------------------------------

export function AnimatedStatsGrid({ stats }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
      {stats.map((s, i) => (
        <div
          key={i}
          suppressHydrationWarning
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
          }}
        >
          <AnimatedStat val={s.val || s.value} label={s.label} />
        </div>
      ))}
    </div>
  );
}

// --- Animated Card ------------------------------------------------------------

export function AnimatedCard({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={className}
      suppressHydrationWarning
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? hovered ? "translateY(-5px)" : "translateY(0)"
          : "translateY(28px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.35s cubic-bezier(0.16,1,0.3,1)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

// --- Reveal Wrapper (simple, no stagger) -------------------------------------

export function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const transforms = {
    up: isVisible ? "translateY(0)" : "translateY(30px)",
    left: isVisible ? "translateX(0)" : "translateX(-30px)",
    right: isVisible ? "translateX(0)" : "translateX(30px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      suppressHydrationWarning
      style={{
        opacity: isVisible ? 1 : 0,
        transform: transforms[direction],
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
