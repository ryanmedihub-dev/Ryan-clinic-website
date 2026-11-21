import Image from "next/image";
import PageBanner from "@/components/layouts/pageBanner";
import { sanitizeContent, getValidImageSrc } from "@/lib/utils";
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    { key: "overview", enabled: true, order: 0, data: {} },
    { key: "ourResults", enabled: true, order: 1, data: {} },
    { key: "typesSection", enabled: true, order: 2, data: {} },
    { key: "whyChooseUs", enabled: true, order: 3, data: {} },
    { key: "costSection", enabled: isBranch, order: 4, data: {} },
    { key: "ourDoctor", enabled: isBranch, order: 5, data: {} },
    { key: "differencesSection", enabled: isBranch, order: 6, data: {} },
    { key: "pleoFeatures", enabled: true, order: 7, data: {} },
    { key: "whyDoctorMatters", enabled: isBranch, order: 8, data: {} },
    { key: "recoveryTimeline", enabled: false, order: 9, data: {} },
    { key: "extraFields", enabled: true, order: 10, data: {} },
    { key: "areasWeServe", enabled: isBranch, order: 11, data: {} },
    { key: "testimonials", enabled: true, order: 12, data: {} },
    { key: "faq", enabled: true, order: 13, data: {} },
  ];
}

// Service-specific trust items for the four non-transplant service pages
// These replace the shared hair-transplant accordion on WhyChooseRyanClinic
const eyebrowTrustItems = [
  {
    title: "Personalised Brow Assessment",
    body: "Before any eyebrow transplant procedure begins, the clinical team assesses your existing brow tissue, natural brow pattern, donor hair characteristics and facial structure. Every treatment plan is designed individually.",
  },
  {
    title: "Doctor-Led Procedure",
    body: "Eyebrow transplant procedures at Ryan Clinic are performed by trained medical specialists. Precision follicular implantation aligned with the natural direction of brow growth is a critical element of the procedure.",
  },
  {
    title: "Sterile Clinical Environment",
    body: "Every procedure is performed in a sterile clinical setting with single-use, surgical-grade instruments and established safety standards.",
  },
  {
    title: "Realistic Outcome Discussion",
    body: "The clinical team explains what results are realistic for your individual case — including the gradual timeline of regrowth, the need for periodic trimming as transplanted hairs retain scalp growth characteristics, and how individual biology influences outcomes.",
  },
  {
    title: "Post-Procedure Aftercare & Follow-Up",
    body: "Patients receive specific aftercare instructions and scheduled follow-up support to monitor healing and brow hair regrowth progress.",
  },
];

const peelsTrustItems = [
  {
    title: "Individual Skin Assessment",
    body: "Before any chemical peel is recommended, the clinical team performs a skin assessment to determine your skin type, concerns and medical history. This ensures that only the appropriate peel type and depth is selected for your skin.",
  },
  {
    title: "Range of Peel Depths",
    body: "Ryan Clinic offers superficial, medium and deep chemical peels. The choice is determined clinically, not commercially. Contraindications including pregnancy, isotretinoin use and active skin infections are assessed at consultation.",
  },
  {
    title: "Informed Risk Discussion",
    body: "All chemical peels carry risks including post-inflammatory hyperpigmentation, prolonged sensitivity and healing requirements that vary by peel depth. These are discussed fully before any procedure is agreed.",
  },
  {
    title: "Post-Peel Aftercare Guidance",
    body: "Detailed aftercare guidance is provided — including sun protection requirements, product restrictions and timelines for resuming normal skincare. Following aftercare instructions is essential to safe recovery and outcome.",
  },
  {
    title: "Delhi Clinical Setting",
    body: "Chemical peel treatments at Ryan Clinic are performed by trained clinical staff in a controlled, hygienic environment in Delhi.",
  },
];

