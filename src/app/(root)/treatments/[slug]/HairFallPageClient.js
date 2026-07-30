"use client";

import Image from "next/image";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import {
  Reveal,
  RevealSection,
  RevealList,
  AnimatedCard,
  AnimatedStatsGrid,
} from "@/components/animations/AnimatedPage";
import CTAButtons from "./CTAButtons";
import FAQHairFallSection from "./FAQHairFallSection";
import {
  Dna,
  Zap,
  Utensils,
  Activity,
  ShieldAlert,
  Droplet,
  Scissors,
  Pill,
  ClipboardList,
  Search,
  Microscope,
  TestTube,
  Syringe,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Star,
  Users,
  Stethoscope,
} from "lucide-react";

// ─── icon lookup — admin stores plain lucide icon names as strings ────────────
const ICONS = {
  Dna,
  Zap,
  Utensils,
  Activity,
  ShieldAlert,
  Droplet,
  Scissors,
  Pill,
  ClipboardList,
  Search,
  Microscope,
  TestTube,
  Syringe,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Star,
  Users,
  Stethoscope,
};

function getIcon(name) {
  return (name && ICONS[name]) || CheckCircle2;
}

function SectionLabel({ text, dark = false }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#e30a17] shadow-sm animate-pulse" />
      <span
        className={`text-[11px] font-bold tracking-[0.2em] uppercase ${dark ? "text-white/70" : "text-[#e30a17]"}`}
      >
        {text}
      </span>
    </div>
  );
}



