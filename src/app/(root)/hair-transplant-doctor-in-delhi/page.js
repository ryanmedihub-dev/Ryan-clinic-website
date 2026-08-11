import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import Doctor from "@/models/Doctors";
import DoctorsPageClient from "../doctors/[slug]/DoctorsPageClient";

const getDoctorPage = cache(async (slug) => {
  await DBConnection();
  const page = await Doctor.findOne({ slug, deletedAt: null }).lean();
  return page ? JSON.parse(JSON.stringify(page)) : null;
});

export async function generateMetadata() {
  const doctor = await getDoctorPage("hair-transplant-doctor-in-delhi");

  if (!doctor) {
    return {
      title: "Best Hair Transplant Doctor in Delhi | Ryan Clinic",
      description: "Looking for the best hair transplant doctor in Delhi? Meet Ryan Clinic's certified surgeons who perform every step of your FUE/THI personally.",
    };
  }

  const seo = doctor.seo ?? {};
  const b = doctor.basicInfo ?? {};
  const heroImage = doctor.hero?.heroImage?.image || b.profileImage?.image || "";
  const ogImage = seo.openGraphImage?.image || heroImage;

  const keywords = seo.keywords
    ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  const robotsStr = seo.robots || "index, follow";
  const robots = {
    index: !robotsStr.includes("noindex"),
    follow: !robotsStr.includes("nofollow"),
  };

  return {
    title: seo.metaTitle || doctor.pageName || "Best Hair Transplant Doctor in Delhi | Ryan Clinic",
    description: seo.metaDescription || "",
    keywords,
    alternates: {
      canonical: seo.canonicalUrl || "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi",
    },
    robots,
    openGraph: {
      title: seo.metaTitle || doctor.pageName,
      description: seo.metaDescription || "",
      url: seo.canonicalUrl || "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi",
      siteName: "Ryan Clinic",
      locale: "en_IN",
      type: "website",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: seo.metaTitle || doctor.pageName }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || doctor.pageName,
      description: seo.metaDescription || "",
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function DelhiDoctorPage() {
  const doctor = await getDoctorPage("hair-transplant-doctor-in-delhi");

  if (!doctor) {
    notFound();
  }

  const b = doctor.basicInfo || {};
  const s = doctor.surgeonProfile || {};
  const normalizedDoctor = {
    ...doctor,
    name: b.doctorName || doctor.pageName || "Dr. Pranendra Singh",
    image: b.profileImage?.image || "/uploads/turkey-doctor.jpg",
    designation: b.designation || "Lead Hair Transplant Surgeon",
    location: b.city || "Delhi",
    city: b.city || "Delhi",
    experience: b.yearsExperience ? `${b.yearsExperience}+ Yrs` : "12+ Yrs",
    procedures: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : "6,500+",
    proceduresCount: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : "6,500+",
    successRate: b.successRate || "98.4%",
    rating: b.rating || 4.9,
    about: s.about || doctor.hero?.description || "",
    biography: s.biography || "",
    philosophy: s.philosophy || "",
    languages: b.languages?.length ? b.languages : ["English", "Hindi"],
    specialities: s.specialities?.length ? s.specialities : ["Sapphire FUE", "THI Hair Restoration", "Beard Transplant"],
    qualifications: s.qualifications?.length ? s.qualifications : [
      { degree: "MBBS, MS", institute: "Recognised Medical Council" },
      { degree: "MCh (Plastic Surgery)", institute: "Delhi Medical Council Registered (DMC-68492)" },
    ],
    certifications: s.certifications?.length ? s.certifications : [],
    achievements: s.achievements?.length ? s.achievements.map(a => typeof a === "string" ? a : `${a.title || ""}: ${a.description || ""}`) : [],
    memberships: s.memberships?.length ? s.memberships : ["ISHRS Member"],
  };

  const doctorCredentials = (doctor.surgeonProfile?.qualifications || doctor.basicInfo?.qualifications || []).map((q) => ({
    label: typeof q === "string" ? q : (q.degree || q.title || "Qualified"),
    detail: typeof q === "string" ? "" : (q.institute || q.description || ""),
  }));

  const verifySteps = (doctor.verification?.steps || []).map((step, idx) => ({
    step: String(idx + 1).padStart(2, '0'),
    heading: typeof step === "string" ? step : (step.title || `Step ${idx + 1}`),
    detail: typeof step === "string" ? "" : (step.description || ""),
  }));

  const doctorStages = (doctor.surgeryTimeline?.steps || doctor.surgicalProcess?.steps || []).map((step, idx) => ({
    num: String(step.stepNumber || step.number || idx + 1).padStart(2, '0'),
    heading: typeof step === "string" ? step : (step.title || `Stage ${idx + 1}`),
    desc: typeof step === "string" ? "" : (step.description || ""),
  }));

  const comparisonRows = (doctor.comparison?.rows || []).map((r) => [
    r.parameter || "",
    r.doctorValue || "Doctor / Senior Specialist",
    r.technicianValue || "Technician / Assistant",
  ]);

  const greatDoctorTraits = (doctor.greatDoctorQualities?.cards || []).map((c) => ({
    title: typeof c === "string" ? c : (c.title || ""),
    desc: typeof c === "string" ? "" : (c.description || ""),
  }));

  const questionsToAsk = (doctor.questionsToAsk?.questions || []).map((qItem) =>
    typeof qItem === "string" ? qItem : (qItem.question || qItem.title || qItem.answer || "")
  );

  const goodDoctorTraits = (doctor.doctorStandards?.cards || []).map((c) => ({
    title: typeof c === "string" ? c : (c.title || ""),
    desc: typeof c === "string" ? "" : (c.description || ""),
  }));

  const redFlags = (doctor.warningSigns?.cards || []).map((c) =>
    typeof c === "string" ? c : `${c.title || ""}${c.description ? `: ${c.description}` : ""}`
  );

  const faqs = (doctor.faq?.faqs || []).map((f) => ({
    q: f.question || f.q || "",
    a: f.answer || f.a || "",
  }));

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

  const data = {
    doctor: normalizedDoctor,
    goodDoctorTraits,
    credentialsList: doctor.credentials?.tabs || [],
    verifySteps,
    comparisonRows,
    doctorCredentials,
    doctorStages,
    questionsToAsk,
    greatDoctorTraits,
    redFlags,
    procedures: (doctor.surgicalProcess?.steps || []).map(s => typeof s === "string" ? { name: s } : { name: s.title || s.name || "" }),
    nearbyAreas: ["Pitampura", "Rohini", "Shalimar Bagh", "Ashok Vihar", "Model Town", "Punjabi Bagh", "Paschim Vihar"],
    faqs,
    pricingPackages,
    pricingDisclaimer,
  };

  return <DoctorsPageClient data={data} />;
}
