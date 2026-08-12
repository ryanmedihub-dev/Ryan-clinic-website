import { notFound } from "next/navigation";
import HairFallPageClient from "./HairFallPageClient";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function fetchTreatmentPage(slug) {
  try {
    const res = await fetch(`${BASE_URL}/api/hair-fall/get?slug=${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();

    return json?.hairFallPage ?? null;
  } catch (error) {
    console.error("Failed to fetch treatment page:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await fetchTreatmentPage(slug);

  if (!page || page.status !== "published") {
    return {
      title: "Treatment | Ryan Clinic",
      description: "Diagnosis-first hair treatment care at Ryan Clinic.",
    };
  }

  const seo = page.seo ?? {};
  const pageUrl = `https://www.clinicryan.com/treatments/${slug}/`;

  // keywords is stored as a comma-separated string in the schema
  const keywordsArr = seo.keywords
    ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  // robots is stored as "index,follow" string
  const robotsStr = seo.robots || "index,follow";
  const robotsMeta = {
    index: !robotsStr.includes("noindex"),
    follow: !robotsStr.includes("nofollow"),
  };

  // openGraphImage uses .image and .imageAlt fields
  const ogImageUrl = seo.openGraphImage?.image || "https://www.clinicryan.com/uploads/hairline-banner.webp";
  const ogImageAlt = seo.openGraphImage?.imageAlt || seo.metaTitle || page.pageName;

  return {
    title: seo.metaTitle || page.pageName,
    description: seo.metaDescription || "",
    keywords: keywordsArr,
    alternates: { canonical: seo.canonicalUrl || pageUrl },
    robots: robotsMeta,
    openGraph: {
      title: seo.metaTitle || page.pageName,
      description: seo.metaDescription || "",
      url: seo.canonicalUrl || pageUrl,
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
      title: seo.metaTitle || page.pageName,
      description: seo.metaDescription || "",
      images: [ogImageUrl],
    },
  };
}

export default async function TreatmentPage({ params }) {
  const { slug } = await params;
  const page = await fetchTreatmentPage(slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  const pageUrl = `https://www.clinicryan.com/treatments/${slug}/`;

  const faqSchema =
    (page.faq?.faqs ?? []).length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.clinicryan.com" },
      { "@type": "ListItem", position: 2, name: "Treatments", item: "https://www.clinicryan.com/treatments" },
      { "@type": "ListItem", position: 3, name: page.pageName, item: pageUrl },
    ],
  };

  return (
    <>
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HairFallPageClient data={page} />


      
    </>

    
    
  );
}


