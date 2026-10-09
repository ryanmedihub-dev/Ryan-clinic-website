import { notFound } from "next/navigation";
import { cache } from "react";
import DoctorsPageClient from "./DoctorsPageClient";
import PageBanner from "@/components/layouts/pageBanner";
import Doctor from "@/models/Doctors";
import { DBConnection } from "@/lib/db";
import { getValidImageSrc } from "@/lib/utils";

// ─── City → Geo Lookup ───────────────────────────────────────────────────────
// ISO 3166-2 region codes + verified clinic-area coordinates.
// Coordinates are representative of the city area served, NOT hardcoded from
// any individual branch. Update per-branch if a branch-location model is added.
const GEO_BY_CITY = {
  delhi:        { region: "IN-DL", placename: "New Delhi",  lat: "28.6570", lng: "77.1680" },
  "new delhi":  { region: "IN-DL", placename: "New Delhi",  lat: "28.6570", lng: "77.1680" },
  gurgaon:      { region: "IN-HR", placename: "Gurugram",   lat: "28.4595", lng: "77.0266" },
  gurugram:     { region: "IN-HR", placename: "Gurugram",   lat: "28.4595", lng: "77.0266" },
  mumbai:       { region: "IN-MH", placename: "Mumbai",     lat: "19.0760", lng: "72.8777" },
  hyderabad:    { region: "IN-TG", placename: "Hyderabad",  lat: "17.3850", lng: "78.4867" },
  pune:         { region: "IN-MH", placename: "Pune",       lat: "18.5204", lng: "73.8567" },
  bangalore:    { region: "IN-KA", placename: "Bengaluru",  lat: "12.9716", lng: "77.5946" },
  bengaluru:    { region: "IN-KA", placename: "Bengaluru",  lat: "12.9716", lng: "77.5946" },
  chennai:      { region: "IN-TN", placename: "Chennai",    lat: "13.0827", lng: "80.2707" },
  kolkata:      { region: "IN-WB", placename: "Kolkata",    lat: "22.5726", lng: "88.3639" },
  jaipur:       { region: "IN-RJ", placename: "Jaipur",     lat: "26.9124", lng: "75.7873" },
  chandigarh:   { region: "IN-CH", placename: "Chandigarh", lat: "30.7333", lng: "76.7794" },
  ahmedabad:    { region: "IN-GJ", placename: "Ahmedabad",  lat: "23.0225", lng: "72.5714" },
  lucknow:      { region: "IN-UP", placename: "Lucknow",    lat: "26.8467", lng: "80.9462" },
  noida:        { region: "IN-UP", placename: "Noida",      lat: "28.5355", lng: "77.3910" },
};

function getGeoForCity(city) {
  if (!city) return null;
  return GEO_BY_CITY[city.toLowerCase().trim()] || null;
}

// Helper to dynamically adapt legacy template boilerplate strings to current doctor's city
function localizeText(text, city) {
  if (!text || typeof text !== "string") return text;
  if (!city) return text.replace(/\s+in\s+(New\s+Delhi|Delhi|New-Delhi)\b/gi, "");
  if (city.toLowerCase() === "delhi" || city.toLowerCase() === "new delhi") return text;
  return text
    .replace(/\b(in\s+)(New\s+Delhi|Delhi|New-Delhi)\b/gi, (m, p1) => p1 + city)
    .replace(/\b(at\s+Ryan\s+Clinic,\s*)(New\s+Delhi|Delhi|New-Delhi)\b/gi, (m, p1) => p1 + city);
}

function localizeSection(obj, city) {
  if (!obj || !city) return obj;
  if (typeof obj === "string") return localizeText(obj, city);
  if (Array.isArray(obj)) return obj.map((item) => localizeSection(item, city));
  if (typeof obj === "object") {
    const res = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = localizeSection(v, city);
    }
    return res;
  }
  return obj;
}

