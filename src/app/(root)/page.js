export const revalidate = 3600; // ISR: serve from cache, rebuild every hour in background

export const metadata = {
  title: "Hair Transplant in Delhi | Turkey Sapphire FUE | Ryan Clinic",
  description:
    "India's only Turkey Sapphire FUE clinic. Expert hair transplant in Delhi, Mumbai & Hyderabad — certified doctors, 95%+ graft survival. Book your free consultation.",
  alternates: {
    canonical: "https://www.clinicryan.com/",
  },
};

import { Suspense } from "react";
import Image from "next/image";
import HairTransplantPage from "./home/homeServices";
import WhyChooseRyanClinic from "./home/whyChooseUs";
import TurkeySpecialists from "./home/turkeySpecialists";
import FeaturesOverview from "./home/featuresOverview";
import OurBranches from "./home/ourBranches";
import BlogContent from "./home/blogContent";
import FaqSection from "./home/faqSection";
import { SplitCTA } from "./home/splitCTA";
import { OurResults, Testimonials } from "./home/lazyComponents";

import Banner from "../../../public/uploads/banner.jpg";
import Banner2 from "../../../public/uploads/banner2.jpg";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full relative">
        {/* Desktop Banner */}
        <div className="hidden md:block">
          <Image
            src={Banner}
            alt="Ryan Clinic Banner"
            placeholder="blur"
            priority
            sizes="(max-width: 768px) 100vw, 1920px"
            className="w-full h-auto object-cover aspect-video md:aspect-21/9 rounded-lg"
          />
        </div>

        {/* Mobile Banner */}
        <div className="block md:hidden">
          <Image
            src={Banner2}
            alt="Ryan Clinic Banner Mobile"
            placeholder="blur"
            priority
            sizes="100vw"
            className="w-full h-auto object-cover aspect-3/4 rounded-lg"
          />
        </div>

        {/* SEO H1 — visually hidden, placed over banner for crawlers */}
        <h1 className="sr-only">
          Hair Transplant in Delhi — India&apos;s Only Turkey Sapphire FUE Clinic | Ryan Clinic
        </h1>
      </div>

      <HairTransplantPage />
      <FeaturesOverview />
      <OurResults />
      <WhyChooseRyanClinic />
      <TurkeySpecialists />
      <SplitCTA />
      <Testimonials />
      <OurBranches />
      <Suspense fallback={<div className="py-16" />}>
        <BlogContent />
      </Suspense>
      <FaqSection />
    </>
  );
}
