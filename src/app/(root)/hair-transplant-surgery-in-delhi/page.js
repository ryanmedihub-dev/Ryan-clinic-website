import { notFound } from "next/navigation";
import SurgeryPageClient from "./SurgeryPageClient";

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
<<<<<<< HEAD
      "Safe, minimally-invasive hair transplant surgery in Delhi performed by certified doctors. What it involves, safety, recovery and cost.",
=======
      "Doctor-led FUE & THI hair transplant surgery in Delhi. Safe, minimally-invasive procedures in a sterile OT. Free consultation.",
>>>>>>> 0f61d6d9c3c20f81f3afadb3caba16e1e1982df6
    keywords: keywordsArr,
    alternates: seo.canonicalUrl
      ? { canonical: seo.canonicalUrl }
      : { canonical: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/" },
    robots: robotsMeta,
    openGraph: {
<<<<<<< HEAD
      title: seo.metaTitle || "Hair Transplant Surgery in Delhi — Doctor-Led FUE & THI | Ryan Clinic",
      description:
        seo.metaDescription ||
        "Safe, minimally-invasive hair transplant surgery in Delhi performed by certified doctors. What it involves, safety, recovery and cost.",
=======
      title: seo.metaTitle || "Hair Transplant Surgery in Delhi | Ryan Clinic",
      description: seo.metaDescription || "",
>>>>>>> 0f61d6d9c3c20f81f3afadb3caba16e1e1982df6
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
<<<<<<< HEAD
      title: seo.metaTitle || "Hair Transplant Surgery in Delhi — Doctor-Led FUE & THI | Ryan Clinic",
      description:
        seo.metaDescription ||
        "Safe, minimally-invasive hair transplant surgery in Delhi performed by certified doctors. What it involves, safety, recovery and cost.",
=======
      title: seo.metaTitle || "Hair Transplant Surgery in Delhi | Ryan Clinic",
      description: seo.metaDescription || "",
>>>>>>> 0f61d6d9c3c20f81f3afadb3caba16e1e1982df6
      images: [ogImageUrl],
    },
  };
}

<<<<<<< HEAD
export default function HairTransplantSurgeryDelhiPage() {
  return <SurgeryPageClient city="Delhi" />;
=======
export default async function HairTransplantSurgeryDelhiPage() {
  const page = await fetchSurgeryPage();

  if (!page) {
    notFound();
  }

  return <SurgeryPageClient data={page} />;
>>>>>>> 0f61d6d9c3c20f81f3afadb3caba16e1e1982df6
}
