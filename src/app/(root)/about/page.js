import PageBanner from "@/components/layouts/pageBanner";
import AboutSection from "./aboutSection";
import StepsSection from "./stepsSection";
import ChooseSection from "./chooseSection";

export const metadata = {
  title: "About Ryan Clinic | India's Only Turkey Sapphire FUE Experts",
  description:
    "Learn about Ryan Clinic — India's only Turkey-certified Sapphire FUE hair transplant clinic with 12+ years of experience in Delhi, Mumbai & Hyderabad.",
  alternates: {
    canonical: "https://www.clinicryan.com/about",
  },
};

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
