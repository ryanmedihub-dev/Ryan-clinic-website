import Image from "next/image";
import HairTransplantPage from "./home/homeServices";
import WhyChooseRyanClinic from "./home/whyChooseUs";
import OurResults from "./home/ourResults";
import TurkeySpecialists from "./home/turkeySpecialists";
import OurBranches from "./home/ourBranches";
import Testimonials from "./home/testimonial";
import BlogContent from "./home/blogContent";

import Banner from "../../../public/uploads/banner.jpg";
import Banner2 from "../../../public/uploads/banner2.jpg";

export default function Home() {
  return (
    <>
      {/* ✅ Hero Section */}
      <div className="w-full">
        {/* Desktop Banner */}
        <div className="hidden md:block">
          <Image
            src={Banner}
            alt="Ryan Clinic Banner"
            placeholder="blur"
            priority // 👈 ensures hero loads first
            sizes="(max-width: 768px) 100vw, 1920px" // responsive sizing
            className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9] rounded-lg"
          />
        </div>

        {/* Mobile Banner */}
        <div className="block md:hidden">
          <Image
            src={Banner2}
            alt="Ryan Clinic Banner Mobile"
            placeholder="blur"
            priority
            sizes="100vw" // 👈 ensures proper scaling on mobile
            className="w-full h-auto object-cover aspect-[3/4] rounded-lg"
          />  
        </div>
      </div>

      {/* ✅ Lazy load non-critical sections */}
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
