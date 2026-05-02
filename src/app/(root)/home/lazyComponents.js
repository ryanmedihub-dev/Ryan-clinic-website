"use client";

import dynamic from "next/dynamic";

export const OurResults = dynamic(() => import("./ourResults"));
export const Testimonials = dynamic(() => import("./testimonial"));
export const OurBranches = dynamic(() => import("./ourBranches"));
