"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

function DeferredSection({ Component, Placeholder }) {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {shouldLoad ? <Component /> : <Placeholder />}
    </div>
  );
}

function TestimonialsPlaceholder() {
  return (
    <section
      className="min-h-[1149px] py-16 md:min-h-[1029px] md:py-24 overflow-hidden"
      style={{ background: "var(--bg-soft)" }}
      aria-labelledby="home-testimonials-heading"
      aria-busy="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: "var(--primary-red)" }}
          >
            Patient Stories
          </p>
          <h2
            id="home-testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Hair Transplant Celebrity Results &amp; Reviews
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Explore celebrity experiences and documented treatment results from Ryan Clinic. Reviews can help prospective patients understand the consultation, procedure, recovery and follow-up experience, while before-and-after cases show how outcomes can vary from person to person.
          </p>
        </div>
        <div className="flex justify-center mb-10" aria-hidden="true">
          <div className="h-11 w-64 rounded-2xl bg-white/50" />
        </div>
        <p className="sr-only" role="status">
          Patient stories are loading as this section approaches the viewport.
        </p>
        <div
          aria-hidden="true"
          className="h-[420px] rounded-2xl bg-white/50"
        />
        <div
          aria-hidden="true"
          className="mt-12 h-24 rounded-2xl bg-white/50"
        />
      </div>
    </section>
  );
}

function BranchesPlaceholder() {
  return (
    <section
      className="relative min-h-[973px] bg-cover bg-center bg-no-repeat py-16 md:py-20 lg:min-h-[618px] lg:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(rgb(0 0 0 / 82%), rgb(0 0 0 / 82%))",
      }}
      aria-labelledby="home-branches-heading"
      aria-busy="true"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "var(--primary-red)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          <div className="order-1 lg:order-2">
            <div
              aria-hidden="true"
              className="h-72 sm:h-80 md:h-96 rounded-2xl bg-white/10"
            />
            <p className="sr-only" role="status">
              Branch carousel is loading as this section approaches the
              viewport.
            </p>
          </div>
          <div className="order-2 lg:order-1">
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-6"
              style={{ color: "var(--accent-gold)" }}
            >
              Pan-India Presence
            </p>
            <h2
              id="home-branches-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#ffffff" }}
            >
              Ryan Clinic Locations Across India
            </h2>
            <div className="mt-5 space-y-3" aria-hidden="true">
              <div className="h-4 rounded bg-white/10" />
              <div className="h-4 w-5/6 rounded bg-white/10" />
              <div className="h-4 w-2/3 rounded bg-white/10" />
            </div>
            <div className="mt-8 flex gap-8" aria-hidden="true">
              <div className="h-12 w-16 rounded bg-white/10" />
              <div className="h-12 w-16 rounded bg-white/10" />
              <div className="h-12 w-16 rounded bg-white/10" />
            </div>
            <div className="mt-8 flex gap-3" aria-hidden="true">
              <div className="h-12 w-48 rounded-xl bg-white/10" />
              <div className="h-12 w-32 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "var(--primary-red)" }}
      />
    </section>
  );
}

export const OurResults = dynamic(() => import("./ourResults"));
const TestimonialsContent = dynamic(() => import("./testimonial"), {
  loading: TestimonialsPlaceholder,
});
const OurBranchesContent = dynamic(() => import("./ourBranches"), {
  loading: BranchesPlaceholder,
});

export function Testimonials() {
  return (
    <DeferredSection
      Component={TestimonialsContent}
      Placeholder={TestimonialsPlaceholder}
    />
  );
}

export function OurBranches() {
  return (
    <DeferredSection
      Component={OurBranchesContent}
      Placeholder={BranchesPlaceholder}
    />
  );
}

// Code-split heavy below-fold client components to reduce initial JS bundle / TBT
export const WhyChooseRyanClinic = dynamic(() => import("./whyChooseUs"), {
  loading: () => <div className="py-16 md:py-24 bg-white" />,
});
export const FaqSection = dynamic(() => import("./faqSection"), {
  loading: () => <div className="py-12 md:py-20" />,
});

export const DelhiCostSection = dynamic(() => import("./delhiCost"), {
  loading: () => <div className="py-14 md:py-20" />,
});
export const ProcedureAndOverview = dynamic(() => import("./procedureAndOverview"), {
  loading: () => <div className="py-14 md:py-20" />,
});
export const DelhiClinicSection = dynamic(() => import("./delhiClinic"), {
  loading: () => <div className="py-14 md:py-20" />,
});

