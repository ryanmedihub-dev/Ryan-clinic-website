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
      className="text-center rounded-2xl py-6 px-4 border border-gray-100 bg-gray-50 hover:border-[#D32F2F]/30 hover:shadow-md hover:-translate-y-1"
      style={{ transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
    >
      <p className="text-2xl md:text-3xl font-bold text-[#D32F2F] leading-none mb-2">
        {display}
      </p>
      <p className="text-xs text-gray-500 leading-snug">{label}</p>
    </div>
  );
}

// --- Animated Stat Grid (wraps 4 stats) --------------------------------------

export function AnimatedStatsGrid({ stats }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
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
          <AnimatedStat val={s.val} label={s.label} />
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
