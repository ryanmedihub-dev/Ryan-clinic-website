"use client";

import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "@/components/surgery/FAQSection";
import PageBanner from "@/components/layouts/pageBanner";
import useTrackCTA from "@/lib/useTrackCTA";
import { sanitizeContent } from "@/lib/utils";
import WhyDoctorMattersSection from "@/components/pages/WhyDoctorMattersSection";
import {
  AnimatedCard,
  Reveal,
  RevealSection,
} from "@/components/surgery/AnimatedPage";
import {
  Dna,
  Hourglass,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Home,
  CreditCard,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Headphones,
  Lightbulb,
  ArrowRight,
  Clock,
  Scissors,
  Zap,
  Award,
  Users,
  TrendingUp,
  Activity,
  Check,
  Info,
  Link as LinkIcon,
  Star,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation";
const TEL = "tel:+919911111247";

const SAFETY_ICONS = [
  <ShieldCheck key="s0" className="w-5 h-5" />,
  <Home key="s1" className="w-5 h-5" />,
  <Activity key="s2" className="w-5 h-5" />,
  <Award key="s3" className="w-5 h-5" />,
];

const SCIENCE_ICONS = [
  <Dna key="sc0" className="w-8 h-8" />,
  <Hourglass key="sc1" className="w-8 h-8" />,
];

const STEP_ICONS = [
  <Syringe key="st0" className="w-5 h-5" />,
  <Scissors key="st1" className="w-5 h-5" />,
  <Activity key="st2" className="w-5 h-5" />,
  <Home key="st3" className="w-5 h-5" />,
];

const RECOVERY_COLORS = [
  "bg-blue-50 text-blue-600 border-blue-100",
  "bg-amber-50 text-amber-600 border-amber-100",
  "bg-red-50 text-[#e30a17] border-red-100",
  "bg-green-50 text-green-600 border-green-100",
];

const RECOVERY_ICONS = [
  <Activity key="r0" className="w-6 h-6" />,
  <TrendingUp key="r1" className="w-6 h-6" />,
  <Hourglass key="r2" className="w-6 h-6" />,
  <Star key="r3" className="w-6 h-6" />,
];

const VISIT_ICONS = [
  <MapPin key="v0" className="w-5 h-5" />,
  <Phone key="v1" className="w-5 h-5" />,
  <Clock key="v2" className="w-5 h-5" />,
  <ArrowRight key="v3" className="w-5 h-5" />,
  <Star key="v4" className="w-5 h-5" />,
  <Users key="v5" className="w-5 h-5" />,
];

const VISIT_COLORS = [
  "bg-red-50 text-[#e30a17]",
  "bg-blue-50 text-blue-600",
  "bg-green-50 text-green-600",
  "bg-purple-50 text-purple-600",
  "bg-amber-50 text-amber-600",
  "bg-indigo-50 text-indigo-600",
];

const CONSULTATION_ICONS = [
  <Phone key="c0" className="w-4 h-4" />,
  <MessageCircle key="c1" className="w-4 h-4" />,
  <Calendar key="c2" className="w-4 h-4" />,
];

const getSafetyIcon = (iconName, index) => {
  if (!iconName) return SAFETY_ICONS[index % SAFETY_ICONS.length];
  const name = iconName.toLowerCase().trim();
  if (name.includes("shield") || name.includes("safety") || name.includes("check")) {
    return <ShieldCheck className="w-5 h-5" />;
  }
  if (name.includes("home") || name.includes("clinic") || name.includes("hospital")) {
    return <Home className="w-5 h-5" />;
  }
  if (name.includes("activity") || name.includes("wound") || name.includes("pulse")) {
    return <Activity className="w-5 h-5" />;
  }
  if (name.includes("award") || name.includes("star") || name.includes("sterile") || name.includes("cert")) {
    return <Award className="w-5 h-5" />;
  }
  return SAFETY_ICONS[index % SAFETY_ICONS.length];
};

// ─── UI Helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#e30a17] shadow-sm animate-pulse" />
      <span className="text-[#e30a17] text-[11px] font-bold tracking-[0.2em] uppercase">{text}</span>
    </div>
  );
}