function normalizeDoctor(dbDoc) {
  if (!dbDoc) return null;
  const b = dbDoc.basicInfo || {};
  const s = dbDoc.surgeonProfile || {};
  const docCity = b.city?.trim() || "";

  const localizedDoc = {
    ...dbDoc,
    proceduresPerformed: localizeSection(dbDoc.proceduresPerformed, docCity),
    doctorStandards: localizeSection(dbDoc.doctorStandards, docCity),
    credentials: localizeSection(dbDoc.credentials, docCity),
    verification: localizeSection(dbDoc.verification, docCity),
    comparison: localizeSection(dbDoc.comparison, docCity),
    surgicalProcess: localizeSection(dbDoc.surgicalProcess || dbDoc.surgeryTimeline, docCity),
    warningSigns: localizeSection(dbDoc.warningSigns, docCity),
    pricing: dbDoc.pricing ? {
      sectionLabel: (!dbDoc.pricing.sectionLabel || dbDoc.pricing.sectionLabel === "Transparent Pricing")
        ? "Cost & Consultation"
        : localizeText(dbDoc.pricing.sectionLabel, docCity),
      heading: localizeText(dbDoc.pricing.heading || "", docCity),
      description: localizeText(dbDoc.pricing.description || "", docCity),
    } : null,
    visitClinic: localizeSection(dbDoc.visitClinic, docCity),
    consultation: localizeSection(dbDoc.consultation, docCity),
    faq: localizeSection(dbDoc.faq, docCity),
    keyFacts: localizeSection(dbDoc.keyFacts, docCity),
    medicalReviewer: localizeSection(dbDoc.medicalReviewer, docCity),
    whyItMatters: localizeSection(dbDoc.whyItMatters, docCity),
    surgeonProfile: localizeSection(dbDoc.surgeonProfile, docCity),
    seo: localizeSection(dbDoc.seo, docCity),
    hero: localizeSection(dbDoc.hero, docCity),
  };

  return {
    ...localizedDoc,
    name: b.doctorName || dbDoc.pageName || "Dr. Specialist",
    image: getValidImageSrc(b.profileImage, "/uploads/turkey-doctor.jpg"),
    designation: b.designation || "Hair Transplant Surgeon",
    location: docCity,
    city: docCity,
    experience: b.yearsExperience ? `${b.yearsExperience}+ Yrs` : null,
    procedures: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : null,
    proceduresCount: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : null,
    successRate: b.successRate || null,
    rating: b.rating || 5.0,
    about: localizeText(s.about || "", docCity),
    biography: s.biography || "",
    philosophy: s.philosophy || "",
    languages: b.languages?.length ? b.languages : ["English", "Hindi"],
    specialities: s.specialities?.length ? s.specialities : ["Sapphire FUE", "THI Hair Restoration"],
    qualifications: s.qualifications?.length ? s.qualifications : [],
    certifications: s.certifications?.length ? s.certifications : [],
    achievements: s.achievements?.length ? s.achievements.map(a => typeof a === "string" ? a : `${a.title || ""}: ${a.description || ""}`) : [],
    memberships: s.memberships?.length ? s.memberships : [],
  };
}

const getDoctorData = cache(async (slug) => {
  try {
    const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();

    // Temporary demo profiles must never resolve to a public standalone doctor page.
    // They are CMS-only records used for branch testing and should return 404.
    // Branch pages (services) resolve doctors via assignedDoctor populate, not this route.
    if (cleanSlug.startsWith("demo-doctor-")) {
      return null;
    }

    const escaped = cleanSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    await DBConnection();
    const dbDoctor = await Doctor.findOne({
      slug: { $regex: new RegExp(`^${escaped}$`, "i") },
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    }).lean();

    if (dbDoctor) {
      const plainDoc = JSON.parse(JSON.stringify(dbDoctor));
      return normalizeDoctor(plainDoc);
    }

    // No static fallback — only DB-managed doctors are shown
    return null;
  } catch (err) {
    console.error("Error fetching doctor data:", err);
    return null;
  }
});