const prpTrustItems = [
  {
    title: "Clinical Assessment Before Treatment",
    body: "PRP therapy suitability depends on the type and cause of your hair loss. A clinical consultation is required to assess whether PRP is appropriate for your individual situation before any treatment begins.",
  },
  {
    title: "Autologous, Biocompatible Process",
    body: "PRP is prepared from your own blood, making it biocompatible with minimal risk of rejection. As with any injection-based procedure, associated risks are discussed at consultation.",
  },
  {
    title: "Minimally Invasive Approach",
    body: "PRP hair treatment involves a blood draw and scalp micro-injections performed under clinical conditions with topical numbing to minimise discomfort. It is a minimally invasive procedure with minimal required downtime.",
  },
  {
    title: "Individualised Treatment Planning",
    body: "Session frequency and the number of treatments are determined based on clinical assessment, your hair loss pattern and your response to treatment. There is no universal protocol applied to every patient.",
  },
  {
    title: "Delhi Clinical Team",
    body: "PRP hair treatment at Ryan Clinic is administered by trained clinical staff in Delhi. Follow-up appointments are scheduled to monitor response and progress.",
  },
];

const alopeciaTrustItems = [
  {
    title: "Accurate Diagnosis First",
    body: "Because alopecia encompasses distinct conditions with different causes — including autoimmune, hormonal, nutritional and genetic factors — an accurate diagnosis is essential before any treatment is recommended. The clinical team at Ryan Clinic assesses the type and extent of hair loss individually.",
  },
  {
    title: "Treatment Options Matched to Your Diagnosis",
    body: "Medical, minimally invasive and surgical options are available depending on your diagnosis. Not every treatment is suitable for every type of alopecia. The clinical team explains which options are appropriate for your specific situation.",
  },
  {
    title: "Medical Management Where Appropriate",
    body: "Medically supervised treatments including topical agents, prescribed medications and clinical therapies are discussed where clinically indicated. All medical options are managed and monitored by the treating clinician.",
  },
  {
    title: "Support for Long-Term Management",
    body: "Many forms of alopecia require ongoing management rather than a single treatment. The clinical team provides structured follow-up to monitor progress and adjust the treatment plan as needed.",
  },
  {
    title: "Delhi Consultation Availability",
    body: "Clinical consultations for alopecia assessment and treatment planning are available at Ryan Clinic in Delhi. Contact the clinic to arrange an appointment.",
  },
];

const fueTrustItems = [
  {
    title: "Medical Assessment & FUE Surgical Planning",
    body: "Before an FUE procedure begins, your doctor evaluates your scalp, hair calibre, recession pattern, and donor zone density. Every surgical plan is developed individually based on clinical evaluation and patient goals.",
  },
  {
    title: "Careful Follicular Extraction & Preservation",
    body: "Individual follicular units are extracted from the safe donor zone using fine micro-punch instruments. Follicles are carefully handled and preserved in holding solution to minimise out-of-body time prior to implantation.",
  },
  {
    title: "Sterile, Surgical-Grade Operating Theatre",
    body: "Every procedure is performed in a sterile operating theatre with single-use, surgical-grade instruments, following recognised clinical hygiene and patient safety standards.",
  },
  {
    title: "Transparent, Per-Graft Pricing",
    body: "Your cost is calculated per confirmed graft count following a clinical scalp assessment. Pricing is explained clearly in advance with no hidden costs.",
  },
  {
    title: "Structured Post-Operative Follow-Up",
    body: "Ryan Clinic provides structured post-operative consultations to monitor healing, graft integration, and hair growth progress across each stage of recovery.",
  },
  {
    title: "FUE Recovery & Aftercare Guidance",
    body: "Patients receive detailed written aftercare instructions and post-operative medication on the day of the procedure. Redness and scabbing typically subside within 7–10 days, followed by the normal follicular shedding and regrowth cycle.",
  },
  {
    title: "Continued Clinical Support",
    body: "Your relationship with Ryan Clinic continues throughout your recovery. Follow-up reviews are scheduled to evaluate growth progression, assess density development, and answer aftercare questions.",
  },
  {
    title: "Patient Experiences & Individual Results",
    body: "Patients from across Delhi NCR choose Ryan Clinic for FUE and Sapphire FUE procedures. Real clinical before-and-after cases are reviewed during consultation. Individual results vary based on donor density, hair characteristics, and biological healing.",
  },
  {
    title: "Surgical Hygiene & Safety Standards",
    body: "All FUE procedures follow strict sterilization and clinical hygiene protocols to minimise infection risk, support clean tissue healing, and maintain patient safety throughout surgery.",
  },
];