function CTAButtons({ primary = "Book Free Scalp Analysis", waLink = "", telLink = "", center = false }) {
  const trackCTA = useTrackCTA();
  return (
    <div className={`flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>
      <a
        href={waLink || WA}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-[#e30a17] hover:bg-red-700 text-white font-semibold py-4 px-7 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-lg shadow-red-200 hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => trackCTA({ type: "whatsapp", ctaName: `Surgery: ${primary}`, buttonLocation: "Surgery Page Content" })}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        {primary}
      </a>
      <a
        href={telLink || TEL}
        className="inline-flex items-center justify-center gap-2 border border-gray-200/80 bg-white hover:bg-gray-50 text-[#302658] hover:text-[#e30a17] hover:border-red-200 font-semibold py-4 px-7 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5"
        onClick={() => trackCTA({ type: "call", ctaName: "Surgery: Call Surgeon", buttonLocation: "Surgery Page Content" })}
      >
        <Phone className="w-4 h-4" />
        Call Surgeon
      </a>
    </div>
  );
}

export default function SurgeryPageClient({ data }) {
  const [activeDocIdx, setActiveDocIdx] = useState(0);

  // Dynamic City Determination
  const cityName =
    data?.city ||
    (data?.pageName?.includes("Mumbai")
      ? "Mumbai"
      : data?.pageName?.includes("Hyderabad")
      ? "Hyderabad"
      : "Delhi");

  // Dynamic Date Format
  const formattedDate = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "11 August 2026";

  // ─── Section Extraction ───────────────────────────────────────────────────
  const hero = data?.hero ?? {};
  const introduction = data?.introduction ?? {};
  const safetyInfo = data?.safetyInfo ?? {};
  const suitability = data?.candidateSuitability ?? {};
  const beforeTimeline = data?.beforeSurgeryTimeline ?? {};
  const procedureScience = data?.procedureScience ?? {};
  const safety = data?.safety ?? {};
  const techniques = data?.techniques ?? {};
  const qualityBenchmarks = data?.qualityBenchmarks ?? {};
  const procedureTimeline = data?.procedureTimeline ?? {};
  const recoveryTimeline = data?.recoveryTimeline ?? {};
  const surgicalRisks = data?.surgicalRisks ?? {};
  const doctorsSection = data?.doctors ?? {};
  const patientResults = data?.patientResults ?? {};
  const pricing = data?.pricing ?? {};
  const visitClinic = data?.visitClinic ?? {};
  const consultation = data?.consultation ?? {};
  const faqSection = data?.faq ?? {};
  const internalLinks = data?.internalLinks ?? {};
  const whyChooseUs = data?.whyChooseUs ?? {};

  // ─── 1. Hero Title (Exact H1 for SEO) ──────────────────────────────────────
  const heroTitle =
    hero.title || `Hair Transplant Surgery in ${cityName} — Doctor-Led Sapphire FUE & THI`;
  const heroDesc =
    hero.description ||
    `Doctor-led Sapphire FUE & THI hair transplant surgery in ${cityName}. Sterile operating theatre, local anaesthesia, natural hairline design, and same-day discharge.`;
  const heroBreadcrumb =
    hero.breadcrumb || `HOME > HAIR TRANSPLANT SURGERY > ${cityName.toUpperCase()}`;
  const heroBgImage = hero.heroImage?.image || "/uploads/1752667815707-fue-banner_ro9ae6.webp";
  const heroWALink = hero.whatsappText?.link || WA;
  const heroTelLink = hero.callText?.link || TEL;
  const heroStats = hero.stats ?? [];

  // ─── 2. Introduction ───────────────────────────────────────────────────────
  const introSmallHeading = introduction.smallHeading || `Diagnosis-First Hair Surgery in ${cityName}`;
  const introTitle = introduction.title || "What is hair transplant surgery?";
  const introDescription = introduction.description || "";
  const introHighlightBox = introduction.highlightBoxText || "";
  const introHonestPoints = introduction.honestPoints ?? [
    "Doctor-led at every stage of extraction and implantation",
    "Custom hairline design matched to your facial bone structure",
    "Micro-incisions (0.7mm - 0.8mm) for minimal healing time",
    "Same-day procedure with zero hospital stay required",
    "Transparent pricing confirmed after free scalp analysis"
  ];
  const introMainImage = introduction.mainImage?.image || "/uploads/1752734248947-Hair Transplant 1.jpg";
  const introMainImageAlt = introduction.mainImage?.imageAlt || `Hair transplant surgery consultation at Ryan Clinic in ${cityName}`;
  const introFloatImage = introduction.floatingImage?.image || "/uploads/turkey-doctor.jpg";
  const introFloatImageAlt = introduction.floatingImage?.imageAlt || "Surgeon inspecting graft density";
  const introStats = introduction.bottomStats ?? [];
  const introPrimaryWA = introduction.primaryCTA?.link || heroWALink;
  const introPrimaryLabel = introduction.primaryCTA?.text || "Book Free Scalp Analysis";

  // ─── 3. Safety ─────────────────────────────────────────────────────────────
  const safetyInfoHeading = safetyInfo.heading || `Is hair transplant surgery in ${cityName} safe?`;
  const safetyInfoDesc = safetyInfo.description || "";
  const safetyInfoPoints = safetyInfo.safetyPoints ?? [
    "Minimally invasive outpatient procedure performed under local scalp anesthesia.",
    "Conducted in sterile minor operating theatres with HEPA air filtration.",
    "0.7mm Sapphire micro-blades reduce scalp trauma & preserve donor health.",
    "Doctor-led incision and graft extraction protocols."
  ];

  // ─── 4. Suitability & Norwood Table ───────────────────────────────────────
  const suitabilityHeading = suitability.heading || `Who needs hair transplant surgery in ${cityName} — and who doesn't?`;
  const suitabilityDesc = suitability.description || "";
  const suitableList = suitability.suitableList ?? [
    "Men and women with Norwood Stage 2 to Stage 6 pattern baldness.",
    "Patients with healthy donor hair density on back and sides of scalp.",
    "Individuals seeking natural hairline restoration or crown density."
  ];
  const notSuitableList = suitability.notSuitableList ?? [
    "Active scalp infections or unmanaged skin conditions.",
    "Patients without stable donor hair density.",
    "Individuals with unrealistic expectations or temporary hair shedding."
  ];
  const norwoodTable = suitability.norwoodTable ?? [];

  // ─── 5. Procedure Science & Techniques ─────────────────────────────────────
  const scienceHeading = procedureScience.mainHeading || `Types of hair transplant surgery in ${cityName}`;
  const scienceDesc = procedureScience.description || `We combine proven surgical science with Sapphire FUE and THI techniques for natural-looking density and fast recovery.`;
  const scienceCards = procedureScience.cards ?? [];
  const SCIENCE_ROWS = scienceCards.length > 0 ? scienceCards : [
    {
      title: "FUE (Follicular Unit Extraction)",
      badge: "Basic FUE",
      description: "Individual follicular units are extracted from the donor zone and implanted into micro-incisions. Ideal for standard graft requirements.",
      cardImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "FUE Follicular Unit Extraction" },
      bulletPoints: [
        "Individual follicle extraction",
        "No linear donor scar",
        "Outpatient same-day recovery"
      ]
    },
    {
      title: "Sapphire FUE",
      badge: "Sapphire FUE",
      description: "Gemstone Sapphire blades create ultra-fine micro-channels in the recipient zone with surgical precision, reducing tissue trauma and speeding healing.",
      cardImage: { image: "/uploads/1752667815707-fue-banner_ro9ae6.webp", imageAlt: "Sapphire FUE Technology" },
      bulletPoints: [
        "0.7mm gem-grade sapphire micro-blades",
        "Reduced scalp tissue trauma",
        "Dense channel packing capability"
      ]
    },
    {
      title: "THI (Turkey Hair Implantation)",
      badge: "THI Choi Pen",
      description: "Choi implanter pen creates recipient site and places the graft in a single motion, protecting graft survival and controlling hair angle.",
      cardImage: { image: "/uploads/1752731223556-FUE 1.jpg", imageAlt: "THI Choi Implanter Pen" },
      bulletPoints: [
        "Direct Choi pen placement",
        "Precise 40–45° natural hair angle",
        "Minimizes graft out-of-body time"
      ]
    }
  ];

  // ─── 6. Safety Standards ───────────────────────────────────────────────────
  const safetyHeading = safety.heading || `Safety standards in our ${cityName} operating theatre`;
  const safetyDesc = safety.description || "";
  const safetyCards = safety.safetyCards ?? [];
  const rightBox = safety.rightSideHighlightBox ?? {};
  const rightBoxBadge = rightBox.smallHeading || "SAFETY PROTOCOLS";
  const rightBoxTitle = rightBox.title || "Patient Safety Standards";
  const rightBoxDesc = rightBox.description || "Every procedure is backed by strict safety protocols, informed consent, and post-op doctor availability.";
  const rightBoxMetrics = rightBox.metrics ?? [];
  const rightBoxNotice = rightBox.bottomNotice || "";

  // ─── 7. Quality Benchmarks ─────────────────────────────────────────────────
  const qualityHeading = qualityBenchmarks.heading || `What makes the best hair transplant surgery in ${cityName}?`;
  const qualityDesc = qualityBenchmarks.description || "";
  const benchmarkCards = qualityBenchmarks.benchmarkCards ?? [];
  const QUALITY_POINTS = benchmarkCards;

  // ─── 8. Before Surgery Timeline ────────────────────────────────────────────
  const beforeHeading = beforeTimeline.heading || `Before your hair transplant surgery in ${cityName}`;
  const beforeDesc = beforeTimeline.description || "Follow these essential pre-operative steps to prepare your scalp for surgery.";
  const beforeItems = (beforeTimeline.timelineItems?.length ? beforeTimeline.timelineItems : [
    { stepNumber: "01", badge: "2 Weeks Before", title: "Consultation + Free Scalp Analysis", description: "Surgeon scalp audit, Norwood grade classification, density check, and candidate evaluation." },
    { stepNumber: "02", badge: "7 Days Before", title: "Hairline Design & Graft Estimation", description: "Custom hairline design, conservative donor planning, and written all-inclusive quote." },
    { stepNumber: "03", badge: "3 Days Before", title: "Pre-Op Instructions Checklist", description: "Discontinue Minoxidil, Aspirin, Vitamin E, alcohol, and smoking per medical instructions." },
    { stepNumber: "04", badge: "1 Day Before", title: "Blood Tests & Medical Clearance", description: "A short pre-operative blood panel confirms you are fit for the procedure and rules out anything that would affect healing or clotting." }
  ]);

  // ─── 9. Day of Surgery Timeline ────────────────────────────────────────────
  const timelineHeading = procedureTimeline.heading || `During the hair transplant surgery in ${cityName}: step by step`;
  const timelineDesc = procedureTimeline.description || "From morning arrival to evening discharge, your surgery follows a structured, sterile protocol.";
  const timelineBottomNote = procedureTimeline.bottomHighlightMessage || "";
  const timelineSteps = procedureTimeline.timelineSteps ?? [];
  const STEPS = timelineSteps.map((s, i) => ({
    num: s.stepNumber || String(i + 1).padStart(2, "0"),
    tag: s.badge || s.title || "Step",
    image: s.stepImage?.image,
    alt: s.stepImage?.imageAlt || s.title || "",
    title: s.title || "",
    desc: s.description || "",
    icon: STEP_ICONS[i % STEP_ICONS.length] ?? <Activity key={i} className="w-5 h-5" />,
  }));

  // ─── 10. Recovery Timeline ─────────────────────────────────────────────────
  const recoveryHeading = recoveryTimeline.heading || `Hair transplant recovery in ${cityName}: what to expect week by week`;
  const recoveryDesc = recoveryTimeline.description || "Because the wounds are tiny micro-punctures, recovery is smooth. Desk work is usually possible within 5 to 7 days.";
  const leftCard = recoveryTimeline.leftHighlightCard ?? {};
  const leftCardTitle = leftCard.title || "Recovery Milestone Tracking";
  const leftCardDesc = leftCard.description || "Post-op checkups ensure your hairline progress is monitored throughout the growth cycle.";
  const leftCardStats = leftCard.statistics ?? [];
  const leftCardDuration = leftCard.icon || "18 Months";
  const recoveryStages = recoveryTimeline.recoveryStages ?? [];
  const recoveryStagesResolved = recoveryStages.length > 0
    ? recoveryStages
    : (leftCardStats.length > 0
        ? leftCardStats.map((s) => ({ duration: s.value, title: s.value, description: s.label }))
        : []);
  const RECOVERY = recoveryStagesResolved.map((s, i) => ({
    time: s.duration || s.title || "",
    label: s.title || "",
    desc: s.description || "",
    icon: RECOVERY_ICONS[i % RECOVERY_ICONS.length] ?? <Activity key={i} className="w-6 h-6" />,
    color: RECOVERY_COLORS[i % RECOVERY_COLORS.length] ?? "bg-blue-50 text-blue-600 border-blue-100",
  }));

  // ─── 11. Surgical Risks ────────────────────────────────────────────────────
  const risksHeading = surgicalRisks.heading || `Surgical risks, and how a good ${cityName} clinic minimises them`;
  const risksDesc = surgicalRisks.description || "";
  const risksList = surgicalRisks.risks ?? [
    { riskTitle: "Temporary Swelling & Redness", riskDescription: "Resolves within 3–5 days with prescribed aftercare.", severity: "Temporary" },
    { riskTitle: "Shock Shedding", riskDescription: "Transplanted hairs shed at 3–6 weeks before permanent regrowth — a normal biological phase.", severity: "Temporary" }
  ];
  const preventionList = surgicalRisks.preventionPoints ?? [
    { title: "Sterile OT & Single-Use Instruments", description: "HEPA-filtered air, single-use surgical kits, sterilised surfaces for every procedure." },
    { title: "Doctor-Led Execution", description: "Qualified plastic surgeons perform extraction, channel creation, and placement." }
  ];

  // ─── 12. Patient Results (Conditional Rendering - Correction 3) ────────────
  // Hide section completely if cases list is empty or contains no valid images
  const rawCases = patientResults.cases ?? [];
  const validResultCases = rawCases.filter(
    (c) => (c.beforeImage?.image || typeof c.beforeImage === "string") && (c.afterImage?.image || typeof c.afterImage === "string")
  );
  const resultsHeading = patientResults.heading || `Hair transplant before and after results — ${cityName} patients`;
  const resultsDesc = patientResults.description || "";

  // ─── 13. Doctor Section ────────────────────────────────────────────────────
  const doctorNameFromCMS = doctorsSection.doctors?.[0]?.name || "Dr. Pranendra Singh";
  const doctorsHeading = `Your surgeon: ${doctorNameFromCMS}, hair transplant surgeon in ${cityName}`;
  const doctorsDesc = doctorsSection.description || "Doctor-led surgical care with plastic surgery qualifications.";
  const doctorsTopBtn = doctorsSection.topButtonText || "View All Doctors";
  const doctorsList = doctorsSection.doctors ?? [];
  const DOCTORS = doctorsList.length > 0 ? doctorsList.map((d) => ({
    name: d.name || "Dr. Pranendra Singh",
    role: d.designation || "Senior Hair Transplant Surgeon",
    image: d.doctorImage?.image || d.image || "/uploads/about-one.jpg",
    imageAlt: d.doctorImage?.imageAlt || d.name || "Dr. Pranendra Singh",
    exp: d.experience || "",
    procedures: d.proceduresCount || "",
    rating: d.rating || "4.9 ★",
    survivalRate: d.successRate || "",
    location: d.location || `${cityName} Clinic`,
    quals: d.qualifications?.length ? d.qualifications : [
      "MS, MCh (Plastic Surgery)",
      "Delhi Medical Council DMC-68492"
    ],
    bio: d.bio || `Dr. Pranendra Singh is a senior Consultant Plastic & Reconstructive Surgeon specializing in doctor-led hair transplant procedures in ${cityName}.`,
    specializations: d.specializations?.length ? d.specializations : ["Sapphire FUE", "THI Choi Pen", "Hairline Design"],
    slug: d.slug || "hair-transplant-surgeon-in-delhi"
  })) : [
    {
      name: "Dr. Pranendra Singh",
      role: "Senior Hair Transplant Surgeon",
      image: "/uploads/about-one.jpg",
      imageAlt: "Dr. Pranendra Singh",
      exp: "",
      procedures: "",
      rating: "4.9 ★",
      survivalRate: "",
      location: `${cityName} Clinic`,
      quals: [
        "MS, MCh (Plastic Surgery)",
        "Delhi Medical Council DMC-68492"
      ],
      bio: `Dr. Pranendra Singh is a senior Consultant Plastic & Reconstructive Surgeon specializing in doctor-led hair transplant procedures in ${cityName}.`,
      specializations: ["Sapphire FUE", "THI Choi Pen", "Hairline Design"],
      slug: "hair-transplant-surgeon-in-delhi"
    }
  ];

  // ─── 14. Pricing Section (Correction 1 - Dynamic CMS controlled) ────────────
  const pricingHeading = pricing.heading || `Hair transplant cost in ${cityName}`;
  const pricingDesc = pricing.description || "Transparent pricing calculated based on your graft requirement, technique choice, and surgeon involvement.";
  const pricingFactors = pricing.pricingFactors ?? [];
  const pricingWA = pricing.ctaTextWhatsApp?.link || heroWALink;
  const pricingWALabel = pricing.ctaTextWhatsApp?.text;
  const pricingTel = pricing.ctaTextCall?.link || heroTelLink;
  const pricingTelLabel = pricing.ctaTextCall?.text;

  // ─── 15. Visit Clinic ──────────────────────────────────────────────────────
  const visitHeading = visitClinic.heading || `Visiting Ryan Clinic in ${cityName}`;
  const visitDesc = visitClinic.description || "";
  const infoCards = visitClinic.informationCards ?? [];
  const visitBtnWA = visitClinic.buttonText?.link || heroWALink;
  const visitBtnLabel = visitClinic.buttonText?.text || "Book Clinic Visit";
  const nearbyLocs = visitClinic.nearbyLocations ?? [];

  // ─── 16. Consultation ──────────────────────────────────────────────────────
  const leftSide = consultation.leftSide ?? {};
  const consultHeading = leftSide.heading || "Book your free consultation";
  const consultDesc = leftSide.description || `Speak directly with our medical team. We will assess your scalp, evaluate donor density, and provide an honest graft estimate for your hair transplant in ${cityName}.`;
  const contactCards = leftSide.contactCards ?? [];
  const CONTACT_CARDS = contactCards.map((c, i) => ({
    icon: CONSULTATION_ICONS[i % CONSULTATION_ICONS.length] ?? <Phone key={i} className="w-4 h-4" />,
    title: c.title || "Call Us",
    val: c.description || "+91 99111 11247",
    link: c.link || TEL,
    ext: c.ext ?? false,
  }));
  const formConfig = consultation.consultationFormConfig ?? {};
  const formTitle = formConfig.title || "Book Your Free Consultation";

  // ─── 17. FAQ ───────────────────────────────────────────────────────────────
  const FAQS_RAW = (faqSection.faqs ?? []).map((f) => ({ q: f.question, a: f.answer }));
  const FAQS = FAQS_RAW;

  // ─── 18. Why Choose Ryan ───────────────────────────────────────────────────
  const whyChooseHeading = whyChooseUs.heading || `Why choose Ryan Clinic for hair transplant surgery in ${cityName}`;
  const whyChooseDesc = whyChooseUs.description || "What sets us apart is doctor-led precision, sterile OT discipline, and transparent per-graft planning.";
  const whyChoosePoints = whyChooseUs.points ?? [
    { title: "Doctor-led at every stage", description: "Extraction, channel creation, and implantation are performed by a qualified doctor." },
    { title: "Sapphire FUE & THI with Choi Pen", description: "Both techniques matched to your case, not offered as a fixed single approach." },
    { title: "Sterile Operating Theatre", description: "Single-use instruments in a properly equipped, sterile OT." },
    { title: "Natural Hairline Design", description: "Soft, irregular, age-appropriate hairline design built for undetectable growth." }
  ];

  const linksList = internalLinks.links ?? [];

  return (
    <>
      {/* ── 1. Page Banner (Exact H1 for SEO) ─────────────────────────────── */}
      <PageBanner
        breadcrumb={heroBreadcrumb}
        title={heroTitle}
        description={heroDesc}
        bgImage={heroBgImage}
        stats={heroStats}
      />

      {/* ── Medical Reviewer Byline & Last Updated (Phase 19) ──────────────── */}
      <div className="bg-[#FAF6F3] border-b border-gray-200/80 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-gray-600 font-sans gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>
              <strong className="text-gray-900">Medically Reviewed by:</strong> Dr. Pranendra Singh, MS, MCh (Plastic Surgery), DMC-68492
            </span>
          </div>
          <span className="text-gray-500 font-medium">Last updated: {formattedDate}</span>
        </div>
      </div>

      {/* ── 2. What is Hair Transplant Surgery? ─────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal direction="left">
                <SectionLabel text={introSmallHeading} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-5">
                  {introTitle}
                </h2>

                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed font-sans">
                  {introDescription ? (
                    <div dangerouslySetInnerHTML={{ __html: sanitizeContent(introDescription) }} />
                  ) : (
                    <p>
                      Hair transplant surgery is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — ensuring no general anaesthesia risks and no hospital stay. A surgeon relocates your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently.
                    </p>
                  )}

                  {introHighlightBox && (
                    <div className="bg-[#F7F5F2] border-l-4 border-[#e30a17] p-5 rounded-r-2xl my-6">
                      <div className="font-semibold text-[#302658]" dangerouslySetInnerHTML={{ __html: sanitizeContent(introHighlightBox) }} />
                    </div>
                  )}

                  {introHonestPoints.length > 0 && (
                    <div className="space-y-2.5 my-4">
                      {introHonestPoints.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm font-semibold text-[#302658]">
                          <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <CTAButtons primary={introPrimaryLabel} waLink={introPrimaryWA} telLink={heroTelLink} />
                </div>
              </Reveal>
            </div>

            {/* Right Image Container */}
            <div className="lg:col-span-6 w-full lg:sticky lg:top-24">
              <Reveal direction="right" delay={120}>
                <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[580px]">
                  <div className="absolute top-0 left-0 w-[90%] h-[90%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                      src={introMainImage}
                      alt={introMainImageAlt}
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-700"
                      unoptimized
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[52%] h-[52%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
                    <Image
                      src={introFloatImage}
                      alt={introFloatImageAlt}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      unoptimized
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Is Hair Transplant Surgery Safe? ─────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28 self-start">
              <Reveal direction="left">
                <div className="relative w-full h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  <Image
                    src="/uploads/1752667815707-fue-banner_ro9ae6.webp"
                    alt={`Sterile operating theatre at Ryan Clinic ${cityName}`}
                    fill
                    className="object-cover object-center"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1430]/90 via-transparent to-transparent" />
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={120}>
              <div className="text-left mb-6">
                <SectionLabel text="Safety Protocols" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 mt-2">{safetyInfoHeading}</h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  For suitable candidates, hair transplant surgery in {cityName} is an outpatient procedure performed under local anaesthesia with sterile technique and single-use instruments.
                </p>
              </div>

              {/* Exact H3 Headings */}
              <div className="space-y-6">
                <div className="p-5 bg-[#FAF6F3] rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-[#302658] mb-2">Safety standards in our {cityName} operating theatre</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Surgeries take place in a dedicated, sterile minor operating theatre equipped with HEPA clean air filtration, single-use micro-blades, and surgical-grade sterilization protocols.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF6F3] rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-[#302658] mb-2">Local anaesthesia and same-day discharge</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Scalp numbing is achieved comfortably under local anaesthetic. There is zero general anaesthesia, no hospital admission, and you return home the very same day.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Who Needs Hair Transplant Surgery? ───────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-10">
            <SectionLabel text="Candidate Suitability" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 mt-2">{suitabilityHeading}</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Surgery is recommended when male or female pattern hair loss has stabilized, donor density is sufficient, and your goal is long-term natural restoration.
            </p>
          </div>

          {/* Exact H3: Norwood Grade to Graft Count */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs mb-10">
            <h3 className="text-2xl font-bold text-[#302658] mb-4 font-outfit">
              How many grafts do you need? Norwood grade to graft count
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-sans">
              Below is an indicative graft guide based on the Norwood Hair Loss Scale. Exact graft estimates are confirmed during your in-clinic scalp analysis.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider bg-gray-50">
                    <th className="py-3.5 px-6">Norwood Stage</th>
                    <th className="py-3.5 px-6">Hair Loss Pattern</th>
                    <th className="py-3.5 px-6">Indicative Graft Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  {norwoodTable.length > 0 ? norwoodTable.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FAF6F3] transition-colors">
                      <td className="py-3.5 px-6 font-bold text-[#302658]">{row.stage}</td>
                      <td className="py-3.5 px-6 text-gray-600">{row.description}</td>
                      <td className="py-3.5 px-6 font-black text-[#e30a17]">{row.grafts}</td>
                    </tr>
                  )) : [
                    ["Norwood Stage 2–3", "Receding hairline & temple loss", "1,000 – 2,000 Grafts"],
                    ["Norwood Stage 4–5", "Frontal hairline + crown thinning", "2,500 – 3,500 Grafts"],
                    ["Norwood Stage 6–7", "Extensive scalp hair loss", "3,500+ Grafts (Staged)"],
                  ].map(([stage, desc, grafts], i) => (
                    <tr key={i} className="hover:bg-[#FAF6F3] transition-colors">
                      <td className="py-3.5 px-6 font-bold text-[#302658]">{stage}</td>
                      <td className="py-3.5 px-6 text-gray-600">{desc}</td>
                      <td className="py-3.5 px-6 font-black text-[#e30a17]">{grafts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Types of Hair Transplant Surgery ────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Surgical Techniques" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4">{scienceHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{scienceDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Exact H3: FUE */}
            <div className="bg-[#FAF6F3] p-6 rounded-3xl border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#302658] mb-3">FUE (Follicular Unit Extraction)</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Standard micro-punch extraction technique where follicular units are harvested individually from the donor zone. Leaves no linear scar and allows rapid recovery.
                </p>
              </div>
            </div>

            {/* Exact H3: Sapphire FUE */}
            <div className="bg-[#FAF6F3] p-6 rounded-3xl border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#302658] mb-3">Sapphire FUE</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Uses micro-gemstone sapphire blades to open recipient channels. Gem-grade sharpness reduces tissue resistance, minimizes scabbing, and enables high-density graft packing.
                </p>
              </div>
            </div>

            {/* Exact H3: THI */}
            <div className="bg-[#FAF6F3] p-6 rounded-3xl border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#302658] mb-3">THI (Turkey Hair Implantation)</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Direct hair implantation using Choi implanter pens. Creates micro-incisions and places grafts in a single stroke, giving exact control over angle, depth, and direction.
                </p>
              </div>
            </div>
          </div>

          {/* Exact H3: Technique Comparison */}
          <div className="bg-[#FAF6F3] p-8 rounded-3xl border border-gray-200">
            <h3 className="text-2xl font-bold text-[#302658] mb-4">
              FUE vs Sapphire FUE vs THI: which technique is right for you?
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Choosing between FUE, Sapphire FUE, and THI depends on your hair loss stage, donor density, and target hairline shape. Basic FUE is versatile for large coverage, Sapphire FUE provides delicate channel creation with fast healing, and THI Choi pens excel at dense hairline packing without shaving native hair. Your surgeon will recommend the optimal technique during your consultation.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Before Your Hair Transplant Surgery ─────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Pre-Op Instructions" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4">{beforeHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{beforeDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beforeItems.map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-[#e30a17] bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                    {step.badge || `Step ${i + 1}`}
                  </span>
                  <h4 className="font-bold text-lg text-[#302658] mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. During the Hair Transplant Surgery: Step by Step ────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Surgical Protocol" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4">{timelineHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{timelineDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="bg-[#FAF6F3] p-6 rounded-3xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-white text-[#e30a17] font-black text-sm flex items-center justify-center border border-gray-200">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{step.tag}</span>
                  </div>
                  <h4 className="font-bold text-lg text-[#302658] mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Recovery Timeline & Results ─────────────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Post-Op Care" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4">{recoveryHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{recoveryDesc}</p>
          </div>

          {/* Exact H3: Results at 6, 12 and 24 months */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs mb-12">
            <h3 className="text-2xl font-bold text-[#302658] mb-4 font-outfit">
              Results at 6, 12 and 24 months
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 font-sans">
              <div className="p-4 bg-[#FAF6F3] rounded-2xl border border-gray-100">
                <p className="font-bold text-[#e30a17] text-base mb-1">6 Months</p>
                <p className="leading-relaxed">New hair growth is visible, covering thinning areas. Transformed hair shaft density continues to thicken each month.</p>
              </div>
              <div className="p-4 bg-[#FAF6F3] rounded-2xl border border-gray-100">
                <p className="font-bold text-[#e30a17] text-base mb-1">12 Months</p>
                <p className="leading-relaxed">Full result stage for most patients. High density, natural hairline direction, and natural scalp texture fully established.</p>
              </div>
              <div className="p-4 bg-[#FAF6F3] rounded-2xl border border-gray-100">
                <p className="font-bold text-[#e30a17] text-base mb-1">24 Months</p>
                <p className="leading-relaxed">Matured permanent growth. Transplanted DHT-resistant hair continues growing naturally for a lifetime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Surgical Risks ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-10">
            <SectionLabel text="Risk Management" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4">{risksHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Every responsible clinic discusses surgical risks transparently. A doctor-led approach, sterile OT, single-use instruments, and clear aftercare keep risks low.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF6F3] p-6 rounded-3xl border border-gray-200">
              <h4 className="font-bold text-lg text-[#302658] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#e30a17]" /> Common Minor Risks (Temporary)
              </h4>
              <div className="space-y-3">
                {risksList.map((r, i) => (
                  <div key={i} className="p-3.5 bg-white rounded-xl border border-gray-100">
                    <h5 className="font-bold text-sm text-[#302658]">{r.riskTitle}</h5>
                    <p className="text-xs text-gray-600 mt-1">{r.riskDescription}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF6F3] p-6 rounded-3xl border border-gray-200">
              <h4 className="font-bold text-lg text-emerald-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> How Ryan Clinic Minimises Them
              </h4>
              <div className="space-y-3">
                {preventionList.map((p, i) => {
                  const title = typeof p === "string" ? p : (p.title || p.text || "");
                  const desc = typeof p === "string" ? "" : p.description;
                  return (
                    <div key={i} className="p-3.5 bg-white rounded-xl border border-gray-100">
                      <h5 className="font-bold text-sm text-emerald-900">{title}</h5>
                      {desc && <p className="text-xs text-gray-600 mt-1">{desc}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Hair Transplant Cost ────────────────────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Pricing & Value" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4">{pricingHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{pricingDesc}</p>
          </div>

          {/* Exact H3: Indicative pricing by session size */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs mb-10">
            <h3 className="text-2xl font-bold text-[#302658] mb-4 font-outfit">
              Indicative pricing by session size
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider bg-gray-50">
                    <th className="py-3.5 px-6">Session Type</th>
                    <th className="py-3.5 px-6">Indicative Grafts</th>
                    <th className="py-3.5 px-6">Typical Norwood Grade</th>
                    <th className="py-3.5 px-6">Pricing Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-[#FAF6F3]/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#302658]">Standard Session</td>
                    <td className="py-4 px-6 text-gray-600">1,000 – 1,500 Grafts</td>
                    <td className="py-4 px-6 text-gray-600">Norwood 2 – 3</td>
                    <td className="py-4 px-6 font-semibold text-gray-700">Custom Scalp Quote</td>
                  </tr>
                  <tr className="hover:bg-[#FAF6F3]/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#302658]">Medium Session</td>
                    <td className="py-4 px-6 text-gray-600">1,500 – 2,500 Grafts</td>
                    <td className="py-4 px-6 text-gray-600">Norwood 3 – 4</td>
                    <td className="py-4 px-6 font-semibold text-gray-700">Custom Scalp Quote</td>
                  </tr>
                  <tr className="hover:bg-[#FAF6F3]/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#302658]">Large Session</td>
                    <td className="py-4 px-6 text-gray-600">2,500 – 3,500 Grafts</td>
                    <td className="py-4 px-6 text-gray-600">Norwood 4 – 5</td>
                    <td className="py-4 px-6 font-semibold text-gray-700">Custom Scalp Quote</td>
                  </tr>
                  <tr className="hover:bg-[#FAF6F3]/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#302658]">Mega Session</td>
                    <td className="py-4 px-6 text-gray-600">3,500+ Grafts</td>
                    <td className="py-4 px-6 text-gray-600">Norwood 5 – 7</td>
                    <td className="py-4 px-6 font-semibold text-gray-700">Custom Scalp Quote</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Exact H3: What actually changes your price */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs mb-10">
            <h3 className="text-2xl font-bold text-[#302658] mb-4 font-outfit">
              What actually changes your price
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 font-sans">
              {pricingFactors.length > 0 ? pricingFactors.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              )) : (
                [
                  "Graft count: Determined by Norwood grade and donor density confirmed at scalp analysis.",
                  "Technique: Sapphire FUE and THI Choi Implanter use imported single-use blades and tools.",
                  "Surgeon involvement: Doctor-led surgical procedures performed by registered plastic surgeons.",
                  "Donor area used: Scalp vs beard or body donor hair extraction.",
                  "Staged sessions: Multi-stage planning for extensive hair loss cases."
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Exact H3: 2,000 vs 3,000 grafts */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs mb-8">
            <h3 className="text-2xl font-bold text-[#302658] mb-4 font-outfit">
              Hair transplant cost in {cityName}: 2,000 vs 3,000 grafts
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-sans mb-4">
              A 2,000-graft session typically restores a receding hairline and frontal zone (Norwood 3–4), while a 3,000-graft session covers both the frontal hairline and thinning crown (Norwood 4–5). Because session duration and instrument requirements increase with graft count, pricing is tailored to your scalp audit. Read our <a href="/cost/hair-transplant-cost-in-delhi" className="text-[#e30a17] underline font-semibold">full Delhi cost breakdown by graft count</a> for detailed intent.
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. Delhi vs Turkey Comparison Section ───────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-10">
            <SectionLabel text="Location Comparison" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 font-outfit">
              {cityName} vs Turkey: is it worth travelling for a hair transplant?
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans mb-6">
              When deciding between getting your procedure in {cityName} or traveling abroad to Turkey, compare these key operational and medical factors objectively:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#FAF6F3] rounded-3xl border border-gray-200">
                <h4 className="font-bold text-lg text-[#302658] mb-3">Local Procedure ({cityName})</h4>
                <ul className="space-y-2.5 text-sm text-gray-600 font-sans">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Doctor-led extraction and implantation in-person</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Direct in-clinic follow-up visits throughout 12–18 months</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> No international travel fatigue or flight recovery delays</li>
                </ul>
              </div>

              <div className="p-6 bg-[#FAF6F3] rounded-3xl border border-gray-200">
                <h4 className="font-bold text-lg text-[#302658] mb-3">Overseas Medical Travel (Turkey)</h4>
                <ul className="space-y-2.5 text-sm text-gray-600 font-sans">
                  <li className="flex items-start gap-2"><Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> Requires evaluation of who performs surgery (doctor vs technician)</li>
                  <li className="flex items-start gap-2"><Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> Follow-up care relies on remote digital communication</li>
                  <li className="flex items-start gap-2"><Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> Total cost includes flights, hotel, and travel time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Patient Results (Rendered ONLY if genuine cases exist - Correction 3) ── */}
      {validResultCases.length > 0 && (
        <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-4xl mb-10">
              <SectionLabel text="Patient Results" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4 font-outfit">
                {resultsHeading}
              </h2>
              {resultsDesc && <p className="text-gray-600 text-base leading-relaxed font-sans">{resultsDesc}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {validResultCases.map((c, i) => {
                const bImg = typeof c.beforeImage === "string" ? c.beforeImage : c.beforeImage?.image;
                const aImg = typeof c.afterImage === "string" ? c.afterImage : c.afterImage?.image;
                const bAlt = c.beforeImage?.imageAlt || `Hair transplant before result, ${c.technique || "FUE"}, ${c.graftCount || ""}`;
                const aAlt = c.afterImage?.imageAlt || `Hair transplant after result, ${c.technique || "FUE"}, ${c.graftCount || ""}`;

                return (
                  <div key={i} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="grid grid-cols-2 h-[340px] relative divide-x divide-white/20">
                      <div className="relative h-full w-full">
                        <Image src={bImg} alt={bAlt} fill className="object-cover" unoptimized />
                        <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase">BEFORE</span>
                      </div>
                      <div className="relative h-full w-full">
                        <Image src={aImg} alt={aAlt} fill className="object-cover" unoptimized />
                        <span className="absolute top-3 right-3 bg-[#e30a17] text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase">AFTER</span>
                      </div>
                    </div>
                    <div className="p-5 bg-white border-t border-gray-100">
                      <p className="text-base font-extrabold text-gray-900 font-sans">
                        {[c.technique, c.graftCount, c.recoveryTime].filter(Boolean).join(" · ")}
                      </p>
                      {c.description && <p className="text-sm text-gray-600 mt-1 font-sans">{c.description}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 13. Your Surgeon Section ────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Medical Leadership" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4 font-outfit">
              {doctorsHeading}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">{doctorsDesc}</p>
          </div>

          <div className="bg-[#FAF6F3] p-8 sm:p-10 rounded-3xl border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 text-left">
                <h3 className="text-2xl font-bold text-[#302658] font-outfit">{DOCTORS[0].name}</h3>
                <p className="text-sm font-bold text-[#e30a17] font-sans">{DOCTORS[0].role}</p>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">{DOCTORS[0].bio}</p>

                <div className="space-y-2 pt-2">
                  {DOCTORS[0].quals.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-700 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 relative h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src={DOCTORS[0].image}
                  alt={DOCTORS[0].imageAlt || DOCTORS[0].name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. What Makes the Best Hair Transplant Surgery ─────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Quality Criteria" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 font-outfit">{qualityHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{qualityDesc || "Strict quality benchmarks define the best hair transplant outcomes:"}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUALITY_POINTS.length > 0 ? (
              QUALITY_POINTS.map((point, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
                  <span className="w-8 h-8 rounded-xl bg-red-50 text-[#e30a17] font-black text-xs flex items-center justify-center mb-3">
                    {point.number || String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">{point.description}</p>
                </div>
              ))
            ) : (
              [
                { t: "Doctor-Led Execution", d: "A qualified surgeon performs every step — extraction, channel creation, and graft placement." },
                { t: "Tailored Technique", d: "Sapphire FUE or THI Choi pen matched precisely to your hair pattern." },
                { t: "Sterile OT", d: "Clean-room operating theatre equipped with HEPA filters and single-use kits." },
                { t: "Natural Hairline Design", d: "Soft, irregular front hairline for lifelong natural growth." }
              ].map((pt, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
                  <h4 className="font-bold text-base text-[#302658] mb-2 font-outfit">{pt.t}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{pt.d}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── 15. Why Choose Ryan Clinic ─────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Why Ryan Clinic" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 font-outfit">{whyChooseHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{whyChooseDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChoosePoints.map((pt, i) => (
              <div key={i} className="p-6 bg-[#FAF6F3] rounded-3xl border border-gray-200 flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#e30a17] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-base text-[#302658] mb-1 font-outfit">{pt.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{pt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 16. Visiting Ryan Clinic ───────────────────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Clinic Location" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 font-outfit">{visitHeading}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{visitDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {infoCards.length > 0 ? (
              infoCards.map((card, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{card.title}</p>
                  <p className="text-sm font-semibold text-[#302658]">{card.description}</p>
                </div>
              ))
            ) : null}
          </div>

          <div className="text-center">
            <CTAButtons primary={visitBtnLabel} waLink={visitBtnWA} telLink={heroTelLink} center />
          </div>
        </div>
      </section>

      {/* ── 17. Book Your Free Consultation ───────────────────────────────── */}
      <section id="appointment-form" className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <SectionLabel text="Appointment Booking" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4 font-outfit">
                  {consultHeading}
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans">{consultDesc}</p>
              </div>

              <div className="space-y-3">
                {CONTACT_CARDS.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF6F3] border border-gray-200 hover:border-[#e30a17]/40 transition-all"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#e30a17]/10 text-[#e30a17] flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase text-gray-400">{item.title}</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#FAF6F3] rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 relative">
                <h3 className="text-2xl font-black text-gray-900 mb-6 font-outfit">{formTitle}</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 18. Frequently Asked Questions ─────────────────────────────────── */}
      <FAQSection faqs={FAQS} heading={faqSection.heading || `Frequently asked questions about hair transplant surgery in ${cityName}`} />

      {/* ── Dynamic Internal Links ─────────────────────────────────────────── */}
      {linksList.length > 0 && (
        <section className="bg-[#FAF6F3] py-10 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="text-xs font-bold text-[#302658] uppercase tracking-widest mb-3">Explore Related Resources</h4>
            <div className="flex flex-wrap gap-2.5">
              {linksList.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#302658] hover:text-[#e30a17] hover:border-red-200 transition-all shadow-xs"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-[#e30a17]" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Disclaimer ─────────────────────────────────────────────────────── */}
      <div className="bg-[#FAF6F3] border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 leading-relaxed max-w-4xl font-sans">
            <strong className="text-gray-500">Medical disclaimer:</strong> The content provided on this page is for general information only and does not substitute professional medical diagnosis or treatment options. Results can vary between candidates.{" "}
            <a href="/privacy-policy" className="underline text-[#e30a17]">Privacy Policy</a>
            {" · "}
            <a href="/terms-and-conditions" className="underline text-[#e30a17]">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </>
  );
}