// ─── Dynamic Metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doctor = await getDoctorData(slug);

  if (!doctor) {
    return {
      title: "Doctor Not Found | Ryan Clinic",
      description: "The requested doctor profile could not be found.",
    };
  }

  const seo = doctor.seo || {};
  const locationText = doctor.location ? ` in ${doctor.location}` : "";
  const metaTitle = seo.metaTitle || `${doctor.name} — Hair Transplant Doctor${locationText} | Ryan Clinic`;
  const metaDesc = seo.metaDescription || `${doctor.name} is a hair transplant surgeon${locationText} at Ryan Clinic. Book a free consultation.`;
  const canonicalUrl = seo.canonicalUrl || `https://www.clinicryan.com/doctors/${slug}`;
  const ogImageUrl = getValidImageSrc(seo.openGraphImage, getValidImageSrc(doctor.image, "/uploads/turkey-doctor.jpg"));
  const fullOgImage = ogImageUrl.startsWith("http") ? ogImageUrl : `https://www.clinicryan.com${ogImageUrl}`;

  // Task 1: Dynamic author — [Doctor Name], Ryan Clinic
  const doctorAuthor = doctor.name ? `${doctor.name}, Ryan Clinic` : "Ryan Clinic";

  // Task 2: Doctor-specific keywords from Admin CMS
  // Only emit if the admin has set them; never fall back to the Delhi global list
  const doctorKeywords = seo.keywords?.trim() || null;

  // Task 3: City-specific geo tags — override the global Delhi defaults
  const geo = getGeoForCity(doctor.city);

  // Task 4: Use doctor.updatedAt as article:modified_time
  // This is the Mongoose timestamp updated on every save.
  // It is the best available content-update indicator in the current schema.
  const modifiedIso = doctor.updatedAt
    ? new Date(doctor.updatedAt).toISOString()
    : null;

  const otherMeta = {
    ...(geo && {
      "geo.region": geo.region,
      "geo.placename": geo.placename,
      "geo.position": `${geo.lat};${geo.lng}`,
      ICBM: `${geo.lat}, ${geo.lng}`,
    }),
    ...(modifiedIso && { "article:modified_time": modifiedIso }),
  };

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: seo.robots || "index, follow",
    // Task 1: Override the hardcoded layout-level author
    authors: [{ name: doctorAuthor }],
    // Task 2: Doctor-specific keywords (null means Next.js won't emit the tag)
    keywords: doctorKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: "Ryan Clinic",
      type: "profile",
      modifiedTime: modifiedIso || undefined,
      images: [
        {
          url: fullOgImage,
          alt: `${doctor.name} — Hair Transplant Surgeon`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [fullOgImage],
    },
    // Task 3 & 4: Doctor-specific geo + modified_time override layout defaults
    other: Object.keys(otherMeta).length > 0 ? otherMeta : undefined,
  };
}

// ─── Data Constants ──────────────────────────────────────────────────────────
const GOOD_DOCTOR_TRAITS = [
  {
    title: "Proper medical qualifications and registration",
    desc: "Verifiable credentials — MBBS and relevant postgraduate training or fellowship, with a medical-council registration number you can check.",
  },
  {
    title: "Real, focused experience in hair restoration",
    desc: "Years in practice and case volume specifically in hair transplantation, with cases similar to yours.",
  },
  {
    title: "An aesthetic eye",
    desc: "Hairline design is as much art as surgery — the best doctors understand facial proportions, natural growth patterns, and age-appropriate design.",
  },
  {
    title: "Hands-on involvement",
    desc: "The doctor performs the surgery personally, including extraction and implantation — not just a brief appearance at consultation.",
  },
  {
    title: "Honesty",
    desc: "A willingness to tell you the truth about expectations, maintenance, and candidacy — including saying no when surgery isn't right for you.",
  },
  {
    title: "A real portfolio",
    desc: "Before-and-afters of their own patients (not stock photos), plus genuine verified reviews from real cases.",
  },
];

