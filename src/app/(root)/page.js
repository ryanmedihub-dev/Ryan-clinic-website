export const revalidate = 3600; // ISR: serve from cache, rebuild every hour in background

export const metadata = {
  title: "Ryan Clinic - Hair Transplant in Delhi | Hair Transplant Cost in Delhi",
  description:
    "Get advanced hair transplant in Delhi at Ryan Clinic with doctor-led care and modern FUE techniques. Explore hair transplant cost, procedure, recovery and results.",
  alternates: {
    canonical: "https://www.clinicryan.com/",
  },
  openGraph: {
    title: "Ryan Clinic - Hair Transplant in Delhi | Hair Transplant Cost in Delhi",
    description:
      "Get advanced hair transplant in Delhi at Ryan Clinic with doctor-led care and modern FUE techniques. Explore hair transplant cost, procedure, recovery and results.",
    url: "https://www.clinicryan.com/",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg",
        width: 1200,
        height: 630,
        alt: "Ryan Clinic - Hair Transplant in Delhi",
      },
    ],
  },
};

import { Suspense } from "react";
import Image from "next/image";
import HeroIntro from "./home/heroIntro";
import HairTransplantPage from "./home/homeServices";
import TurkeySpecialists from "./home/turkeySpecialists";
import FeaturesOverview from "./home/featuresOverview";
import BlogContent from "./home/blogContent";
import { SplitCTA } from "./home/splitCTA";
import {
  OurResults,
  Testimonials,
  OurBranches,
  WhyChooseRyanClinic,
  FaqSection,
  DelhiCostSection,
  ProcedureAndOverview,
  DelhiClinicSection,
} from "./home/lazyComponents";
import HomepageSchema from "@/components/home/HomepageSchema";

import Banner from "../../../public/uploads/banner.jpg";
import Banner2 from "../../../public/uploads/banner2.jpg";

export default function Home() {
  return (
    <>
      <HomepageSchema />

      {/* Hero Section */}
      <div className="w-full relative">
        {/* Desktop Banner — hidden on mobile, sizes tells browser to skip it there */}
        <div className="hidden md:block">
          <Image
            src={Banner}
            alt="Ryan Clinic — Hair Transplant Delhi"
            placeholder="blur"
            priority
            fetchPriority="high"
            sizes="(max-width: 767px) 1px, 100vw"
            className="w-full h-auto object-cover aspect-video md:aspect-21/9 rounded-lg"
          />
        </div>

        {/* Mobile Banner — hidden on desktop, sizes tells browser to skip it there */}
        <div className="block md:hidden">
          <Image
            src={Banner2}
            alt="Ryan Clinic — Hair Transplant Delhi"
            placeholder="blur"
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 1px, 100vw"
            className="w-full h-auto object-cover aspect-3/4 rounded-lg"
          />
        </div>

        {/* SEO H1 — visually hidden, placed over banner for crawlers */}
        <h1 className="sr-only">
          Hair Transplant in Delhi | Best Hair Transplant Clinic in Delhi
        </h1>
      </div>

      <HeroIntro />
      <HairTransplantPage />
      <FeaturesOverview />
      <OurResults />
      <WhyChooseRyanClinic />
      <TurkeySpecialists />
      <ProcedureAndOverview />
      <SplitCTA />
      <DelhiCostSection />
      <Testimonials />
      <DelhiClinicSection />
      <OurBranches />
      <Suspense fallback={<div className="py-16" />}>
        <BlogContent />
      </Suspense>
      <FaqSection />
    </>
  );
}
