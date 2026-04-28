export const dynamic = "force-dynamic";

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
      <div className="w-full">
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
