import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import SurgeryPageModel from "@/models/surgeryPage";
import SurgeryPageClient from "@/components/surgery/SurgeryPageClient";

// ─── Data Fetching ────────────────────────────────────────────────────────────

const getSurgeryPage = cache(async (slug) => {
  await DBConnection();
  const page = await SurgeryPageModel.findOne({
    slug,
    isDeleted: { $ne: true },
    status: { $ne: "draft" },
  }).lean();
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

  // Ensure canonical URL always uses the /surgery/${slug} architecture
  const canonicalUrl =
    seo.canonicalUrl && seo.canonicalUrl.includes("/surgery/")
      ? seo.canonicalUrl
      : `https://www.clinicryan.com/surgery/${slug}`;

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
      canonical: canonicalUrl,
    },
    robots,
    openGraph: {
      title: seo.metaTitle || page.pageName,
      description: seo.metaDescription || "",
      url: canonicalUrl,
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

  const canonicalUrl =
    page.seo?.canonicalUrl && page.seo.canonicalUrl.includes("/surgery/")
      ? page.seo.canonicalUrl
      : `https://www.clinicryan.com/surgery/${slug}`;

  const cityName = page.city || (page.pageName?.includes("Mumbai") ? "Mumbai" : "Delhi");

  // Schema.org Data
  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": page.seo?.metaTitle || page.pageName,
    "description": page.seo?.metaDescription || "",
    "url": canonicalUrl,
    "lastReviewed": "2026-08-10",
    "reviewedBy": {
      "@type": "Person",
      "name": "Dr. Pranendra Singh",
      "jobTitle": "Plastic & Reconstructive Surgeon",
      "identifier": "DMC-68492"
    }
  };

  const medicalTherapySchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": "Hair Transplant Surgery",
    "description": "Doctor-led Sapphire FUE & DHI hair transplant surgery in a sterile OT under local anaesthesia.",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "PlasticSurgery"
    }
  };

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Ryan Clinic",
    "url": "https://www.clinicryan.com",
    "logo": "https://www.clinicryan.com/uploads/logo.png",
    "telephone": "+91-9911111247",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": "IN"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.clinicryan.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Hair Transplant Surgery",
        "item": "https://www.clinicryan.com/surgery"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.pageName,
        "item": canonicalUrl
      }
    ]
  };

  const faqs = page.faq?.faqs || [];
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalTherapySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
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
      <SurgeryPageClient data={page} />
    </>
  );
}