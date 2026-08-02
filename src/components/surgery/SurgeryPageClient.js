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
  Microscope,
  CreditCard,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Star,
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
  Trophy,
  BadgeCheck,
  Building2,
  Sparkles,
  Heart,
  FlaskConical,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20consultation%20for%20hair%20transplant%20surgery";
const TEL = "tel:+919911111247";

const TECHNIQUE_ICONS = [
  <Scissors key="t0" className="w-5 h-5" />,
  <Zap key="t1" className="w-5 h-5" />,
  <Award key="t2" className="w-5 h-5" />,
];

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

const PRICING_STAT_ICONS = [
  <Scissors key="p0" className="w-6 h-6 text-[#e30a17]" />,
  <CreditCard key="p1" className="w-6 h-6 text-amber-400" />,
  <Zap key="p2" className="w-6 h-6 text-[#e30a17]" />,
  <ShieldCheck key="p3" className="w-6 h-6 text-blue-400" />,
];

const DEFAULT_COST_ITEMS = [
  { id: "01", title: "Up to 1,000 Grafts", price: "Rs. 40,000/-", oldPrice: "from Rs. 30,000/-", duration: "4–5 hrs" },
  { id: "02", title: "1,000 – 1,500 Grafts", price: "Rs. 52,500/-", oldPrice: "from Rs. 40,000/-", duration: "5 hrs" },
  { id: "03", title: "1,500 – 2,000 Grafts", price: "Rs. 70,000/-", oldPrice: "from Rs. 55,000/-", duration: "6 hrs" },
  { id: "04", title: "2,000 – 2,500 Grafts", price: "Rs. 87,500/-", oldPrice: "from Rs. 73,000/-", duration: "7 hrs" },
  { id: "05", title: "2,500 – 3,000 Grafts", price: "Rs. 1,05,000/-", oldPrice: "from Rs. 90,000/-", duration: "8 hrs" },
  { id: "06", title: "3,000 – 3,500 Grafts", price: "Rs. 1,15,000/-", oldPrice: "from Rs. 95,000/-", duration: "9 hrs" },
  { id: "07", title: "3,500 – 4,000 Grafts", price: "Rs. 1,45,000/-", oldPrice: "from Rs. 1,25,000/-", duration: "9–10 hrs" },
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
  if (iconName.length <= 4) {
    return <span className="text-lg font-normal">{iconName}</span>;
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
  const trackCTA = useTrackCTA();
  const [activeDocIdx, setActiveDocIdx] = useState(0);

  // ─── Section extraction ───────────────────────────────────────────────────
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

  // ─── Hero ─────────────────────────────────────────────────────────────────
  const heroTitle = hero.title || data?.pageName || "Hair Transplant Surgery";
  const heroDesc = hero.description || "";
  const heroBreadcrumb = hero.breadcrumb || `HOME > HAIR TRANSPLANT SURGERY > ${data?.pageName?.toUpperCase().includes("DELHI") ? "DELHI" : (data?.pageName || "SURGERY")}`;
  const heroBgImage = hero.heroImage?.image || "/uploads/1752667815707-fue-banner_ro9ae6.webp";
  const heroWALink = hero.whatsappText?.link || WA;
  const heroTelLink = hero.callText?.link || TEL;
  const heroStats = hero.stats ?? [];

  // ─── Introduction ─────────────────────────────────────────────────────────
  const introSmallHeading = introduction.smallHeading || "About Hair Transplant Surgery";
  const introTitle = introduction.title || "What is Hair Transplant Surgery?";
  const introDescription = introduction.description || "";
  const introHighlightBox = introduction.highlightBoxText || "";
  const introHonestPoints = introduction.honestPoints ?? [];
  const introMainImage = introduction.mainImage?.image || "/uploads/1752734248947-Hair Transplant 1.jpg";
  const introMainImageAlt = introduction.mainImage?.imageAlt || introTitle;
  const introFloatImage = introduction.floatingImage?.image || "/uploads/turkey-doctor.jpg";
  const introFloatImageAlt = introduction.floatingImage?.imageAlt || "Turkish Specialist";
  const introStats = introduction.bottomStats ?? [];
  const introPrimaryWA = introduction.primaryCTA?.link || heroWALink;
  const introPrimaryLabel = introduction.primaryCTA?.text || "Book Free Scalp Analysis";

  // ─── NEW Section 1: Is Hair Transplant Surgery Safe? ────────────────────
  const safetyInfoHeading = safetyInfo.heading || "Is Hair Transplant Surgery Safe?";
  const safetyInfoDesc = safetyInfo.description || "";
  const safetyInfoPoints = safetyInfo.safetyPoints ?? [
    "Minimally invasive outpatient procedure performed under local scalp anesthesia.",
    "Conducted in NABH-standard minor operating theatres with zero infection record.",
    "0.7mm Sapphire micro-blades reduce scalp trauma & preserve donor health.",
    "100% doctor-led incision and graft extraction protocols."
  ];

  // ─── NEW Section 2: Candidate Suitability & Norwood Table ──────────────────
  const suitabilityHeading = suitability.heading || "Who Needs Hair Transplant Surgery?";
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

  // ─── Procedure Science ────────────────────────────────────────────────────
  const scienceHeading = procedureScience.mainHeading || "The Science of Hair Restoration";
  const scienceDesc = procedureScience.description || "We combine proven surgical science with the latest Sapphire FUE and DHI techniques for superior graft survival rates and natural-looking density.";
  const scienceCards = procedureScience.cards ?? [];
  const SCIENCE_ROWS = (scienceCards.length > 0 ? scienceCards : [
    {
      title: "Sapphire FUE Technology",
      badge: "Sapphire FUE",
      description: "Gemstone Sapphire blades create ultra-fine micro-channels in the recipient zone with surgical precision. Unlike steel punches, micro-sapphire incisions minimize scalp tissue trauma, accelerate scab detachment, and support 98.4% graft survival with zero linear scarring.",
      cardImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "Sapphire FUE Technology" },
      bulletPoints: [
        "0.7mm – 0.9mm gem-grade sapphire micro-blades",
        "40% reduced scalp tissue trauma vs steel punches",
        "High-density channel packing (up to 55 grafts/cm²)",
        "Fast 5–7 day initial scalp recovery timeline"
      ],
      advantages: "Gemstone sapphire micro-blades reduce scalp trauma, minimize crusting, and enable dense graft placement with 98.4% follicle survival."
    },
    {
      title: "DHI Direct Implantation (Choi Pen)",
      badge: "DHI Choi Pen",
      description: "Turkey's renowned Choi implanter pen combines recipient channel creation and follicle placement into a single smooth movement. This technique eliminates pre-made incision slits, giving surgeons 100% control over hair angle, depth, and growth direction for maximum natural density.",
      cardImage: { image: "/uploads/1752731223556-FUE 1.jpg", imageAlt: "DHI Direct Implantation" },
      bulletPoints: [
        "Choi implanter pen for 1-step direct graft insertion",
        "Precise control of 40–45° natural hair angle & depth",
        "No-shave or partial-shave surgery options available",
        "Minimizes graft out-of-body time to under 2 hours"
      ],
      advantages: "Direct implanter pen reduces graft handling by 60%, maintaining 98%+ graft survival rate with maximum hair density."
    }
  ]);

  const getScienceIcon = (iconName, index) => {
    return SCIENCE_ICONS[index % SCIENCE_ICONS.length];
  };

  // ─── Safety Standards ─────────────────────────────────────────────────────
  const safetyHeading = safety.heading || "Strict Surgical Safety Standards";
  const safetyDesc = safety.description || "";
  const safetyCards = safety.safetyCards ?? [];
  const rightBox = safety.rightSideHighlightBox ?? {};
  const rightBoxBadge = rightBox.smallHeading || "";
  const rightBoxTitle = rightBox.title || "";
  const rightBoxDesc = rightBox.description || "";
  const rightBoxMetrics = rightBox.metrics ?? [];
  const rightBoxNotice = rightBox.bottomNotice || "";

  // ─── Techniques ───────────────────────────────────────────────────────────
  const techHeading = techniques.heading || "Surgical Techniques Offered";
  const techDesc = techniques.description || "";
  const techItems = techniques.techniques ?? [];
  const bottomCTA = techniques.bottomCTABlock ?? {};
  const bottomCTAHeading = bottomCTA.heading || "Choose the Best Technique for Your Hair";
  const bottomCTADesc = bottomCTA.description || "Book a 1-on-1 consultation with our senior plastic surgeon.";
  const bottomCTAWA = bottomCTA.primaryCTA?.link || heroWALink;
  const bottomCTAWALabel = bottomCTA.primaryCTA?.text || "Consult Plastic Surgeon";
  const bottomCTAGuideLink = techniques.techniques?.[0]?.ctaText?.link || "/cost";
  const TECHNIQUES_DATA = techItems;

  // ─── Quality Benchmarks ───────────────────────────────────────────────────
  const qualityHeading = qualityBenchmarks.heading || "Quality Benchmarks";
  const qualityDesc = qualityBenchmarks.description || "";
  const benchmarkCards = qualityBenchmarks.benchmarkCards ?? [];
  const QUALITY_POINTS = benchmarkCards;

  // ─── NEW Section 3: Before Surgery Timeline ──────────────────────────────
  const beforeHeading = beforeTimeline.heading || "Before Surgery Preparation";
  const beforeDesc = beforeTimeline.description || "Follow these essential pre-operative steps to prepare your scalp and ensure optimal surgical conditions.";
  const beforeItems = (beforeTimeline.timelineItems?.length ? beforeTimeline.timelineItems : [
    { stepNumber: "01", badge: "2 Weeks Before", title: "Medical Assessment & Blood Workup", description: "Complete scalp trichoscopy, donor area density assessment, CBC, BT/CT, and pre-op health screening." },
    { stepNumber: "02", badge: "7 Days Before", title: "Discontinue Blood Thinners & Supplements", description: "Stop Aspirin, Minoxidil, Vitamin E, and alcohol 7 days prior to prevent excess surgical bleeding." },
    { stepNumber: "03", badge: "1 Day Before", title: "Antiseptic Scalp Wash & Cleanse", description: "Wash scalp thoroughly with prescribed antiseptic shampoo; avoid hair gel, hairsprays, or styling products." },
    { stepNumber: "04", badge: "Day 0 (Surgery)", title: "Hairline Marking & Local Anaesthesia", description: "Final hairline marking with senior surgeon, sterile OT gowning, and painless local scalp numbing." }
  ]);

  // ─── Day of Surgery Timeline ──────────────────────────────────────────────
  const timelineHeading = procedureTimeline.heading || "Day of Surgery Timeline";
  const timelineDesc = procedureTimeline.description || "";
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

  // ─── Recovery Timeline ────────────────────────────────────────────────────
  const recoveryHeading = recoveryTimeline.heading || "Post-Op Recovery Timeline";
  const recoveryDesc = recoveryTimeline.description || "";
  const leftCard = recoveryTimeline.leftHighlightCard ?? {};
  const leftCardTitle = leftCard.title || "18-Month Recovery Tracking";
  const leftCardDesc = leftCard.description || "Free post-op checkups at months 1, 3, 6, 12, and 18 ensure your hairline progress is monitored.";
  const leftCardStats = leftCard.statistics ?? [];
  const leftCardDuration = leftCard.icon || "18 Months";
  const recoveryStages = recoveryTimeline.recoveryStages ?? [];
  const RECOVERY = recoveryStages.map((s, i) => ({
    time: s.duration || s.title || "",
    label: s.title || "",
    desc: s.description || "",
    icon: RECOVERY_ICONS[i % RECOVERY_ICONS.length] ?? <Activity key={i} className="w-6 h-6" />,
    color: RECOVERY_COLORS[i % RECOVERY_COLORS.length] ?? "bg-blue-50 text-blue-600 border-blue-100",
  }));

  // ─── NEW Section 4: Surgical Risks & Prevention ─────────────────────────
  const risksHeading = surgicalRisks.heading || "Surgical Risks & Safety Protocols";
  const risksDesc = surgicalRisks.description || "";
  const risksList = surgicalRisks.risks ?? [
    { riskTitle: "Infection Risk", riskDescription: "Extremely low (<0.1%) in sterile NABH minor OTs.", severity: "Very Low" },
    { riskTitle: "Temporary Shedding", riskDescription: "Shock loss of native hair settling in 3-4 months.", severity: "Temporary" }
  ];
  const preventionList = surgicalRisks.preventionPoints ?? [
    { title: "Sterile OT Facilities", description: "100% single-use disposable kits & HEPA air filters." },
    { title: "Doctor-Led Execution", description: "Micro-slits created by senior plastic surgeon only." }
  ];

  // ─── NEW Section 5: Real Patient Results ──────────────────────────────────
  const resultsHeading = patientResults.heading || "Real Patient Results";
  const resultsDesc = patientResults.description || "Our results aren't just great — they're outstanding. Real hair transplant outcomes from Ryan Clinic.";
  const resultCases = (patientResults.cases?.length ? patientResults.cases : [
    {
      patientName: "Rahul M.",
      city: "Delhi Clinic",
      graftCount: "3,200 Grafts",
      technique: "Turkey Sapphire FUE",
      recoveryTime: "12 Months",
      description: "Full hairline & temple restoration with natural density.",
      beforeImage: { image: "/uploads/1752731223556-FUE 1.jpg", imageAlt: "Before" },
      afterImage: { image: "/uploads/1752734248947-Hair Transplant 1.jpg", imageAlt: "After" }
    },
    {
      patientName: "Vikas K.",
      city: "Delhi Clinic",
      graftCount: "2,800 Grafts",
      technique: "THI Choi Implanter Pen",
      recoveryTime: "9 Months",
      description: "Frontal hairline & mid-scalp high density restoration.",
      beforeImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "Before" },
      afterImage: { image: "/uploads/1752667815707-fue-banner_ro9ae6.webp", imageAlt: "After" }
    }
  ]);

  // ─── Meet Your Surgeons ───────────────────────────────────────────────────
  const doctorsHeading = doctorsSection.heading || "Meet Your Hair Transplant Surgeon";
  const doctorsDesc = doctorsSection.description || "100% doctor-led procedures with Turkey-certified surgical precision.";
  const doctorsTopBtn = doctorsSection.topButtonText || "View All Doctors";
  const doctorsList = doctorsSection.doctors ?? [];
  const DOCTORS = doctorsList.length > 0 ? doctorsList.map((d) => ({
    name: d.name || "Dr. Aman Singh Gosain",
    role: d.designation || "Lead Hair Transplant Surgeon",
    image: d.doctorImage?.image || d.image || "/uploads/turkey-doctor.jpg",
    imageAlt: d.doctorImage?.imageAlt || d.name || "Dr. Aman Singh Gosain",
    exp: d.experience || "15+ Yrs",
    procedures: d.proceduresCount || "7,500+",
    rating: d.rating || "4.9 ★",
    survivalRate: d.successRate || "98.4%",
    location: d.location || "Delhi Clinic (Pitampura)",
    quals: d.qualifications?.length ? d.qualifications : [
      "MBBS, MS, MCh (Plastic Surgery)",
      "Turkey Hair Restoration Fellowship — Istanbul",
      "ISHRS Member (USA) — Hair Restoration Society"
    ],
    bio: d.bio || "Dr. Aman Singh Gosain is a renowned Plastic & Reconstructive Surgeon with over 15 years of dedicated hair restoration experience. Trained in Turkey's advanced Sapphire FUE & Turkish Technique, he personally performs every hairline marking, graft extraction, and site creation.",
    specializations: d.specializations?.length ? d.specializations : ["Sapphire FUE", "Turkish Technique", "Beard & Eyebrow Transplant"],
    slug: d.slug || "hair-transplant-surgeon-in-delhi"
  })) : [
    {
      name: "Dr. Aman Singh Gosain",
      role: "Lead Hair Transplant Surgeon",
      image: "/uploads/turkey-doctor.jpg",
      imageAlt: "Dr. Aman Singh Gosain",
      exp: "15+ Yrs",
      procedures: "7,500+",
      rating: "4.9 ★",
      survivalRate: "98.4%",
      location: "Delhi Clinic (Pitampura)",
      quals: [
        "MBBS, MS, MCh (Plastic Surgery)",
        "Turkey Hair Restoration Fellowship — Istanbul",
        "ISHRS Member (USA) — Hair Restoration Society"
      ],
      bio: "Dr. Aman Singh Gosain is a renowned Plastic & Reconstructive Surgeon with over 15 years of dedicated hair restoration experience. Trained in Turkey's advanced Sapphire FUE & Turkish Technique, he personally performs every hairline marking, graft extraction, and site creation.",
      specializations: ["Sapphire FUE", "Turkish Technique", "Beard & Eyebrow Transplant"],
      slug: "hair-transplant-surgeon-in-delhi"
    },
    {
      name: "Dr. Pranendra Singh",
      role: "Senior Hair Transplant Specialist",
      image: "/uploads/about-one.jpg",
      imageAlt: "Dr. Pranendra Singh",
      exp: "12+ Yrs",
      procedures: "5,000+",
      rating: "4.9 ★",
      survivalRate: "97.8%",
      location: "Mumbai Clinic (Andheri)",
      quals: [
        "MBBS (AIIMS), MS (PGIMER), Turkey Fellow",
        "Pioneer in Bio-FUE & High-Density Grafts",
        "Certified DHI Implantation Specialist"
      ],
      bio: "AIIMS qualified plastic surgeon specializing in high-density Bio-FUE and facial hair restoration with over 12 years of surgical excellence.",
      specializations: ["Bio-FUE Density", "Facial Hair Transplant", "Donor Area Recovery"],
      slug: "dr-pranendra-singh"
    }
  ];

  // ─── Pricing ──────────────────────────────────────────────────────────────
  const pricingHeading = pricing.heading || "Transparent Surgery Pricing";
  const pricingDesc = pricing.description || "";
  const pricingWarning = pricing.warningText || "";
  const pricingFactors = pricing.pricingFactors ?? [];
  const pricingNotes = pricing.notes || "";
  const pricingStats = pricing.pricingStats ?? [];
  const pricingWA = pricing.ctaTextWhatsApp?.link || heroWALink;
  const pricingWALabel = pricing.ctaTextWhatsApp?.text;
  const pricingTel = pricing.ctaTextCall?.link || heroTelLink;
  const pricingTelLabel = pricing.ctaTextCall?.text;
  const pricingGuide = pricing.ctaTextGuide?.link;
  const pricingGuideLabel = pricing.ctaTextGuide?.text;

  // ─── Visit Clinic ─────────────────────────────────────────────────────────
  const visitHeading = visitClinic.heading || "Visit Ryan Clinic";
  const visitDesc = visitClinic.description || "";
  const infoCards = visitClinic.informationCards ?? [];
  const visitBtnWA = visitClinic.buttonText?.link || heroWALink;
  const visitBtnLabel = visitClinic.buttonText?.text || "Book Clinic Visit";
  const nearbyLocs = visitClinic.nearbyLocations ?? [];

  // ─── Consultation ─────────────────────────────────────────────────────────
  const leftSide = consultation.leftSide ?? {};
  const consultHeading = leftSide.heading || "Schedule Your Free Scalp Analysis";
  const consultDesc = leftSide.description || "Book a 1-on-1 consultation with our senior surgeon.";
  const contactCards = leftSide.contactCards ?? [];
  const CONTACT_CARDS = contactCards.map((c, i) => ({
    icon: CONSULTATION_ICONS[i % CONSULTATION_ICONS.length] ?? <Phone key={i} className="w-4 h-4" />,
    title: c.title || "Call Us",
    val: c.description || "+91 99111 11247",
    link: c.link || TEL,
    ext: c.ext ?? false,
  }));
  const formConfig = consultation.consultationFormConfig ?? {};
  const formTitle = formConfig.title || "Book Free Consultation";

  const faqStats = faqSection.stats ?? [];
  const FAQS_RAW = (faqSection.faqs ?? []).map((f) => ({ q: f.question, a: f.answer }));
  const FAQS = FAQS_RAW.length > 0 ? FAQS_RAW : [
    { q: "Is hair transplant surgery safe?", a: "For suitable candidates, it's a low-risk outpatient procedure when performed by qualified doctors in a sterile facility under local anaesthesia. Minor, temporary side effects can occur; serious complications are uncommon." },
    { q: "Is a hair transplant a major surgery?", a: "No. It's a minor, minimally-invasive procedure done under local anaesthesia with no general anaesthesia and no hospital stay for a standard case. The wounds are tiny and heal quickly." },
    { q: "Does hair transplant surgery hurt?", a: "The numbing injections sting briefly; after that the surgery is largely painless. You stay awake and comfortable throughout." },
    { q: "Will I be awake during the surgery?", a: "Yes — it's done under local anaesthesia, so you're awake and comfortable. Most patients listen to music, watch something, or rest." },
    { q: "How long does the surgery take?", a: "A few hours to a full day depending on the number of grafts. You're discharged the same day." },
    { q: "How long is recovery after the surgery?", a: "Most people return to desk work in about 5–7 days. Crusts fall off by around day 10, shock shedding happens at 3–6 weeks, and final results show at 12–18 months." },
    { q: "Are the results of the surgery permanent?", a: "The transplanted hair is generally permanent because the donor follicles resist DHT. Native hair can still thin, so some patients use maintenance therapy or a future session." },
    { q: "Will the surgery leave scars?", a: "With FUE/THI there's no linear scar — only tiny dot marks that fade and hide under surrounding hair." },
    { q: "Who is a good candidate for hair transplant surgery?", a: "Adults with stable, pattern-type loss, adequate donor density, and realistic expectations. A free scalp analysis confirms whether surgery suits you." },
    { q: "What makes the best hair transplant surgery in Delhi?", a: "Doctor-led surgery, a technique matched to your case, a sterile OT, natural hairline design, real results and reviews, transparent pricing, and proper aftercare." },
    { q: "What are the risks of hair transplant surgery?", a: "Mostly temporary: swelling, numbness, redness, minor folliculitis, and shock shedding. Small risks of infection or bleeding are kept low with sterile technique and aftercare." },
    { q: "Can women have hair transplant surgery?", a: "Yes — suitable women with pattern thinning, a high hairline, or traction alopecia, with no-shave options. A careful diagnosis comes first." },
    { q: "How much does hair transplant surgery cost in Delhi?", a: "It's priced per graft and depends mainly on graft count and technique. Your exact price is confirmed after a free scalp analysis. 0% EMI is available." },
    { q: "Do I need to shave my head for the surgery?", a: "Not always — THI enables no-shave or partial-shave surgery. Your surgeon advises based on the area and graft count." },
    { q: "How do I book my surgery consultation?", a: "Call or WhatsApp +91-9217958539. You'll get a scalp analysis, graft count, and cost breakdown with no obligation." },
  ];
  const CONSULT_STATS = faqStats.slice(0, 4).map((s) => ({ n: s.value, l: s.label }));

  // ─── Why Choose Ryan Clinic ───────────────────────────────────────────────
  const whyChooseHeading = whyChooseUs.heading || "Why Choose Ryan Clinic for Hair Transplant Surgery in Delhi?";
  const whyChooseDesc = whyChooseUs.description || "What sets us apart isn't a slogan — it's a list of verifiable, surgeon-led commitments we hold to every single procedure.";
  const whyChoosePoints = whyChooseUs.points ?? [
    { title: "Doctor-Led at Every Step", description: "Extraction, channel creation, and implantation are performed by a qualified doctor — never a technician." },
    { title: "Sapphire FUE & THI with Choi Pen", description: "Both techniques matched to your case, not offered as a fixed package regardless of your needs." },
    { title: "Sterile Operating Theatre", description: "Single-use surgical-grade instruments in a properly equipped, sterile OT — not a clinic room." },
    { title: "Natural-First Hairline Design", description: "Soft, irregular, age-appropriate hairline design built for undetectable, lifelong results." },
    { title: "Free Scalp Analysis & Transparent Pricing", description: "Your exact graft count and all-inclusive cost are confirmed before you commit. 0% EMI available." },
    { title: "Follow-Up Through Your Growth Cycle", description: "WhatsApp support and in-clinic follow-up through the full 12–18 month growth timeline." },
    { title: "Centres in Delhi, Mumbai & Hyderabad", description: "Convenient locations across India with the same doctor-led surgical standards at every centre." },
  ];

  const linksList = internalLinks.links ?? [];

  const introGridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <>
      {/* ── 1. Page Banner (Original Hero) ─────────────────────────────── */}
      <PageBanner
        breadcrumb={heroBreadcrumb}
        title={heroTitle}
        description={heroDesc}
        bgImage={heroBgImage}
        stats={heroStats}
      />

      {/* ── 2. What is Hair Transplant Surgery? (Original Production Layout) ── */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#e30a17]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#302658]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal direction="left">
                <SectionLabel text={introSmallHeading} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-5">
                  {introTitle.includes("Surgery") ? (
                    <>
                      {introTitle.split("Surgery")[0]}
                      <br />
                      <span className="text-[#e30a17] relative inline-block">
                        Surgery
                        <span className="absolute bottom-1 left-0 w-full h-1 bg-[#e30a17]/10 rounded" />
                      </span>
                      {introTitle.split("Surgery")[1]}
                    </>
                  ) : introTitle}
                </h2>

                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed font-sans">
                  {introDescription ? (
                    <div dangerouslySetInnerHTML={{ __html: sanitizeContent(introDescription) }} />
                  ) : (
                    <p>
                      Hair transplant surgery is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — ensuring no general anaesthesia risks and no hospital stay. A surgeon relocates your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently.
                    </p>
                  )}

                  {/* Highlighted box */}
                  {introHighlightBox && (
                    <div className="bg-[#F7F5F2] border-l-4 border-[#e30a17] p-5 rounded-r-2xl my-6">
                      <div className="font-semibold text-[#302658]" dangerouslySetInnerHTML={{ __html: sanitizeContent(introHighlightBox) }} />
                    </div>
                  )}

                  {/* Two Honest Points */}
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

                {/* Key stats inside About section */}
                {introStats.length > 0 ? (
                  <div className={`grid ${introGridCols[Math.min(introStats.length, 4)] || "grid-cols-4"} gap-4 pt-4 pb-6 border-y border-gray-100`}>
                    {introStats.map((s, i) => (
                      <div key={i}>
                        <p className="text-xl md:text-2xl font-black text-[#e30a17]">{s.value}</p>
                        <p className="text-gray-400 text-xs mt-0.5 font-medium">{s.label}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 pt-4 pb-6 border-y border-gray-100">
                    <div>
                      <p className="text-xl md:text-2xl font-black text-[#e30a17]">100%</p>
                      <p className="text-gray-400 text-xs mt-0.5 font-medium">Doctor Led</p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-black text-[#302658]">95%+</p>
                      <p className="text-gray-400 text-xs mt-0.5 font-medium">Graft Survival</p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-black text-[#302658]">NABH</p>
                      <p className="text-gray-400 text-xs mt-0.5 font-medium">Sterile OT</p>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <CTAButtons primary={introPrimaryLabel} waLink={introPrimaryWA} telLink={heroTelLink} />
                </div>
              </Reveal>
            </div>

            {/* Right Image Container — stacked two-image layout */}
            <div className="lg:col-span-6 w-full lg:sticky lg:top-24">
              <Reveal direction="right" delay={120}>
                <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[580px]">
                  {/* Back image */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5">
                      <span className="bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Sapphire FUE Procedure
                      </span>
                    </div>
                  </div>

                  {/* Front image */}
                  <div className="absolute bottom-0 right-0 w-[52%] h-[52%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
                    <Image
                      src={introFloatImage}
                      alt={introFloatImageAlt}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      unoptimized
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-lg border border-gray-100">
                        <span className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#302658] leading-tight">100% Doctor-Led</p>
                          <p className="text-[10px] text-gray-500">Every incision &amp; graft</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[45%] right-[8%] w-14 h-14 rounded-full bg-[#e30a17]/10 border-2 border-[#e30a17]/20 z-0 hidden lg:block" />
                  <div className="absolute top-[48%] right-[11%] w-6 h-6 rounded-full bg-[#e30a17]/20 z-0 hidden lg:block" />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── NEW SECTION 1: Is Hair Transplant Surgery Safe? ─────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image with rich overlays & increased height */}
            <Reveal direction="left">
              <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden shadow-2xl group border border-gray-100">
                <Image
                  src="/uploads/1752667815707-fue-banner_ro9ae6.webp"
                  alt="Sterile operating theatre at Ryan Clinic Delhi"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1430]/90 via-[#1a1430]/30 to-black/20" />
                
                {/* Top Left Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="inline-flex items-center gap-2 bg-emerald-500 text-white text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-2 rounded-full shadow-lg">
                    <ShieldCheck className="w-4 h-4" /> Sterile OT Verified
                  </span>
                </div>

                {/* Top Right Floating Card */}
                <div className="absolute top-5 right-5 z-10 hidden sm:flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-[10px] font-bold text-[#302658] uppercase tracking-wider">NABH Minor OT</p>
                    <p className="text-[10px] text-gray-500">Zero Infection Record</p>
                  </div>
                </div>

                {/* Mid Floating Pill */}
                <div className="absolute top-24 left-5 z-10 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[10px] font-bold tracking-wide border border-white/20">
                  <Scissors className="w-3.5 h-3.5 text-[#e30a17]" />
                  <span>100% Single-Use Instruments</span>
                </div>

                {/* Bottom 4 Stat Tiles */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { n: "Local", l: "Anaesthesia Only", i: <Syringe className="w-3.5 h-3.5 text-amber-400" /> },
                    { n: "Same Day", l: "Discharge", i: <Home className="w-3.5 h-3.5 text-emerald-400" /> },
                    { n: "0%", l: "General Anaesthesia", i: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> },
                    { n: "HEPA", l: "Clean Air Flow", i: <Activity className="w-3.5 h-3.5 text-purple-400" /> },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center transition-all hover:bg-white/25">
                      <div className="flex justify-center mb-1">{s.i}</div>
                      <p className="text-white font-black text-sm leading-none">{s.n}</p>
                      <p className="text-white/70 text-[9px] font-medium mt-1 leading-tight">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: Content */}
            <Reveal direction="right" delay={120}>
              <SectionLabel text="Safety Protocols" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 mt-2">{safetyInfoHeading}</h2>
              {safetyInfoDesc ? (
                <div className="text-gray-500 text-sm md:text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: sanitizeContent(safetyInfoDesc) }} />
              ) : (
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                  For suitable candidates, hair transplant surgery in Delhi is a low-risk, outpatient procedure when performed by qualified doctors in a sterile facility. Local anaesthesia only — no general anaesthesia risks. The two biggest factors in safety are <strong className="text-[#302658]">who performs the surgery</strong> and <strong className="text-[#302658]">where</strong>.
                </p>
              )}

              <div className="space-y-3">
                {safetyInfoPoints.map((pt, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-[#F7F5F2] rounded-2xl border border-gray-100 hover:border-red-100 transition-colors">
                    <span className="w-9 h-9 rounded-xl bg-white text-[#e30a17] flex items-center justify-center shrink-0 shadow-xs border border-gray-100 font-extrabold text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-[#302658]">Safety Standard {String(i + 1).padStart(2, "0")}</h4>
                      <p className="text-gray-600 text-sm md:text-base mt-1 leading-relaxed">{pt}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Honest note */}
              <div className="mt-6 flex items-start gap-3 border-l-4 border-amber-400 bg-amber-50 rounded-r-2xl p-4">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <p className="text-sm md:text-base text-amber-900 leading-relaxed">
                  <strong>Honest note:</strong> "Safe" doesn't mean "zero risk." Like any surgery, minor temporary risks exist — a good clinic discusses them openly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEW SECTION 2: Who Needs Hair Transplant Surgery? (Sticky Image) ── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Scrollable Content */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal direction="left">
                <SectionLabel text="Candidate Suitability" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 mt-2">{suitabilityHeading}</h2>
                {suitabilityDesc ? (
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">{suitabilityDesc}</p>
                ) : (
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                    Surgery is the right step when loss is stable and pattern-based, donor density is sufficient, and expectations are realistic. A good clinic will honestly tell you if surgery isn't the right step yet — which is exactly what the free scalp analysis is for.
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
                    <h4 className="font-bold text-base text-green-700 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Suitable Candidates
                    </h4>
                    <ul className="space-y-2.5">
                      {suitableList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-gray-700 leading-relaxed font-sans">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
                    <h4 className="font-bold text-base text-[#e30a17] mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-[#e30a17]" /> Not Suitable If…
                    </h4>
                    <ul className="space-y-2.5">
                      {notSuitableList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-gray-700 leading-relaxed font-sans">
                          <XCircle className="w-4 h-4 text-[#e30a17] shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* Norwood Table */}
              <Reveal>
                <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h4 className="font-bold text-base text-[#302658] flex items-center gap-2 font-sans">
                      <TrendingUp className="w-4 h-4 text-[#e30a17]" /> Norwood Hair Loss Scale &amp; Graft Count
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 font-sans">Indicative graft requirements by pattern stage. Exact count set at scalp analysis.</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                          <th className="py-3 px-6">Norwood Grade</th>
                          <th className="py-3 px-6">Typical Pattern</th>
                          <th className="py-3 px-6">Indicative Grafts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 font-sans">
                        {norwoodTable.length > 0 ? norwoodTable.map((row, i) => (
                          <tr key={i} className="hover:bg-[#F7F5F2] transition-colors">
                            <td className="py-3.5 px-6 font-bold text-[#302658]">{row.stage}</td>
                            <td className="py-3.5 px-6 text-gray-600">{row.description}</td>
                            <td className="py-3.5 px-6 font-black text-[#e30a17]">{row.grafts}</td>
                          </tr>
                        )) : [
                          ["Stage 2–3", "Hairline & temple recession", "~1,000 – 2,000 Grafts"],
                          ["Stage 4–5", "Frontal loss + crown thinning", "~2,000 – 3,500 Grafts"],
                          ["Stage 6–7", "Extensive scalp baldness", "~4,000+ Grafts (Staged)"],
                        ].map(([stage, desc, grafts], i) => (
                          <tr key={i} className="hover:bg-[#F7F5F2] transition-colors">
                            <td className="py-3.5 px-6 font-bold text-[#302658]">{stage}</td>
                            <td className="py-3.5 px-6 text-gray-600">{desc}</td>
                            <td className="py-3.5 px-6 font-black text-[#e30a17]">{grafts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Sticky Image */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <Reveal direction="right" delay={120}>
                <div className="relative w-full h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group">
                  <Image
                    src="/uploads/turkey-doctor.jpg"
                    alt="Doctor consultation for hair transplant candidacy at Ryan Clinic Delhi"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1430]/90 via-transparent to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-full shadow">
                      <Stethoscope className="w-3.5 h-3.5" /> Free Scalp Analysis
                    </span>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-gray-100 shadow-xl">
                      <p className="text-[10px] font-extrabold text-[#e30a17] uppercase tracking-wider mb-1">Candidacy First</p>
                      <p className="text-sm font-bold text-[#302658] leading-snug">
                        Our plastic surgeons evaluate your donor area density and hair loss pattern before recommending surgery.
                      </p>
                      <a
                        href={heroWALink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] hover:underline"
                      >
                        Book Scalp Assessment <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Procedure Science (Left-Aligned Heading & Rich Cards) ───── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-left max-w-4xl mb-12">
              <SectionLabel text="Procedure Science" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                {scienceHeading}
              </h2>
              <div className="text-gray-500 text-base md:text-lg leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: sanitizeContent(scienceDesc) }} />
            </div>
          </RevealSection>

          {SCIENCE_ROWS.length > 0 &&
            SCIENCE_ROWS.map((row, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0 items-stretch mb-12 last:mb-0 rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white`}>
                <div className="lg:w-[45%] relative min-h-[380px] lg:min-h-[460px]">
                  {row.cardImage?.image ? (
                    <Image
                      src={row.cardImage.image}
                      alt={row.cardImage.imageAlt || row.title || ""}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />

                  {row.badge && (
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="inline-flex items-center gap-2 bg-[#e30a17] text-white text-xs font-extrabold tracking-widest uppercase px-4 py-2 rounded-full shadow-lg">
                        {row.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="lg:w-[55%] p-8 sm:p-10 flex flex-col justify-center text-left">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#e30a17] flex items-center justify-center mb-5 border border-red-100">
                    {getScienceIcon(row.icon, i)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#302658] mb-3 text-left">{row.title}</h3>
                  <div className="text-gray-600 text-sm md:text-base leading-relaxed mb-5 text-left font-sans" dangerouslySetInnerHTML={{ __html: sanitizeContent(row.description) }} />

                  {row.bulletPoints && row.bulletPoints.length > 0 && (
                    <ul className="space-y-2.5 mb-5 text-left">
                      {row.bulletPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm md:text-base font-semibold text-[#302658]">
                          <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}

                  {row.advantages ? (
                    <div className="mt-4 p-4 bg-[#FAF6F3] rounded-2xl border border-gray-200/80 text-sm text-gray-700 leading-relaxed text-left font-sans">
                      <strong className="text-[#e30a17] font-bold">Clinical Advantages: </strong>
                      <span dangerouslySetInnerHTML={{ __html: sanitizeContent(row.advantages) }} />
                    </div>
                  ) : (
                    <div className="mt-4 p-4 bg-[#FAF6F3] rounded-2xl border border-gray-200/80 text-sm text-gray-700 leading-relaxed text-left font-sans flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-[#302658]">Clinical Advantage: </strong>
                        High-density micro-graft placement preserves donor health while delivering 95%+ follicle survival.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── 4. Safety Standards (Left Headings & Sticky Dark Card) ─────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (Scrollable Cards) */}
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <SectionLabel text="Safety & Standards" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mb-5 text-left">
                  {safetyHeading}
                </h2>
                <div className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 text-left font-sans" dangerouslySetInnerHTML={{ __html: sanitizeContent(safetyDesc) }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {safetyCards.length > 0 ? (
                    safetyCards.map((item, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-[#F7F5F2] rounded-3xl border border-gray-100 hover:border-red-100 transition-all hover:shadow-md">
                        <span className="w-10 h-10 rounded-2xl bg-white text-[#e30a17] flex items-center justify-center shrink-0 shadow-xs border border-gray-100">
                          {getSafetyIcon(item.icon, i)}
                        </span>
                        <div className="text-left">
                          <h4 className="font-bold text-base text-[#302658]">{item.title}</h4>
                          <p className="text-gray-600 text-sm mt-1 leading-relaxed font-sans">{item.description}</p>
                        </div>
                      </div>
                    ))
                  ) : [
                    { t: "Sterile OT Environment", d: "Class 100 clean-room standards with HEPA air filters for zero infection risk.", i: <ShieldCheck className="w-5 h-5 text-[#e30a17]" /> },
                    { t: "Hospital-Grade Facility", d: "Equipped with emergency crash cart, pulse oximeter, BP monitoring & emergency protocols.", i: <Home className="w-5 h-5 text-[#e30a17]" /> },
                    { t: "Vitals Monitored Throughout", d: "Patient oxygen, BP, and heart rate continuously monitored during surgery.", i: <Activity className="w-5 h-5 text-[#e30a17]" /> },
                    { t: "ISO-Compliant Instruments", d: "CE-marked, single-use Sapphire blades & Choi pens — 100% disposable kits.", i: <Award className="w-5 h-5 text-[#e30a17]" /> },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-[#F7F5F2] rounded-3xl border border-gray-100 hover:border-red-100 transition-all hover:shadow-md">
                      <span className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xs border border-gray-100">
                        {item.i}
                      </span>
                      <div className="text-left">
                        <h4 className="font-bold text-base text-[#302658]">{item.t}</h4>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed font-sans">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right Column (Sticky Dark Card) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <Reveal direction="right" delay={150}>
                <div className="bg-[#1a1430] text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-white/10 text-left">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#e30a17]/20 rounded-full blur-3xl pointer-events-none" />
                  <p className="text-amber-400 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2 font-sans">
                    {rightBoxBadge || "OUR SAFETY COMMITMENT"}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight font-outfit">
                    {rightBoxTitle || "Zero Compromise on Patient Safety"}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 font-sans">
                    {rightBoxDesc || "Every procedure at Ryan Clinic is backed by strict safety protocols, informed consent, and 24/7 post-op doctor availability."}
                  </p>
                  <div className="divide-y divide-white/10 mb-6">
                    {rightBoxMetrics.length > 0 ? (
                      rightBoxMetrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-4 py-3.5">
                          <span className="text-2xl font-black text-[#e30a17] w-16 shrink-0 font-outfit">{metric.value}</span>
                          <span className="text-white/80 text-sm font-semibold leading-snug font-sans">{metric.label}</span>
                        </div>
                      ))
                    ) : [
                      { v: "0%", l: "Surgical Infection Rate in Sterile OT" },
                      { v: "100%", l: "Single-Use Disposable Surgical Instruments" },
                      { v: "24/7", l: "Direct Doctor Availability Post-Op" },
                    ].map((metric, i) => (
                      <div key={i} className="flex items-center gap-4 py-3.5">
                        <span className="text-2xl font-black text-[#e30a17] w-16 shrink-0 font-outfit">{metric.v}</span>
                        <span className="text-white/80 text-sm font-semibold leading-snug font-sans">{metric.l}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={heroWALink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Consult Plastic Surgeon <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {rightBoxNotice && (
            <div className="mt-10">
              <Reveal>
                <div className="flex items-start gap-4 border-l-4 border-[#e30a17] bg-[#FFF8F8] rounded-r-2xl p-5 text-left">
                  <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[#e30a17]" />
                  <div className="text-sm md:text-base text-gray-700 leading-relaxed font-sans">
                    <strong className="font-bold text-[#302658]">Patient Transparency Note: </strong>
                    <span dangerouslySetInnerHTML={{ __html: sanitizeContent(rightBoxNotice) }} />
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. Surgical Techniques (Left Aligned Heading) ─────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <RevealSection>
            <div className="text-left max-w-4xl mb-12">
              <SectionLabel text="Surgical Techniques" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4 text-left font-outfit">
                {techHeading || "Surgical Techniques We Offer"}
              </h2>
              {/* Introductory overview paragraph — matches SEO brief */}
              {techDesc ? (
                <p className="text-gray-500 text-base md:text-lg leading-relaxed text-left font-sans">{techDesc}</p>
              ) : (
                <p className="text-gray-500 text-base md:text-lg leading-relaxed text-left font-sans">
                  We offer the three gold-standard hair transplant techniques, each selected based on the patient&apos;s individual hair loss pattern, donor area, and expected density goals.
                </p>
              )}
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            {TECHNIQUES_DATA.length > 0 ? (
              TECHNIQUES_DATA.map((tech, i) => {
                const isFeatured = tech.featured;
                const isLast = i === TECHNIQUES_DATA.length - 1;
                return (
                  <AnimatedCard
                    key={i}
                    delay={i * 100}
                    className={
                      isFeatured
                        ? "relative bg-[#1a1430] p-8 lg:p-10 border-b lg:border-b-0 " + (isLast ? "" : "lg:border-r") + " border-gray-200 flex flex-col text-white overflow-hidden"
                        : "bg-white p-8 lg:p-10 border-b lg:border-b-0 " + (isLast ? "" : "lg:border-r") + " border-gray-200 flex flex-col"
                    }
                  >
                    {isFeatured && <div className="absolute top-0 right-0 w-48 h-48 bg-[#e30a17]/15 rounded-full blur-3xl pointer-events-none" />}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-6">
                        {isFeatured ? (
                          <div className="inline-flex items-center gap-2 bg-[#e30a17] rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {tech.badge || "Most Popular"}
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-[#302658]/8 flex items-center justify-center shrink-0">
                            {TECHNIQUE_ICONS[i % TECHNIQUE_ICONS.length]}
                          </div>
                        )}
                        <span className={isFeatured ? "text-white/30 text-[10px] font-bold uppercase tracking-widest" : "text-gray-400 text-[10px] font-bold uppercase tracking-widest"}>
                          Method {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className={isFeatured ? "text-2xl font-black text-white mb-1" : "text-2xl font-black text-[#302658] mb-1"}>{tech.name}</h3>
                      <p className={isFeatured ? "text-sm text-white/50 font-semibold mb-4" : "text-sm text-gray-400 font-semibold mb-4"}>{tech.subtitle}</p>
                      <div className={isFeatured ? "text-white/70 text-sm leading-relaxed flex-1" : "text-gray-500 text-sm leading-relaxed flex-1"} dangerouslySetInnerHTML={{ __html: sanitizeContent(tech.description) }} />

                      {tech.bulletPoints && tech.bulletPoints.length > 0 && (
                        <div className={"mt-8 pt-6 border-t " + (isFeatured ? "border-white/10" : "border-gray-100") + " space-y-2.5"}>
                          {tech.bulletPoints.map((f, fidx) => (
                            <div key={fidx} className={"flex items-center gap-2.5 text-sm font-medium " + (isFeatured ? "text-white" : "text-[#302658]")}>
                              <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" /> {f}
                            </div>
                          ))}
                        </div>
                      )}

                      <a href={tech.ctaText?.link || heroWALink} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] mt-6 hover:underline">
                        {tech.ctaText?.text || "See pricing"} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </AnimatedCard>
                );
              })
            ) : null}
          </div>

          <div className="mt-10 bg-[#F7F5F2] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 border border-gray-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#e30a17] mb-1">{bottomCTAHeading}</p>
              <h4 className="text-lg md:text-xl font-bold text-[#302658]">{bottomCTADesc}</h4>
            </div>
            <div className="shrink-0">
              <CTAButtons primary={bottomCTAWALabel} waLink={bottomCTAWA} telLink={heroTelLink} />
            </div>
          </div>

          {/* "Want the full technical breakdown" guide link */}
          <div className="mt-6 text-center">
            <a
              href="/hair-transplant-in-delhi"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#e30a17] hover:underline"
            >
              Want the full technical breakdown of FUE vs THI and recovery?
              <span className="font-normal text-gray-500">→ Hair Transplant in Delhi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. Quality Benchmarks (Left Headings & Rich 8-Card Grid) ────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <div className="text-left max-w-4xl mb-12">
              <SectionLabel text="Quality Benchmarks" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mb-4 text-left font-outfit">
                {qualityHeading || "What Makes the Best Hair Transplant Surgery in Delhi?"}
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl text-left font-sans">
                {qualityDesc || `"Best" should mean things you can verify, not slogans. The best hair transplant surgery in Delhi is defined by strict quality benchmarks:`}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUALITY_POINTS.length > 0 ? (
              QUALITY_POINTS.map((point, i) => (
                <AnimatedCard key={i} className="bg-[#FAF6F3] rounded-3xl p-6 border border-gray-200/80 hover:border-red-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col justify-between" delay={i * 60}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-9 h-9 rounded-xl bg-[#e30a17]/10 text-[#e30a17] flex items-center justify-center text-xs font-black border border-red-100 shadow-xs">
                        {point.number || String(i + 1).padStart(2, "0")}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed font-sans">{point.description}</p>
                  </div>
                </AnimatedCard>
              ))
            ) : (
              // Default 8 Quality Benchmarks from SEO Brief
              [
                { t: "Doctor-Led Execution", d: "A qualified surgeon performs every step — extraction, channel creation, and graft placement — never technicians." },
                { t: "Tailored Surgical Technique", d: "Sapphire FUE or THI Choi pen matched precisely to your hair pattern, donor density, and aesthetic goals." },
                { t: "NABH-Standard Sterile OT", d: "Class 100 clean-room operating theatre equipped with HEPA filters and 100% single-use disposable kits." },
                { t: "Natural Hairline Design", d: "Soft, micro-irregular front hairline with dense posterior packing for undetectable, lifelong natural growth." },
                { t: "Verifiable Patient Results", d: "Transparent before-and-after gallery and genuine reviews from real patients with comparable hair loss." },
                { t: "Transparent Per-Graft Cost", d: "All-inclusive, per-graft pricing confirmed upfront after a free scalp analysis with zero hidden day-of fees." },
                { t: "Honest Candidacy Guidance", d: "Clear diagnostic evaluation — telling you honestly if medical therapy or delayed surgery is better for you." },
                { t: "18-Month Structured Aftercare", d: "Complete post-op wash protocols, prescribed maintenance, and free checkups through the 12–18 month cycle." },
              ].map((pt, i) => (
                <AnimatedCard key={i} className="bg-[#FAF6F3] rounded-3xl p-6 border border-gray-200/80 hover:border-red-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col justify-between" delay={i * 60}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-9 h-9 rounded-xl bg-[#e30a17]/10 text-[#e30a17] flex items-center justify-center text-xs font-black border border-red-100 shadow-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h4 className="font-bold text-base text-[#302658] mb-1.5 font-outfit">{pt.t}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans">{pt.d}</p>
                  </div>
                </AnimatedCard>
              ))
            )}
          </div>

          {/* "Judge any clinic" closing note */}
          <Reveal>
            <div className="mt-10 flex items-start gap-4 border-l-4 border-[#e30a17] bg-[#FFF8F8] rounded-r-2xl p-6 text-left">
              <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[#e30a17]" />
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-sans">
                <strong className="font-bold text-[#302658]">Judge any clinic — including this one — against that list.</strong>{" "}
                Verify with their real gallery and reviews rather than claimed statistics. Transparency is the mark of a clinic worth trusting.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NEW SECTION 3: Before Surgery Preparation (Mumbai Cost Page Timeline Design) ── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header: Title Left, Schedule Appointment Pill CTA Right (Mumbai Cost Page Design) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div className="text-left max-w-3xl">
              <SectionLabel text="Pre-Op Timeline" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-3 font-outfit">
                {beforeHeading}
              </h2>
              {beforeDesc && <p className="text-gray-500 text-sm md:text-base leading-relaxed font-sans">{beforeDesc}</p>}
            </div>

            {/* Schedule Appointment Pill Button (Theme Red #e30a17) */}
            <a
              href={heroWALink}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5"
            >
              Schedule Appointment <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Horizontal Connected Wave Process Line + Nodes (Mumbai Cost Page Design) */}
          <div className="relative mb-6">
            {/* Wavy Connecting SVG Line across columns (Desktop) */}
            <div className="hidden lg:block absolute top-[52px] inset-x-12 h-16 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none">
                <path
                  d="M0,30 C150,0 200,60 333,30 C466,0 533,60 666,30 C800,0 850,60 1000,30"
                  stroke="#e30a17"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>

            {/* Grid of Step Nodes & Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {beforeItems.slice(0, 4).map((step, i) => {
                const stepNum = String(i + 1).padStart(2, "0");
                return (
                  <div key={i} className="flex flex-col items-center text-center group">
                    {/* Circular Step Node */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full border-4 border-[#e30a17] bg-white shadow-lg overflow-hidden flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
                        <div className="w-full h-full rounded-full bg-red-50 flex items-center justify-center text-[#e30a17] font-black text-xl font-outfit">
                          {stepNum}
                        </div>
                      </div>

                      {/* Step Number Badge Pill */}
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#e30a17] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                        {step.badge || stepNum}
                      </span>
                    </div>

                    {/* Card Below Circle */}
                    <div className="w-full bg-white rounded-3xl p-6 border border-gray-200/80 shadow-md hover:shadow-xl hover:border-[#e30a17]/40 transition-all flex flex-col justify-between flex-1 text-center">
                      <div>
                        <h3 className="font-bold text-base md:text-lg text-[#302658] mb-2 leading-snug font-outfit">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-sans">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Day of Surgery (Original Vertical Timeline Layout) ──────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Day of Surgery" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                {timelineHeading}
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">{timelineDesc}</p>
            </div>
          </RevealSection>

          <div className="relative">
            <div className="relative space-y-12">
              <div className="absolute left-1/2 -translate-x-px top-2 bottom-2 w-0.5 bg-[#e30a17] hidden md:block" />

              {STEPS.map((step, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <div key={i} className={`flex flex-col md:flex-row gap-8 items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-full md:w-[45%]">
                      <AnimatedCard className={`relative rounded-3xl overflow-hidden shadow-md ${isRight ? "md:ml-8" : "md:mr-8"}`} delay={i * 100}>
                        <div className="relative aspect-[4/3]">
                          {step.image ? (
                            <Image
                              src={step.image}
                              alt={step.alt || step.title}
                              fill
                              className="object-cover"
                              unoptimized
                              sizes="(max-width: 768px) 100vw, 45vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                              {step.tag}
                            </span>
                          </div>
                        </div>
                      </AnimatedCard>
                    </div>

                    <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#e30a17] flex items-center justify-center text-[#e30a17] font-black text-sm shadow-md">
                        {step.num}
                      </div>
                    </div>

                    <div className="w-full md:w-[45%]">
                      <AnimatedCard className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm ${isRight ? "md:mr-8" : "md:ml-8"}`} delay={i * 100 + 50}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="w-9 h-9 rounded-xl bg-red-50 text-[#e30a17] flex items-center justify-center">{step.icon}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {step.num}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#302658] mb-3">{step.title}</h3>
                        <p className="text-base text-gray-500 leading-relaxed">{step.desc}</p>
                      </AnimatedCard>
                    </div>
                  </div>
                );
              })}
            </div>

            {timelineBottomNote && (
              <div className="mt-12 bg-[#1a1430] text-white p-6 rounded-2xl text-base leading-relaxed shadow-lg flex gap-4 items-center max-w-2xl mx-auto">
                <Headphones className="w-6 h-6 text-gray-300 shrink-0" />
                <p className="text-gray-300">{timelineBottomNote}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 8. Recovery Timeline (Original Bento Grid Layout) ─────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Post-Op Recovery" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                {recoveryHeading}
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">{recoveryDesc}</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <AnimatedCard className="lg:col-span-2 bg-gradient-to-br from-[#302658] to-[#1a1430] text-white rounded-3xl p-10 flex flex-col justify-between shadow-xl" delay={0}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                  <Star className="w-7 h-7 text-amber-400" />
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">{leftCardDuration}</p>
                <h3 className="text-3xl font-black text-white mb-4">{leftCardTitle}</h3>
                <p className="text-white/70 text-base leading-relaxed">{leftCardDesc}</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                {leftCardStats.length > 0 &&
                  leftCardStats.map((stat, i) => (
                    <div key={i}>
                      <p className="text-2xl font-black text-[#e30a17]">{stat.value}</p>
                      <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
              </div>
            </AnimatedCard>

            <div className="lg:col-span-3 grid grid-cols-1 gap-5">
              {RECOVERY.map((stage, i) => (
                <AnimatedCard key={i} className="bg-[#F7F5F2] rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-5" delay={i * 100 + 80}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${stage.color}`}>
                    {stage.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{stage.time}</p>
                    <h4 className="text-lg font-bold text-[#302658] mb-1">{stage.label}</h4>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{stage.desc}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW SECTION 4: Surgical Risks & Prevention ───────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Risks & Prevention content */}
            <div>
              <Reveal direction="left">
                <SectionLabel text="Risk Protocols" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-4 mt-2">{risksHeading}</h2>
                {risksDesc ? (
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">{risksDesc}</p>
                ) : (
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                    Every responsible clinic lists these. A doctor-led approach, sterile facility, single-use instruments, careful graft handling, and clear aftercare are how the best hair transplant surgery in Delhi keeps risks low.
                  </p>
                )}

                {/* Risks grid */}
                <div className="mb-5">
                  <h4 className="font-bold text-sm text-[#302658] mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#e30a17]" /> Possible Risks (mostly temporary)
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {risksList.length > 0 ? risksList.map((r, i) => (
                      <div key={i} className="flex items-start justify-between gap-3 p-3.5 bg-red-50/40 rounded-xl border border-red-100">
                        <div>
                          <h5 className="font-bold text-sm md:text-base text-[#302658]">{r.riskTitle}</h5>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{r.riskDescription}</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold text-[#e30a17] bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">{r.severity}</span>
                      </div>
                    )) : [
                      ["Temporary swelling & redness", "Resolves within 3–5 days with aftercare", "Temporary"],
                      ["Shock shedding", "Transplanted hairs fall out at 3–6 weeks before regrowing — normal", "Temporary"],
                      ["Minor folliculitis", "Small pustules that clear with prescribed aftercare", "Very Low"],
                      ["Infection / bleeding", "Low with sterile technique and single-use instruments", "Rare"],
                      ["Variable yield", "Results depend on biology, surgical skill, and aftercare compliance", "Managed"],
                    ].map(([title, desc, sev], i) => (
                      <div key={i} className="flex items-start justify-between gap-3 p-3.5 bg-red-50/40 rounded-xl border border-red-100">
                        <div>
                          <h5 className="font-bold text-sm md:text-base text-[#302658]">{title}</h5>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc}</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold text-[#e30a17] bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">{sev}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prevention protocols */}
                <div>
                  <h4 className="font-bold text-base text-[#302658] mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> How Ryan Clinic Minimises Them
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {preventionList.length > 0 ? preventionList.map((p, i) => (
                      <div key={i} className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <h5 className="font-bold text-sm md:text-base text-emerald-900 mb-1 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" /> {p.title}
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed pl-5.5">{p.description}</p>
                      </div>
                    )) : [
                      { t: "Sterile OT & Single-Use Instruments", d: "HEPA-filtered air, single-use surgical kits, sterilised surfaces for every procedure." },
                      { t: "Doctor-Led Extraction & Implantation", d: "No technician handles graft extraction, channel creation, or placement at Ryan Clinic." },
                      { t: "Careful Graft Handling", d: "Minimising time outside the body, chilled preservation solution, and unhurried extraction protect graft survival." },
                      { t: "Structured Aftercare & Follow-Up", d: "Written aftercare, prescribed medication, and in-clinic check-ins through the full growth cycle." },
                    ].map((p, i) => (
                      <div key={i} className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <h5 className="font-bold text-sm md:text-base text-emerald-900 mb-1 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" /> {p.t}
                        </h5>
                        <p className="text-sm text-gray-700 leading-relaxed pl-5.5">{p.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Image */}
            <Reveal direction="right" delay={120}>
              <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/uploads/1752734248947-Hair Transplant 1.jpg"
                  alt="Doctor-led hair transplant procedure at Ryan Clinic Delhi — sterile OT"
                  fill
                  className="object-cover object-center"
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1430]/90 via-[#1a1430]/30 to-transparent" />
                {/* Badge */}
                <div className="absolute top-5 right-5">
                  <span className="inline-flex items-center gap-2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Doctor-Led Only
                  </span>
                </div>
                {/* Bottom card */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-xl">
                    <p className="text-[10px] font-bold text-[#e30a17] uppercase tracking-wider mb-2">Why Operator Skill Matters Most</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Poor results from technician-led surgery is exactly why doctor-led work, sterile OT, and natural design are the most important factors in your outcome.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEW SECTION 5: Real Patient Results (Big Transformations Design) ─ */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Patient Transformations" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] mb-4 font-outfit">
            {resultsHeading}
          </h2>
          {resultsDesc ? (
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 font-sans">{resultsDesc}</p>
          ) : (
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 font-sans">
              Our results aren&apos;t just great — they&apos;re <strong className="text-gray-800">outstanding</strong>. Real hair transplant outcomes from Ryan Clinic.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {resultCases.map((c, i) => {
              const hasSeparateImages = c.beforeImage?.image && c.afterImage?.image;
              const singleImage = c.beforeImage?.image || c.afterImage?.image || "/uploads/1752734248947-Hair Transplant 1.jpg";

              // Format text string for caption: "FUE · 3200 grafts · 12 Months"
              const captionParts = [];
              if (c.technique) captionParts.push(c.technique);
              if (c.graftCount) captionParts.push(c.graftCount);
              if (c.recoveryTime) captionParts.push(c.recoveryTime);
              const captionText = captionParts.length > 0 ? captionParts.join(" · ") : "FUE · 3200 grafts · 12 Months";

              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-red-100/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col justify-between group"
                >
                  {/* Big Image Container */}
                  <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden bg-gray-100">
                    {hasSeparateImages ? (
                      <div className="grid grid-cols-2 h-full w-full relative divide-x divide-white/20">
                        {/* Before Side */}
                        <div className="relative h-full w-full overflow-hidden">
                          <Image
                            src={c.beforeImage.image}
                            alt="Before"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            unoptimized
                          />
                          <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                            BEFORE
                          </span>
                        </div>

                        {/* After Side */}
                        <div className="relative h-full w-full overflow-hidden">
                          <Image
                            src={c.afterImage.image}
                            alt="After"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            unoptimized
                          />
                          <span className="absolute top-3 right-3 bg-[#e30a17] text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                            AFTER
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src={singleImage}
                          alt={c.patientName || "Transformation Result"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          unoptimized
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-black/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                            BEFORE
                          </span>
                          <span className="bg-[#e30a17] text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                            AFTER
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* White Caption Footer (Matches Gallery Image Style) */}
                  <div className="p-5 sm:p-6 bg-white border-t border-gray-100 flex flex-col justify-center">
                    <p className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight font-sans">
                      {captionText}
                    </p>
                    {c.description && (
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed font-sans">
                        {c.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. Meet Your Surgeons (Doctor Spotlight Split Layout - Image Right, About Left) ── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="text-left">
              <SectionLabel text="Certified Plastic Surgeons" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 font-outfit">
                {doctorsHeading}
              </h2>
              <p className="text-gray-500 text-base md:text-lg mt-2 font-sans">{doctorsDesc}</p>
            </div>
            <a href="/doctors" className="shrink-0 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 px-5 text-sm transition-all rounded-xl shadow-xs">
              {doctorsTopBtn} <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Active Doctor Spotlight Card */}
          {DOCTORS.length > 0 && (() => {
            const activeDoc = DOCTORS[activeDocIdx] || DOCTORS[0];
            return (
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

                  {/* ── LEFT (col-span-7): About Doctor ── */}
                  <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-extrabold text-[#e30a17] bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          ★ Senior Plastic Surgeon
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          {activeDoc.location || "Delhi Clinic"}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-bold text-[#302658] mb-1 font-outfit">
                        {activeDoc.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#e30a17] mb-5 font-sans">
                        {activeDoc.role}
                      </p>

                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-sans">
                        {activeDoc.bio}
                      </p>

                      {/* 4 Stat Boxes Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        <div className="bg-[#FAF6F3] p-3 rounded-2xl border border-gray-200/80 text-center">
                          <span className="text-lg sm:text-xl font-black text-[#e30a17] block font-outfit">
                            {activeDoc.exp}
                          </span>
                          <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-0.5 font-sans">
                            Experience
                          </span>
                        </div>

                        <div className="bg-[#FAF6F3] p-3 rounded-2xl border border-gray-200/80 text-center">
                          <span className="text-lg sm:text-xl font-black text-gray-900 block font-outfit">
                            {activeDoc.procedures}
                          </span>
                          <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-0.5 font-sans">
                            Procedures
                          </span>
                        </div>

                        <div className="bg-[#FAF6F3] p-3 rounded-2xl border border-gray-200/80 text-center">
                          <span className="text-lg sm:text-xl font-black text-emerald-600 block font-outfit">
                            {activeDoc.survivalRate}
                          </span>
                          <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-0.5 font-sans">
                            Graft Survival
                          </span>
                        </div>

                        <div className="bg-[#FAF6F3] p-3 rounded-2xl border border-gray-200/80 text-center">
                          <span className="text-lg sm:text-xl font-black text-amber-500 block font-outfit">
                            {activeDoc.rating}
                          </span>
                          <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-0.5 font-sans">
                            Patient Rating
                          </span>
                        </div>
                      </div>

                      {/* Qualifications & Highlights */}
                      <div className="mb-6 space-y-2">
                        {activeDoc.quals.map((q, j) => (
                          <div key={j} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-semibold font-sans">
                            <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" />
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
                      <a
                        href={heroWALink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5"
                      >
                        Book Doctor Consult <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href={`/doctors/${activeDoc.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold py-3.5 px-6 rounded-xl text-xs transition-all shadow-xs"
                      >
                        View Profile Details
                      </a>
                    </div>
                  </div>

                  {/* ── RIGHT (col-span-5): Doctor Image ── */}
                  <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[500px] bg-gray-900 overflow-hidden">
                    <Image
                      src={activeDoc.image}
                      alt={activeDoc.imageAlt || activeDoc.name}
                      fill
                      className="object-cover object-top"
                      unoptimized
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-2 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {activeDoc.location || "Delhi Clinic"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-[#e30a17] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                        <ShieldCheck className="w-3 h-3" />
                        Turkey Certified
                      </span>
                    </div>

                    {/* Bottom Photo Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white z-10 text-left">
                      <p className="text-[#FFC107] text-[10px] font-extrabold uppercase tracking-widest mb-1">
                        {activeDoc.role}
                      </p>
                      <h4 className="text-2xl font-black text-white font-outfit">
                        {activeDoc.name}
                      </h4>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

          {/* Doctor Selection Tabs if multiple doctors */}
          {DOCTORS.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3 overflow-x-auto pb-2">
              {DOCTORS.map((d, idx) => {
                const isActive = idx === activeDocIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveDocIdx(idx)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                      isActive
                        ? "bg-white border-[#e30a17] shadow-md ring-2 ring-[#e30a17]/20 scale-102"
                        : "bg-white/70 border-gray-200 hover:bg-white"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      <Image src={d.image} alt={d.name} fill className="object-cover object-top" unoptimized />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isActive ? "text-[#e30a17]" : "text-gray-800"}`}>
                        {d.name}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate max-w-[120px]">
                        {d.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ── 10. Pricing (Original Layout + Bottom Explanatory Block) ──────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="mb-10">
              <SectionLabel text="Transparent Pricing" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mt-2 mb-3">
                {pricingHeading}
              </h2>
              <div className="text-gray-500 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
                {pricingDesc ? (
                  <div dangerouslySetInnerHTML={{ __html: sanitizeContent(pricingDesc) }} />
                ) : (
                  <p>No hidden charges, no unexpected OT fees. Pricing is calculated strictly on graft count with full transparency.</p>
                )}
              </div>
            </div>
          </RevealSection>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {pricingStats.length > 0 &&
              pricingStats.map((stat, i) => (
                <AnimatedCard
                  key={i}
                  delay={i * 80}
                  className="bg-[#F7F5F2] rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="w-9 h-9 rounded-lg bg-white text-[#e30a17] flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                      {PRICING_STAT_ICONS[i % PRICING_STAT_ICONS.length]}
                    </span>
                    <p className="text-xl md:text-2xl font-extrabold text-[#302658] mb-0.5">{stat.value}</p>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">{stat.label}</p>
                  </div>
                </AnimatedCard>
              ))}
          </div>

          {/* Additional Pricing Factors / Notes Block */}
          {(pricingFactors.length > 0 || pricingNotes) && (
            <div className="mb-8 p-6 bg-[#F7F5F2] rounded-2xl border border-gray-200">
              {pricingFactors.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-sm text-[#302658] mb-2">Cost Influencing Factors:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {pricingFactors.map((factor, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-xs text-gray-700 bg-white p-2.5 rounded-lg border border-gray-100">
                        <Check className="w-3.5 h-3.5 text-[#e30a17] shrink-0" />
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {pricingNotes && <div className="text-xs text-gray-600 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: sanitizeContent(pricingNotes) }} />}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 items-center mb-10">
            <a
              href={pricingWA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-semibold py-3 px-6 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-md shadow-red-200 hover:-translate-y-0.5 active:translate-y-0"
              onClick={() =>
                trackCTA({
                  type: "whatsapp",
                  ctaName: `Pricing: ${pricingWALabel}`,
                  buttonLocation: "Pricing Box",
                })
              }
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {pricingWALabel || "Calculate My Cost on WhatsApp"}
            </a>

            <a
              href={pricingTel}
              className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-[#302658] hover:text-[#e30a17] hover:border-red-200 font-semibold py-3 px-6 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5"
              onClick={() =>
                trackCTA({
                  type: "call",
                  ctaName: `Pricing: ${pricingTelLabel}`,
                  buttonLocation: "Pricing Box",
                })
              }
            >
              <Phone className="w-4 h-4" />
              {pricingTelLabel || "Call for Pricing Quote"}
            </a>

            {pricingGuide && (
              <a href={pricingGuide} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] hover:underline py-3 px-1">
                {pricingGuideLabel || "Read Full Cost Breakdown Guide"} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {pricingWarning && (
            <div className="w-full bg-[#F7F5F2] border-l-4 border-[#e30a17] p-4 rounded-r-xl text-xs md:text-sm text-gray-600 leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-[#302658]">Pricing Advisory: </strong>
                <span>{pricingWarning}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY DOCTOR-LED CLINIC MATTERS ─────────────────────────────────── */}
      <WhyDoctorMattersSection
        heading={whyChooseUs.heading || undefined}
        description={whyChooseUs.description || undefined}
        risks={
          whyChoosePoints.length > 0
            ? whyChoosePoints.map((pt, i) => ({
                number: String(i + 1).padStart(2, "0"),
                title: pt.title,
                body: pt.description,
                type: i % 2 === 0 ? "check" : "warn",
              }))
            : undefined
        }
      />

      {/* ── 11. Visit Clinic (Original Layout) ────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel text="Visit Our Center" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight">
              {visitHeading}
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">{visitDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {infoCards.length > 0 ? (
              infoCards.map((card, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${VISIT_COLORS[i % VISIT_COLORS.length] ?? "bg-gray-50 text-gray-600"}`}>
                    {VISIT_ICONS[i % VISIT_ICONS.length] ?? <MapPin className="w-5 h-5" />}
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{card.title}</p>
                  <p className="text-sm md:text-base text-[#302658] font-semibold leading-relaxed">{card.description}</p>
                </div>
              ))
            ) : null}
          </div>

          {nearbyLocs.length > 0 && (
            <div className="mb-8 text-center">
              <span className="text-xs font-bold text-[#302658] uppercase tracking-wider block mb-2">Nearby Served Locations:</span>
              <div className="flex flex-wrap justify-center gap-2">
                {nearbyLocs.map((loc, idx) => (
                  <span key={idx} className="bg-white text-gray-700 text-xs px-3 py-1 rounded-lg border border-gray-200">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <CTAButtons primary={visitBtnLabel} waLink={visitBtnWA} telLink={heroTelLink} center />
          </div>
        </div>
      </section>

      {/* ── 12. Consultation CTA & Form ─────────────────── */}
      <section id="appointment-form" className="py-16 md:py-24 bg-[#FAF6F3] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column — Consultation Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#e30a17]/10 border border-[#e30a17]/20 text-[#e30a17] text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e30a17] animate-pulse" />
                  Consultation Booking
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                  {consultHeading || "Book Your Free Consultation"}
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans">
                  {consultDesc || "Speak directly with our senior surgeon. We'll assess your hair loss, show you before/after results of similar cases, and give you an honest graft count and cost estimate — no pressure, no obligations."}
                </p>
              </div>

              {/* Direct Contact Cards */}
              <div className="space-y-3">
                {CONTACT_CARDS.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target={item.ext ? "_blank" : undefined}
                    rel={item.ext ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#e30a17]/40 shadow-xs hover:shadow-md transition-all duration-200 group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#e30a17]/10 text-[#e30a17] flex items-center justify-center shrink-0 group-hover:bg-[#e30a17] group-hover:text-white transition-colors duration-200">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{item.title}</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5 truncate group-hover:text-[#e30a17] transition-colors">{item.val}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#e30a17] group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {CONSULT_STATS.length > 0 ? (
                  CONSULT_STATS.map((s, i) => (
                    <div key={i} className="bg-white border border-gray-200/80 rounded-2xl p-3.5 text-center shadow-xs">
                      <p className="text-lg font-black text-[#e30a17]">{s.n}</p>
                      <p className="text-[9px] font-bold text-gray-500 mt-0.5 uppercase tracking-wider">{s.l}</p>
                    </div>
                  ))
                ) : (
                  [["12+", "Years Care"], ["10K+", "Procedures"], ["95%+", "Graft Rate"], ["4.9 ★", "Reviews"]].map(([n, l]) => (
                    <div key={l} className="bg-white border border-gray-200/80 rounded-2xl p-3.5 text-center shadow-xs">
                      <p className="text-lg font-black text-[#e30a17]">{n}</p>
                      <p className="text-[9px] font-bold text-gray-500 mt-0.5 uppercase tracking-wider">{l}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column — Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 relative">
                {/* Form header */}
                <div className="mb-6 flex items-start justify-between gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{formTitle || "Book Your Free Consult Now!"}</h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Takes less than 60 seconds • No obligation</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase">Secure</span>
                  </div>
                </div>

                {/* Form */}
                <div className="w-full">
                  <ContactForm />
                </div>

                {/* Trust note */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-2.5 text-xs text-gray-500 leading-relaxed font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p>Your personal &amp; medical details are fully encrypted. We never share your contact info with third parties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. FAQ (Original FAQ Component) ─────────────────────────────── */}
      <FAQSection faqs={FAQS} />

      {/* ── DYNAMIC INTERNAL LINKS (If provided) ─────────────────────────── */}
      {linksList.length > 0 && (
        <section className="bg-[#F7F5F2] py-10 border-t border-gray-200">
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

      {/* ── Disclaimer ─────────────────────────────────────────────────── */}
      <div className="bg-[#F7F5F2] border-t border-gray-200/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 leading-relaxed max-w-4xl font-sans">
            <strong className="text-gray-500">Medical disclaimer:</strong> The content provided on this page is for general information only and does not substitute professional medical diagnosis or treatment options. Results can vary between candidates.{" "}
            <a href="/privacy-policy" className="underline text-[#e30a17] hover:opacity-85 font-medium">Privacy Policy</a>
            {" · "}
            <a href="/terms-and-conditions" className="underline text-[#e30a17] hover:opacity-85 font-medium">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </>
  );
}
