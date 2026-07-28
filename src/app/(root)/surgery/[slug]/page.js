import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import SurgeryPageModel from "@/models/surgeryPage";
import SurgeryPageClient from "@/components/surgery/SurgeryPageClient";

// ─── Data Fetching ────────────────────────────────────────────────────────────

const getSurgeryPage = cache(async (slug) => {
  await DBConnection();
  const page = await SurgeryPageModel.findOne({ slug }).lean();
  // Serialize Mongoose document to a plain JS object before passing to client
  return page ? JSON.parse(JSON.stringify(page)) : null;
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getSurgeryPage(slug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  const seo = page.seo ?? {};
  const heroImage = page.hero?.heroImage?.image ?? "";
  const ogImage = seo.openGraphImage?.image || heroImage;

  // keywords is stored as a comma-separated string in the schema
  const keywords = seo.keywords
    ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  // robots is stored as "index,follow" — Next.js expects an object
  const robotsStr = seo.robots || "index,follow";
  const robots = {
    index: !robotsStr.includes("noindex"),
    follow: !robotsStr.includes("nofollow"),
  };

  return {
    title: seo.metaTitle || page.pageName,
    description: seo.metaDescription || "",
    keywords,
    alternates: {
      canonical: seo.canonicalUrl || `https://www.clinicryan.com/surgery/${slug}`,
    },
    robots,
    openGraph: {
      title: seo.metaTitle || page.pageName,
      description: seo.metaDescription || "",
      url: seo.canonicalUrl || `https://www.clinicryan.com/surgery/${slug}`,
      siteName: "Ryan Clinic",
      locale: "en_IN",
      type: "website",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: seo.metaTitle || page.pageName }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || page.pageName,
      description: seo.metaDescription || "",
      images: ogImage ? [ogImage] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SurgeryPage({ params }) {
  const { slug } = await params;
  const page = await getSurgeryPage(slug);

  if (!page) {
    notFound();
  }

  return <SurgeryPageClient data={page} />;
}