const hairlineTrustItems = [
  {
    title: "Medical Assessment & Treatment Planning",
    body: "Before any hairline procedure begins, your doctor conducts a thorough scalp assessment covering your recession pattern, donor zone density, hair calibre, and facial proportions. Each treatment plan is designed individually — there is no one-size approach to hairline restoration.",
  },
  {
    title: "Careful Graft Handling & Preservation",
    body: "Healthy follicular units are extracted and implanted with care taken to minimise out-of-body time. Precise extraction patterns are planned to preserve long-term donor density, and each graft is handled to maintain follicle integrity throughout the procedure.",
  },
  {
    title: "Sterile, Surgical-Grade Operating Theatre",
    body: "Every procedure is performed in a sterile operating theatre with single-use, surgical-grade instruments, following recognised safety and hygiene standards. Patient safety and clinical precision remain at the foundation of every procedure.",
  },
  {
    title: "Transparent, Per-Graft Pricing",
    body: "Your cost is calculated per confirmed graft count following a scalp assessment. Pricing is explained in full before you commit — your surgeon discusses what your assessment reveals and what it means for your plan. No surprises after the consultation.",
  },
  {
    title: "Structured Post-Operative Follow-Up",
    body: "Ryan Clinic provides post-operative follow-up consultations to monitor your recovery and growth progression. Our team is available to answer aftercare questions and guide you through each phase — from initial healing through to the later stages of hair regrowth.",
  },
  {
    title: "Hairline Transplant Recovery Guidance",
    body: "Written aftercare instructions and post-operative medication are provided on the day of your procedure. Swelling and redness typically settle within a week. Transplanted hairs often shed at 2–4 weeks — an expected part of the follicular cycle — before new growth begins.",
  },
  {
    title: "Continued Post-Transplant Support",
    body: "Your relationship with Ryan Clinic does not end at discharge. Post-operative consultations are available to track your hairline's progress and address any questions as your result develops over the following months.",
  },
  {
    title: "Patient Experiences & Individual Results",
    body: "Ryan Clinic patients include individuals from across Delhi NCR and from other cities who travel for their hairline procedures. You are encouraged to review genuine before-and-after cases at your consultation. Individual results vary based on donor quality, hair characteristics, graft count, and healing.",
  },
  {
    title: "Surgical Hygiene & Safety Standards",
    body: "Every hairline transplant at Ryan Clinic is performed in a fully sterile operating environment. All instruments are single-use and surgical-grade. Clinical hygiene protocols are followed throughout every procedure to minimise infection risk and support safe healing.",
  },
];

