"use client";

import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "@/components/surgery/FAQSection";
import PageBanner from "@/components/layouts/pageBanner";
import useTrackCTA from "@/lib/useTrackCTA";
import {
  AnimatedCard,
  Reveal,
  RevealSection,
} from "./AnimatedPage";
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
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const WA =
  "https://api.whatsapp.com/send?phone=+919911111247&text=Hi,%20I%20want%20to%20book%20a%20consultation%20for%20hair%20transplant%20surgery";
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
  <MapPin className="w-5 h-5" />,
  <Phone className="w-5 h-5" />,
  <Clock className="w-5 h-5" />,
  <ArrowRight className="w-5 h-5" />,
  <Star className="w-5 h-5" />,
  <Users className="w-5 h-5" />,
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

function SectionLabel({ text, center = false }) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${center ? "justify-center" : ""}`}>
      <span className="w-2 h-2 rounded-full bg-[#e30a17] shadow-sm" />
      <span className="text-[#e30a17] text-[11px] font-bold tracking-[0.2em] uppercase">{text}</span>
    </div>
  );
}

function CTAButtons({ primary = "Book Free Scalp Analysis", waLink = "", telLink = "", center = false }) {
  const trackCTA = useTrackCTA();
  return (
    <div className={`flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>
      <a
        href={waLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-[#e30a17] hover:bg-red-700 text-white font-semibold py-4 px-7 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-lg shadow-red-200 hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => trackCTA({ type: "whatsapp", ctaName: `Surgery: ${primary}`, buttonLocation: "Surgery Page Content" })}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        {primary}
      </a>
      <a
        href={telLink || "tel:+919911111247"}
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
  // ─── Section extraction ───────────────────────────────────────────────────
  const hero = data?.hero ?? {};
  const introduction = data?.introduction ?? {};
  const procedureScience = data?.procedureScience ?? {};
  const safety = data?.safety ?? {};
  const techniques = data?.techniques ?? {};
  const qualityBenchmarks = data?.qualityBenchmarks ?? {};
  const procedureTimeline = data?.procedureTimeline ?? {};
  const recoveryTimeline = data?.recoveryTimeline ?? {};
  const doctorsSection = data?.doctors ?? {};
  const pricing = data?.pricing ?? {};
  const visitClinic = data?.visitClinic ?? {};
  const consultation = data?.consultation ?? {};
  const faqSection = data?.faq ?? {};

  // ─── Hero ─────────────────────────────────────────────────────────────────
  const heroTitle = hero.title;
  const heroDesc = hero.description;
  const heroBreadcrumb = hero.breadcrumb;
  const heroBgImage = hero.heroImage?.image || "/uploads/1752667815707-fue-banner_ro9ae6.webp";
  const heroWALink = hero.whatsappText?.link;
  const heroTelLink = hero.callText?.link;
  const heroStats = hero.stats ?? [];

  // ─── Introduction ─────────────────────────────────────────────────────────
  const introSmallHeading = introduction.smallHeading;
  const introTitle = introduction.title;
  const introDescription = introduction.description;
  const introHighlightBox = introduction.highlightBoxText;
  const introMainImage = introduction.mainImage?.image;
  const introMainImageAlt = introduction.mainImage?.imageAlt;
  const introFloatImage = introduction.floatingImage?.image;
  const introFloatImageAlt = introduction.floatingImage?.imageAlt;
  const introStats = introduction.bottomStats ?? [];
  const introPrimaryWA = introduction.primaryCTA?.link;
  const introPrimaryLabel = introduction.primaryCTA?.text;

  // ─── Procedure Science ────────────────────────────────────────────────────
  const scienceHeading = procedureScience.mainHeading;
  const scienceDesc = procedureScience.description;
  const scienceCards = procedureScience.cards ?? [];
  const SCIENCE_ROWS = scienceCards;

  // ─── Helper for science icons ─────────────────────────────────────────────
  const getScienceIcon = (iconName, index) => {
    return SCIENCE_ICONS[index % SCIENCE_ICONS.length];
  };

  // ─── Safety ───────────────────────────────────────────────────────────────
  const safetyHeading = safety.heading;
  const safetyDesc = safety.description;
  const safetyCards = safety.safetyCards ?? [];
  const rightBox = safety.rightSideHighlightBox ?? {};
  const rightBoxBadge = rightBox.smallHeading;
  const rightBoxTitle = rightBox.title;
  const rightBoxDesc = rightBox.description;
  const rightBoxMetrics = rightBox.metrics ?? [];
  const rightBoxNotice = rightBox.bottomNotice;

  // ─── Techniques ───────────────────────────────────────────────────────────
  const techHeading = techniques.heading;
  const techDesc = techniques.description;
  const techItems = techniques.techniques ?? [];
  const bottomCTA = techniques.bottomCTABlock ?? {};
  const bottomCTAHeading = bottomCTA.heading;
  const bottomCTADesc = bottomCTA.description;
  const bottomCTAWA = bottomCTA.primaryCTA?.link || heroWALink;
  const bottomCTAWALabel = bottomCTA.primaryCTA?.text;
  const bottomCTAGuideLink = techniques.techniques?.[0]?.ctaText?.link;
  const TECHNIQUES_DATA = techItems;

  // ─── Quality Benchmarks ───────────────────────────────────────────────────
  const qualityHeading = qualityBenchmarks.heading;
  const qualityDesc = qualityBenchmarks.description;
  const benchmarkCards = qualityBenchmarks.benchmarkCards ?? [];
  const QUALITY_POINTS = benchmarkCards;

  // ─── Procedure Timeline ───────────────────────────────────────────────────
  const timelineHeading = procedureTimeline.heading;
  const timelineDesc = procedureTimeline.description;
  const timelineBottomNote = procedureTimeline.bottomHighlightMessage;
  const timelineSteps = procedureTimeline.timelineSteps ?? [];
  const STEPS = timelineSteps.map((s, i) => ({
    num: s.stepNumber || String(i + 1).padStart(2, "0"),
    tag: s.badge || s.title || "Step",
    image: s.stepImage?.image,
    alt: s.stepImage?.imageAlt || s.title || "",
    title: s.title || "",
    desc: s.description || "",
    icon: STEP_ICONS[i] ?? <Activity key={i} className="w-5 h-5" />,
  }));

  // ─── Recovery Timeline ────────────────────────────────────────────────────
  const recoveryHeading = recoveryTimeline.heading;
  const recoveryDesc = recoveryTimeline.description;
  const leftCard = recoveryTimeline.leftHighlightCard ?? {};
  const leftCardTitle = leftCard.title;
  const leftCardDesc = leftCard.description;
  const leftCardStats = leftCard.statistics ?? [];
  const leftCardDuration = leftCard.icon;
  const recoveryStages = recoveryTimeline.recoveryStages ?? [];
  const RECOVERY = recoveryStages.map((s, i) => ({
    time: s.duration || s.title || "",
    label: s.title || "",
    desc: s.description || "",
    icon: RECOVERY_ICONS[i] ?? <Activity key={i} className="w-6 h-6" />,
    color: RECOVERY_COLORS[i] ?? "bg-blue-50 text-blue-600 border-blue-100",
  }));

  // ─── Doctors ──────────────────────────────────────────────────────────────
  const doctorsHeading = doctorsSection.heading || "Meet Your Hair Transplant Surgeon";
  const doctorsDesc = doctorsSection.description || "100% doctor-led procedures with Turkey-certified surgical precision.";
  const doctorsTopBtn = doctorsSection.topButtonText || "View All Doctors";
  const doctorsList = doctorsSection.doctors ?? [];
  const DOCTORS = doctorsList.map((d) => ({
    name: d.name || "Dr. Ryan Sharma",
    role: d.designation || "Chief Plastic Surgeon (M.S., M.Ch Plastic Surgery)",
    image: d.doctorImage?.image || "/uploads/gallery.jpg",
    imageAlt: d.doctorImage?.imageAlt || d.name || "Dr. Ryan Sharma",
    exp: d.experience || "14+ Years",
    procedures: d.proceduresCount || "6,500+",
    quals: d.qualifications?.length ? d.qualifications : [
      "M.Ch Plastic Surgery (AIIMS New Delhi)",
      "ISHRS Member (USA) — International Society of Hair Restoration Surgery",
      "Turkey Hair Restoration Fellowship — Istanbul Hair Institute"
    ],
    bio: d.bio || d.description || "Pioneer in Turkey Sapphire FUE & Turkish Technique Choi Pen hair restoration techniques. Personally conducts 100% of surgical incisions and graft extractions with high-density precision.",
    specializations: d.specializations?.length ? d.specializations : [
      "Turkey Sapphire FUE",
      "Turkish Technique Choi Pen",
      "Micro-Hairline Design",
      "Crown Restoration",
      "High Graft Density",
      "100% Doctor-Led"
    ],
    btnText: d.profileButtonText || "Book Consult",
  }));

  // ─── Pricing ──────────────────────────────────────────────────────────────
  const pricingHeading = pricing.heading;
  const pricingDesc = pricing.description;
  const pricingWarning = pricing.warningText;
  const pricingStats = pricing.pricingStats ?? [];
  const pricingWA = pricing.ctaTextWhatsApp?.link || heroWALink;
  const pricingWALabel = pricing.ctaTextWhatsApp?.text;
  const pricingTel = pricing.ctaTextCall?.link || heroTelLink;
  const pricingTelLabel = pricing.ctaTextCall?.text;
  const pricingGuide = pricing.ctaTextGuide?.link;
  const pricingGuideLabel = pricing.ctaTextGuide?.text;

  // ─── Visit Clinic ─────────────────────────────────────────────────────────
  const visitHeading = visitClinic.heading;
  const visitDesc = visitClinic.description;
  const infoCards = visitClinic.informationCards ?? [];
  const visitBtnWA = visitClinic.buttonText?.link;
  const visitBtnLabel = visitClinic.buttonText?.text;

  // ─── Consultation ─────────────────────────────────────────────────────────
  const consultBgImage = consultation.backgroundImage?.image || "/uploads/gallery.jpg";
  const leftSide = consultation.leftSide ?? {};
  const consultHeading = leftSide.heading;
  const consultDesc = leftSide.description;
  const contactCards = leftSide.contactCards ?? [];
  const CONTACT_CARDS = contactCards.map((c, i) => ({
    icon: CONSULTATION_ICONS[i] ?? <Phone key={i} className="w-4 h-4" />,
    title: c.title || "",
    val: c.description || "",
    link: c.link || "#",
    ext: c.ext ?? false,
  }));
  const formConfig = consultation.consultationFormConfig ?? {};
  const formTitle = formConfig.title;

  const faqStats = faqSection.stats ?? [];
  const FAQS = (faqSection.faqs ?? []).map((f) => ({ q: f.question, a: f.answer }));
  const CONSULT_STATS = faqStats.slice(0, 4).map((s) => ({ n: s.value, l: s.label }));

  const introGridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <>
      {/* ── 1. Page Banner ─────────────────────────────────────────────── */}
      <PageBanner
        breadcrumb={heroBreadcrumb}
        title={heroTitle}
        description={heroDesc}
        bgImage={heroBgImage}
        stats={heroStats}
      />

      {/* ── 2. About Section (Premium Redesigned Showcase) ─────────────── */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        {/* Subtle decorative background gradients */}
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
                    <div dangerouslySetInnerHTML={{ __html: introDescription }} />
                  ) : (
                    <p>
                      Hair transplant surgery is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — ensuring no general anaesthesia risks and no hospital stay. A surgeon relocates your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently.
                    </p>
                  )}

                  {/* Highlighted box */}
                  {introHighlightBox && (
                    <div className="bg-[#F7F5F2] border-l-4 border-[#e30a17] p-5 rounded-r-2xl my-4">
                      <div className="font-semibold text-gray-900 text-sm" dangerouslySetInnerHTML={{ __html: introHighlightBox }} />
                    </div>
                  )}
                </div>

                {/* Key stats inside About section */}
                {introStats.length > 0 ? (
                  <div
                    className={`grid ${introGridCols[Math.min(introStats.length, 4)] || "grid-cols-4"} gap-4 pt-4 pb-6 border-y border-gray-100`}
                  >
                    {introStats.map((s, i) => (
                      <div key={i}>
                        <p className="text-lg md:text-xl font-black text-[#e30a17]">{s.value}</p>
                        <p className="text-gray-400 text-xs mt-0.5 font-medium">{s.label}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 pt-4 pb-6 border-y border-gray-100">
                    <div>
                      <p className="text-lg md:text-xl font-black text-[#e30a17]">100%</p>
                      <p className="text-gray-400 text-xs mt-0.5 font-medium">Doctor Led</p>
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-black text-gray-900">95%+</p>
                      <p className="text-gray-400 text-xs mt-0.5 font-medium">Graft Survival</p>
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-black text-gray-900">NABH</p>
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
            <div className="lg:col-span-6 w-full">
              <Reveal direction="right" delay={120}>
                {/* Outer wrapper with extra padding to give space for the front card to overflow */}
                <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[580px]">

                  {/* ── Back image (large, fills container) ── */}
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
                    {/* Top label on back image */}
                    <div className="absolute top-5 left-5">
                      <span className="bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Sapphire FUE Procedure
                      </span>
                    </div>
                  </div>

                  {/* ── Front image (smaller card, overlapping bottom-right) ── */}
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
                    {/* Small label inside front card */}
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

                  {/* ── Decorative dot accent between the two images ── */}
                  <div className="absolute top-[45%] right-[8%] w-14 h-14 rounded-full bg-[#e30a17]/10 border-2 border-[#e30a17]/20 z-0 hidden lg:block" />
                  <div className="absolute top-[48%] right-[11%] w-6 h-6 rounded-full bg-[#e30a17]/20 z-0 hidden lg:block" />

                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. What is Hair Transplant? — Criss-cross image+content ───── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-left max-w-3xl mb-12">
              <SectionLabel text="Procedure Science" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mt-2 mb-4">
                {scienceHeading}
              </h2>
              <div className="text-gray-500 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: scienceDesc }} />
            </div>
          </RevealSection>

          {/* Criss-cross rows */}
          {SCIENCE_ROWS.length > 0 &&
            SCIENCE_ROWS.map((row, i) => {
              const isReverse = i % 2 === 1;
              const bullets =
                row.bulletPoints && row.bulletPoints.length >= 3
                  ? row.bulletPoints
                  : [
                    "Micro-punch precision harvesting for zero linear scarring",
                    "Controlled depth & angle preserving natural scalp tissue",
                    "High-viability graft preservation in sterile solution",
                    "Fast donor zone healing within 3 to 5 days",
                  ];
              const cardMetrics = row.metrics || [
                { label: "Precision", value: "0.7mm" },
                { label: "Graft Survival", value: "95%+" },
                { label: "Recovery", value: "3 Days" },
              ];

              return (
                <div
                  key={i}
                  className={`flex flex-col ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0 items-stretch mb-12 last:mb-0 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 bg-white`}
                >
                  {/* Image side with label */}
                  <div className="lg:w-[44%] relative min-h-[280px] lg:min-h-[360px] overflow-hidden group">
                    {row.cardImage?.image ? (
                      <Image
                        src={row.cardImage.image}
                        alt={row.cardImage.imageAlt || row.title || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 44vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    {/* Bold word overlay background */}
                    {row.badge && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-white font-black tracking-[0.3em] select-none pointer-events-none"
                          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", opacity: 0.15 }}
                        >
                          {row.badge.toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Step indicator badge on image top-left */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                        Step 0{i + 1} Procedure
                      </span>
                    </div>

                    {/* Bottom badge */}
                    {row.badge && (
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3.5 py-1.5 text-white text-[11px] font-bold tracking-widest uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          {row.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content side — Tighter & Sleek Layout */}
                  <div className="lg:w-[56%] bg-white p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-9 h-9 rounded-xl bg-red-50 text-[#e30a17] flex items-center justify-center font-bold text-xs border border-red-100 shrink-0">
                            {getScienceIcon(row.icon, i)}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#e30a17]">
                            Surgical Phase 0{i + 1}
                          </span>
                        </div>
                        <span className="hidden sm:inline-block text-[9px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50 border border-gray-200 rounded-full px-2.5 py-0.5">
                          100% Doctor-Led Standard
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2.5 leading-tight">
                        {row.title}
                      </h3>

                      {/* Description Box */}
                      <div className="bg-[#F7F5F2] rounded-xl p-3 border border-gray-100 mb-4">
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                          {row.description}
                        </p>
                      </div>

                      {/* Bullet points grid */}
                      <div className="mb-4">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                          Key Clinical Advantages
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {bullets.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-gray-800 leading-snug bg-gray-50/80 p-2 rounded-lg border border-gray-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#e30a17] shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Specs Bar */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2 bg-red-50/50 border border-red-100 rounded-lg p-2.5 text-center">
                        {cardMetrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <p className="text-xs sm:text-sm font-extrabold text-[#e30a17]">{m.value}</p>
                            <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>      {/* ── 4. Safety Section ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <SectionLabel text="Safety & Standards" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                  {safetyHeading}
                </h2>
                <div className="text-gray-500 text-sm md:text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: safetyDesc }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {safetyCards.length > 0 &&
                    safetyCards.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-5 bg-[#F7F5F2] rounded-2xl border border-gray-100"
                      >
                        <span className="w-10 h-10 rounded-xl bg-white text-[#e30a17] flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                          {getSafetyIcon(item.icon, i)}
                        </span>

                        <div>
                          <h4 className="font-bold text-sm text-gray-900">
                            {item.title}
                          </h4>

                          <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>


              </Reveal>
            </div>

            <div className="lg:col-span-5 flex">
              <Reveal direction="right" delay={150} className="w-full">
                <div className="bg-[#1a1430] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div>
                    <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{rightBoxBadge}</p>
                    <h3 className="text-xl font-bold text-white mb-3">{rightBoxTitle}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">{rightBoxDesc}</p>
                    <div className="divide-y divide-white/10">
                      {rightBoxMetrics.length > 0 &&
                        rightBoxMetrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-4 py-3.5">
                            <span className="text-xl font-extrabold text-[#e30a17] w-14 shrink-0">
                              {metric.value}
                            </span>
                            <span className="text-gray-300 text-sm font-medium leading-snug">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-white/40 text-xs leading-relaxed">All metrics are based on procedures performed at Ryan Clinic under NABH-certified sterile conditions.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Full-width Patient Transparency Note */}
          {rightBoxNotice && (
            <div className="mt-10">
              <Reveal>
                <div className="flex items-start gap-4 border-l-4 border-[#e30a17] bg-[#FFF8F8] rounded-r-2xl p-5">
                  <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[#e30a17]" />
                  <div className="text-sm md:text-base text-gray-700 leading-relaxed">
                    <strong className="font-bold text-[#302658]">Patient Transparency Note: </strong>
                    <span dangerouslySetInnerHTML={{ __html: rightBoxNotice }} />
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. Surgical Methodologies ─────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">

          {/* Header */}
          <RevealSection>
            <div className="text-left max-w-3xl mb-12">
              <SectionLabel text="Surgical Techniques" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mt-2 mb-4">
                {techHeading}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {techDesc}
              </p>
            </div>
          </RevealSection>

          {/* Techniques — horizontal comparison table style */}
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
                    {isFeatured && (
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#e30a17]/15 rounded-full blur-3xl pointer-events-none" />
                    )}
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
                      <h3 className={isFeatured ? "text-xl font-black text-white mb-1" : "text-xl font-black text-gray-900 mb-1"}>
                        {tech.name}
                      </h3>
                      <p className={isFeatured ? "text-sm text-white/50 font-semibold mb-4" : "text-sm text-gray-400 font-semibold mb-4"}>
                        {tech.subtitle}
                      </p>
                      <div className={isFeatured ? "text-white/70 text-sm leading-relaxed flex-1" : "text-gray-500 text-sm leading-relaxed flex-1"} dangerouslySetInnerHTML={{ __html: tech.description }} />

                      {tech.bulletPoints && tech.bulletPoints.length > 0 && (
                        <div className={"mt-6 pt-5 border-t " + (isFeatured ? "border-white/10" : "border-gray-100") + " space-y-2"}>
                          {tech.bulletPoints.map((f) => (
                            <div key={f} className={"flex items-center gap-2.5 text-sm font-medium " + (isFeatured ? "text-white" : "text-gray-900")}>
                              <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" /> {f}
                            </div>
                          ))}
                        </div>
                      )}

                      {tech.bottomStatistics && tech.bottomStatistics.length > 0 && (
                        <div className={"mt-5 pt-5 border-t " + (isFeatured ? "border-white/10" : "border-gray-100") + " grid grid-cols-2 gap-4"}>
                          {tech.bottomStatistics.map((stat, sIdx) => (
                            <div key={sIdx}>
                              <p className={"text-lg font-black " + (isFeatured ? "text-white" : "text-gray-900")}>{stat.value}</p>
                              <p className={(isFeatured ? "text-white/40" : "text-gray-400") + " text-xs mt-0.5"}>{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <a href={tech.ctaText?.link || "/hair-transplant-cost-in-delhi"} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] mt-6 hover:underline">
                        {tech.ctaText?.text || "See pricing"} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </AnimatedCard>
                );
              })
            ) : null}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-10 bg-[#F7F5F2] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 border border-gray-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#e30a17] mb-1">{bottomCTAHeading}</p>
              <h4 className="text-lg md:text-xl font-bold text-[#302658]">{bottomCTADesc}</h4>
            </div>
            <div className="shrink-0">
              <CTAButtons primary={bottomCTAWALabel} waLink={bottomCTAWA} telLink={heroTelLink} />
            </div>
          </div>

          <div className="text-center mt-6">
            <a href={bottomCTAGuideLink} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] hover:underline">
              Full cost &amp; technical breakdown of FUE vs THI → Hair Transplant Cost Guide <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>


      {/* ── 6. What Defines a Premium Surgery — full width ──────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <SectionLabel text="Quality Benchmarks" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              {qualityHeading}
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
              {qualityDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUALITY_POINTS.length > 0 ? (
              QUALITY_POINTS.map((point, i) => (
                <AnimatedCard key={i} className="bg-[#F7F5F2] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300" delay={i * 60}>
                  <span className="w-8 h-8 rounded-full bg-[#e30a17]/10 text-[#e30a17] flex items-center justify-center text-xs font-extrabold mb-4">
                    {point.number || String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-sans">{point.description}</p>
                </AnimatedCard>
              ))
            ) : null}
          </div>
        </div>
      </section>

      {/* ── 7. Step-by-Step Procedure — vertical timeline with images ── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-left max-w-3xl mb-12">
              <SectionLabel text="Day of Surgery" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mt-2 mb-4">
                {timelineHeading}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {timelineDesc}
              </p>
            </div>
          </RevealSection>

          {/* Vertical timeline */}
          <div className="relative">
            <div className="relative space-y-12">
              {/* Vertical line (Red & strictly bounded inside the steps container) */}
              <div className="absolute left-1/2 -translate-x-px top-2 bottom-2 w-0.5 bg-[#e30a17] hidden md:block" />

              {STEPS.map((step, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <div key={i} className={`flex flex-col md:flex-row gap-8 items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
                    {/* Image card */}
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
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                              No Image
                            </div>
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

                    {/* Center node */}
                    <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#e30a17] flex items-center justify-center text-[#e30a17] font-black text-sm shadow-md">
                        {step.num}
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="w-full md:w-[45%]">
                      <AnimatedCard className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm ${isRight ? "md:mr-8" : "md:ml-8"}`} delay={i * 100 + 50}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="w-9 h-9 rounded-xl bg-red-50 text-[#e30a17] flex items-center justify-center">
                            {step.icon}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {step.num}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                      </AnimatedCard>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom note (Line does not slice through this now) */}
            <div className="mt-12 bg-[#1a1430] text-white p-6 rounded-2xl text-base leading-relaxed shadow-lg flex gap-4 items-center max-w-2xl mx-auto">
              <Headphones className="w-6 h-6 text-gray-300 shrink-0" />
              <p className="text-gray-300">{timelineBottomNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Recovery Timeline — reference card grid layout ─────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-left max-w-3xl mb-12">
              <SectionLabel text="Post-Op Recovery" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mt-2 mb-4">
                {recoveryHeading}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {recoveryDesc}
              </p>
            </div>
          </RevealSection>

          {/* Reference-inspired bento: left big card + right 3 stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Left large highlighted featured card */}
            <AnimatedCard className="lg:col-span-2 bg-gradient-to-br from-[#302658] to-[#1a1430] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl" delay={0}>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">{leftCardDuration}</p>
                <h3 className="text-2xl font-black text-white mb-3">{leftCardTitle}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {leftCardDesc}
                </p>
                {/* Extra detail points to fill card height */}
                <div className="space-y-2.5 mt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                    <p className="text-white/60 text-xs leading-relaxed">Follow all aftercare instructions for optimal graft survival and natural density.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                    <p className="text-white/60 text-xs leading-relaxed">Avoid direct sunlight, strenuous exercise, and swimming for the first 4 weeks.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                    <p className="text-white/60 text-xs leading-relaxed">Transplanted hair sheds in weeks 2–4 — this is completely normal and expected.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                    <p className="text-white/60 text-xs leading-relaxed">Full results visible at 10–12 months with consistent care and follow-up visits.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                {leftCardStats.length > 0 &&
                  leftCardStats.map((stat, i) => (
                    <div key={i}>
                      <p className="text-xl font-black text-[#e30a17]">
                        {stat.value}
                      </p>

                      <p className="text-white/50 text-xs mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))
                }
              </div>
            </AnimatedCard>

            {/* Right 3 cards stacked */}
            <div className="lg:col-span-3 grid grid-cols-1 gap-5">
              {RECOVERY.map((stage, i) => (
                <AnimatedCard key={i} className="bg-[#F7F5F2] rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-5" delay={i * 100 + 80}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${stage.color}`}>
                    {stage.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{stage.time}</p>
                    <h4 className="text-lg font-bold text-[#302658] mb-1">{stage.label}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{stage.desc}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>


        </div>
      </section>

      {/* ── 9. Doctor Profiles — horizontal card with alternating image/content layout ── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <SectionLabel text="Ryan Certified Surgeons" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mt-2">
                  {doctorsHeading}
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2 max-w-lg">
                  {doctorsDesc}
                </p>
              </div>
              <a
                href="/doctors"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 px-6 text-sm transition-all rounded-xl shadow-sm hover:shadow-md"
              >
                {doctorsTopBtn} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </RevealSection>

          {/* Horizontal doctor cards */}
          <div className="space-y-8">
            {DOCTORS.map((doc, i) => {
              const isReverse = i % 2 === 1;
              const doctorQualifications = doc.quals?.length
                ? doc.quals
                : [
                  "M.Ch Plastic Surgery (AIIMS New Delhi)",
                  "ISHRS Member (USA) — International Society of Hair Restoration Surgery",
                  "Turkey Hair Restoration Fellowship — Istanbul",
                ];
              const doctorSpecs = doc.specializations?.length
                ? doc.specializations
                : [
                  "Turkey Sapphire FUE",
                  "Turkish Technique",
                  "Natural Hairline Design",
                  "Crown Restorations",
                  "100% Doctor-Led",
                  "NABH Sterile OT",
                ];
              const doctorBio =
                doc.bio ||
                `Leading hair transplant surgery with surgical precision. Trained under Turkey's top specialists in Istanbul, personally performing 100% of incisions and graft extractions with 95%+ graft survival.`;

              return (
                <AnimatedCard
                  key={i}
                  delay={i * 150}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  <div className={`flex flex-col ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch`}>
                    {/* ── Doctor Image Container ── */}
                    <div className="relative lg:w-[380px] xl:w-[420px] shrink-0 h-72 lg:h-auto min-h-[300px] lg:min-h-[400px] overflow-hidden">
                      {doc.image ? (
                        <Image
                          src={doc.image}
                          alt={doc.imageAlt || doc.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 420px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                      {/* Gradient overlay bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 bg-[#e30a17] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Turkey Certified Surgeon
                        </span>
                      </div>

                      {/* Stats badges — bottom overlay */}
                      <div className={`absolute bottom-4 ${isReverse ? "right-4 flex-row-reverse" : "left-4"} flex gap-2.5 z-10`}>
                        {doc.exp && (
                          <div className="bg-white/25 backdrop-blur-md border border-white/40 rounded-xl px-3.5 py-2 text-center shadow-xl">
                            <p className="text-white font-black text-base md:text-lg leading-none">{doc.exp}</p>
                            <p className="text-white/80 text-[9px] mt-0.5 font-medium uppercase tracking-wider">Experience</p>
                          </div>
                        )}
                        {doc.procedures && (
                          <div className="bg-white/25 backdrop-blur-md border border-white/40 rounded-xl px-3.5 py-2 text-center shadow-xl">
                            <p className="text-white font-black text-base md:text-lg leading-none">{doc.procedures}</p>
                            <p className="text-white/80 text-[9px] mt-0.5 font-medium uppercase tracking-wider">Procedures</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── Doctor Details Panel (Filled & Content-Rich) ── */}
                    <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between bg-white">
                      <div>
                        {/* Designation / Role badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[#e30a17] text-[11px] font-extrabold uppercase tracking-[0.18em]">
                            {doc.role}
                          </span>
                        </div>

                        {/* Name */}
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                          {doc.name}
                        </h3>

                        {/* Doctor Bio paragraph */}
                        <div className="bg-[#F7F5F2] rounded-xl p-3 border border-gray-100 mb-4">
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                            {doctorBio}
                          </p>
                        </div>

                        {/* Qualifications List */}
                        <div className="mb-4">
                          <h4 className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-gray-400 mb-2">
                            Key Credentials &amp; Memberships
                          </h4>
                          <ul className="space-y-1.5">
                            {doctorQualifications.map((q, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-gray-700 leading-snug">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#e30a17] shrink-0 mt-0.5" />
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Specializations Pills */}
                        <div className="mb-4">
                          <h4 className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-gray-400 mb-1.5">
                            Surgical Specializations
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {doctorSpecs.map((spec, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-red-50 text-[#e30a17] border border-red-100"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Inline Key Trust Highlights */}
                        <div className="grid grid-cols-3 gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100 mb-4 text-center">
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-gray-900">95%+</p>
                            <p className="text-[9px] text-gray-500 font-medium">Graft Survival</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-gray-900">100%</p>
                            <p className="text-[9px] text-gray-500 font-medium">Doctor Led</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-gray-900">4.9 ★</p>
                            <p className="text-[9px] text-gray-500 font-medium">Google Reviews</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2.5 pt-3 border-t border-gray-100 items-center">
                        <a
                          href={heroWALink || WA}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-semibold py-2.5 px-5 text-xs sm:text-sm tracking-wide transition-all rounded-xl shadow-md shadow-red-100 hover:-translate-y-0.5"
                          onClick={() => trackCTA({ type: "whatsapp", ctaName: `Doctor Consult: ${doc.name}`, buttonLocation: "Doctor Card" })}
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                          </svg>
                          Book Consult
                        </a>

                        <a
                          href="/doctors"
                          className="inline-flex items-center justify-center gap-1.5 border border-gray-200 hover:border-[#e30a17] text-gray-700 hover:text-[#e30a17] font-semibold py-2.5 px-4 text-xs sm:text-sm tracking-wide transition-all rounded-xl bg-white hover:bg-gray-50"
                        >
                          {doc.btnText || "View Full Profile"} <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 10. Cost CTA — Site Standard Light Section ──────────────────── */}
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
                  <div dangerouslySetInnerHTML={{ __html: pricingDesc }} />
                ) : (
                  <p>
                    No hidden charges, no unexpected OT fees. Pricing is calculated strictly on graft count with full transparency.
                  </p>
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
                    <p className="text-xl md:text-2xl font-extrabold text-[#302658] mb-0.5">
                      {stat.value}
                    </p>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
          </div>

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
              <a
                href={pricingGuide}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] hover:underline py-3 px-1"
              >
                {pricingGuideLabel || "Read Full Cost Breakdown Guide"}{" "}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Pricing Warning Notice — full width at bottom */}
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

      {/* ── 11. Visiting Ryan Clinic — full-width, no map ─────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-10">
            <SectionLabel text="Visit Our Center" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              {visitHeading}
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
              {visitDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {infoCards.length > 0 ? (
              infoCards.map((card, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${VISIT_COLORS[i] ?? "bg-gray-50 text-gray-600"}`}>
                    {VISIT_ICONS[i] ?? <MapPin className="w-5 h-5" />}
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{card.title}</p>
                  <p className="text-sm md:text-base text-gray-900 font-semibold leading-relaxed">{card.description}</p>
                </div>
              ))
            ) : null}
          </div>

          <div className="text-center">
            <CTAButtons primary={visitBtnLabel} waLink={visitBtnWA} telLink={heroTelLink} center />
          </div>
        </div>
      </section>

      {/* ── 12. Free Scalp Analysis & Quote — Clear Clinic Photo Section ───── */}
      <section id="appointment-form" className="relative py-12 lg:py-16 text-white overflow-hidden bg-gray-900">
        {/* Background Image of Ryan Clinic — Clear & Crisp */}
        {consultBgImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={consultBgImage}
              alt="Ryan Clinic Consultation"
              fill
              className="object-cover object-center"
              unoptimized
              priority
            />
            {/* Subtle dark gradient overlay — keeps image clear while ensuring high text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-0" />
          </div>
        )}

        {/* Top red accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#e30a17] z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column (7 cols): Brand & Value Credentials */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-[#e30a17]/15 border border-[#e30a17]/30 rounded-full px-4 py-1.5 text-[11px] font-extrabold text-[#e30a17] uppercase tracking-[0.18em] shadow-lg shadow-red-950/20">
                  <span className="w-2 h-2 rounded-full bg-[#e30a17] animate-ping" />
                  Doctor-Led Scalp Consultation
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6 text-white">
                {consultHeading ? (
                  <span dangerouslySetInnerHTML={{ __html: consultHeading.replace(/in\s+([A-Za-z]+)/gi, 'in <span class="text-[#e30a17]">$1</span>') }} />
                ) : (
                  <>Book Free Scalp <span className="text-[#e30a17]">Assessment</span></>
                )}
              </h2>

              {/* Description — Properly rendered without raw HTML tags */}
              <div className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-sans">
                {consultDesc ? (
                  <div dangerouslySetInnerHTML={{ __html: consultDesc }} />
                ) : (
                  <p>
                    Get an accurate graft count, custom hairline design, and exact price estimate directly from our chief plastic surgeons.
                  </p>
                )}
              </div>

              {/* Value Feature Chips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl">
                {[
                  "100% Free Scalp & Graft Analysis",
                  "Direct Chief Surgeon Consultation",
                  "Personalized Hairline & Density Plan",
                  "0% Interest EMI & Flexible Payment"
                ].map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-md">
                    <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" />
                    <span className="text-xs font-semibold text-white/90">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Contact Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                {CONTACT_CARDS.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target={item.ext ? "_blank" : undefined}
                    rel={item.ext ? "noopener noreferrer" : undefined}
                    className="flex flex-col justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#e30a17]/50 transition-all duration-300 group shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-9 h-9 rounded-xl bg-[#e30a17]/20 text-[#e30a17] flex items-center justify-center shrink-0">
                        {item.icon}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold tracking-widest uppercase text-white/40 mb-0.5">{item.title}</p>
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>

            </div>

            {/* Right Column (5 cols): Premium Form Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-5 sm:p-6 text-gray-900">

                {/* Form Header */}
                <div className="mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{formTitle || "Schedule Your Consultation"}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Takes less than 60 seconds · No obligation</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Secure
                  </span>
                </div>

                {/* Form Body — plain removes inner shadow & wrapper */}
                <ContactForm plain />

                {/* Trust Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400 leading-snug">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <p>Your details are 100% encrypted &amp; strictly confidential.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 13. FAQ ────────────────────────────────────────────────────── */}
      <FAQSection faqs={FAQS} />

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
