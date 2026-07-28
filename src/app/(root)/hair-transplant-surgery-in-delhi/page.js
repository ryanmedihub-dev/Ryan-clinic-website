import { notFound } from "next/navigation";
import SurgeryPageClient from "@/components/surgery/SurgeryPageClient";

export const dynamic = "force-dynamic";

const SLUG = "hair-transplant-surgery-in-delhi";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function fetchSurgeryPage() {
  try {
    const res = await fetch(`${BASE_URL}/api/surgery/get?slug=${SLUG}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();

    return json?.surgeryPage ?? null;
  } catch (error) {
    console.error("Failed to fetch surgery page:", error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await fetchSurgeryPage();

  if (!page) {
    return {
      title: "Hair Transplant Surgery in Delhi | Ryan Clinic",
      description:
        "Doctor-led FUE & THI hair transplant surgery in Delhi. Safe, minimally-invasive procedures in a sterile OT. Free consultation.",
    };
  }

  const seo = page.seo ?? {};

  // keywords is stored as a comma-separated string in the schema
  const keywordsArr = seo.keywords
    ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : ["hair transplant surgery in Delhi", "best hair transplant surgery in Delhi", "Sapphire FUE hair transplant Delhi"];

  // robots is stored as "index,follow" string
  const robotsStr = seo.robots || "index,follow";
  const robotsMeta = {
    index: !robotsStr.includes("noindex"),
    follow: !robotsStr.includes("nofollow"),
  };

  // openGraphImage uses .image and .imageAlt fields
  const ogImageUrl = seo.openGraphImage?.image || "https://www.clinicryan.com/uploads/1752667815707-fue-banner_ro9ae6.webp";
  const ogImageAlt = seo.openGraphImage?.imageAlt || seo.metaTitle || "Best Hair Transplant Surgery in Delhi — Ryan Clinic";

  return {
    title: seo.metaTitle || "Hair Transplant Surgery in Delhi | Ryan Clinic",
    description:
      seo.metaDescription ||
      "Doctor-led FUE & THI hair transplant surgery in Delhi. Safe, minimally-invasive procedures in a sterile OT. Free consultation.",
    keywords: keywordsArr,
    alternates: seo.canonicalUrl
      ? { canonical: seo.canonicalUrl }
      : { canonical: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/" },
    robots: robotsMeta,
    openGraph: {
      title: seo.metaTitle || "Hair Transplant Surgery in Delhi | Ryan Clinic",
      description: seo.metaDescription || "",
      url: seo.canonicalUrl || "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/",
      siteName: "Ryan Clinic",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Hair Transplant Surgery in Delhi | Ryan Clinic",
      description: seo.metaDescription || "",
      images: [ogImageUrl],
    },
  };
}

export default async function HairTransplantSurgeryDelhiPage() {
  const page = await fetchSurgeryPage();

  if (!page) {
    notFound();
  }

  return <SurgeryPageClient data={page} />;
}
