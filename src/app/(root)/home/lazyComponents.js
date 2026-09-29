"use client";

import dynamic from "next/dynamic";

export const OurResults = dynamic(() => import("./ourResults"));
export const Testimonials = dynamic(() => import("./testimonial"));
export const OurBranches = dynamic(() => import("./ourBranches"));

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

