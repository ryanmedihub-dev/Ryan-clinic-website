import { notFound } from "next/navigation";
import { cache } from "react";
import DoctorsPageClient from "./DoctorsPageClient";
import PageBanner from "@/components/layouts/pageBanner";
import { doctors as staticDoctors } from "@/lib/doctorsData";
import Doctor from "@/models/Doctors";
import { DBConnection } from "@/lib/db";

// Revalidate page dynamically
export const revalidate = 60;

// Helper to find doctor by slug from static data
function getStaticDoctorBySlug(slug) {
  return staticDoctors.find(
    (d) =>
      d.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === slug
  );
}

function normalizeDoctor(dbDoc) {
  if (!dbDoc) return null;
  const b = dbDoc.basicInfo || {};
  const s = dbDoc.surgeonProfile || {};
  return {
    ...dbDoc,
    name: b.doctorName || dbDoc.pageName || "Dr. Specialist",
    image: b.profileImage?.image || "/uploads/turkey-doctor.jpg",
    designation: b.designation || "Hair Transplant Surgeon",
    location: b.city || "Delhi",
    city: b.city || "Delhi",
    experience: b.yearsExperience ? `${b.yearsExperience}+ Yrs` : "15+ Yrs",
    procedures: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : "5,000+",
    proceduresCount: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : "7,500+",
    successRate: b.successRate || "95%+",
    rating: b.rating || 5.0,
    about: s.about || "",
    biography: s.biography || "",
    philosophy: s.philosophy || "",
    languages: b.languages?.length ? b.languages : ["English", "Hindi"],
    specialities: s.specialities?.length ? s.specialities : ["Sapphire FUE", "THI Hair Restoration", "Beard Transplant"],
    qualifications: s.qualifications?.length ? s.qualifications : [
      { degree: "MBBS", institute: "Recognized Medical Council" },
      { degree: "Turkey Certification", institute: "International Hair Restoration Association" },
    ],
    certifications: s.certifications?.length ? s.certifications : [],
    achievements: s.achievements?.length ? s.achievements.map(a => typeof a === "string" ? a : `${a.title || ""}: ${a.description || ""}`) : [],
    memberships: s.memberships?.length ? s.memberships : [],
  };
}

const getDoctorData = cache(async (slug) => {
  try {
    const cleanSlug = slug.toLowerCase().trim();
    let dbDoctor = null;

    try {
      await DBConnection();
      dbDoctor = await Doctor.findOne({
        slug: cleanSlug,
        deletedAt: null,
      }).lean();
    } catch (err) {
      console.error("Database query failed in DoctorPage:", err);
    }

    if (dbDoctor) {
      const plainDoc = JSON.parse(JSON.stringify(dbDoctor));
      return normalizeDoctor(plainDoc);
    }

    // Fallback to static data
    return getStaticDoctorBySlug(cleanSlug);
  } catch (err) {
    console.error("Error fetching doctor data:", err);
    return getStaticDoctorBySlug(slug);
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
  const metaDesc = seo.metaDescription || `${doctor.name} is a Turkey-certified hair transplant surgeon${locationText} at Ryan Clinic. ${doctor.experience} experience. Book a free consultation.`;
  const canonicalUrl = seo.canonicalUrl || `https://www.clinicryan.com/doctors/${slug}`;
  const ogImageUrl = seo.openGraphImage?.image || doctor.image;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: seo.keywords || "",
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
          url: ogImageUrl.startsWith("http") ? ogImageUrl : `https://www.clinicryan.com${ogImageUrl}`,
          alt: `${doctor.name} — Hair Transplant Surgeon`,
        },
      ],
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

const NEARBY_AREAS = [
  "Rohini",
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
];

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
      q: f.question || f.q || "",
      a: f.answer || f.a || "",
    }));
  }

  const bannerTitle = doctor.hero?.title || doctor.name;
  const bannerDesc = doctor.hero?.description || `${doctor.designation} at Ryan Clinic. Experienced hair restoration specialist.`;
  const bannerImage = doctor.hero?.heroImage?.image || "/uploads/1752667815707-fue-banner_ro9ae6.webp";
  const bannerAlt = doctor.hero?.heroImage?.alt || `${doctor.name} — Ryan Clinic`;

  return (
    <>
      <PageBanner
        breadcrumb={`Doctors / ${doctor.name}`}
        title={bannerTitle}
        description={bannerDesc}
        bgImage={bannerImage}
        alt={bannerAlt}
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
          nearbyAreas: NEARBY_AREAS,
          faqs,
          doctor,
        }}
      />
    </>
  );
}