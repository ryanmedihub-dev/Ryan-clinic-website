export const revalidate = 3600; // ISR: serve from cache, rebuild every hour in background

export const metadata = {
  title: "Hair Transplant in Delhi | Turkey Sapphire FUE | Ryan Clinic",
  description:
    "India's only Turkey Sapphire FUE clinic. Expert hair transplant in Delhi, Mumbai & Hyderabad — certified doctors, 95%+ graft survival.",
  alternates: {
    canonical: "https://www.clinicryan.com/",
  },
};

import Image from "next/image";
import HairTransplantPage from "./home/homeServices";
import TurkeySpecialists from "./home/turkeySpecialists";
import FeaturesOverview from "./home/featuresOverview";
import { SplitCTA } from "./home/splitCTA";
import { OurResults, Testimonials, OurBranches, WhyChooseRyanClinic, FaqSection, BlogContent } from "./home/lazyComponents";

import Banner from "../../../public/uploads/banner.jpg";
import Banner2 from "../../../public/uploads/banner2.jpg";

export default function Home() {
  return (
    <>
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
      <BlogContent />
      <FaqSection />
    </>
  );
}
