export const revalidate = 3600; // ISR: serve from cache, rebuild every hour in background

export const metadata = {
  title: "Hair Transplant in Delhi | Cost & FUE | Ryan Clinic",
  description:
    "Explore hair transplant in Delhi at Ryan Clinic, including FUE, treatment planning, costs and recovery. Book a consultation.",
  alternates: {
    canonical: "https://www.clinicryan.com/",
  },
  openGraph: {
    title: "Hair Transplant in Delhi | Cost & FUE | Ryan Clinic",
    description:
      "Explore hair transplant in Delhi at Ryan Clinic, including FUE, treatment planning, costs and recovery. Book a consultation.",
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
  twitter: {
    card: "summary_large_image",
    title: "Hair Transplant in Delhi | Cost & FUE | Ryan Clinic",
    description:
      "Explore hair transplant in Delhi at Ryan Clinic, including FUE, treatment planning, costs and recovery. Book a consultation.",
    images: ["https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg"],
  },
};

import { Suspense } from "react";
import { getImageProps } from "next/image";
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

const heroAlt = "Ryan Clinic — Hair Transplant Delhi";
const heroImageOptions = {
  alt: heroAlt,
  sizes: "100vw",
  quality: 75,
  placeholder: "blur",
  loading: "eager",
  fetchPriority: "high",
};

const desktopHeroImage = getImageProps({ src: Banner, ...heroImageOptions }).props;
const mobileHeroImage = getImageProps({ src: Banner2, ...heroImageOptions }).props;

export default function Home() {
  return (
    <>
      <HomepageSchema />

      {/* Responsive hero preloads — hoisted to <head> by React 19 */}
      <link
        rel="preload"
        as="image"
        href={mobileHeroImage.src}
        imageSrcSet={mobileHeroImage.srcSet}
        imageSizes={mobileHeroImage.sizes}
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={desktopHeroImage.src}
        imageSrcSet={desktopHeroImage.srcSet}
        imageSizes={desktopHeroImage.sizes}
        media="(min-width: 768px)"
        fetchPriority="high"
      />

      {/* Hero Section */}
      <div className="w-full relative">
        <picture className="block w-full">
          <source
            media="(max-width: 767px)"
            srcSet={mobileHeroImage.srcSet}
            sizes={mobileHeroImage.sizes}
          />
          <img
            {...desktopHeroImage}
            alt={heroAlt}
            className="w-full h-auto object-cover aspect-3/4 md:aspect-21/9 rounded-lg"
          />
        </picture>

        {/* SEO H1 — visually hidden, placed over banner for crawlers */}
        <h1 className="sr-only">
          Best Hair Transplant Clinic in Delhi — Ryan Clinic
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