const DEFAULT_COMPARISON_ROWS = [
  ["Consultation & Scalp Analysis", "Doctor / Senior Specialist", "Technician / Assistant"],
  ["Hairline Design & Planning", "Doctor / Senior Specialist", "Technician / Untrained Staff"],
  ["Local Anaesthesia Administration", "Doctor / Senior Specialist", "Assistant / Technician"],
  ["Graft Extraction (FUE)", "Doctor / Senior Specialist", "Technician / Assistant"],
  ["Recipient Site Creation", "Doctor / Senior Specialist", "Technician / Assistant"],
  ["Graft Implantation", "Doctor / Senior Specialist", "Technician / Assistant"],
  ["Post-Op Inspection & Care Plan", "Doctor / Senior Specialist", "General Clinic Staff"],
];


const cityNearbyAreas = {
  Delhi: [
    "Rohini",
    "Pitampura",
    "Shalimar Bagh",
    "Ashok Vihar",
    "Model Town",
    "Punjabi Bagh",
    "Paschim Vihar",
    "Karol Bagh",
    "Janakpuri",
    "Dwarka",
    "Noida",
    "Gurgaon",
    "Faridabad",
  ],
  Mumbai: [
    "Andheri",
    "Bandra",
    "Juhu",
    "Powai",
    "Borivali",
    "Thane",
    "Navi Mumbai",
    "Dadar",
    "Goregaon",
    "Malad",
  ],
  Hyderabad: [
    "Banjara Hills",
    "Jubilee Hills",
    "Gachibowli",
    "Hitec City",
    "Madhapur",
    "Kondapur",
    "Secunderabad",
    "Kukatpally",
  ],
};