export default function HairFallPageClient({ data }) {
  const hero = data?.hero ?? {};
  const introduction = data?.introduction ?? {};
  const causes = data?.causes ?? {};
  const warning = data?.warning ?? {};
  const diagnosis = data?.diagnosis ?? {};
  const treatmentsSection = data?.treatments ?? {};
  const gender = data?.gender ?? {};
  const treatmentMap = data?.treatmentMap ?? {};
  const results = data?.results ?? {};
  const doctor = data?.doctor ?? {};
  const whyChoose = data?.whyChoose ?? {};
  const cost = data?.cost ?? {};
  const myths = data?.myths ?? {};
  const visitClinic = data?.visitClinic ?? {};
  const consultation = data?.consultation ?? {};
  const faqSection = data?.faq ?? {};

  const heroWA = hero.whatsappText?.link;
  const heroTel = hero.callText?.link;

  const bannerStats = (hero.stats ?? []).map((s) => ({
    value: s.value,
    label: s.label,
  }));
  const heroStatsGrid = (introduction.heroStats ?? []).map((s) => ({
    val: s.value,
    label: s.label,
  }));

  const FAQS = (faqSection.faqs ?? []).map((f) => ({
    q: f.question,
    a: f.answer,
  }));
  const faqStats = (faqSection.stats ?? []).map((s) => ({
    num: s.value,
    label: s.label,
  }));

  const featuredCauses = [...(causes.featuredCauses ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const otherCauses = [...(causes.otherCauses ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const diagnosisSteps = [...(diagnosis.steps ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const treatmentItems = [...(treatmentsSection.treatments ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const mapRows = [...(treatmentMap.rows ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const costItems = [...(cost.items ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const mythItems = [...(myths.myths ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const visitInfoCards = [...(visitClinic.infoCards ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const contactCards = [...(consultation.contactCards ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const consultStats = (consultation.statsRow ?? []).map((s) => ({
    n: s.value,
    l: s.label,
  }));

  return (
    <>
      {/* ── Banner ───────────────────────────────────────────────────── */}
      <PageBanner
        breadcrumb={hero.breadcrumb}
        title={hero.title}
        description={hero.description}
        bgImage={hero.heroImage?.image || "/uploads/hairline-banner.webp"}
        stats={bannerStats.length > 0 ? bannerStats : undefined}
      />

      {/* ── 1. Hero — image showcase + intro ────────────────────────── */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/3 left-0 -translate-y-1/2 w-72 h-72 bg-[#e30a17]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#302658]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-8xl  mx-auto px-4 md:py-16 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            {/* Left content */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal direction="left">
                <SectionLabel text={introduction.smallHeading} />
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-black text-[#302658] tracking-tight leading-[1.05] mb-6">
                  {introduction.title}
                </h1>

                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                  {introduction.description && (
                    <p className="whitespace-pre-line">{introduction.description}</p>
                  )}
                  {introduction.highlightBoxText && (
                    <div className="bg-[#F7F5F2] border-l-4 border-[#e30a17] p-5 rounded-r-2xl">
                      <p className="font-semibold text-[#302658] whitespace-pre-line">
                        {introduction.highlightBoxText}
                      </p>
                    </div>
                  )}
                </div>

                {(hero.quickFacts ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {hero.quickFacts.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#302658] bg-[#F7F5F2] border border-gray-200 rounded-full px-3.5 py-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e30a17]" />{" "}
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-8">
                  <CTAButtons
                    primary={
                      hero.whatsappText?.text || "Book Doctor Consultation"
                    }
                    waLink={heroWA}
                    telLink={heroTel}
                  />
                </div>
              </Reveal>
            </div>

            {/* Right — stacked image showcase */}
            <div className="lg:col-span-6 w-full">
              <Reveal direction="right" delay={120}>
                <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[580px]">
                  <div className="absolute top-0 left-0 w-[90%] h-[90%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                      src={
                        introduction.mainImage?.image ||
                        "/uploads/hairline-banner.webp"
                      }
                      alt={
                        introduction.mainImage?.imageAlt ||
                        "Doctor consultation at Ryan Clinic"
                      }
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-700"
                      unoptimized
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5">
                      <span className="bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Free Scalp Analysis
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 w-[52%] h-[52%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
                    <Image
                      src={
                        introduction.floatingImage?.image ||
                        "/uploads/turkey-2.jpeg"
                      }
                      alt={
                        introduction.floatingImage?.imageAlt ||
                        "Doctor-led care at Ryan Clinic"
                      }
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      unoptimized
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-lg border border-gray-100">
                        <span className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#302658] leading-tight">
                            Doctor-Led Care
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Every diagnosis &amp; plan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[45%] right-[8%] w-14 h-14 rounded-full bg-[#e30a17]/10 border-2 border-[#e30a17]/20 z-0 hidden lg:block" />
                </div>
              </Reveal>
            </div>
          </div>

          {/* {heroStatsGrid.length > 0 && <AnimatedStatsGrid stats={heroStatsGrid} />} */}
        </div>
      </section>

      {/* ── 2. What causes hair fall ─────────────────────────────────── */}
      {(featuredCauses.length > 0 || otherCauses.length > 0) && (
        <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100 overflow-hidden">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="text-center max-w-5xl mx-auto mb-16">
                {/* <SectionLabel text="Understand The Cause" /> */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                  {causes.heading}
                </h2>
                {causes.description && (
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {causes.description}
                  </p>
                )}
              </div>
            </RevealSection>

            {featuredCauses.map((c, i) => (
              <div
                key={i}
                className={`flex flex-col ${c.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0 items-stretch mb-8 last:mb-0 rounded-3xl overflow-hidden shadow-sm border border-gray-100`}
              >
                <div className="lg:w-[45%] relative min-h-[280px]">
                  <Image
                    src={c.cardImage?.image || "/uploads/turkey-doctor.jpg"}
                    alt={c.cardImage?.imageAlt || c.title}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/50" />
                  {c.tag && (
                    <div className="absolute bottom-6 left-6">
                      <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-xs font-bold tracking-widest uppercase">
                        {c.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="lg:w-[55%] bg-white p-8 md:p-10 flex flex-col justify-center">
                  {c.subtitle && (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                      {c.subtitle}
                    </p>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold text-[#302658] mb-4">
                    {c.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                    {c.description}
                  </p>
                  {(c.points ?? []).length > 0 && (
                    <ul className="space-y-2.5">
                      {c.points.map((p, pi) => (
                        <li
                          key={pi}
                          className="flex items-center gap-2.5 text-sm font-medium text-[#302658]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" />{" "}
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {otherCauses.length > 0 && (
              <>
                {causes.otherCausesHeading && (
                  <RevealSection delay={100}>
                    <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mt-14 mb-6">
                      {causes.otherCausesHeading}
                    </p>
                  </RevealSection>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherCauses.map((c, i) => {
                    const Icon = getIcon(c.icon);
                    return (
                      <AnimatedCard
                        key={i}
                        delay={i * 60}
                        className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 hover:border-[#e30a17]/30 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e30a17] flex items-center justify-center shrink-0">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#302658] mb-1">
                            {c.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {c.description}
                          </p>
                        </div>
                      </AnimatedCard>
                    );
                  })}
                </div>
              </>
            )}

            <RevealSection delay={150}>
              <div className="text-center mt-12">
                <CTAButtons
                  primary="Find My Cause — Free Scalp Analysis"
                  waLink={heroWA}
                  telLink={heroTel}
                  center
                />
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ── 3. When to see a doctor ──────────────────────────────────── */}
      {(warning.warningSigns ?? []).length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              <div className="lg:col-span-7">
                <Reveal direction="left">
                  <SectionLabel text="Don't Wait It Out" />
                  <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#302658] leading-tight tracking-tight mb-5">
                    {warning.heading}
                  </h2>
                  <p className="text-gray-500 text-base leading-relaxed mb-8">
                    {warning.description}
                  </p>
                  <RevealList className="space-y-4" stagger={90}>
                    {warning.warningSigns.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 list-none">
                        <span className="w-6 h-6 rounded-full bg-red-50 text-[#e30a17] flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </RevealList>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal direction="right" delay={150} className="h-full">
                  <div className="relative h-full min-h-[420px] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src={
                        warning.calloutImage?.image || "/uploads/turkey-2.jpeg"
                      }
                      alt={
                        warning.calloutImage?.imageAlt ||
                        "Doctor-led hair fall assessment at Ryan Clinic"
                      }
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#1a1430] via-[#1a1430]/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      {warning.calloutBadge && (
                        <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                          {warning.calloutBadge}
                        </p>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {warning.calloutTitle}
                      </h3>
                      <p className="text-white text-sm leading-relaxed mb-6">
                        {warning.calloutDescription}
                      </p>
                      {/* <CTAButtons primary={warning.calloutCTA?.text || "Talk to a Doctor Now"} waLink={warning.calloutCTA?.link || heroWA} telLink={heroTel} /> */}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. How hair loss is diagnosed ───────────────────────────── */}
      {diagnosisSteps.length > 0 && (
        <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="text-center max-w-3xl mx-auto mb-14">
                {/* <SectionLabel text="The Assessment" /> */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                  {diagnosis.heading}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  {diagnosis.description}
                </p>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <Reveal direction="left" className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                  <Image
                    src={diagnosis.sideImage?.image || "/uploads/turkey-2.jpeg"}
                    alt={
                      diagnosis.sideImage?.imageAlt ||
                      "Ryan Clinic medical team"
                    }
                    width={700}
                    height={1100}
                    className="w-full h-[320px] lg:h-[440px] object-cover"
                    unoptimized
                  />
                </div>
              </Reveal>
              <div className="lg:col-span-7">
                <div className="space-y-5">
                  {diagnosisSteps.map((s, i) => {
                    const Icon = getIcon(s.icon);
                    return (
                      <AnimatedCard
                        key={i}
                        delay={i * 90}
                        className="flex items-start gap-5 bg-white rounded-2xl border border-gray-100 p-6"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#1a1430] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          {/* {s.stepNumber && (
                            <span className="text-[11px] font-bold text-gray-300 tracking-widest">
                              {s.stepNumber}
                            </span>
                          )} */}
                          <h3 className="text-base font-bold text-[#302658] mb-1">
                            {s.title}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </AnimatedCard>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Treatment options ────────────────────────────────────── */}
      {treatmentItems.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="text-center max-w-5xl mx-auto mb-14">
                {/* <SectionLabel text="Matched To Your Cause" /> */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                  {treatmentsSection.heading}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  {treatmentsSection.description}
                </p>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatmentItems.map((t, i) => {
                const Icon = getIcon(t.icon);
                if (t.treatmentImage?.image) {
                  return (
                    <AnimatedCard
                      key={i}
                      delay={i * 90}
                      className="rounded-2xl overflow-hidden border border-gray-100 flex flex-col bg-white"
                    >
                      <div className="relative h-44">
                        <Image
                          src={t.treatmentImage.image}
                          alt={t.treatmentImage.imageAlt || t.title}
                          fill
                          className="object-cover"
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#e30a17] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-[#302658] mb-2">
                          {t.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed flex-1">
                          {t.description}
                        </p>
                        {t.ctaText?.link && (
                          <a
                            href={t.ctaText.link}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] mt-5 hover:underline"
                          >
                            {t.ctaText.text || "Learn more"}{" "}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </AnimatedCard>
                  );
                }
                return (
                  <AnimatedCard
                    key={i}
                    delay={i * 90}
                    className={`rounded-2xl p-7 flex flex-col ${t.featured ? "bg-[#1a1430] text-white lg:col-span-1 md:col-span-2" : "bg-[#F7F5F2] border border-gray-100"}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${t.featured ? "bg-[#e30a17]" : "bg-white text-[#e30a17] shadow-sm"}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${t.featured ? "text-white" : ""}`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-bold mb-3 ${t.featured ? "text-white" : "text-[#302658]"}`}
                    >
                      {t.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed flex-1 ${t.featured ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {t.description}
                    </p>
                    {(t.bulletPoints ?? []).length > 0 && (
                      <ul className="mt-5 pt-5 border-t border-white/10 space-y-2">
                        {t.bulletPoints.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex items-center gap-2.5 text-sm font-medium text-white"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" />{" "}
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {t.ctaText?.link && (
                      <a
                        href={t.ctaText.link}
                        className={`inline-flex items-center gap-1.5 text-sm font-bold mt-6 hover:underline ${t.featured ? "text-white" : "text-[#e30a17]"}`}
                      >
                        {t.ctaText.text || "Learn more"}{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Best treatment for men / women ───────────────────────── */}
      {(gender.menCard?.title || gender.womenCard?.title) && (
        <section className=" py-16 md:py-24 border-y border-gray-100">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className=" max-w-3xl  mb-14">
                <SectionLabel text="Tailored By Gender" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                  {gender.heading}
                </h2>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[gender.menCard, gender.womenCard]
                .filter(Boolean)
                .map((card, i) => (
                  <AnimatedCard
                    key={i}
                    className="bg-[#F7F5F2] rounded-2xl overflow-hidden border border-gray-100"
                    delay={i * 100}
                  >
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-[#302658] mb-3">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {card.description}
                      </p>
                      {card.ctaText?.link && (
                        <a
                          href={card.ctaText.link}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] hover:underline"
                        >
                          {card.ctaText.text || "Learn more"}{" "}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </AnimatedCard>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. Cause → treatment mapping table ──────────────────────── */}
      {mapRows.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="Matching Treatment To Cause" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mb-3">
                  {treatmentMap.heading}
                </h2>
                <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                  {treatmentMap.description}
                </p>
              </div>
            </div>

            <RevealSection>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm overflow-x-auto">
                <table className="w-full min-w-150">
                  <thead>
                    <tr className="bg-[#1a1430]">
                      <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">
                        Likely Cause
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">
                        Typical First-Line Approach
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapRows.map((r, i) => (
                      <tr
                        key={i}
                        className={`border-t border-gray-100 transition-colors hover:bg-red-50/40 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                      >
                        <td className="px-6 py-4 font-bold text-gray-900 text-sm w-[38%]">
                          {r.cause}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm leading-relaxed">
                          {r.approach}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ── 8. Results & timelines ──────────────────────────────────── */}
      {(results.facts ?? []).length > 0 && (
        <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <Reveal direction="left" className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-3xl shadow-xl h-[320px] lg:h-[440px]">
                  <Image
                    src={
                      results.resultImage?.image ||
                      "/uploads/gallery.jpg"
                    }
                    alt={
                      results.resultImage?.imageAlt ||
                      "Hair treatment result at Ryan Clinic"
                    }
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                </div>
              </Reveal>

              <Reveal direction="right" delay={120} className="lg:col-span-6">
                <SectionLabel text="Honest Expectations" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mb-5">
                  {results.heading}
                </h2>
                <RevealList className="space-y-4 mb-8" stagger={90}>
                  {results.facts.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 list-none">
                      <CheckCircle2 className="w-5 h-5 text-[#e30a17] shrink-0 mt-0.5" />
                      <span className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </RevealList>

                {(results.warningTitle || results.warningText) && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        {results.warningTitle && (
                          <p className="text-sm font-bold text-amber-800 mb-2">
                            {results.warningTitle}
                          </p>
                        )}
                        <p className="text-sm text-amber-700 leading-relaxed">
                          {results.warningText}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── 9. Best doctor ───────────────────────────────────────────── */}
      {(doctor.criteria ?? []).length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <Reveal direction="left" className="lg:col-span-7">
                <SectionLabel text="Choosing Your Doctor" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mb-5">
                  {doctor.heading}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  {doctor.description}
                </p>
                <RevealList className="space-y-4" stagger={80}>
                  {doctor.criteria.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 list-none">
                      <span className="w-6 h-6 rounded-full bg-red-50 text-[#e30a17] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </RevealList>
              </Reveal>

              <Reveal direction="right" delay={150} className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-xl h-[380px]">
                  <Image
                    src={doctor.teamImage?.image || "/uploads/gallery.jpg"}
                    alt={
                      doctor.teamImage?.imageAlt || "Ryan Clinic medical team"
                    }
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  {(doctor.imageCaption || doctor.imageSubcaption) && (
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                        {doctor.imageCaption && (
                          <p className="text-xs font-bold text-[#302658]">
                            {doctor.imageCaption}
                          </p>
                        )}
                        {doctor.imageSubcaption && (
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {doctor.imageSubcaption}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── 10. Why choose Ryan Clinic ───────────────────────────────── */}
      {(whyChoose.points ?? []).length > 0 && (
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={
                whyChoose.backgroundImage?.image || "/uploads/turkey-doctor.jpg"
              }
              alt=""
              fill
              className="object-cover"
              unoptimized
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#1a1430]/93" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e30a17]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <RevealSection>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <SectionLabel text="Why Ryan Clinic" dark />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mt-3 mb-4">
                  {whyChoose.heading}
                </h2>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {whyChoose.points.map((item, i) => (
                <AnimatedCard
                  key={i}
                  className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  delay={i * 80}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#e30a17] mb-4" />
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {item}
                  </p>
                </AnimatedCard>
              ))}
            </div>

            {whyChoose.honestNote && (
              <RevealSection delay={200}>
                <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto text-center">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {whyChoose.honestNote}
                  </p>
                </div>
              </RevealSection>
            )}
          </div>
        </section>
      )}

      {/* ── 11. Cost ─────────────────────────────────────────────────── */}
      {costItems.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <SectionLabel text="Transparent Pricing" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                  {cost.heading}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  {cost.description}
                </p>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {costItems.map((c, i) => {
                const Icon = getIcon(c.icon);
                return (
                  <AnimatedCard
                    key={i}
                    delay={i * 90}
                    className="bg-[#F7F5F2] rounded-2xl border border-gray-100 p-6 flex flex-col"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white text-[#e30a17] shadow-sm flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#302658] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {c.description}
                    </p>
                    {c.ctaText?.link && (
                      <a
                        href={c.ctaText.link}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] mt-4 hover:underline"
                      >
                        {c.ctaText.text || "Learn more"}{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </AnimatedCard>
                );
              })}
            </div>

            <RevealSection delay={150}>
              <div className="text-center mt-10">
                <CTAButtons
                  primary="Get My Treatment Cost"
                  waLink={heroWA}
                  telLink={heroTel}
                  center
                />
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ── 12. Myths vs facts ──────────────────────────────────────── */}
      {mythItems.length > 0 && (
        <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <SectionLabel text="Setting The Record Straight" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                  {myths.heading}
                </h2>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mythItems.map((m, i) => (
                <AnimatedCard
                  key={i}
                  delay={i * 70}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="px-6 py-5 border-b border-gray-100 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Myth
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed line-through decoration-gray-300">
                        {m.myth}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#e30a17] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#e30a17] mb-1">
                        Fact
                      </p>
                      <p className="text-sm text-[#302658] font-medium leading-relaxed">
                        {m.fact}
                      </p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 13. Visit clinic ─────────────────────────────────────────── */}
      {visitInfoCards.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <SectionLabel text="Visit Our Center" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-3">
                  {visitClinic.heading}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  {visitClinic.description}
                </p>
              </div>
            </RevealSection>

            {(visitClinic.bannerTitle || visitClinic.bannerImage?.image) && (
              <Reveal className="relative rounded-3xl overflow-hidden shadow-xl h-[260px] md:h-[340px] mb-8">
                <Image
                  src={
                    visitClinic.bannerImage?.image ||
                    "/uploads/turkey-doctor.jpg"
                  }
                  alt={visitClinic.bannerImage?.imageAlt || "Ryan Clinic"}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-8">
                  {visitClinic.bannerTitle && (
                    <p className="text-white text-xl md:text-2xl font-bold">
                      {visitClinic.bannerTitle}
                    </p>
                  )}
                  {visitClinic.bannerAddress && (
                    <p className="text-white/70 text-sm mt-1">
                      {visitClinic.bannerAddress}
                    </p>
                  )}
                </div>
              </Reveal>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visitInfoCards.map((c, i) => {
                  const Icon = getIcon(c.icon);
                  return (
                    <AnimatedCard
                      key={i}
                      delay={i * 70}
                      className="bg-[#F7F5F2] rounded-2xl p-6 border border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 text-[#e30a17]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {c.label}
                      </p>
                      <p className="text-sm md:text-[15px] text-[#302658] font-semibold leading-relaxed">
                        {c.value}
                      </p>
                    </AnimatedCard>
                  );
                })}
              </div>

              {visitClinic.mapEmbedUrl && (
                <Reveal
                  direction="right"
                  className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm min-h-[320px] relative"
                >
                  <iframe
                    title="Ryan Clinic Map"
                    src={visitClinic.mapEmbedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 14. Book consultation ────────────────────────────────────── */}
      <section id="appointment-form" className="relative overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="relative w-full lg:w-1/2">
            <Image
              src={
                consultation.backgroundImage?.image ||
                "/uploads/1752746168716-PRP 1.jpg"
              }
              alt=""
              fill
              className="object-cover"
              unoptimized
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-[#1a1430]/90" />
          </div>
          <div className="hidden lg:block w-1/2 bg-[#F7F5F2]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#e30a17]" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#e30a17]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
            <div className="py-20 lg:py-28 lg:pr-16 flex flex-col justify-center">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 bg-[#e30a17]/20 border border-[#e30a17]/30 rounded-full px-4 py-1.5 text-[11px] font-bold text-[#e30a17] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e30a17] animate-pulse" />
                  Book Your Consultation
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
                {consultation.heading}
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                {consultation.description}
              </p>

              {contactCards.length > 0 && (
                <div className="space-y-3 mb-10">
                  {contactCards.map((item, i) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <a
                        key={i}
                        href={item.link || "#"}
                        target={item.ext ? "_blank" : undefined}
                        rel={item.ext ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                      >
                        <span className="w-9 h-9 rounded-xl bg-[#e30a17]/20 text-[#e30a17] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">
                            {item.title}
                          </p>
                          <p className="text-sm font-semibold text-white mt-0.5 truncate">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                      </a>
                    );
                  })}
                </div>
              )}

              {consultStats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {consultStats.map((s, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center"
                    >
                      <p className="text-lg font-black text-[#e30a17]">{s.n}</p>
                      <p className="text-[9px] font-bold text-white/40 mt-0.5 uppercase tracking-wider">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="py-20 lg:py-28 lg:pl-16 flex flex-col justify-center bg-[#F7F5F2] lg:bg-transparent">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#302658]">
                    Request Consultation
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Takes less than 60 seconds
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                    Secure
                  </span>
                </div>
              </div>

              <div className="w-full">
                <ContactForm />
              </div>

              <div className="mt-6 flex items-center gap-3 text-xs text-gray-400 leading-snug">
                <Search className="w-4 h-4 text-green-500 shrink-0" />
                <p>
                  Your personal &amp; medical details are fully encrypted. We
                  never share your contact info with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 15. FAQ ──────────────────────────────────────────────────── */}
      {FAQS.length > 0 && (
        <FAQHairFallSection
          faqs={FAQS}
          heading={faqSection.heading || "Frequently Asked Questions"}
          description={faqSection.description}
          stats={faqStats}
          waLink={heroWA}
        />
      )}

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            <strong className="text-gray-500">Medical disclaimer:</strong> This
            page is general information and does not replace a personal medical
            consultation. Hair loss has many possible causes, and suitability
            for any treatment can only be confirmed after an in-person
            assessment by a qualified doctor. Individual results vary.{" "}
            <a
              href="/privacy-policy"
              className="underline text-[#e30a17] hover:opacity-75"
            >
              Privacy Policy
            </a>
            {" · "}
            <a
              href="/terms-and-conditions"
              className="underline text-[#e30a17] hover:opacity-75"
            >
              Terms &amp; Conditions
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
