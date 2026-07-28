import PageBanner from "@/components/layouts/pageBanner";
import SurgeonPageClient from "./SurgeonPageClient";
import { DBConnection } from "@/lib/db";
import SurgeonPage from "@/models/Surgeon";

async function getSurgeonData() {
  try {
    await DBConnection();
    const page = await SurgeonPage.findOne({
      slug: "hair-transplant-surgeon-in-delhi",
      "settings.isDeleted": { $ne: true },
    }).lean();
    if (!page) return null;
    return JSON.parse(JSON.stringify(page));
  } catch (error) {
    console.error("Error fetching surgeon page data:", error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await getSurgeonData();
  const seo = page?.seo || {};

  return {
    title: seo.metaTitle || page?.title || "Best Hair Transplant Surgeon in Delhi | Ryan Clinic",
    description:
      seo.metaDescription ||
      page?.general?.shortDescription ||
      "Looking for the best hair transplant surgeon in Delhi? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.",
    alternates: {
      canonical: seo.canonical || "https://www.clinicryan.com/hair-transplant-surgeon-in-delhi",
    },
    robots: seo.robots || "index, follow",
    openGraph: {
      title: seo.metaTitle || page?.title || "Best Hair Transplant Surgeon in Delhi — Doctor-Led FUE & Turkish Technique | Ryan Clinic",
      description:
        seo.metaDescription ||
        "Why surgical skill decides your result, what to look for, and the surgeon behind Ryan Clinic's natural, lasting hair transplants in Delhi.",
      url: seo.canonical || "https://www.clinicryan.com/hair-transplant-surgeon-in-delhi",
      siteName: "Ryan Clinic",
      type: "website",
      images: [
        {
          url: seo.ogImage || page?.hero?.doctorCard?.image?.url || "https://www.clinicryan.com/uploads/turkey-doctor.jpg",
          alt: page?.title || "Best Hair Transplant Surgeon in Delhi — Ryan Clinic",
        },
      ],
    },
  };
}

export default async function HairTransplantSurgeonDelhiPage() {
  const pageData = await getSurgeonData();

  return (
    <>
      <PageBanner
        title={pageData?.hero?.title || pageData?.title || "Best Hair Transplant Surgeon in Delhi"}
        description={
          pageData?.hero?.description ||
          "Your result depends less on the clinic's name or the machine used and more on the hands and eye of the surgeon. The best hair transplant surgeon in Delhi is a qualified, experienced surgeon who personally performs every step — designing a natural hairline, extracting follicles cleanly, and implanting each graft at the right angle, depth, and density. At Ryan Clinic in Pitampura, your hair transplant is surgeon-led from start to finish, never delegated to technicians."
        }
        breadcrumb={pageData?.hero?.badge?.text || "Hair Transplant Surgeon in Delhi"}
      />
      <SurgeonPageClient pageData={pageData} />
    </>
  );
}

