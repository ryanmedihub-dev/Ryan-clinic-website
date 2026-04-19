import PageBanner from "@/components/layouts/pageBanner";
import AboutSection from "./aboutSection";
import StepsSection from "./stepsSection";
import ChooseSection from "./chooseSection";
const page = () => {
  return (
    <>
      <PageBanner
        title="About us"
        description="Regain your confidence with world-class
          Turkey's Technique hair restoration at Turkey's
          top-rated Ryan Clinic!"
        bgImage="/uploads/about.jpg"
      />
      <AboutSection />
      <StepsSection />
      <ChooseSection />
    </>
  );
};

export default page;
