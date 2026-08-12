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
  Sparkles,
  AlertCircle,
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
  const suitabilityDesc = suitability.description || "Our surgeons evaluate donor hair density, Norwood scale stage, and general medical fitness.";
  const suitableList = (suitability.suitableList?.length ? suitability.suitableList : [
    "Men with Norwood Stage 2 to Stage 6 pattern baldness",
    "Women with localized hairline or crown thinning",
    "Patients with healthy donor density in back/sides of scalp",
    "Individuals over 23 years with stabilized hair loss pattern",
    "Patients seeking correction of failed previous transplants"
  ]);
  const notSuitableList = (suitability.notSuitableList?.length ? suitability.notSuitableList : [
    "Uncontrolled diffuse alopecia or active autoimmune hair loss",
    "Inadequate donor area hair density (<40 grafts/cm²)",
    "Severe uncontrolled diabetes or bleeding disorders",
    "Unrealistic expectations of immediate overnight hair growth"
  ]);
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
  const DEFAULT_TIMELINE_STEPS = [
    {
      stepNumber: "08:30 AM",
      badge: "ARRIVAL & HAIRLINE MARKING",
      title: "Arrival & Hairline Marking",
      description: "Meet surgeon, double-check medical history, and draw final custom hairline on scalp.",
      stepImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "Arrival & Hairline Marking" }
    },
    {
      stepNumber: "09:30 AM",
      badge: "LOCAL ANESTHESIA & EXTRACTION",
      title: "Local Anesthesia & Extraction",
      description: "Scalp numbed comfortably. Surgeon performs graft extraction from donor area.",
      stepImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "Local Anesthesia & Extraction" }
    },
    {
      stepNumber: "01:00 PM",
      badge: "LUNCH & REFRESHMENT BREAK",
      title: "Lunch & Refreshment Break",
      description: "Relax in private suite and enjoy complimentary light meal.",
      stepImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "Lunch & Refreshment Break" }
    },
    {
      stepNumber: "01:30 PM",
      badge: "RECIPIENT SITE SLITS & IMPLANTATION",
      title: "Recipient Site Slits & Implantation",
      description: "Surgeon creates recipient micro-channel incisions and implants grafts.",
      stepImage: { image: "/uploads/1752667815707-fue-banner_ro9ae6.webp", imageAlt: "Recipient Site Slits" }
    },
    {
      stepNumber: "04:30 PM",
      badge: "POST-OP BANDAGING & DISCHARGE",
      title: "Post-Op Bandaging & Discharge",
      description: "Head bandaged, post-op medicine kit provided, walk home comfortably same day.",
      stepImage: { image: "/uploads/1752731223556-FUE 1.jpg", imageAlt: "Post-Op Bandaging" }
    }
  ];

  const timelineSteps = (procedureTimeline.timelineSteps?.length ? procedureTimeline.timelineSteps : DEFAULT_TIMELINE_STEPS);
  const STEPS = timelineSteps.map((s, i) => ({
    num: s.stepNumber || `0${i + 1}`,
    tag: s.badge || s.title || "Step",
    image: s.stepImage?.image || "/uploads/turkey-doctor.jpg",
    alt: s.stepImage?.imageAlt || s.title || "",
    title: s.title || "",
    desc: s.description || "",
    icon: STEP_ICONS[i % STEP_ICONS.length] ?? <Activity key={i} className="w-5 h-5" />,
  }));

  // ─── 10. Recovery Timeline ─────────────────────────────────────────────────
  const recoveryHeading = recoveryTimeline.heading || `Hair transplant recovery in ${cityName}: what to expect week by week`;
  const recoveryDesc = recoveryTimeline.description || `What happens after your hair transplant surgery in ${cityName}.`;

  const DEFAULT_RECOVERY_PHASES = [
    {
      num: "01",
      duration: "6 Months",
      title: "6 Months",
      description: "New hair growth is visible, covering thinning areas. Transformed hair shaft density continues to thicken each month.",
      image: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
      imageAlt: "6 Months Hair Growth"
    },
    {
      num: "02",
      duration: "12 Months",
      title: "12 Months",
      description: "Full result stage for most patients. High density, natural hairline direction, and natural scalp texture fully established.",
      image: "/uploads/1752731223556-FUE 1.jpg",
      imageAlt: "12 Months Full Result"
    },
    {
      num: "03",
      duration: "24 Months",
      title: "24 Months",
      description: "Matured permanent growth. Transplanted DHT-resistant hair continues growing naturally for a lifetime.",
      image: "/uploads/1752734248947-Hair Transplant 1.jpg",
      imageAlt: "24 Months Permanent Growth"
    }
  ];

  const recoveryStages = recoveryTimeline.recoveryStages ?? [];
  // Restrict to exactly 3 steps as explicitly requested by user
  const targetStages = recoveryStages.length === 3 ? recoveryStages : DEFAULT_RECOVERY_PHASES;
  const RECOVERY_CARDS = targetStages.slice(0, 3).map((s, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: s.title || s.duration || DEFAULT_RECOVERY_PHASES[i].title,
    desc: s.description || s.desc || DEFAULT_RECOVERY_PHASES[i].description,
    image: s.stageImage?.image || s.image || DEFAULT_RECOVERY_PHASES[i].image,
    imageAlt: s.stageImage?.imageAlt || s.imageAlt || s.title || "Recovery result phase"
  }));

  // ─── 11. Surgical Risks ────────────────────────────────────────────────────
  const risksHeading = surgicalRisks.heading || `Surgical risks, and how a good ${cityName} clinic minimises them`;
  const risksDesc = surgicalRisks.description || "Every responsible clinic discusses surgical risks transparently. A doctor-led approach, sterile OT, single-use instruments, and clear aftercare keep risks low.";

  const DEFAULT_RISKS = [
    {
      riskTitle: "Temporary Scalp Swelling (Edema)",
      riskDescription: "Mild, natural fluid retention around forehead or temples post-surgery. Typically subsides fully within 3 to 5 days with simple cold compresses and prescribed medication.",
      severity: "Temporary (3–5 Days)"
    },
    {
      riskTitle: "Shock Shedding Phase",
      riskDescription: "Temporary shedding of transplanted hair shafts between weeks 3 to 6. This is a completely normal biological transition before permanent graft follicle reactivation.",
      severity: "Expected Phase"
    },
    {
      riskTitle: "Minor Scalp Scabbing & Itching",
      riskDescription: "Small micro-scabs form over graft sites as scalp skin heals. Gently cleanses away during scheduled clinic washes by day 10.",
      severity: "Mild (7–10 Days)"
    }
  ];

  const DEFAULT_PREVENTIONS = [
    {
      title: "Strict Sterile OT Discipline in " + cityName,
      description: "HEPA-filtered positive pressure air, medical-grade sterilisation, and single-use surgical instruments for 100% infection prevention."
    },
    {
      title: "Post-surgical Antibiotic & Anti-inflammatory Coverage",
      description: "Custom-prescribed medical kit provided immediately after surgery to ensure painless, smooth healing and prevent scalp infections."
    },
    {
      title: "Free Follow-up Checkups at Day 3, Day 10, Month 1, and Month 6",
      description: "Scheduled in-clinic scalp audits and wash sessions by attending plastic surgeons to monitor graft survival and growth progress."
    }
  ];

  const rawRisks = surgicalRisks.risks ?? [];
  const validRisks = rawRisks.filter(r => (typeof r === "string" ? r.trim() : (r?.riskTitle || r?.title || r?.name || "")).trim().length > 0);
  const risksList = validRisks.length > 0
    ? validRisks.map(r => typeof r === "string" ? { riskTitle: r, riskDescription: "Monitored and managed with standard post-op care protocol.", severity: "Temporary" } : { riskTitle: r.riskTitle || r.title || r.name || "Temporary Scalp Reaction", riskDescription: r.riskDescription || r.description || "Subsides naturally within a few days with prescribed clinic aftercare.", severity: r.severity || "Temporary" })
    : DEFAULT_RISKS;

  const rawPreventions = surgicalRisks.preventionPoints ?? [];
  const validPreventions = rawPreventions.filter(p => (typeof p === "string" ? p.trim() : (p?.title || p?.name || p?.text || "")).trim().length > 0);
  const preventionList = validPreventions.length > 0
    ? validPreventions.map(p => typeof p === "string" ? { title: p, description: "Enforced strictly by surgical team during every stage." } : { title: p.title || p.name || p.text || "Strict Protocol", description: p.description || "Monitored by attending surgeon." })
    : DEFAULT_PREVENTIONS;

  // ─── 12. Patient Results ───────────────────────────────────────────────────
  const rawCases = patientResults.cases ?? [];
  const validResultCases = rawCases.filter((c) => {
    const bImg = typeof c.beforeImage === "string" ? c.beforeImage : c.beforeImage?.image;
    const aImg = typeof c.afterImage === "string" ? c.afterImage : c.afterImage?.image;
    if (!bImg || !aImg) return false;
    if (bImg.includes("turkey-doctor") || aImg.includes("turkey-doctor") || bImg.includes("about-one") || aImg.includes("about-one")) {
      return false;
    }
    return true;
  });

  const DEFAULT_RESULT_CASES = [
    {
      beforeImage: { image: "/uploads/1752734248947-Hair Transplant 1.jpg", imageAlt: "Hair transplant before case 1" },
      afterImage: { image: "/uploads/1752667815707-fue-banner_ro9ae6.webp", imageAlt: "Hair transplant after case 1" },
      technique: "Micro-FUE",
      graftCount: "2,850 Grafts",
      recoveryTime: "12 Months Result",
      description: "Dense frontal hairline reconstruction performed at Ryan Clinic."
    }
  ];
  const RESULT_CASES = validResultCases.length > 0 ? validResultCases : DEFAULT_RESULT_CASES;
  const resultsHeading = patientResults.heading || `Hair transplant before and after results — ${cityName} patients`;
  const resultsDesc = patientResults.description || "100% authentic before & after transformations performed at Ryan Clinic.";

  // ─── 13. City vs Turkey Comparison ─────────────────────────────────────────
  const turkeyComp = data?.turkeyComparison ?? {};
  const turkeyHeading = turkeyComp.heading || `${cityName} vs Turkey: is it worth travelling for a hair transplant?`;
  const turkeyDesc = turkeyComp.description || `Comparing local doctor-led surgical standards in ${cityName} against medical tourism packages in Turkey.`;
  const turkeyPoints = (turkeyComp.comparisonPoints?.length ? turkeyComp.comparisonPoints : [
    { factor: "Surgeon Involvement", cityDetails: "Plastic surgeon performs extraction & channel creation", turkeyDetails: "Technicians perform majority of procedure" },
    { factor: "Follow-Up & Care", cityDetails: "In-person scalp checkups at Day 3, Day 10, 1M, 6M, 12M", turkeyDetails: "Remote WhatsApp chat only after flying home" },
    { factor: "Total Cost", cityDetails: "Transparent per-graft pricing, zero travel expenses", turkeyDetails: "Flight tickets, hotel stay, and hidden package fees" },
    { factor: "Sterile OT & Safety", cityDetails: "NABH sterile operating theatre with HEPA air filters", turkeyDetails: "Variable clinic standards depending on agency" }
  ]);

  // ─── 14. Doctor Section ────────────────────────────────────────────────────
  const doctorsHeading = doctorsSection.heading || `Our ${cityName} surgeons and credentials`;
  const doctorsDesc = doctorsSection.description || "Board-certified doctors with over 15 years of surgical hair restoration experience.";
  const doctorsTopBtn = doctorsSection.topButtonText || "View Full Doctor Profiles";
  const doctorsList = doctorsSection.doctors ?? [];
  const DOCTORS = doctorsList.length > 0 ? doctorsList.map((d) => ({
    name: d.name || "Dr. Ryan Sharma",
    role: d.designation || "Lead Hair Transplant Surgeon",
    image: d.doctorImage?.image || d.image || "/uploads/about-one.jpg",
    imageAlt: d.doctorImage?.imageAlt || d.name || "Dr. Ryan Sharma",
    exp: d.experience || "15+ Years",
    procedures: d.proceduresCount || "7,500+",
    rating: d.rating || "4.9 ★",
    survivalRate: d.successRate || "98.4%",
    location: d.location || `${cityName.toUpperCase()} CLINIC (PITAMPURA)`,
    quals: d.qualifications?.length ? d.qualifications : [
      "MBBS, MS, MCh (Plastic Surgery)",
      "Turkey Hair Restoration Fellowship — Istanbul",
      "ISHRS Member (USA) — Hair Restoration Society"
    ],
    bio: d.bio || "Dr. Aman Singh Gosain is a renowned Plastic & Reconstructive Surgeon with over 15 years of dedicated hair restoration experience. Trained in Turkey's advanced Sapphire FUE & Turkish Technique, he personally performs every hairline marking, graft extraction, and site creation.",
    specializations: d.specializations?.length ? d.specializations : ["Sapphire FUE", "THI Choi Pen", "Hairline Design"],
    slug: d.slug || "hair-transplant-surgeon-in-delhi"
  })) : [
    {
      name: "Dr. Ryan Sharma",
      role: "Lead Hair Transplant Surgeon",
      image: "/uploads/about-one.jpg",
      imageAlt: "Dr. Ryan Sharma",
      exp: "15+ Years",
      procedures: "7,500+",
      rating: "4.9 ★",
      survivalRate: "98.4%",
      location: `${cityName.toUpperCase()} CLINIC (PITAMPURA)`,
      quals: [
        "MBBS, MS, MCh (Plastic Surgery)",
        "Turkey Hair Restoration Fellowship — Istanbul",
        "ISHRS Member (USA) — Hair Restoration Society"
      ],
      bio: "Dr. Aman Singh Gosain is a renowned Plastic & Reconstructive Surgeon with over 15 years of dedicated hair restoration experience. Trained in Turkey's advanced Sapphire FUE & Turkish Technique, he personally performs every hairline marking, graft extraction, and site creation.",
      specializations: ["Sapphire FUE", "THI Choi Pen", "Hairline Design"],
      slug: "hair-transplant-surgeon-in-delhi"
    }
  ];

  // ─── 15. Pricing Section (Correction 1 - Dynamic CMS controlled) ────────────
  const pricingHeading = pricing.heading || `Hair transplant cost in ${cityName}`;
  const pricingDesc = pricing.description || "Transparent pricing calculated based on your graft requirement, technique choice, and surgeon involvement.";
  const pricingFactors = pricing.pricingFactors ?? [];
  const pricingWA = pricing.ctaTextWhatsApp?.link || heroWALink;
  const pricingWALabel = pricing.ctaTextWhatsApp?.text;
  const pricingTel = pricing.ctaTextCall?.link || heroTelLink;
  const pricingTelLabel = pricing.ctaTextCall?.text;

  // ─── 16. Visit Clinic ──────────────────────────────────────────────────────
  const visitHeading = visitClinic.heading || `Visiting Ryan Clinic in ${cityName}`;
  const visitDesc = visitClinic.description || "";
  const infoCards = visitClinic.informationCards ?? [];
  const visitBtnWA = visitClinic.buttonText?.link || heroWALink;
  const visitBtnLabel = visitClinic.buttonText?.text || "Book Clinic Visit";
  const nearbyLocs = visitClinic.nearbyLocations ?? [];

  const DEFAULT_VISIT_CARDS = [
    {
      title: "CLINIC HOURS",
      description: "Monday – Saturday: 10:00 AM – 07:00 PM",
      subtext: "Sunday: Prior Appointment Only",
      icon: <Clock className="w-5 h-5 text-[#e30a17]" />
    },
    {
      title: "CONSULTATION MODE",
      description: `In-Clinic (${cityName}) or Online Video Consult`,
      subtext: "Free Scalp & Graft Analysis Included",
      icon: <Calendar className="w-5 h-5 text-[#e30a17]" />
    },
    {
      title: "FACILITY STANDARDS",
      description: "NABH Sterile OT & HEPA Filtered Air",
      subtext: "100% Single-Use Disposable Instruments",
      icon: <ShieldCheck className="w-5 h-5 text-[#e30a17]" />
    }
  ];

  const VISIT_CARDS = infoCards.length > 0
    ? infoCards.map((c, i) => ({
        title: c.title || DEFAULT_VISIT_CARDS[i % 3].title,
        description: c.description || DEFAULT_VISIT_CARDS[i % 3].description,
        subtext: c.subtext || DEFAULT_VISIT_CARDS[i % 3].subtext,
        icon: DEFAULT_VISIT_CARDS[i % 3].icon
      }))
    : DEFAULT_VISIT_CARDS;

  // ─── 17. Consultation ──────────────────────────────────────────────────────
  const leftSide = consultation.leftSide ?? {};
  const consultHeading = leftSide.heading || `Book your hair transplant surgery consultation in ${cityName}`;
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

  // ─── 18. FAQ ───────────────────────────────────────────────────────────────
  const FAQS_RAW = (faqSection.faqs ?? []).map((f) => ({ q: f.question, a: f.answer }));
  const FAQS = FAQS_RAW;

  // ─── 19. Why Choose Ryan ───────────────────────────────────────────────────
  const whyChooseHeading = whyChooseUs.heading || `Why choose Ryan Clinic for hair transplant surgery in ${cityName}`;
  const whyChooseDesc = whyChooseUs.description || "What sets us apart is doctor-led precision, sterile OT discipline, and transparent per-graft planning.";
  const whyChoosePoints = (whyChooseUs.points?.length ? whyChooseUs.points : [
    { title: "Doctor-led at every stage", description: "Extraction, channel creation, and implantation are performed by a qualified doctor." },
    { title: "Sapphire FUE & THI with Choi Pen", description: "Both techniques matched to your case, not offered as a fixed single approach." },
    { title: "Sterile Operating Theatre", description: "Single-use instruments in a properly equipped, sterile OT." },
    { title: "Natural Hairline Design", description: "Soft, irregular, age-appropriate hairline design built for undetectable growth." }
  ]);

  const rawLinksList = internalLinks.links ?? [];
  const validLinks = rawLinksList.filter(
    (l) => (l?.label || l?.text || l?.title || "").trim().length > 0 && (l?.url || l?.href || "").trim().length > 0
  );

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Compact & Enhanced Image Container */}
            <div className="lg:col-span-5 relative self-center">
              <Reveal direction="left">
                <div className="relative w-full max-w-md mx-auto lg:max-w-none h-[380px] sm:h-[420px] md:h-[450px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-gray-900 group">
                  <Image
                    src="/uploads/1752667815707-fue-banner_ro9ae6.webp"
                    alt={`Sterile operating theatre at Ryan Clinic ${cityName}`}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Sterile OT Protocol
                    </span>
                  </div>

                  {/* Top Right Floating Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#D32F2F]" />
                      Sapphire Micro-Blade
                    </span>
                  </div>

                  {/* Bottom Content Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#D32F2F] flex items-center justify-center shrink-0 text-white shadow-sm">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-white">HEPA Clean Air Theatre</p>
                        <p className="text-[10.5px] text-gray-200 font-sans">Single-Use Instruments &amp; Surgical Hygiene</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/15 text-[10.5px] font-bold font-sans">
                      <div className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        <span>Same-Day Discharge</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        <span>Local Anaesthesia Only</span>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: Safety text & standards cards */}
            <div className="lg:col-span-7">
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
        </div>
      </section>

      {/* ── 4. Who Needs Hair Transplant Surgery? (Candidate Suitability) ── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left max-w-3xl mb-10">
            <SectionLabel text="Candidate Suitability" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4 mt-2 leading-tight">
              {suitabilityHeading}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {suitabilityDesc}
            </p>
          </div>

          {/* Top Row: 2 Comparison Cards (Left) + Doctor Team Image Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
            
            {/* LEFT 7 COLS: Suitable vs Not Suitable Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              
              {/* Card 1: Suitable Candidates */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-extrabold text-base sm:text-lg text-emerald-600">Suitable Candidates</span>
                  </div>

                  <ul className="space-y-3.5">
                    {suitableList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card 2: Not Suitable If... */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0">
                      <XCircle className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-extrabold text-base sm:text-lg text-[#D32F2F]">Not Suitable If...</span>
                  </div>

                  <ul className="space-y-3.5">
                    {notSuitableList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* RIGHT 5 COLS: Surgeon Team Image Card */}
            <div className="lg:col-span-5 relative self-stretch min-h-[380px]">
              <div className="relative w-full h-full min-h-[380px] rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-gray-900 group">
                <Image
                  src={introFloatImage || "/uploads/turkey-doctor.jpg"}
                  alt={`Hair transplant doctor evaluation at Ryan Clinic ${cityName}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Top Floating Red Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    <Stethoscope className="w-3.5 h-3.5" />
                    Free Scalp Analysis
                  </span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4.5 text-gray-900 shadow-xl border border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#D32F2F] mb-1">Candidacy First</p>
                  <p className="text-xs font-extrabold text-[#302658] leading-snug mb-2.5">
                    Our plastic surgeons evaluate your donor area density and hair loss pattern before recommending surgery.
                  </p>
                  <a
                    href={heroWALink}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D32F2F] hover:text-[#b71c1c] transition-colors"
                  >
                    <span>Book Scalp Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Card: Norwood Grade to Graft Count Table */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
            <h3 className="text-2xl font-bold text-[#302658] mb-3 font-outfit">
              How many grafts do you need? Norwood grade to graft count
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-sans">
              Below is an indicative graft guide based on the Norwood Hair Loss Scale. Exact graft estimates are confirmed during your in-clinic scalp analysis.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider bg-gray-50">
                    <th className="py-4 px-6">Norwood Stage</th>
                    <th className="py-4 px-6">Hair Loss Pattern</th>
                    <th className="py-4 px-6 bg-[#D32F2F] text-white font-extrabold tracking-wider rounded-tr-xl">
                      Indicative Graft Requirement
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  {norwoodTable.length > 0 ? norwoodTable.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="py-4 px-6 font-bold text-[#302658]">{row.stage}</td>
                      <td className="py-4 px-6 text-gray-600">{row.description}</td>
                      <td className={`py-4 px-6 font-black text-white bg-[#D32F2F] group-hover:bg-[#b71c1c] transition-colors ${
                        i === norwoodTable.length - 1 ? "rounded-br-xl" : ""
                      }`}>
                        {row.grafts}
                      </td>
                    </tr>
                  )) : [
                    ["Norwood Stage 2", "Slight hairline recession at temples", "1,000 – 1,500 Grafts"],
                    ["Norwood Stage 3", "Deep temporal recession and early crown thinning", "1,800 – 2,500 Grafts"],
                    ["Norwood Stage 4", "Significant frontal hairline loss + crown bald spot", "2,500 – 3,500 Grafts"],
                    ["Norwood Stage 5–6", "Extensive baldness with narrow donor bridge remaining", "3,800 – 4,500 Grafts"],
                  ].map(([stage, desc, grafts], i, arr) => (
                    <tr key={i} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="py-4 px-6 font-bold text-[#302658]">{stage}</td>
                      <td className="py-4 px-6 text-gray-600">{desc}</td>
                      <td className={`py-4 px-6 font-black text-white bg-[#D32F2F] group-hover:bg-[#b71c1c] transition-colors ${
                        i === arr.length - 1 ? "rounded-br-xl" : ""
                      }`}>
                        {grafts}
                      </td>
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

          {/* Header row: Heading left + feature pills right (aligned to center/lower) */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14 lg:pt-4">
            <div className="max-w-xl">
              <SectionLabel text="Surgical Techniques" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4 mt-2 leading-tight">{scienceHeading}</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">{scienceDesc}</p>
            </div>

            {/* Feature pills — right side (lowered alignment) */}
            <div className="flex flex-col sm:flex-row lg:flex-row gap-5 xl:gap-7 items-start sm:items-center">
              {[
                { icon: <ShieldCheck className="w-5 h-5" />, title: "Safe & Sterile", desc: "Advanced OT protocols and hygiene standards", color: "bg-red-50 text-[#D32F2F]" },
                { icon: <Stethoscope className="w-5 h-5" />, title: "Doctor-Led", desc: "Every step performed by experienced surgeons", color: "bg-red-50 text-[#D32F2F]" },
                { icon: <Zap className="w-5 h-5" />, title: "Minimally Invasive", desc: "Less discomfort, faster recovery, natural results", color: "bg-red-50 text-[#D32F2F]" },
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${feat.color} flex items-center justify-center shrink-0 shadow-xs`}>
                    {feat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#302658]">{feat.title}</p>
                    <p className="text-xs text-gray-500 leading-snug">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technique Cards with increased image height and hover animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: <Scissors className="w-6 h-6" />,
                iconBg: "bg-indigo-100 text-indigo-600",
                tag: "FUE",
                subtitle: "(Follicular Unit Extraction)",
                description: "Standard micro-punch extraction technique where follicular units are harvested individually from the donor zone. Leaves no linear scar and allows rapid recovery.",
                image: SCIENCE_ROWS[0]?.cardImage?.image || "/uploads/turkey-doctor.jpg",
                imageAlt: SCIENCE_ROWS[0]?.cardImage?.imageAlt || "FUE Hair Transplant",
                bullets: SCIENCE_ROWS[0]?.bulletPoints?.length > 0 ? SCIENCE_ROWS[0].bulletPoints : ["No linear scar", "Minimal discomfort", "Fast recovery"],
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                iconBg: "bg-purple-100 text-purple-600",
                tag: "Sapphire FUE",
                subtitle: "",
                description: "Uses micro-gemstone sapphire blades to open recipient channels. Gem-grade sharpness reduces tissue resistance, minimizes scabbing, and enables high-density graft packing.",
                image: SCIENCE_ROWS[1]?.cardImage?.image || "/uploads/1752667815707-fue-banner_ro9ae6.webp",
                imageAlt: SCIENCE_ROWS[1]?.cardImage?.imageAlt || "Sapphire FUE",
                bullets: SCIENCE_ROWS[1]?.bulletPoints?.length > 0 ? SCIENCE_ROWS[1].bulletPoints : ["Precise channel creation", "Less scabbing & trauma", "Higher density possible"],
              },
              {
                icon: <Syringe className="w-6 h-6" />,
                iconBg: "bg-emerald-100 text-emerald-600",
                tag: "THI",
                subtitle: "(Turkey Hair Implantation)",
                description: "Direct hair implantation using Choi implanter pens. Creates micro-incisions and places grafts in a single stroke, giving exact control over angle, depth, and direction.",
                image: SCIENCE_ROWS[2]?.cardImage?.image || "/uploads/1752731223556-FUE 1.jpg",
                imageAlt: SCIENCE_ROWS[2]?.cardImage?.imageAlt || "THI Choi Implanter",
                bullets: SCIENCE_ROWS[2]?.bulletPoints?.length > 0 ? SCIENCE_ROWS[2].bulletPoints : ["High precision & control", "Natural angle & direction", "Excellent for hairline details"],
              },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                {/* Card Header */}
                <div className="p-6 pb-4 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#302658] leading-tight">{card.tag}</h3>
                      {card.subtitle && <p className="text-xs text-gray-400 font-medium">{card.subtitle}</p>}
                    </div>
                  </div>
                  {/* Red accent underline with hover expansion */}
                  <div className="w-10 group-hover:w-16 h-0.5 bg-[#D32F2F] rounded-full mb-4 transition-all duration-300" />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{card.description}</p>

                  {/* Technique illustration (increased height h-44 sm:h-48 with zoom animation) */}
                  <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-gray-50 mb-5 border border-gray-100 shadow-xs">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent group-hover:from-black/30 transition-colors" />
                  </div>
                </div>

                {/* Bullet Checklist Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 space-y-2">
                  {card.bullets.map((b, bi) => (
                    <div key={bi} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D32F2F] shrink-0" />
                      <span className="text-xs text-gray-700 font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technique Comparison bottom card */}
          <div className="bg-[#FAF6F3] rounded-3xl border border-gray-200/80 p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            {/* Left icon block */}
            <div className="flex items-center gap-4 md:flex-col md:items-start md:min-w-[180px]">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#302658] leading-snug">
                  FUE vs Sapphire FUE vs THI:<br />
                  <span className="text-base font-bold text-[#D32F2F]">which technique is right for you?</span>
                </h3>
                <div className="w-10 h-0.5 bg-[#D32F2F] rounded-full mt-2" />
              </div>
            </div>

            {/* Right text block */}
            <div className="flex-1">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                Choosing between FUE, Sapphire FUE, and THI depends on your hair loss stage, donor density, and target hairline shape. Basic FUE is versatile for large coverage, Sapphire FUE provides delicate channel creation with fast healing, and THI Choi pens excel at dense hairline packing without shaving native hair.
              </p>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 inline-flex w-full sm:w-auto">
                <CheckCircle2 className="w-4 h-4 text-[#D32F2F] shrink-0" />
                <span className="text-sm text-gray-700 font-semibold">Your surgeon will recommend the optimal technique during your consultation.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. Before Your Hair Transplant Surgery ─────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <SectionLabel text="Pre-Op Instructions" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-3 mt-2 leading-tight">{beforeHeading}</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">{beforeDesc}</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-xs self-start shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse shrink-0" />
              <span className="text-[11px] font-extrabold text-[#302658] uppercase tracking-wider whitespace-nowrap">
                {beforeItems.length} mandatory steps
              </span>
            </div>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { icon: <Stethoscope className="w-5 h-5" />, accent: "bg-indigo-50 text-indigo-600 border-indigo-100" },
              { icon: <Scissors   className="w-5 h-5" />, accent: "bg-purple-50 text-purple-600 border-purple-100" },
              { icon: <ShieldCheck className="w-5 h-5" />, accent: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { icon: <Sparkles   className="w-5 h-5" />, accent: "bg-amber-50 text-amber-600 border-amber-100" },
            ].slice(0, beforeItems.length).map((meta, i) => {
              const step = beforeItems[i];
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col gap-4"
                >
                  {/* Top row: icon + step number */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${meta.accent} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                      {meta.icon}
                    </div>
                    <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
                      {step.stepNumber ? `0${Number(step.stepNumber)}` : `0${i + 1}`}
                    </span>
                  </div>

                  {/* Timing badge */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#D32F2F] bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg uppercase tracking-wider self-start">
                    <Clock className="w-3 h-3" />
                    {step.badge || `Step ${i + 1}`}
                  </span>

                  {/* Title + red bar */}
                  <div>
                    <h4 className="font-extrabold text-base text-[#302658] leading-snug mb-2">{step.title}</h4>
                    <div className="w-8 h-0.5 bg-[#D32F2F] rounded-full group-hover:w-14 transition-all duration-300" />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{step.description}</p>

                  {/* Footer */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-[11px] text-gray-400 font-semibold">Required before surgery</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Important Notice Banner */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-[#302658] mb-0.5">Important Notice</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Not following pre-operative instructions may result in your procedure being postponed. Our team will call you 48 hours before to confirm readiness.
              </p>
            </div>
            <a
              href={heroWALink}
              className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-[#b71c1c] text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-colors"
            >
              Ask a Question
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* ── 7. During the Hair Transplant Surgery: Step by Step ────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionLabel text="Day of Surgery" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4 mt-2 leading-tight">
              {timelineHeading}
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {timelineDesc}
            </p>
          </div>

          {/* Vertical Timeline Wrapper */}
          <div className="relative max-w-5xl mx-auto">
            {/* Central Vertical Red Line (Desktop) */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-[#D32F2F] z-0" />

            <div className="space-y-12 lg:space-y-16">
              {STEPS.map((step, i) => {
                const isEven = i % 2 === 0;
                const timeParts = step.num.split(" ");
                const timeVal = timeParts[0] || step.num;
                const timeAmPm = timeParts[1] || "";

                return (
                  <div key={i} className="relative z-10">
                    {/* Time Circle Node (Desktop Center) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2 border-[#D32F2F] bg-white shadow-md flex-col items-center justify-center text-[#D32F2F] leading-tight">
                      <span className="text-[10px] font-black">{timeVal}</span>
                      {timeAmPm && <span className="text-[8px] font-extrabold uppercase">{timeAmPm}</span>}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                      
                      {/* LEFT COLUMN */}
                      {isEven ? (
                        /* Even Step Left: Image Card */
                        <div className="relative w-full h-64 sm:h-72 rounded-[28px] overflow-hidden shadow-lg border-4 border-white bg-gray-900 group">
                          <Image
                            src={step.image}
                            alt={step.alt || step.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 45vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 z-10">
                            <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                              {step.tag}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Odd Step Left: Content Card */
                        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0">
                              <Syringe className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                              STEP {step.num}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-[#302658] mb-3">{step.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                        </div>
                      )}

                      {/* RIGHT COLUMN */}
                      {isEven ? (
                        /* Even Step Right: Content Card */
                        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0">
                              <Syringe className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                              STEP {step.num}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-[#302658] mb-3">{step.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                        </div>
                      ) : (
                        /* Odd Step Right: Image Card */
                        <div className="relative w-full h-64 sm:h-72 rounded-[28px] overflow-hidden shadow-lg border-4 border-white bg-gray-900 group">
                          <Image
                            src={step.image}
                            alt={step.alt || step.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 45vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 z-10">
                            <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                              {step.tag}
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── 8. Recovery Timeline & Results ─────────────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-left max-w-3xl mb-16">
            <SectionLabel text="Post-Op Care" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-3 mt-2 leading-tight">
              {recoveryHeading}
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {recoveryDesc}
            </p>
          </div>

          {/* Required H3 heading immediately above recovery cards */}
          <h3 className="text-2xl font-bold text-[#302658] mb-8 font-outfit">
            Results at 6, 12 and 24 months
          </h3>

          {/* Timeline Cards Row with Curved Dashed Red Line */}
          <div className="relative pt-6">
            {/* Dashed Red Wave/Curve Line (Desktop) */}
            <div className="hidden lg:block absolute top-[56px] left-[10%] right-[10%] h-12 border-b-4 border-dashed border-[#D32F2F] rounded-[50%] z-0 opacity-80" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
              {RECOVERY_CARDS.map((card, i) => (
                <div key={i} className="flex flex-col items-center group">
                  
                  {/* Floating Number Circle Node */}
                  <div className="relative mb-6">
                    {/* Outer circle with dual red ring */}
                    <div className="w-20 h-20 rounded-full bg-white ring-4 ring-[#D32F2F] border-4 border-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-black text-[#D32F2F]">{card.num}</span>
                    </div>
                    {/* Sub-badge pill overlapping bottom of circle */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#D32F2F] text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md z-20">
                      {card.num}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="w-full bg-white rounded-[32px] border border-gray-200/80 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between flex-1 overflow-hidden">
                    <div>
                      {/* Phase Title */}
                      <p className="text-xl font-extrabold text-[#302658] mb-4 text-center group-hover:text-[#D32F2F] transition-colors">
                        {card.title}
                      </p>

                      {/* Phase Result Image */}
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-900 border border-gray-100 mb-5 shadow-xs">
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          fill
                          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/30 transition-colors" />
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-[#302658] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                            <Sparkles className="w-3 h-3 text-[#D32F2F]" />
                            {card.title} Milestone
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed text-center font-sans">
                        {card.desc}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-bold text-gray-500">Verified Growth Stage</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 9. Surgical Risks ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Risk Management" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4 mt-2 leading-tight">{risksHeading}</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {risksDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: Common Minor Risks */}
            <div className="bg-[#FAF6F3] p-7 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/60">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0 shadow-xs">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg sm:text-xl text-[#302658]">Common Minor Risks</h4>
                    <p className="text-xs text-gray-500 font-medium">Temporary &amp; Self-Limiting</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {risksList.map((r, i) => (
                    <div key={i} className="p-4.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="font-extrabold text-sm sm:text-base text-[#302658] group-hover:text-[#D32F2F] transition-colors">{r.riskTitle}</h5>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#D32F2F] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100 shrink-0">
                          {r.severity || "Temporary"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{r.riskDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: How Ryan Clinic Minimises Them */}
            <div className="bg-[#FAF6F3] p-7 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/60">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg sm:text-xl text-emerald-950">How Ryan Clinic Minimises Them</h4>
                    <p className="text-xs text-emerald-700 font-medium">Medical Protocols &amp; Safety Standards</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {preventionList.map((p, i) => (
                    <div key={i} className="p-4.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow group flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <h5 className="font-extrabold text-sm sm:text-base text-emerald-900 group-hover:text-emerald-950 transition-colors">{p.title}</h5>
                      </div>
                      {p.description && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans pl-6">{p.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Hair Transplant Cost ────────────────────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row with Badges */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <SectionLabel text="Pricing & Value" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302658] mb-4 font-outfit leading-tight">
                {pricingHeading}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-sans">
                {pricingDesc}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded-full shadow-xs">
                <CreditCard className="w-4 h-4 text-[#e30a17]" />
                <span>0% Interest EMI Available</span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 border border-red-200/80 text-[#e30a17] text-xs font-semibold px-4 py-2 rounded-full shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#e30a17]" />
                <span>No Hidden Charges</span>
              </div>
            </div>
          </div>

          {/* Premium Pricing Table Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden mb-10 transition-all hover:shadow-xl">
            <div className="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#302658] font-outfit flex items-center gap-3">
                  <span className="p-2 bg-red-50 border border-red-100 text-[#e30a17] rounded-xl shadow-xs">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  Indicative pricing by session size
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-sans">
                  Tailored graft ranges according to Norwood scale classification & donor availability
                </p>
              </div>
              <a
                href={pricingWA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e30a17] hover:bg-[#c20814] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm shrink-0 self-start sm:self-auto hover:shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{pricingWALabel || "Get Instant Graft Quote"}</span>
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="bg-[#302658] text-white text-xs uppercase tracking-wider font-bold">
                    <th className="py-4 px-6">Session Type</th>
                    <th className="py-4 px-6">Indicative Grafts</th>
                    <th className="py-4 px-6">Typical Norwood Grade</th>
                    <th className="py-4 px-6 text-right sm:text-left">Pricing Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {/* Row 1 */}
                  <tr className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-5 px-6 font-bold text-[#302658]">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs group-hover:bg-[#e30a17] group-hover:text-white group-hover:border-[#e30a17] transition-all shrink-0">
                          <Zap className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="block text-base text-[#302658] font-bold">Standard Session</span>
                          <span className="text-[11px] text-gray-400 font-normal">Minor hairline touch-up</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-[#302658] font-bold text-xs rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-[#e30a17]" />
                        1,000 – 1,500 Grafts
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-700 font-medium">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200/60">
                        Norwood 2 – 3
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right sm:text-left">
                      <a
                        href={pricingWA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] bg-red-50 hover:bg-[#e30a17] hover:text-white px-3.5 py-1.5 rounded-lg border border-red-100 transition-all"
                      >
                        <span>Custom Scalp Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-5 px-6 font-bold text-[#302658]">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs group-hover:bg-[#e30a17] group-hover:text-white group-hover:border-[#e30a17] transition-all shrink-0">
                          <Users className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="block text-base text-[#302658] font-bold">Medium Session</span>
                          <span className="text-[11px] text-gray-400 font-normal">Frontal zone density</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-[#302658] font-bold text-xs rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-[#e30a17]" />
                        1,500 – 2,500 Grafts
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-700 font-medium">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200/60">
                        Norwood 3 – 4
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right sm:text-left">
                      <a
                        href={pricingWA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] bg-red-50 hover:bg-[#e30a17] hover:text-white px-3.5 py-1.5 rounded-lg border border-red-100 transition-all"
                      >
                        <span>Custom Scalp Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-5 px-6 font-bold text-[#302658]">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs group-hover:bg-[#e30a17] group-hover:text-white group-hover:border-[#e30a17] transition-all shrink-0">
                          <Award className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="block text-base text-[#302658] font-bold">Large Session</span>
                          <span className="text-[11px] text-gray-400 font-normal">Frontal + Mid-scalp coverage</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-[#302658] font-bold text-xs rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-[#e30a17]" />
                        2,500 – 3,500 Grafts
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-700 font-medium">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200/60">
                        Norwood 4 – 5
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right sm:text-left">
                      <a
                        href={pricingWA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] bg-red-50 hover:bg-[#e30a17] hover:text-white px-3.5 py-1.5 rounded-lg border border-red-100 transition-all"
                      >
                        <span>Custom Scalp Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-5 px-6 font-bold text-[#302658]">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs group-hover:bg-[#e30a17] group-hover:text-white group-hover:border-[#e30a17] transition-all shrink-0">
                          <Activity className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="block text-base text-[#302658] font-bold">Mega Session</span>
                          <span className="text-[11px] text-gray-400 font-normal">Full scalp reconstruction</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-[#302658] font-bold text-xs rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-[#e30a17]" />
                        3,500+ Grafts
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-700 font-medium">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200/60">
                        Norwood 5 – 7
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right sm:text-left">
                      <a
                        href={pricingWA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] bg-red-50 hover:bg-[#e30a17] hover:text-white px-3.5 py-1.5 rounded-lg border border-red-100 transition-all"
                      >
                        <span>Custom Scalp Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2-Column Grid: What Changes Price + 2000 vs 3000 Grafts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Card 1: What actually changes your price */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#e30a17] shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#302658] font-outfit">
                      What actually changes your price
                    </h3>
                    <p className="text-xs text-gray-500 font-sans">Transparent cost drivers for your surgery</p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-700 font-sans">
                  {pricingFactors.length > 0 ? pricingFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100/60 transition-colors">
                      <Check className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </li>
                  )) : (
                    [
                      "Graft count: Determined by Norwood grade and donor density confirmed at scalp analysis.",
                      "Technique: Sapphire FUE and THI Choi Implanter use imported single-use blades and tools.",
                      "Surgeon involvement: Doctor-led surgical procedures performed by registered plastic surgeons.",
                      "Donor area used: Scalp vs beard or body donor hair extraction.",
                      "Staged sessions: Multi-stage planning for extensive hair loss cases."
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100/60 transition-colors">
                        <Check className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5 font-bold" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {/* Card 2: 2,000 vs 3,000 grafts comparison */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#e30a17] shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#302658] font-outfit">
                      Hair transplant cost in {cityName}: 2,000 vs 3,000 grafts
                    </h3>
                    <p className="text-xs text-gray-500 font-sans">Coverage area & density comparison</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                    <span className="inline-block px-2.5 py-1 bg-[#302658] text-white text-[11px] font-bold rounded-lg mb-2">
                      2,000 GRAFTS
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      Restores a receding hairline & frontal zone (Norwood 3–4). Ideal for early to moderate recession.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-50/40 border border-red-200/80">
                    <span className="inline-block px-2.5 py-1 bg-[#e30a17] text-white text-[11px] font-bold rounded-lg mb-2">
                      3,000 GRAFTS
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      Covers frontal hairline + thinning crown (Norwood 4–5). Complete front-to-vertex restoration.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                  Because session duration and instrument requirements increase with graft count, pricing is tailored to your scalp audit. Read our <a href={`/cost/hair-transplant-cost-in-${cityName.toLowerCase()}`} className="text-[#e30a17] underline font-semibold hover:text-[#c20814]">full {cityName} cost breakdown by graft count</a> for detailed intent.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Need an exact graft audit?</span>
                <a
                  href={pricingWA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] hover:underline"
                >
                  <span>Book Free Scalp Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 11. Destination Comparison (City vs Turkey) ────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mb-12">
            <SectionLabel text="Destination Comparison" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-3 font-outfit">
              {turkeyHeading}
            </h2>
            {turkeyDesc && <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">{turkeyDesc}</p>}
          </div>

          <div className="overflow-x-auto bg-[#FAF6F3] rounded-3xl border border-gray-200/80 p-6 sm:p-8">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
              <thead>
                <tr className="border-b border-gray-200 text-[#302658] font-extrabold uppercase text-[11px] tracking-wider bg-white">
                  <th className="py-4 px-6">Comparison Factor</th>
                  <th className="py-4 px-6 text-[#e30a17]">{cityName} Plastic Surgery Clinic</th>
                  <th className="py-4 px-6 text-gray-600">Turkey Medical Tourism Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60">
                {turkeyPoints.map((pt, i) => (
                  <tr key={i} className="hover:bg-white/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#302658]">{pt.factor}</td>
                    <td className="py-4 px-6 font-semibold text-emerald-800 bg-emerald-50/40">{pt.cityDetails}</td>
                    <td className="py-4 px-6 text-gray-600">{pt.turkeyDetails}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 12. Patient Results ─────────────────────────────────────────────────── */}
      {RESULT_CASES.length > 0 && (
        <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-4xl mb-12">
              <SectionLabel text="Patient Results" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-3 font-outfit">
                {resultsHeading}
              </h2>
              {resultsDesc && <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">{resultsDesc}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {RESULT_CASES.map((c, i) => {
              const bImg = typeof c.beforeImage === "string" ? c.beforeImage : c.beforeImage?.image;
              const aImg = typeof c.afterImage === "string" ? c.afterImage : c.afterImage?.image;
              const bAlt = c.beforeImage?.imageAlt || `Hair transplant before result, ${c.technique || "FUE"}`;
              const aAlt = c.afterImage?.imageAlt || `Hair transplant after result, ${c.technique || "FUE"}`;

              return (
                <div key={i} className="group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Before & After Image Pair */}
                    <div className="grid grid-cols-2 h-[340px] relative divide-x divide-white/20 bg-gray-900 overflow-hidden">
                      <div className="relative h-full w-full overflow-hidden">
                        <Image src={bImg} alt={bAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                        <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider backdrop-blur-xs">BEFORE</span>
                      </div>
                      <div className="relative h-full w-full overflow-hidden">
                        <Image src={aImg} alt={aAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                        <span className="absolute top-3 right-3 bg-[#e30a17] text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">AFTER</span>
                      </div>
                    </div>

                    {/* Card Content & Details */}
                    <div className="p-6 bg-white border-t border-gray-100">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {c.technique && (
                          <span className="px-3 py-1 bg-red-50 text-[#e30a17] text-xs font-extrabold rounded-full border border-red-100">
                            {c.technique}
                          </span>
                        )}
                        {c.graftCount && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full border border-gray-200">
                            {c.graftCount}
                          </span>
                        )}
                        {c.recoveryTime && (
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                            {c.recoveryTime}
                          </span>
                        )}
                      </div>

                      {c.description && (
                        <p className="text-sm text-gray-600 leading-relaxed font-sans mt-2">
                          {c.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Verified Ryan Clinic Result
                    </span>
                    <a
                      href={pricingWA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#e30a17] hover:underline flex items-center gap-1"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
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
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-2 font-outfit">
                {doctorsHeading}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
                {doctorsDesc}
              </p>
            </div>
            <a
              href="/doctors"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shrink-0 self-start sm:self-auto"
            >
              <span>{doctorsTopBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Doctor Detailed Card Matching Screenshot 3 */}
          {DOCTORS.map((doc, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10 mb-8 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                
                {/* Left Content Column */}
                <div className="lg:col-span-7 flex flex-col justify-between text-left">
                  <div>
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block bg-red-50 text-[#e30a17] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-red-100">
                        ★ SENIOR PLASTIC SURGEON
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-200">
                        {doc.location}
                      </span>
                    </div>

                    {/* Doctor Name & Role */}
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-[#302658] font-outfit mb-1">
                      {doc.name}
                    </h3>
                    <p className="text-sm font-bold text-[#e30a17] font-sans mb-4">
                      {doc.role}
                    </p>

                    {/* Doctor Bio */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mb-6">
                      {doc.bio}
                    </p>

                    {/* 4 Stat Boxes Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-red-50/70 border border-red-100 text-center">
                        <span className="block text-lg font-black text-[#e30a17] font-sans leading-none mb-1">
                          {doc.exp}
                        </span>
                        <span className="text-[10px] font-bold text-red-800 uppercase tracking-tight font-sans">
                          Surgical Experience
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
                        <span className="block text-lg font-black text-[#302658] font-sans leading-none mb-1">
                          {doc.procedures}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight font-sans">
                          PROCEDURES
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
                        <span className="block text-lg font-black text-emerald-600 font-sans leading-none mb-1">
                          {doc.survivalRate}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight font-sans">
                          GRAFT SURVIVAL
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
                        <span className="block text-lg font-black text-amber-500 font-sans leading-none mb-1">
                          {doc.rating}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight font-sans">
                          PATIENT RATING
                        </span>
                      </div>
                    </div>

                    {/* Qualifications Checkmarks List */}
                    <div className="space-y-2.5 mb-6">
                      {doc.quals.map((q, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-700 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" />
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
                    <a
                      href={pricingWA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#e30a17] hover:bg-[#c20814] text-white text-xs font-extrabold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
                    >
                      <span>BOOK DOCTOR CONSULT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`/doctors/${doc.slug}`}
                      className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold px-5 py-3 rounded-full transition-all"
                    >
                      <span>View Profile Details</span>
                    </a>
                  </div>
                </div>

                {/* Right Doctor Image Column */}
                <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-md border border-gray-200 group">
                  <Image
                    src={doc.image}
                    alt={doc.imageAlt || doc.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Floating Badges Top */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="bg-black/70 text-white text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{doc.location}</span>
                    </span>
                    <span className="bg-[#e30a17] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-white" />
                      <span>TURKEY CERTIFIED</span>
                    </span>
                  </div>

                  {/* Bottom Gradient Overlay Banner */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white text-left">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 mb-0.5 font-sans">
                      {doc.role.toUpperCase()}
                    </p>
                    <p className="text-xl font-black text-white font-outfit">
                      {doc.name}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
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

      {/* ── 15. Why Choose Ryan Clinic (Doctor-Led vs Technician Protection) ── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-[#e30a17]" />
                <span className="text-[#e30a17] text-xs font-bold uppercase tracking-widest font-sans">
                  PROTECT YOURSELF
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302658] mb-3 font-outfit">
                Why choose Ryan Clinic for hair transplant surgery in {cityName}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
                We are committed to surgical perfection, safety, and natural hair density.
              </p>
            </div>

            {/* Top Right Warning Box */}
            <div className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200/80 rounded-2xl px-4 py-3 shrink-0 self-start lg:self-auto">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-semibold text-amber-900 font-sans">
                Always verify before you book
              </span>
            </div>
          </div>

          {/* 2-Column Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-12">
            
            {/* Left: Numbered Checklist Cards (6 Columns) */}
            <div className="lg:col-span-6 space-y-3.5">
              {whyChoosePoints.map((item, idx) => {
                const num = String(idx + 1).padStart(2, "0");
                const isWarn = idx % 2 === 1;
                return (
                  <div
                    key={num}
                    className={`flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md ${
                      isWarn ? "border-amber-200/80 bg-amber-50/10" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isWarn
                          ? "bg-amber-50 text-amber-600 border border-amber-200/60"
                          : "bg-red-50 text-[#e30a17] border border-red-100"
                      }`}
                    >
                      {isWarn ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span
                        className={`text-xs font-black tracking-wider shrink-0 ${
                          isWarn ? "text-amber-600" : "text-[#e30a17]"
                        }`}
                      >
                        {num}
                      </span>
                      <p className="font-bold text-xs sm:text-sm text-gray-900 leading-snug font-sans">
                        {item.title || item.name || item.text || ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>


            {/* Right: Doctor-Led vs Technician Comparison Table (6 Columns) */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                
                {/* Column Headers */}
                <div className="grid grid-cols-3 border-b border-gray-200 text-xs font-bold uppercase tracking-wider font-sans">
                  <div className="px-4 py-4 bg-gray-50 flex items-center text-gray-500">
                    <span>ASPECT</span>
                  </div>

                  {/* Doctor-Led Column Header */}
                  <div className="px-4 py-4 border-l border-red-100 bg-red-50/30 relative">
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#e30a17]" />
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e30a17]" />
                      <span className="font-extrabold text-[#e30a17]">DOCTOR-LED</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-normal normal-case">Ryan Clinic</span>
                  </div>

                  {/* Technician Column Header */}
                  <div className="px-4 py-4 border-l border-amber-200/60 bg-amber-50/40">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <XCircle className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-extrabold text-amber-800">TECHNICIAN</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-normal normal-case">Common elsewhere</span>
                  </div>
                </div>

                {/* Table Rows */}
                {[
                  {
                    aspect: "Who operates",
                    doc: "Certified doctor at every step",
                    tech: "Technician performs extraction + implant"
                  },
                  {
                    aspect: "Graft survival",
                    doc: "90%+ (Ryan Clinic standard)",
                    tech: "Often 50–70% — rushed, less precise"
                  },
                  {
                    aspect: "Naturalness",
                    doc: "Precise angle, depth & direction",
                    tech: "Variable — uneven, patchy results"
                  },
                  {
                    aspect: "Safety",
                    doc: "Sterile OT, single-use instruments",
                    tech: "Risk of infection, poor hygiene"
                  },
                  {
                    aspect: "Accountability",
                    doc: "Licensed, registered, legally liable",
                    tech: "No medical accountability"
                  },
                  {
                    aspect: "Price signal",
                    doc: "₹40–₹120 per graft (transparent)",
                    tech: "₹15–25 per graft (corner-cutting)"
                  }
                ].map((row, idx) => (
                  <div
                    key={row.aspect}
                    className={`grid grid-cols-3 text-xs sm:text-sm font-sans ${
                      idx !== 0 ? "border-t border-gray-100" : ""
                    }`}
                  >
                    <div className="px-4 py-3.5 bg-gray-50/50 font-semibold text-gray-800 flex items-center">
                      {row.aspect}
                    </div>
                    <div className="px-4 py-3.5 border-l border-red-100 bg-red-50/10 font-bold text-[#e30a17] leading-snug">
                      {row.doc}
                    </div>
                    <div className="px-4 py-3.5 border-l border-amber-100 bg-amber-50/20 text-amber-900 leading-snug font-medium">
                      {row.tech}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtext Link below table */}
              <p className="text-xs text-gray-500 mt-4 text-center font-sans">
                At Ryan Clinic, every procedure is 100% doctor-led.{" "}
                <a
                  href={pricingWA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#e30a17] underline hover:text-[#c20814]"
                >
                  Ask us to verify →
                </a>
              </p>
            </div>
          </div>

          {/* Bottom Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={pricingWA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#e30a17] hover:bg-[#c20814] text-white text-sm font-extrabold px-8 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Book at a Doctor-Led Clinic →</span>
            </a>
            <a
              href="/blog/doctor-led-vs-technician-hair-transplant"
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold px-7 py-4 rounded-2xl transition-all border border-gray-200"
            >
              <span>Doctor vs Technician Guide →</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── 16. Visiting Ryan Clinic ───────────────────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row with Badges */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <SectionLabel text="Clinic Location" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302658] mb-3 font-outfit">
                {visitHeading}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans">
                {visitDesc || `Located in the heart of ${cityName} with state-of-the-art surgical suites & private consultation rooms.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded-full shadow-xs">
                <MapPin className="w-4 h-4 text-[#e30a17]" />
                <span>{cityName} Healthcare District</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold px-4 py-2 rounded-full shadow-xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>4.9 Rating (500+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* 3-Column Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {VISIT_CARDS.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5 group-hover:bg-[#e30a17] group-hover:text-white transition-colors">
                    {card.icon}
                  </div>
                  <p className="text-[10px] font-extrabold text-[#e30a17] uppercase tracking-widest mb-1.5 font-sans">
                    {card.title}
                  </p>
                  <h3 className="text-lg font-bold text-[#302658] font-outfit mb-2 leading-snug">
                    {card.description}
                  </h3>
                </div>
                {card.subtext && (
                  <p className="text-xs text-gray-500 font-sans pt-4 border-t border-gray-100 mt-4 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{card.subtext}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Location Action Banner / Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Location & Address details */}
            <div className="flex items-start gap-4 text-left max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#302658] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#302658] font-outfit mb-1">
                  Ryan Clinic {cityName} Centre
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mb-2">
                  Prime location in {cityName} with dedicated valet parking and direct access for post-surgery recovery transport.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#e30a17]" />
                    +91 99111 11247
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    WhatsApp Support Active
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 justify-center lg:justify-end">
              <a
                href={`https://maps.google.com/?q=Ryan+Clinic+${encodeURIComponent(cityName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e30a17] hover:bg-[#c20814] text-white text-xs font-extrabold px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={heroTelLink}
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold px-6 py-3.5 rounded-full transition-all w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4 text-[#302658]" />
                <span>Call Clinic Desk</span>
              </a>
            </div>

          </div>

          {/* Nearby Locations Tags */}
          {nearbyLocs.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              <span className="text-xs font-bold text-gray-500 font-sans">Serving nearby areas:</span>
              {nearbyLocs.map((loc, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-full shadow-xs">
                  {loc}
                </span>
              ))}
            </div>
          )}

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
                <p className="text-2xl font-black text-gray-900 mb-6 font-outfit">{formTitle}</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 18. Frequently Asked Questions ─────────────────────────────────── */}
      <FAQSection faqs={FAQS} heading={faqSection.heading || `Frequently asked questions about hair transplant surgery in ${cityName}`} />

      {/* ── Dynamic Internal Links (Rendered ONLY if valid links exist) ────── */}
      {validLinks.length > 0 && (
        <section className="bg-[#FAF6F3] py-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="text-xs font-bold text-[#302658] uppercase tracking-widest mb-3">Explore Related Resources</h4>
            <div className="flex flex-wrap gap-2.5">
              {validLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url || link.href}
                  className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#302658] hover:text-[#e30a17] hover:border-red-200 transition-all shadow-xs"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-[#e30a17]" />
                  <span>{link.label || link.text || link.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Medical & Pricing Disclaimer Matching Image 2 ──────────────────── */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans max-w-5xl">
            <strong className="text-gray-700 font-bold">Medical &amp; pricing disclaimer:</strong> All costs listed on this page represent standard market and clinic ranges for general guidance. Exact pricing is determined after an individual scalp assessment by a qualified doctor. Results vary by patient.
          </p>
        </div>
      </div>
    </>
  );
}
