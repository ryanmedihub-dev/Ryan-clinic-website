import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import SurgeonPage from "@/models/Surgeon";
import PageBanner from "@/components/layouts/pageBanner";
import SurgeonPageClient from "./SurgeonPageClient";

// ─── Data Fetching ─────────────────────────────────────────────────────────────

const getSurgeonPageData = cache(async (slug) => {
  await DBConnection();
  const page = await SurgeonPage.findOne({
    slug,
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

  return (
    <>
      <PageBanner
        title={
          pageData?.hero?.title ||
          pageData?.title ||
          "Best Hair Transplant Surgeon"
        }
        description={
          pageData?.hero?.description ||
          "Your result depends less on the clinic name or machine used, and more on the hands and artistic eye of your surgeon."
        }
        breadcrumb={
          pageData?.hero?.badge?.text ||
          pageData?.title ||
          "Hair Transplant Surgeon"
        }
      />
      <SurgeonPageClient pageData={pageData} />
    </>
  );
}