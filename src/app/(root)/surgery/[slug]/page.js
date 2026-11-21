import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import SurgeryPageModel from "@/models/surgeryPage";
import SurgeryPageClient from "@/components/surgery/SurgeryPageClient";

// ─── Data Fetching ────────────────────────────────────────────────────────────

// Ensure canonical URL always uses the /surgery/${slug} architecture and prevents draft/copy URLs
function getSurgeryCanonicalUrl(rawCanonical, slug) {
  const fallbackUrl = `https://www.clinicryan.com/surgery/${slug}`;
  if (
    typeof rawCanonical === "string" &&
    !/-copy(-\d+)?(\/|$)/i.test(rawCanonical)
  ) {
    try {
      const parsed = new URL(rawCanonical.trim());
      const normalizedPath = parsed.pathname.replace(/\/+$/, "");
      if (
        parsed.origin === "https://www.clinicryan.com" &&
        normalizedPath === `/surgery/${slug}`
      ) {
        return `https://www.clinicryan.com${normalizedPath}`;
      }
    } catch {
      // Invalid URL format falls back safely
    }
  }
  return fallbackUrl;
}

const getSurgeryPage = cache(async (slug) => {
  await DBConnection();
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
  const escaped = cleanSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const page = await SurgeryPageModel.findOne({
    slug: { $regex: new RegExp(`^${escaped}$`, "i") },
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
    return {
      title: "Page Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = page.seo ?? {};
  const heroImage = page.hero?.heroImage?.image ?? "";
  const ogImage = seo.openGraphImage?.image || heroImage;

  // Ensure canonical URL always uses the /surgery/${slug} architecture and prevents draft/copy URLs
  const canonicalUrl = getSurgeryCanonicalUrl(seo.canonicalUrl, slug);

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

  const surgeryName =
    typeof page.pageName === "string" && page.pageName.trim()
      ? page.pageName.trim()
      : "Hair Transplant Surgery";
  const metaDescription =
    (typeof seo.metaDescription === "string" && seo.metaDescription.trim()) ||
    (typeof page.hero?.description === "string" && page.hero.description.trim()) ||
    `Explore ${surgeryName} at Ryan Clinic. Learn about procedure planning, surgical techniques, and doctor-led care.`;

  return {
    title: seo.metaTitle || page.pageName,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots,
    openGraph: {
      title: seo.metaTitle || page.pageName,
      description: metaDescription,
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
      description: metaDescription,
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

  const canonicalUrl = getSurgeryCanonicalUrl(page.seo?.canonicalUrl, slug);

  // Resolve city: prefer verified page.city, then extract from slug/pageName pattern; avoid unsafe default-to-Delhi
  const cityName = (() => {
    if (typeof page.city === "string" && page.city.trim()) {
      return page.city.trim();
    }
    const match = slug.match(/(?:in|for)-([a-z]+)/i);
    if (match) {
      const citySegment = match[1].toLowerCase();
      return citySegment.charAt(0).toUpperCase() + citySegment.slice(1);
    }
    if (typeof page.pageName === "string") {
      const pageMatch = page.pageName.match(/\bin\s+([A-Za-z]+)/i);
      if (pageMatch) {
        return pageMatch[1];
      }
    }
    return null;
  })();

  const lastModifiedDate = page.updatedAt
    ? new Date(page.updatedAt).toISOString().split("T")[0]
    : "2026-08-11";

  // Schema.org Data
  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": page.seo?.metaTitle || page.pageName,
    "description": page.seo?.metaDescription || "",
    "url": canonicalUrl,
    "lastReviewed": lastModifiedDate,
    "reviewedBy": {
      "@type": "Person",
      "name": "Dr. Pranendra Singh",
      "jobTitle": "Plastic & Reconstructive Surgeon",
      "identifier": "DMC-68492"
    }
  };

  const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Hair Transplant Surgery",
    "procedureType": "SurgicalProcedure",
    "description": "Doctor-led Sapphire FUE & DHI hair transplant surgery in a sterile OT under local anaesthesia.",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "PlasticSurgery"
    }
  };

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Pranendra Singh",
    "medicalSpecialty": "PlasticSurgery",
    "identifier": "DMC-68492",
    "description": "Senior Consultant Plastic & Reconstructive Surgeon specializing in Hair Transplant Surgery."
  };

  // Emit MedicalClinic schema only when a location can be established reliably
  const clinicSchema = cityName ? {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Ryan Clinic",
    "url": "https://www.clinicryan.com",
    "logo": "https://www.clinicryan.com/uploads/logo.png",
    "telephone": "+91-9911111247",
    "email": "info@clinicryan.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": "IN"
    }
  } : null;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      {clinicSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      )}
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