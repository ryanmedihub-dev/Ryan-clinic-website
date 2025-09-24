"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";

// ✅ Dynamic imports (lazy load after first paint)
const HairTransplantPage = dynamic(() => import("./home/homeServices"), { ssr: false });
const WhyChooseRyanClinic = dynamic(() => import("./home/whyChooseUs"), { ssr: false });
const OurResults = dynamic(() => import("./home/ourResults"), { ssr: false });
const TurkeySpecialists = dynamic(() => import("./home/turkeySpecialists"), { ssr: false });
const OurBranches = dynamic(() => import("./home/ourBranches"), { ssr: false });
const Testimonials = dynamic(() => import("./home/testimonial"), { ssr: false });
const BlogContent = dynamic(() => import("./home/blogContent"), { ssr: false });

// ✅ Optimized images
import Banner from "../../../public/uploads/banner.jpg";
import Banner2 from "../../../public/uploads/banner2.jpg";

export default function Home() {
  return (
    <>
      {/* ✅ Preload hero for LCP */}
      <Head>
        <link rel="preload" as="image" href="/uploads/banner.jpg" />
      </Head>

      {/* ✅ Hero Section */}
      <div className="w-full">
        {/* Desktop Banner */}
        <div className="hidden md:block">
          <Image
            src={Banner}
            alt="Ryan Clinic Banner"
            priority
            placeholder="blur"
            quality={70}
            sizes="(max-width: 768px) 100vw, 1920px"
            className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9] rounded-lg"
          />
        </div>

        {/* Mobile Banner */}
        <div className="block md:hidden">
          <Image
            src={Banner2}
            alt="Ryan Clinic Banner Mobile"
            priority
            placeholder="blur"
            quality={70}
            sizes="100vw"
            className="w-full h-auto object-cover aspect-[3/4] rounded-lg"
          />
        </div>
      </div>

      {/* ✅ Below-the-fold content loads lazily */}
      <HairTransplantPage />
      <OurResults />
      <WhyChooseRyanClinic />
      <TurkeySpecialists />
      <OurBranches />
      <BlogContent />
      <Testimonials />
    </>
  );
}
