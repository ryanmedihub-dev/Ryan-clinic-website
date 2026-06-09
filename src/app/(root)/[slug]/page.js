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
import CostSection from "@/components/pages/CostSection";
import RecoveryTimeline from "@/components/pages/RecoveryTimeline";
import DifferencesSection from "@/components/pages/DifferencesSection";
import OurDoctorSection from "@/components/pages/OurDoctorSection";
import WhyDoctorMattersSection from "@/components/pages/WhyDoctorMattersSection";
import AreasWeServe from "@/components/pages/AreasWeServe";

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

// Default section order/visibility — used when service.pageSections is not set.
function getDefaultSections(pageType) {
  const isBranch = pageType === "branch";
  return [
    { key: "overview",           enabled: true,     order: 0,  data: {} },
    { key: "ourResults",         enabled: true,     order: 1,  data: {} },
    { key: "typesSection",       enabled: true,     order: 2,  data: {} },
    { key: "whyChooseUs",        enabled: true,     order: 3,  data: {} },
    { key: "costSection",        enabled: isBranch, order: 4,  data: {} },
    { key: "ourDoctor",          enabled: isBranch, order: 5,  data: {} },
    { key: "differencesSection", enabled: isBranch, order: 6,  data: {} },
    { key: "pleoFeatures",       enabled: true,     order: 7,  data: {} },
    { key: "whyDoctorMatters",   enabled: isBranch, order: 8,  data: {} },
    { key: "recoveryTimeline",   enabled: false,    order: 9,  data: {} },
    { key: "extraFields",        enabled: true,     order: 10, data: {} },
    { key: "areasWeServe",       enabled: isBranch, order: 11, data: {} },
    { key: "testimonials",       enabled: true,     order: 12, data: {} },
    { key: "faq",                enabled: true,     order: 13, data: {} },
  ];
}

function renderSection(key, d, service, branchName) {
  switch (key) {
    case "overview":
      return (
        <section key="overview" className="py-8 md:py-12">
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
      );

    case "ourResults":
      return <OurResults key="ourResults" />;

    case "typesSection":
      return (
        <section key="typesSection" className="py-8 md:py-12 h-fit">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-5/12">
                <div className="h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%] gap-4 md:gap-6 sticky top-40">
                  <div className="relative rounded-xl h-48 md:h-60 lg:h-full overflow-hidden shadow-md">
                    <Image
                      src={service?.typesData?.images[0]?.url}
                      alt={service?.typesData?.images[0]?.alt || "Service image"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
                    <div className="relative rounded-xl h-48 overflow-hidden shadow-md">
                      <Image
                        src={service?.typesData?.images[1]?.url}
                        alt={service?.typesData?.images[1]?.alt || "Service image"}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="relative rounded-xl h-48 overflow-hidden shadow-md">
                      <Image
                        src={service?.typesData?.images[2]?.url}
                        alt={service?.typesData?.images[2]?.alt || "Service image"}
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
      );

    case "whyChooseUs":
      return <WhyChooseRyanClinic key="whyChooseUs" city={d.city || branchName} />;

    case "costSection":
      return (
        <CostSection
          key="costSection"
          city={d.city || branchName}
          pricing={d.pricing}
          sectionTitle={d.sectionTitle}
          sectionDescription={d.sectionDescription}
        />
      );

    case "ourDoctor":
      return (
        <OurDoctorSection
          key="ourDoctor"
          city={d.city || branchName}
          doctor={d.doctor}
        />
      );

    case "differencesSection":
      return (
        <DifferencesSection
          key="differencesSection"
          features={d.features}
        />
      );

    case "pleoFeatures":
      return (
        <PleoFeatures
          key="pleoFeatures"
          features={service?.benefitsData?.component}
          title={service?.benefitsData?.title}
          description={service?.benefitsData?.description}
        />
      );

    case "whyDoctorMatters":
      return (
        <WhyDoctorMattersSection
          key="whyDoctorMatters"
          risks={d.risks}
          comparison={d.comparison}
        />
      );

    case "recoveryTimeline":
      return <RecoveryTimeline key="recoveryTimeline" phases={d.phases} />;

    case "extraFields": {
      const detail1 = service?.extraFields?.detail1;
      const detail2 = service?.extraFields?.detail2;
      if (!detail1 && !detail2) return null;
      return (
        <section key="extraFields" className="py-8 md:py-12">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 border-r-0 md:border-r border-gray-200 md:pr-8">
                {detail1 && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizeContent(detail1) }}
                  />
                )}
              </div>
              <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 mt-6 md:mt-0 md:pl-8">
                {detail2 && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizeContent(detail2) }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case "areasWeServe":
      return (
        <AreasWeServe
          key="areasWeServe"
          city={d.city || branchName}
          branch={d.branch || branchName}
          branchData={d.branchData}
        />
      );

    case "testimonials":
      return <Testimonials key="testimonials" />;

    case "faq":
      return <FAQSection key="faq" faqs={service?.faq} />;

    default:
      return null;
  }
}

export default async function ServicesPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const branchName = (() => {
    if (service?.metadata?.branchName) return service.metadata.branchName;
    const match = slug.match(/^hair-transplant-in-(.+)$/);
    if (match) {
      return match[1]
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    return "Delhi";
  })();

  const sections = (
    service?.pageSections?.length
      ? service.pageSections
      : getDefaultSections(service?.metadata?.pageType)
  )
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <div>
        <PageBanner
          breadcrumb={service?.metadata?.pageName}
          title={service?.bannerData?.title}
          description={service?.bannerData?.description}
          bgImage={service?.bannerData?.imageurl}
          alt={service?.bannerData?.imagealt}
        />

        {sections.map((section) =>
          renderSection(section.key, section.data || {}, service, branchName)
        )}
      </div>
    </>
  );
}
