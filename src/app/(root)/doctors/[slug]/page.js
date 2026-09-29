import { notFound } from "next/navigation";
import { cache } from "react";
import DoctorsPageClient from "./DoctorsPageClient";
import PageBanner from "@/components/layouts/pageBanner";
import Doctor from "@/models/Doctors";
import { DBConnection } from "@/lib/db";

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
    questionsToAsk: localizeSection(dbDoc.questionsToAsk, docCity),
    greatDoctorQualities: localizeSection(dbDoc.greatDoctorQualities, docCity),
    warningSigns: localizeSection(dbDoc.warningSigns, docCity),
    pricing: localizeSection(dbDoc.pricing, docCity),
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
    image: b.profileImage?.image || "/uploads/turkey-doctor.jpg",
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
  const ogImageUrl = seo.openGraphImage?.image || doctor.image;
  const fullOgImage = ogImageUrl.startsWith("http") ? ogImageUrl : `https://www.clinicryan.com${ogImageUrl}`;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: seo.robots || "index, follow",
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: "Ryan Clinic",
      type: "profile",
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

const GREAT_DOCTOR_TRAITS = [
  {
    title: "Full Density Transparency",
    desc: "Provides honest expectations on achievable density and donor graft availability.",
  },
  {
    title: "Personalized Surgical Planning",
    desc: "Custom hairline design and temporal angle restoration tailored to individual facial symmetry.",
  },
  {
    title: "Strict Surgical Safety Protocols",
    desc: "Operates exclusively in sterile OT suites under international medical hygiene standards.",
  },
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

  let greatDoctorTraits = GREAT_DOCTOR_TRAITS;
  if (doctor.greatDoctorQualities?.cards?.length) {
    greatDoctorTraits = doctor.greatDoctorQualities.cards.map((c) => ({
      title: c.title || "",
      desc: c.description || "",
    }));
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
      image: wim.image?.image || "",
      imageAlt: localizeText(wim.image?.alt || "", doctor.city),
      floatingStats: Array.isArray(wim.floatingStats) ? wim.floatingStats.map(s => ({ value: s.value || "", label: s.label || "" })) : [],
      primaryCTA: { text: wim.primaryCTA?.text || "", url: wim.primaryCTA?.url || "" },
      secondaryCTA: { text: wim.secondaryCTA?.text || "", url: wim.secondaryCTA?.url || "" },
    };
  }

  // ── NEW: surgeonProfile normalization ──
  let surgeonProfileData = null;
  if (doctor.surgeonProfile?.about || doctor.surgeonProfile?.achievements?.length) {
    const sp = doctor.surgeonProfile;
    surgeonProfileData = {
      sectionLabel: sp.sectionLabel || "Your Surgeon",
      heading: localizeText(sp.heading || `Meet ${doctor.name}`, doctor.city),
      achievementsHeading: localizeText(sp.achievementsHeading || "", doctor.city),
      about: localizeText(sp.about || "", doctor.city),
      philosophy: localizeText(sp.philosophy || "", doctor.city),
      achievements: sp.achievements?.length ? sp.achievements : [],
      consultationHeading: localizeText(sp.consultationHeading || "", doctor.city),
      consultationIncludes: sp.consultationIncludes?.length ? sp.consultationIncludes : [],
    };
  }

  // ── NEW: pricing normalization ──
  let pricingPackages = [];
  let pricingDisclaimer = "";
  if (doctor.pricing?.packages?.length) {
    pricingPackages = doctor.pricing.packages.map((p, i) => ({
      title: p.title || `Package ${i + 1}`,
      price: p.price || "",
      priceNote: p.priceNote || "onwards",
      subtitle: p.subtitle || "",
      isFeatured: !!p.isFeatured,
      features: Array.isArray(p.features)
        ? p.features.map((f) =>
            typeof f === "string" ? f : f.title || f.text || f.description || ""
          ).filter(Boolean)
        : [],
      buttonText: p.buttonText || "Get Free Estimate",
    }));
    pricingDisclaimer = doctor.pricing.disclaimer || "";
  }

  const qualSuffix = doctor.keyFacts?.qualifications ? `, ${doctor.keyFacts.qualifications}` : "";
  const cityLabel = doctor.city ? ` in ${doctor.city}` : "";
  const defaultHeading = `Hair Transplant Doctor${cityLabel} — ${doctor.name}${qualSuffix}`;
  const bannerTitle = doctor.hero?.title || doctor.seo?.metaTitle || defaultHeading;
  const bannerDesc = doctor.hero?.description || `${doctor.designation} at Ryan Clinic. Experienced hair restoration specialist.`;
  const bannerImage = doctor.hero?.heroImage?.image || "/uploads/1752667815707-fue-banner_ro9ae6.webp";
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
    "image": doctor.image?.startsWith("http") ? doctor.image : `https://www.clinicryan.com${doctor.image}`
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

  const jsonLdSchemas = [
    physicianSchema,
    profilePageSchema,
    medicalClinicSchema,
    faqSchemaData,
    breadcrumbSchemaData,
    organizationSchema
  ];

  const bannerStats = [
    doctor.experience ? { value: doctor.experience, label: "Experience" } : null,
    doctor.proceduresCount ? { value: `${doctor.proceduresCount.toLocaleString()}+`, label: "Procedures" } : null,
    doctor.rating ? { value: `${doctor.rating}★`, label: "Google Rating" } : null,
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
      />
      <PageBanner
        breadcrumb={`Doctors / ${doctor.name}`}
        title={bannerTitle}
        description={bannerDesc}
        bgImage={bannerImage}
        alt={bannerAlt}
        stats={bannerStats}
      />
      <DoctorsPageClient
        data={{
          goodDoctorTraits,
          comparisonRows,
          greatDoctorTraits,
          nearbyAreas: (cityNearbyAreas[doctor.city] || []),
          faqs,
          doctor,
          whyItMatters,
          surgeonProfile: surgeonProfileData,
          pricingPackages,
          pricingDisclaimer,
          proceduresPerformed: localizeSection(doctor.proceduresPerformed, doctor.city) || null,
          doctorStandards: localizeSection(doctor.doctorStandards, doctor.city) || null,
          credentials: localizeSection(doctor.credentials, doctor.city) || null,
          verification: localizeSection(doctor.verification, doctor.city) || null,
          comparison: localizeSection(doctor.comparison, doctor.city) || null,
          surgicalProcess: localizeSection(doctor.surgicalProcess || doctor.surgeryTimeline, doctor.city) || null,
          questionsToAskSection: localizeSection(doctor.questionsToAsk, doctor.city) || null,
          greatDoctorQualities: localizeSection(doctor.greatDoctorQualities, doctor.city) || null,
          warningSigns: localizeSection(doctor.warningSigns, doctor.city) || null,
          pricing: localizeSection(doctor.pricing, doctor.city) || null,
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