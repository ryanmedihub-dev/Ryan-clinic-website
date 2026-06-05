import Image from "next/image";
import PageBanner from "@/components/layouts/pageBanner";
import { sanitizeContent } from "@/lib/utils";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "./FAQSection";
import PleoFeatures from "./PleoFeatures";
import OurResults from "../home/ourResults";
import { getServiceBySlug } from "@/lib/serviceData";
import { notFound } from "next/navigation";
import Testimonials from "../home/testimonial";
import WhyChooseRyanClinic from "../home/whyChooseUs";

// ── Branch-only section imports ──────────────────────────────────────────────
import CostSection from "@/components/pages/CostSection";
import RecoveryTimeline from "@/components/pages/RecoveryTimeline";
import DifferencesSection from "@/components/pages/DifferencesSection";
import OurDoctorSection from "@/components/pages/OurDoctorSection";
import WhyDoctorMattersSection from "@/components/pages/WhyDoctorMattersSection";
import AreasWeServe from "@/components/pages/AreasWeServe";

// 🔹 Dynamic metadata for each service page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "404 | Service Not Found - Ryan Clinic",
      description: "The requested service could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const meta = service.metadata || {};

  return {
    title: meta?.title || service?.bannerData?.title || "Ryan Clinic",
    description: meta?.description || service?.bannerData?.description,
    keywords: meta?.keywords || ["Hair Transplant", "Ryan Clinic"],
    alternates: {
      canonical: `https://www.clinicryan.com/${slug}`,
    },
    openGraph: {
      title: meta?.title || service?.bannerData?.title,
      description: meta?.description || service?.bannerData?.description,
      url: `https://www.clinicryan.com/${slug}`,
      siteName: "Ryan Clinic",
      images: [
        {
          url: service?.bannerData?.imageurl || "/uploads/logo.png",
          width: 1200,
          height: 630,
          alt: service?.bannerData?.title || "Ryan Clinic Service",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title || service?.bannerData?.title,
      description: meta?.description || service?.bannerData?.description,
      images: [service?.bannerData?.imageurl || "/uploads/logo.png"],
    },
  };
}

export default async function ServicesPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // ── Determine if this is a branch landing page ───────────────────────────
  const isBranch = service?.metadata?.pageType === "branch";

  // ── Extract branch/city name from metadata (e.g. "Delhi", "Mumbai", "Hyderabad")
  // Falls back to slug-based extraction if not explicitly set
  const branchName =
    service?.metadata?.branchName ||
    (slug.includes("delhi")
      ? "Delhi"
      : slug.includes("mumbai")
        ? "Mumbai"
        : slug.includes("hyderabad")
          ? "Hyderabad"
          : "Delhi");

  return (
    <>
      <div>
        {/* ── Page Banner ─────────────────────────────────────────────────── */}
        <PageBanner
          breadcrumb={service?.metadata?.pageName}
          title={service?.bannerData?.title}
          description={service?.bannerData?.description}
          bgImage={service?.bannerData?.imageurl}
          alt={service?.bannerData?.imagealt}
        />

        {/* ── Overview + Contact Form ──────────────────────────────────────── */}
        <section className=" py-8 md:py-12">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div
                className="w-full lg:w-2/3 prose max-w-none pageLayoutBox"
                dangerouslySetInnerHTML={{
                  __html: sanitizeContent(service?.metadata?.overviewData),
                }}
              />
              <div className="w-full lg:w-1/3 px-0 md:px-4 lg:px-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Results (all pages) ──────────────────────────────────────── */}
        <OurResults />

        {/* ── Types / Images + Details ─────────────────────────────────────── */}
        <section className="py-8 md:py-12 h-fit">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-5/12">
                <div className="h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%] gap-4 md:gap-6 sticky top-40">
                  <div className="relative rounded-xl h-48 md:h-60 lg:h-full overflow-hidden shadow-md">
                    <Image
                      src={service?.typesData?.images[0]?.url}
                      alt={
                        service?.typesData?.images[0]?.alt || "Service image"
                      }
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
                    <div className="relative rounded-xl h-48 overflow-hidden shadow-md">
                      <Image
                        src={service?.typesData?.images[1]?.url}
                        alt={
                          service?.typesData?.images[1]?.alt || "Service image"
                        }
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="relative rounded-xl h-48 overflow-hidden shadow-md">
                      <Image
                        src={service?.typesData?.images[2]?.url}
                        alt={
                          service?.typesData?.images[2]?.alt || "Service image"
                        }
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12">
                <div
                  className="prose max-w-none pageLayoutBox md:pl-7.5"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContent(service?.typesData?.details),
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Ryan Clinic (all pages) ──────────────────────────── */}
        <WhyChooseRyanClinic />

        {/* ── Cost Section — branch pages only ────────────────────────────── */}
        {isBranch && <CostSection city={branchName} />}

        {/* ── Our Doctor Section — branch pages only ───────────────────────── */}
        {isBranch && <OurDoctorSection city={branchName} />}

        {/* ── Differences Section — branch pages only ──────────────────────── */}
        {isBranch && <DifferencesSection />}

        {/* ── PleoFeatures / Benefits (all pages) ─────────────────────────── */}
        <PleoFeatures
          features={service?.benefitsData?.component}
          title={service?.benefitsData?.title}
          description={service?.benefitsData?.description}
        />

        {/* ── Why Doctor Matters — branch pages only ───────────────────────── */}
        {isBranch && <WhyDoctorMattersSection />}

        {/* ── Recovery Timeline — branch pages only ───────────────────────── */}
        {/* {isBranch && <RecoveryTimeline />} */}

        {/* ── Extra Fields (all pages, if present) ────────────────────────── */}
        {service?.extraFieldsData?.length > 0 && (
          <section className="py-8 md:py-12">
            <div className="containerFull px-4 md:px-6">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 border-r-0 md:border-r border-gray-200 md:pr-8">
                  {service?.extraFieldsData?.detail1 && (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeContent(
                          service.extraFieldsData.detail1,
                        ),
                      }}
                    />
                  )}
                </div>
                <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 mt-6 md:mt-0 md:pl-8">
                  {service?.extraFieldsData?.detail2 && (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeContent(
                          service.extraFieldsData.detail2,
                        ),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Areas We Serve — branch pages only ──────────────────────────── */}
        {isBranch && <AreasWeServe city={branchName} branch={branchName} />}

        {/* ── Testimonials (all pages) ────────────────────────────────────── */}
        <Testimonials />

        {/* ── FAQ Section (all pages) ──────────────────────────────────────── */}
        <FAQSection faqs={service?.faq} />
      </div>
    </>
  );
}