const FAQS = [
  {
    q: "How do I choose the best hair transplant doctor?",
    a: "Verify that a qualified doctor personally performs the whole surgery, check their credentials and medical-council registration, review real before-and-afters of their own patients and genuine reviews, and judge how honestly they discuss candidacy and expectations.",
  },
  {
    q: "What qualifications should a hair transplant doctor have?",
    a: "A recognised medical degree (MBBS), relevant postgraduate training or fellowship, registration with the medical council, specific hair-transplant training in the techniques they use, and documented hair-restoration experience.",
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────
export default async function DoctorPage({ params }) {
  const { slug } = await params;
  const doctor = await getDoctorData(slug);

  if (!doctor) {
    notFound();
  }

  let comparisonRows = DEFAULT_COMPARISON_ROWS;
  if (doctor.comparison?.rows?.length) {
    comparisonRows = doctor.comparison.rows.map((r) => [
      r.parameter || "",
      r.doctorValue || "Doctor / Senior Specialist",
      r.technicianValue || "Technician / Assistant",
    ]);
  }


  let goodDoctorTraits = GOOD_DOCTOR_TRAITS;
  if (doctor.doctorStandards?.cards?.length) {
    goodDoctorTraits = doctor.doctorStandards.cards.map((c) => ({
      title: c.title || "",
      desc: c.description || "",
    }));
  }

  let faqs = FAQS;
  if (doctor.faq?.faqs?.length) {
    faqs = doctor.faq.faqs.map((f) => ({
      q: localizeText(f.question || f.q || "", doctor.city),
      a: localizeText(f.answer || f.a || "", doctor.city),
    }));
  }

  // ── NEW: whyItMatters normalization ──
  let whyItMatters = null;
  if (doctor.whyItMatters?.heading) {
    const wim = doctor.whyItMatters;
    whyItMatters = {
      sectionLabel: wim.sectionLabel || "Why It Matters",
      heading: localizeText(wim.heading || "", doctor.city),
      description: localizeText(wim.description || "", doctor.city),
      secondaryDescription: localizeText(wim.secondaryDescription || "", doctor.city),
      highlightBox: localizeText(wim.highlightBox || "", doctor.city),
      image: getValidImageSrc(wim.image) || "",
      imageAlt: localizeText(wim.image?.alt || "", doctor.city),
      floatingStats: Array.isArray(wim.floatingStats) ? wim.floatingStats.map(s => ({ value: s.value || "", label: s.label || "" })) : [],
      primaryCTA: { text: wim.primaryCTA?.text || "", url: wim.primaryCTA?.url || "" },
      secondaryCTA: { text: wim.secondaryCTA?.text || "", url: wim.secondaryCTA?.url || "" },
    };
  }

  // ── surgeonProfile normalization ──
  const sp = doctor.surgeonProfile || {};
  const surgeonProfileData = {
    sectionLabel: sp.sectionLabel || "YOUR SURGEON",
    heading: sp.heading ? localizeText(sp.heading, doctor.city) : "",
    achievementsHeading: sp.achievementsHeading ? localizeText(sp.achievementsHeading, doctor.city) : "",
    about: sp.about ? localizeText(sp.about, doctor.city) : (doctor.about || ""),
    philosophy: sp.philosophy ? localizeText(sp.philosophy, doctor.city) : "",
    achievements: Array.isArray(sp.achievements) ? sp.achievements : [],
    consultationHeading: sp.consultationHeading ? localizeText(sp.consultationHeading, doctor.city) : "",
    consultationIncludes: Array.isArray(sp.consultationIncludes) ? sp.consultationIncludes : [],
  };


  const qualSuffix = doctor.keyFacts?.qualifications ? `, ${doctor.keyFacts.qualifications}` : "";
  const cityLabel = doctor.city ? ` in ${doctor.city}` : "";
  const defaultHeading = `Hair Transplant Doctor${cityLabel} — ${doctor.name}${qualSuffix}`;
  const bannerTitle = doctor.hero?.title || doctor.seo?.metaTitle || defaultHeading;
  const bannerDesc = doctor.hero?.description || `${doctor.designation} at Ryan Clinic. Experienced hair restoration specialist.`;
  const bannerImage = getValidImageSrc(doctor.hero?.heroImage, "/uploads/1752667815707-fue-banner_ro9ae6.webp");
  const bannerAlt = doctor.hero?.heroImage?.alt || `${doctor.name} — Ryan Clinic`;

  const canonicalUrl = doctor.seo?.canonicalUrl || `https://www.clinicryan.com/doctors/${slug}`;
  const clinicCity = doctor.visitClinic?.address?.addressLocality || doctor.location || doctor.city || "";
  const clinicAddressLine = doctor.visitClinic?.address?.streetAddress || doctor.basicInfo?.clinicAddress || "";
  const clinicPhone = doctor.basicInfo?.phoneNumber || doctor.visitClinic?.contact?.phone || "+91-9911111247";
  const dateModified = doctor.updatedAt ? new Date(doctor.updatedAt).toISOString() : new Date().toISOString();

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${canonicalUrl}#physician`,
    "name": doctor.name,
    "jobTitle": doctor.designation || "Hair Transplant Surgeon",
    "medicalSpecialty": "Hair Restoration Surgery",
    "worksFor": {
      "@type": "MedicalClinic",
      "name": "Ryan Clinic",
      "url": "https://www.clinicryan.com"
    },
    "image": doctor.image ? (doctor.image.startsWith("http") ? doctor.image : `https://www.clinicryan.com${doctor.image}`) : "https://www.clinicryan.com/uploads/turkey-doctor.jpg"
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": canonicalUrl,
    "url": canonicalUrl,
    "name": `${doctor.name} — Profile`,
    "mainEntity": { "@id": `${canonicalUrl}#physician` },
    "dateModified": dateModified
  };

  const medicalClinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://www.clinicryan.com/#clinic",
    "name": "Ryan Clinic",
    "url": "https://www.clinicryan.com",
    "telephone": clinicPhone,
    "address": {
      "@type": "PostalAddress",
      ...(clinicAddressLine ? { "streetAddress": clinicAddressLine } : {}),
      "addressLocality": clinicCity || "India",
      "addressRegion": clinicCity || "India",
      "addressCountry": "IN"
    }
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const breadcrumbSchemaData = {
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
        "name": "Doctors",
        "item": "https://www.clinicryan.com/doctors"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": doctor.name,
        "item": canonicalUrl
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.clinicryan.com/#organization",
    "name": "Ryan Clinic",
    "url": "https://www.clinicryan.com",
    "logo": "https://www.clinicryan.com/uploads/logo.png"
  };

  // Task 5: Use custom JSON-LD from Admin if present and valid;
  // otherwise fall back to the generated array of schemas.
  let jsonLdOutput = null;
  const rawCustomJsonLd = doctor.seo?.customJsonLd?.trim();
  if (rawCustomJsonLd) {
    try {
      // Parse to validate, then re-stringify safely
      const parsed = JSON.parse(rawCustomJsonLd);
      // Safely serialize: escape </script> sequences to prevent injection
      jsonLdOutput = JSON.stringify(parsed).replace(/<\/script>/gi, "<\/script>");
    } catch {
      // Invalid custom JSON — silently fall back to generated schemas
      // Admin is notified via the editor's validation UI
      jsonLdOutput = null;
    }
  }

  if (!jsonLdOutput) {
    const jsonLdSchemas = [
      physicianSchema,
      profilePageSchema,
      medicalClinicSchema,
      faqSchemaData,
      breadcrumbSchemaData,
      organizationSchema
    ];
    jsonLdOutput = JSON.stringify(jsonLdSchemas).replace(/<\/script>/gi, "<\/script>");
  }

  const cleanDoctor = { ...doctor };
  delete cleanDoctor.greatDoctorQualities;
  delete cleanDoctor.questionsToAsk;
  if (cleanDoctor.pricing) {
    cleanDoctor.pricing = {
      sectionLabel: (!cleanDoctor.pricing.sectionLabel || cleanDoctor.pricing.sectionLabel === "Transparent Pricing")
        ? "Cost & Consultation"
        : cleanDoctor.pricing.sectionLabel,
      heading: cleanDoctor.pricing.heading || "",
      description: cleanDoctor.pricing.description || "",
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdOutput }}
      />
      <PageBanner
        breadcrumb={`Doctors > ${doctor.name}`}
        title={bannerTitle}
        description={bannerDesc}
        bgImage={bannerImage}
        alt={bannerAlt}
        city={doctor.city || ""}
      />
      <DoctorsPageClient
        data={{
          goodDoctorTraits,
          comparisonRows,
          nearbyAreas: (cityNearbyAreas[doctor.city] || []),
          faqs,
          doctor: cleanDoctor,
          whyItMatters,
          surgeonProfile: surgeonProfileData,
          proceduresPerformed: localizeSection(doctor.proceduresPerformed, doctor.city) || null,
          doctorStandards: localizeSection(doctor.doctorStandards, doctor.city) || null,
          credentials: localizeSection(doctor.credentials, doctor.city) || null,
          verification: localizeSection(doctor.verification, doctor.city) || null,
          comparison: localizeSection(doctor.comparison, doctor.city) || null,
          surgicalProcess: localizeSection(doctor.surgicalProcess || doctor.surgeryTimeline, doctor.city) || null,
          warningSigns: localizeSection(doctor.warningSigns, doctor.city) || null,
          pricing: cleanDoctor.pricing,
          visitClinic: localizeSection(doctor.visitClinic, doctor.city) || null,
          consultation: localizeSection(doctor.consultation, doctor.city) || null,
          faqSection: localizeSection(doctor.faq, doctor.city) || null,
          keyFacts: localizeSection(doctor.keyFacts, doctor.city) || null,
          medicalReviewer: localizeSection(doctor.medicalReviewer, doctor.city) || null,
        }}
      />
    </>
  );
}