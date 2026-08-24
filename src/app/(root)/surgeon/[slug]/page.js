import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import SurgeonPage from "@/models/SurgeonPage";
import PageBanner from "@/components/layouts/pageBanner";
import SurgeonPageClient from "./SurgeonPageClient";

// ─── Data Fetching ─────────────────────────────────────────────────────────────

const getSurgeonPageData = cache(async (slug) => {
  await DBConnection();
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
  const escaped = cleanSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const page = await SurgeonPage.findOne({
    slug: { $regex: new RegExp(`^${escaped}$`, "i") },
    "settings.isDeleted": { $ne: true },
  }).lean();
  return page ? JSON.parse(JSON.stringify(page)) : null;
});

// ─── SEO Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getSurgeonPageData(slug);

  if (!page) {
    return {
      title: "Surgeon Page Not Found | Ryan Clinic",
      description: "The requested surgeon page could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const seo = page.seo || {};
  const ogImage =
    seo.ogImage ||
    page?.hero?.doctorCard?.image?.url ||
    "https://www.clinicryan.com/uploads/turkey-doctor.jpg";

  return {
    title:
      seo.metaTitle ||
      page.title ||
      "Best Hair Transplant Surgeon | Ryan Clinic",
    description:
      seo.metaDescription ||
      page?.general?.shortDescription ||
      "Book a free consultation with Ryan Clinic's certified hair transplant surgeon.",
    keywords: seo.keywords || [],
    alternates: {
      canonical:
        seo.canonical || `https://www.clinicryan.com/surgeon/${slug}`,
    },
    robots: seo.robots || "index, follow",
    openGraph: {
      title:
        seo.metaTitle ||
        page.title ||
        "Best Hair Transplant Surgeon | Ryan Clinic",
      description:
        seo.metaDescription ||
        page?.general?.shortDescription ||
        "",
      url:
        seo.canonical || `https://www.clinicryan.com/surgeon/${slug}`,
      siteName: "Ryan Clinic",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.metaTitle || page.title || "Ryan Clinic Surgeon",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || page.title || "Ryan Clinic Surgeon",
      description: seo.metaDescription || "",
      images: [ogImage],
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function SurgeonDynamicPage({ params }) {
  const { slug } = await params;
  const pageData = await getSurgeonPageData(slug);

  if (!pageData) {
    notFound();
  }

  const bannerTitle =
    pageData.hero?.title ||
    pageData.title ||
    "Best Hair Transplant Surgeon";

  const bannerDesc =
    pageData.hero?.description ||
    pageData.general?.shortDescription ||
    "Book a free consultation with Ryan Clinic's certified hair transplant surgeon.";

  const rawImage =
    pageData.hero?.doctorCard?.image?.url ||
    pageData.leadSurgeon?.doctorImage?.url ||
    pageData.hero?.doctorCard?.image ||
    pageData.leadSurgeon?.doctorImage;

  const bannerImage =
    typeof rawImage === "string" && rawImage.trim() !== ""
      ? rawImage.trim()
      : typeof rawImage === "object" && rawImage?.url
      ? rawImage.url
      : "/uploads/turkey-doctor.jpg";

  return (
    <>
      <PageBanner
        breadcrumb={`Surgeon / ${pageData.title || "Hair Transplant Surgeon"}`}
        title={bannerTitle}
        description={bannerDesc}
        bgImage={bannerImage}
        alt={pageData.title || "Hair Transplant Surgeon"}
      />
      <SurgeonPageClient pageData={pageData} slug={slug} />
    </>
  );
}