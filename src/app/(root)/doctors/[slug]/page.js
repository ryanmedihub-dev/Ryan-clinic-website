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

const CREDENTIALS_LIST = [
  "A recognised medical degree (MBBS) and relevant postgraduate training or fellowship in a field related to hair restoration (dermatology, plastic/cosmetic surgery, or dedicated hair-transplant training).",
  "Registration with the relevant medical council, with a registration number you can check.",
  "Specific hair-transplant training or certification in the techniques they perform (FUE, Sapphire FUE, THI).",
  "Documented experience — years in practice and case volume in hair restoration.",
  "Ideally, memberships in recognised professional bodies.",
];

const VERIFY_STEPS = [
  {
    step: "01",
    heading: "Check Medical Council Registration",
    detail: "Verify their active registration number on the official Medical Council portal.",
  },
  {
    step: "02",
    heading: "Ask Who Performs Key Surgical Steps",
    detail: "Confirm that the doctor personally performs graft extraction, slit creation, and implantation.",
  },
  {
    step: "03",
    heading: "Review Real Patient Cases & Results",
    detail: "Inspect unedited before-and-after photos and genuine patient video testimonials.",
  },
  {
    step: "04",
    heading: "Confirm Surgery Volume Per Day",
    detail: "Ensure the clinic handles limited cases per day for maximum surgical attention and safety.",
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

const DOCTOR_STAGES = [
  {
    num: "01",
    heading: "Initial Assessment & Scalp Analysis",
    desc: "Detailed scalp analysis, donor density evaluation, and medical history check.",
  },
  {
    num: "02",
    heading: "Custom Hairline & Density Planning",
    desc: "Crafting a natural, age-appropriate hairline tailored to your facial geometry.",
  },
  {
    num: "03",
    heading: "Precision Micro-Surgery",
    desc: "Extraction and implantation executed personally by certified doctors with Sapphire micro-blades.",
  },
];

const QUESTIONS_TO_ASK = [
  "Will the doctor perform the extraction and channel creation personally?",
  "How many surgeries does the doctor handle per day?",
  "What post-operative care and follow-up support is included?",
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

const RED_FLAGS = [
  "Unusually low pricing with hidden fees later.",
  "No doctor present during the actual surgical procedure.",
  "Guaranteeing impossible hair density or 100% graft survival.",
];

const PROCEDURES = [
  { name: "FUE & Sapphire FUE" },
  { name: "THI / Hairline Design" },
  { name: "Beard & Moustache Transplant" },
  { name: "Eyebrow Transplant" },
  { name: "Hair Transplant for Women" },
  { name: "PRP Therapy" },
  { name: "Medical Management of Hair Loss" },
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

  const doctorCredentials = [
    ...(doctor.qualifications || []).map((q) => ({
      label: typeof q === "string" ? q : (q.degree || "Qualified"),
      detail: typeof q === "string" ? "" : (q.institute || ""),
    })),
  ];

  let verifySteps = VERIFY_STEPS;
  if (doctor.verification?.steps?.length) {
    verifySteps = doctor.verification.steps.map((step, idx) => ({
      step: String(idx + 1).padStart(2, '0'),
      heading: step.title || `Step ${idx + 1}`,
      detail: step.description || "",
    }));
  }

  let doctorStages = DOCTOR_STAGES;
  if (doctor.surgeryTimeline?.steps?.length) {
    doctorStages = doctor.surgeryTimeline.steps.map((step, idx) => ({
      num: String(step.stepNumber || step.number || idx + 1).padStart(2, '0'),
      heading: step.title || `Stage ${idx + 1}`,
      desc: step.description || "",
    }));
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

  let questionsToAsk = QUESTIONS_TO_ASK;
  if (doctor.questionsToAsk?.questions?.length) {
    questionsToAsk = doctor.questionsToAsk.questions.map((qItem) =>
      typeof qItem === "string" ? qItem : (qItem.question || qItem.answer || "")
    );
  }

  let goodDoctorTraits = GOOD_DOCTOR_TRAITS;
  if (doctor.doctorStandards?.cards?.length) {
    goodDoctorTraits = doctor.doctorStandards.cards.map((c) => ({
      title: c.title || "",
      desc: c.description || "",
    }));
  }

  let redFlags = RED_FLAGS;
  if (doctor.warningSigns?.cards?.length) {
    redFlags = doctor.warningSigns.cards.map((c) =>
      typeof c === "string" ? c : `${c.title || ""}: ${c.description || ""}`
    );
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
      about: localizeText(sp.about || "", doctor.city),
      philosophy: localizeText(sp.philosophy || "", doctor.city),
      achievements: sp.achievements?.length ? sp.achievements : [],
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
  const cityDefaultAddresses = {
    Delhi: "CD 163, Block CD, Dakshini Pitampura, New Delhi",
    Mumbai: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai",
    Hyderabad: "2nd Floor, 8-2, 316/A/6/A, Road No. 14, Banjara Hills, Hyderabad",
  };
  const clinicAddressLine = doctor.visitClinic?.address?.streetAddress || doctor.basicInfo?.clinicAddress || cityDefaultAddresses[clinicCity] || "";
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
      "streetAddress": clinicAddressLine || "CD 163, Block CD, Dakshini Pitampura, New Delhi",
      "addressLocality": clinicCity || "India",
      "addressRegion": clinicCity || "India",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6987,
      "longitude": 77.1352
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
          credentialsList: CREDENTIALS_LIST,
          verifySteps,
          comparisonRows,
          doctorCredentials,
          doctorStages,
          questionsToAsk,
          greatDoctorTraits,
          redFlags,
          procedures: PROCEDURES,
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