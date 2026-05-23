import PageBanner from "@/components/layouts/pageBanner";
import DoctorsGrid from "./DoctorsGrid";

export const metadata = {
  title: "Our Doctors | Turkey-Certified Hair Transplant Surgeons | Ryan Clinic",
  description:
    "Meet Ryan Clinic's team of Turkey-certified hair transplant doctors. 100% doctor-led surgery, 95%+ graft survival rate. Clinics in Delhi, Mumbai & Hyderabad.",
  alternates: {
    canonical: "https://www.clinicryan.com/doctors",
  },
  openGraph: {
    title: "Our Doctors | Ryan Clinic Hair Transplant Experts",
    description:
      "India's only Turkey-certified hair restoration doctors. 10,000+ successful procedures. Book a free consultation today.",
    url: "https://www.clinicryan.com/doctors",
    type: "website",
  },
};

export default function DoctorsPage() {
  return (
    <>
      <PageBanner
        title="Our Expert Doctors"
        description="India's only Turkey-certified hair restoration specialists. Every surgical step performed exclusively by certified doctors — no technicians, ever."
        bgImage="/uploads/turkey-doctor.jpg"
      />
      <DoctorsGrid />
    </>
  );
}
