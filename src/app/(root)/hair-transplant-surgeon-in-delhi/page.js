import { cache } from "react";
import { DBConnection } from "@/lib/db";
import SurgeonPage from "@/models/Surgeon";
import SurgeonPageClient from "../surgeon/[slug]/SurgeonPageClient";

const getSurgeonPageData = cache(async (slug) => {
  await DBConnection();
  const page = await SurgeonPage.findOne({
    slug,
    "settings.isDeleted": { $ne: true },
  }).lean();
  return page ? JSON.parse(JSON.stringify(page)) : null;
});

export async function generateMetadata() {
  const page = await getSurgeonPageData("hair-transplant-surgeon-in-delhi");

  const seo = page?.seo || {};
  const ogImage =
    seo.ogImage ||
    page?.hero?.doctorCard?.image?.url ||
    "https://www.clinicryan.com/uploads/turkey-doctor.jpg";

  return {
    title:
      seo.metaTitle ||
      "Best Hair Transplant Surgeon in Delhi | Ryan Clinic",
    description:
      seo.metaDescription ||
      "Looking for the best hair transplant surgeon in Delhi? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.",
    keywords: seo.keywords || [
      "hair transplant surgeon in Delhi",
      "best hair transplant surgeon in Delhi",
      "hair transplant surgeon Delhi",
      "best hair transplant surgeon Delhi",
    ],
    alternates: {
      canonical:
        seo.canonical ||
        "https://www.clinicryan.com/hair-transplant-surgeon-in-delhi",
    },
    robots: seo.robots || "index, follow",
    openGraph: {
      title:
        seo.ogTitle ||
        "Best Hair Transplant Surgeon in Delhi — Doctor-Led FUE & DHI | Ryan Clinic",
      description:
        seo.ogDescription ||
        "Why surgical skill decides your result, what to look for, and the surgeon behind Ryan Clinic's natural, lasting hair transplants in Delhi.",
      url:
        seo.canonical ||
        "https://www.clinicryan.com/hair-transplant-surgeon-in-delhi",
      siteName: "Ryan Clinic",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Best Hair Transplant Surgeon in Delhi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        seo.ogTitle ||
        "Best Hair Transplant Surgeon in Delhi — Doctor-Led FUE & DHI | Ryan Clinic",
      description:
        seo.ogDescription ||
        "Why surgical skill decides your result, what to look for, and the surgeon behind Ryan Clinic's natural, lasting hair transplants in Delhi.",
      images: [ogImage],
    },
  };
}

export default async function DelhiSurgeonPage() {
  const pageData = await getSurgeonPageData("hair-transplant-surgeon-in-delhi");

  return (
    <SurgeonPageClient
      pageData={pageData}
      slug="hair-transplant-surgeon-in-delhi"
    />
  );
}
