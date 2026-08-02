import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import SurgeryPageModel from "@/models/surgeryPage";
import SurgeryPageClient from "@/components/surgery/SurgeryPageClient";

const getSurgeryPage = cache(async (slug) => {
  await DBConnection();
  const page = await SurgeryPageModel.findOne({ slug }).lean();
  return page ? JSON.parse(JSON.stringify(page)) : null;
});

export async function generateMetadata() {
  const page = await getSurgeryPage("hair-transplant-surgery-in-mumbai");

  if (!page) {
    return { title: "Best Hair Transplant Surgery in Mumbai | Ryan Clinic" };
  }

  const seo = page.seo ?? {};
  const heroImage = page.hero?.heroImage?.image ?? "";
  const ogImage = seo.openGraphImage?.image || heroImage;

  const keywords = seo.keywords
    ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

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
      canonical: seo.canonicalUrl || "https://www.clinicryan.com/hair-transplant-surgery-in-mumbai",
    },
    robots,
    openGraph: {
      title: seo.metaTitle || page.pageName,
      description: seo.metaDescription || "",
      url: seo.canonicalUrl || "https://www.clinicryan.com/hair-transplant-surgery-in-mumbai",
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

export default async function MumbaiSurgeryPage() {
  const page = await getSurgeryPage("hair-transplant-surgery-in-mumbai");

  if (!page) {
    notFound();
  }

  return <SurgeryPageClient data={page} />;
}