function renderSection(key, d, service, branchName, slug = "") {
  const isFUE = slug === "fue-hair-transplant";
  const isHairline = slug === "hairline-transplant";
  const isEyebrow = slug === "eyebrow-transplant";
  const isChemicalPeel = slug === "chemical-skin-peels";
  const isPRP = slug === "prp-treatment";
  const isAlopecia = slug === "alopecia-treatments";

  // Resolve service-specific trust items for WhyChooseUs
  const targetServiceTrustItems = isEyebrow
    ? eyebrowTrustItems
    : isChemicalPeel
    ? peelsTrustItems
    : isPRP
    ? prpTrustItems
    : isAlopecia
    ? alopeciaTrustItems
    : undefined;

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

    case "ourResults": {
      // Chemical Peels, Eyebrow Transplant, PRP & Alopecia: suppress scalp surgical gallery (scalp grafts = misrepresentation)
      if (isChemicalPeel || isEyebrow || isPRP || isAlopecia) return null;
      return (
        <OurResults
          key="ourResults"
          city={d.city || branchName}
          mobileHeading={
            d.mobileHeading ||
            (isFUE
              ? "FUE Hair Transplant Results in Delhi"
              : isHairline
              ? "Hairline Transplant Results in Delhi"
              : isEyebrow || isPRP || isAlopecia
              ? "Hair Restoration Results at Ryan Clinic"
              : undefined)
          }
          desktopHeading={
            d.desktopHeading ||
            (isFUE
              ? "Hair Transplant Before & After: Individual Patient Results"
              : isHairline
              ? "Hairline Restoration Before & After Results"
              : isEyebrow || isPRP || isAlopecia
              ? "Hair Restoration Before & After Results at Ryan Clinic, Delhi"
              : undefined)
          }
        />
      );
    }

    case "typesSection": {
      let typesDetails = service?.typesData?.details;

      if (isEyebrow && typesDetails) {
        typesDetails = typesDetails
          .replace(
            /<h5( style="line-height: 1\.2">)(1\. Consultation:<\/h)5>/g,
            "<h3$1$23>"
          )
          .replace(
            /<h5( style="line-height: 1\.2">)(2\. Hair Follicle Extraction:<\/h)5>/g,
            "<h3$1$23>"
          )
          .replace(
            /<h5( style="line-height: 1\.2">)(3\. Precision Implantation:<\/h)5>/g,
            "<h3$1$23>"
          );
      } else if (isAlopecia && typesDetails) {
        typesDetails = typesDetails.replace(
          /<h2(\b[^>]*)>Alopecia Treatment Options in Delhi<\/h2>/,
          "<h2$1>Treatment Approaches at Ryan Clinic</h2>"
        );
      }

      return (
        <section key="typesSection" className="py-8 md:py-12 h-fit">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-5/12">
                <div className="h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%] gap-4 md:gap-6 sticky top-40">
                  <div className="relative rounded-xl h-48 md:h-60 lg:h-full overflow-hidden shadow-md">
                    {(() => {
                      const img0 = getValidImageSrc(service?.typesData?.images?.[0]?.url || service?.typesData?.images?.[0]);
                      return img0 ? (
                        <Image
                          src={img0}
                          alt={service?.typesData?.images?.[0]?.alt || "Service image"}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : null;
                    })()}
                  </div>
                  <div className="grid grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
                    <div className="relative rounded-xl h-48 overflow-hidden shadow-md">
                      {(() => {
                        const img1 = getValidImageSrc(service?.typesData?.images?.[1]?.url || service?.typesData?.images?.[1]);
                        return img1 ? (
                          <Image
                            src={img1}
                            alt={service?.typesData?.images?.[1]?.alt || "Service image"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : null;
                      })()}
                    </div>
                    <div className="relative rounded-xl h-48 overflow-hidden shadow-md">
                      {(() => {
                        const img2 = getValidImageSrc(service?.typesData?.images?.[2]?.url || service?.typesData?.images?.[2]);
                        return img2 ? (
                          <Image
                            src={img2}
                            alt={service?.typesData?.images?.[2]?.alt || "Service image"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-7/12">
                <div
                  className="prose max-w-none pageLayoutBox md:pl-7.5"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContent(typesDetails),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      );
    }

    case "whyChooseUs": {
      const whyHeading =
        d.heading ||
        (isEyebrow
          ? "Eyebrow Restoration at Ryan Clinic"
          : isChemicalPeel
          ? "Skin Treatment Planning at Ryan Clinic"
          : isPRP
          ? "PRP Hair Treatment at Ryan Clinic"
          : isAlopecia
          ? "Alopecia Care at Ryan Clinic"
          : undefined);

      const whyDescription =
        d.description ||
        (isEyebrow
          ? "Explore personalised assessment and treatment planning for sparse or uneven eyebrows."
          : isChemicalPeel
          ? "Explore skin treatment options selected according to individual skin concerns and clinical assessment."
          : isPRP
          ? "Learn about PRP treatment options, suitability and personalised care planning for hair concerns."
          : isAlopecia
          ? "Hair loss has different causes, so treatment options depend on the underlying condition and clinical assessment."
          : undefined);

      const whyImageCaption =
        d.imageCaption ||
        (targetServiceTrustItems != null ? "Ryan Clinic Delhi" : undefined);

      const whyImageTitle =
        d.imageTitle ||
        (targetServiceTrustItems != null ? "Personalised Care" : undefined);

      const whyCtaLabel =
        d.ctaLabel ||
        (isEyebrow
          ? "Book Your Eyebrow Consultation"
          : isChemicalPeel
          ? "Book Your Skin Consultation"
          : isPRP
          ? "Book Your PRP Consultation"
          : isAlopecia
          ? "Book Your Alopecia Consultation"
          : undefined);

      const whyCtaWhatsappUrl =
        d.ctaWhatsappUrl ||
        (isEyebrow
          ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
            encodeURIComponent("Hi, I want an eyebrow transplant consultation in Delhi")
          : isChemicalPeel
          ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
            encodeURIComponent("Hi, I want a chemical skin peel consultation in Delhi")
          : isPRP
          ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
            encodeURIComponent("Hi, I want a PRP consultation in Delhi")
          : isAlopecia
          ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
            encodeURIComponent("Hi, I want an alopecia consultation in Delhi")
          : undefined);

      const whyCtaNote =
        d.ctaNote ||
        (isEyebrow
          ? "Clinical assessment · Personalised brow design · Transparent pricing · No obligation."
          : isChemicalPeel
          ? "Skin type evaluation · Treatment planning · Transparent pricing · No obligation."
          : isPRP
          ? "Clinical hair assessment · Suitability evaluation · Transparent pricing · No obligation."
          : isAlopecia
          ? "Accurate diagnosis · Medical treatment planning · Transparent pricing · No obligation."
          : undefined);

      return (
        <WhyChooseRyanClinic
          key="whyChooseUs"
          city={d.city || branchName}
          items={
            d.items ||
            (isFUE
              ? fueTrustItems
              : isHairline
              ? hairlineTrustItems
              : targetServiceTrustItems)
          }
          hideStats={d.hideStats || isFUE || isHairline || (targetServiceTrustItems != null)}
          badgeText={d.badgeText}
          heading={whyHeading}
          description={whyDescription}
          imageTitle={whyImageTitle}
          imageCaption={whyImageCaption}
          imageAlt={
            targetServiceTrustItems != null
              ? "Ryan Clinic medical facility in Delhi"
              : undefined
          }
          ctaLabel={whyCtaLabel}
          ctaWhatsappUrl={whyCtaWhatsappUrl}
          ctaNote={whyCtaNote}
        />
      );
    }

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

    case "ourDoctor": {
      const meetYourSurgeon = service?.meetYourSurgeon || d?.meetYourSurgeon || {};
      if (meetYourSurgeon.enabled === false) return null;

      const doctor = service?.assignedDoctor;
      const isDoctorPublished =
        doctor?.status ? String(doctor.status).toLowerCase() === "published" : true;
      const isEligible =
        doctor &&
        typeof doctor === "object" &&
        isDoctorPublished &&
        !doctor.deletedAt &&
        doctor.isActive !== false;

      if (!isEligible) return null;

      return (
        <OurDoctorSection
          key="ourDoctor"
          city={d.city || branchName}
          doctor={doctor}
          cmsDoctor={doctor}
          settings={meetYourSurgeon}
          sectionSettings={meetYourSurgeon}
          meetYourSurgeon={meetYourSurgeon}
        />
      );
    }

    case "differencesSection":
      return (
        <DifferencesSection key="differencesSection" features={d.features} />
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
      let detail1 = service?.extraFields?.detail1;
      let detail2 = service?.extraFields?.detail2;
      if (!detail1 && !detail2) return null;

      if (isEyebrow) {
        if (detail1) {
          detail1 = detail1.replace(
            '<p><span style="font-size: 19px">Post-Procedure Care</span></p>',
            "<h3>Post-Procedure Care</h3>"
          );
        }
        if (detail2) {
          detail2 = detail2.replace(
            '<p style="text-align: justify"><span style="font-size: 19px">Why Eyebrow Transplant</span></p>',
            "<h3>Why Eyebrow Transplant</h3>"
          );
        }
      }

      return (
        <section key="extraFields" className="py-8 md:py-12">
          <div className="containerFull px-4 md:px-6">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 border-r-0 md:border-r border-gray-200 md:pr-8">
                {detail1 && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeContent(detail1),
                    }}
                  />
                )}
              </div>
              <div className="w-full md:w-1/2 px-0 md:px-4 lg:px-8 mt-6 md:mt-0 md:pl-8">
                {detail2 && (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeContent(detail2),
                    }}
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
      const raw = match[1]
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      if (raw.toLowerCase() === "rachi") return "Ranchi";
      if (raw.toLowerCase() === "gurugram") return "Gurgaon";
      return raw;
    }
    return service?.metadata?.pageName || "";
  })();

  let rawSections = (
    service?.pageSections?.length
      ? service.pageSections
      : getDefaultSections(service?.metadata?.pageType)
  );

  const isMeetYourSurgeonEnabled = service?.meetYourSurgeon?.enabled !== false;
  if (service?.assignedDoctor && isMeetYourSurgeonEnabled) {
    const hasOurDoc = rawSections.some((s) => s.key === "ourDoctor");
    if (!hasOurDoc) {
      const costIdx = rawSections.findIndex((s) => s.key === "costSection");
      const insertOrder = costIdx !== -1 ? (rawSections[costIdx].order ?? 4) + 1 : 5;
      rawSections = [
        ...rawSections,
        { key: "ourDoctor", enabled: true, order: insertOrder, data: {} },
      ];
    } else {
      rawSections = rawSections.map((s) =>
        s.key === "ourDoctor" ? { ...s, enabled: true } : s
      );
    }
  }

  const isFUE = slug === "fue-hair-transplant";
  const isHairline = slug === "hairline-transplant";
  const isEyebrow = slug === "eyebrow-transplant";
  const isChemicalPeel = slug === "chemical-skin-peels";
  const isPRP = slug === "prp-treatment";
  const isAlopecia = slug === "alopecia-treatments";
  const isTargetService = isEyebrow || isChemicalPeel || isPRP || isAlopecia;

  const sections = rawSections
    .filter((s) => {
      if (s.key === "ourDoctor") return isMeetYourSurgeonEnabled;
      // Suppress unrelated testimonials on all 4 target pages (no verified service-specific reviews)
      if (s.key === "testimonials" && (isFUE || isHairline || isTargetService)) return false;
      // Chemical Peels, Eyebrow & PRP ourResults: suppressed inside renderSection (scalp grafts = misrepresentation)
      // Other target pages: ourResults and whyChooseUs are rendered with page-specific props via renderSection
      return s.enabled;
    })
    .sort((a, b) => a.order - b.order);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.clinicryan.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: service?.metadata?.pageName || branchName || "Hair Transplant in Delhi",
        item: `https://www.clinicryan.com/${slug}`,
      },
    ],
  };

  const faqSchema =
    service?.faq && service.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div>
        <PageBanner
          breadcrumb={service?.metadata?.pageName}
          title={service?.bannerData?.title}
          description={service?.bannerData?.description}
          bgImage={service?.bannerData?.imageurl}
          alt={service?.bannerData?.imagealt}
          badgeText={
            service?.bannerData?.badgeText ||
            (isFUE
              ? "Doctor-Led Sapphire FUE Restoration"
              : isHairline
              ? "Doctor-Led Hairline Restoration"
              : isEyebrow
              ? "Doctor-Led Eyebrow Restoration"
              : isChemicalPeel
              ? "Clinical Dermatology & Skin Rejuvenation"
              : isPRP
              ? "Doctor-Led PRP Treatment"
              : isAlopecia
              ? "Clinical Hair Loss & Alopecia Evaluation"
              : "")
          }
          whatsappUrl={
            isEyebrow
              ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
                encodeURIComponent(
                  "Hi, I want an eyebrow transplant consultation in Delhi"
                )
              : isChemicalPeel
              ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
                encodeURIComponent(
                  "Hi, I want a chemical skin peel consultation in Delhi"
                )
              : isPRP
              ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
                encodeURIComponent("Hi, I want a PRP consultation in Delhi")
              : isAlopecia
              ? "https://api.whatsapp.com/send?phone=919217958539&text=" +
                encodeURIComponent("Hi, I want an alopecia consultation in Delhi")
              : undefined
          }
        />

        {sections.map((section) =>
          renderSection(section.key, section.data || {}, service, branchName, slug),
        )}
      </div>
    </>
  );
}
