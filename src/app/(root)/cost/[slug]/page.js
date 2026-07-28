import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { DBConnection } from "@/lib/db";
import CostPage from "@/models/CostPage";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import FAQCostSection from "../FAQCostSection";
import CTAButtons from "../CTAButtonsClient";
import SurgeriesCostCardsClient from "../SurgeriesCostCardsClient";
import GraftTierCards from "../GraftTierCards";
import CostComparisonGrid from "../CostComparisonGrid";

/* ═══════════════════════════════════════════════════════════════
   DATA FETCHING (Optimized with React cache)
═══════════════════════════════════════════════════════════════ */

const getCostPageBySlug = cache(async (slug) => {
  await DBConnection();
  const page = await CostPage.findOne({
    slug,
    "settings.status": "published",
    "settings.isDeleted": { $ne: true },
  }).lean();
  if (!page) return null;
  return JSON.parse(JSON.stringify(page));
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getCostPageBySlug(slug);
  if (!page) {
    return {
      title: "404 | Cost Page Not Found - Ryan Clinic",
      description: "The requested cost page could not be found.",
      robots: { index: false, follow: false },
    };
  }
  const seo = page.seo || {};
  return {
    title: seo.metaTitle || page.title || "Hair Transplant Cost - Ryan Clinic",
    description: seo.metaDescription || page.hero?.pricingLine || "",
    keywords: seo.keywords || [],
    alternates: { canonical: seo.canonical || `https://www.clinicryan.com/cost/${page.slug}` },
    openGraph: {
      title: seo.metaTitle || page.title,
      description: seo.metaDescription || page.hero?.pricingLine || "",
      url: seo.canonical || `https://www.clinicryan.com/cost/${page.slug}`,
      siteName: "Ryan Clinic",
      locale: "en_IN",
      type: "website",
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630, alt: page.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || page.title,
      description: seo.metaDescription || page.hero?.pricingLine || "",
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    robots: seo.robots || "index, follow",
  };
}

/* ═══════════════════════════════════════════════════════════════
   THEME DESIGN ATOMS (Light Luxury Medical Aesthetic in #e30a17)
═══════════════════════════════════════════════════════════════ */

function EyebrowLabel({ text }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="block w-5 h-px bg-[#e30a17]" />
      <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#e30a17]">
        {text}
      </span>
    </div>
  );
}

function ArrowIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  );
}

function RedCheck() {
  return (
    <span className="w-4 h-4 rounded-full bg-[#e30a17] flex items-center justify-center shrink-0 text-white text-[9px] font-bold mt-0.5">
      ✓
    </span>
  );
}

const WA_BASE = "https://api.whatsapp.com/send?phone=+919217958539&text=";
const TEL = "tel:+919911111247";

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */

export default async function DynamicCostPage({ params }) {
  const { slug } = await params;
  const page = await getCostPageBySlug(slug);
  if (!page) notFound();

  const {
    hero, intro, services, graftPricing,
    techniqueComparison, includedSection,
    priceFactors, consultation, faq,
  } = page;

  const faqItems = faq?.faqs || faq?.items || [];

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.clinicryan.com" },
      { "@type": "ListItem", position: 2, name: "Cost", item: "https://www.clinicryan.com/cost" },
      { "@type": "ListItem", position: 3, name: page.title, item: `https://www.clinicryan.com/cost/${page.slug}` },
    ],
  };

  return (
    <>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Page Banner (untouched) ─────────── */}
      <PageBanner
        breadcrumb={page.title}
        title={hero?.title || page.title}
        description={hero?.pricingLine || ""}
        bgImage={hero?.heroImage || "/uploads/1752667815707-fue-banner_ro9ae6.webp"}
        alt={hero?.heroImageAlt || page.title}
      />

      {/* ════════════════════════════════════════════════════════════
          SECTION 1: HERO & INTRO — Premium Two-Column Layout
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-14 lg:gap-20 items-center">

            {/* Left: Headline + trust + CTA */}
            <div>
              <EyebrowLabel text={intro?.badge || "Mumbai Pricing Guide"} />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5">
                {intro?.heading || page.title}
              </h2>

              {/* Description — properly rendered with dangerouslySetInnerHTML */}
              {intro?.description && (
                <div
                  className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: intro.description }}
                />
              )}

              {/* Trust badges strip */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Doctor-Led Surgery",
                  "Written Cost Guarantee",
                  "0% EMI Available",
                  "Free Scalp Analysis",
                ].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 bg-[#FAF6F3] border border-[#E8E4DF] text-gray-700 text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 items-center">
                <CTAButtons primary="Book Free Doctor Assessment" />
              </div>
            </div>

            {/* Right: Refined Summary Card */}
            {intro?.summaryRows?.length > 0 && (
              <div className="relative">
                <div className="bg-white rounded-3xl border border-[#E8E4DF] shadow-2xl shadow-gray-100/80 overflow-hidden">

                  {/* Card header */}
                  <div className="px-6 py-4 bg-[#FAF6F3] border-b border-[#E8E4DF] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold text-[#e30a17] tracking-[0.22em] uppercase">Quick Reference</span>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5">Cost Summary Highlights</h3>
                    </div>
                    <span className="w-8 h-8 rounded-xl bg-[#e30a17]/10 border border-[#e30a17]/20 flex items-center justify-center text-[#e30a17] font-black text-sm shadow-sm">
                      ✓
                    </span>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-gray-100">
                    {intro.summaryRows.map((row, i) => (
                      <div key={i} className={`flex items-center justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-[#FAF6F3]/50"}`}>
                        <span className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 tracking-wide uppercase">
                          {row.icon && <span className="text-base">{row.icon}</span>}
                          {row.label}
                        </span>
                        <span className="text-xs font-bold text-gray-900 text-right max-w-[55%]">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verified footer */}
                  <div className="px-6 py-3 bg-emerald-50/80 border-t border-emerald-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-800 font-semibold">Confirmed after free scalp analysis</span>
                  </div>
                </div>

                {/* Subtle floating badge — top right corner */}
                <div className="absolute -top-3 -right-3 bg-[#e30a17] text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-red-200">
                  No Hidden Fees
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2: PROCEDURES AVAILABLE CARDS — Premium Cards
      ════════════════════════════════════════════════════════════ */}
      {services?.cards?.length > 0 ? (
        <section className="py-16 md:py-24 bg-[#FAF6F3] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <EyebrowLabel text={services.badge || "Our Services"} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                  {services.heading || "Procedures Available"}
                </h2>
                {services.description && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-lg font-sans leading-relaxed">
                    {services.description}
                  </p>
                )}
              </div>
              <a
                href={`${WA_BASE}Hi,%20I%20want%20to%20compare%20all%20procedure%20costs`}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white text-xs font-bold py-3 px-6 rounded-full shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5"
              >
                Compare All Procedures <ArrowIcon />
              </a>
            </div>

            {/* Enhanced Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.cards
                .filter((c) => c.active !== false)
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                .slice(0, 4)
                .map((card, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-3xl border border-[#E8E4DF] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  >
                    {/* Image Container — taller, deeper gradient */}
                    {card.image && (
                      <div className="relative h-60 w-full overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover object-top group-hover:scale-108 transition-transform duration-700"
                          unoptimized
                        />
                        {/* Deep gradient for strong text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Card number — top left */}
                        <span className="absolute top-3.5 left-3.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-[10px] font-black">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Badge — top right */}
                        {card.badge && (
                          <span className="absolute top-3.5 right-3.5 bg-[#e30a17] text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                            {card.badge}
                          </span>
                        )}

                        {/* Price glass chip — bottom left */}
                        {card.startingPrice && (
                          <div className="absolute bottom-4 left-4">
                            <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest mb-0.5">Starting From</p>
                            <p className="text-2xl font-black text-white leading-none drop-shadow-lg">{card.startingPrice}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="font-black text-base text-gray-900 mb-1.5 leading-snug">
                          {card.title}
                        </h3>

                        {/* Description */}
                        {card.description && (
                          <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mb-3 font-sans">
                            {card.description}
                          </p>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-100 mb-3" />

                        {/* Features */}
                        {card.features?.length > 0 && (
                          <ul className="space-y-1.5 mb-4">
                            {card.features.slice(0, 4).map((f, fi) => (
                              <li key={fi} className="flex items-start gap-2 text-[11px] text-gray-700 leading-snug">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#e30a17] flex items-center justify-center text-white text-[8px] font-bold shrink-0 mt-0.5">✓</span>
                                <span>{f.text}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* CTA Button */}
                      <a
                        href={card.button?.link || `${WA_BASE}Hi,%20I%20am%20interested%20in%20${encodeURIComponent(card.title)}`}
                        className="inline-flex items-center justify-center w-full gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold py-2.5 px-4 text-[11px] transition-all duration-200 rounded-xl shadow-md shadow-red-100 hover:shadow-red-200 mt-auto group-hover:-translate-y-0.5"
                      >
                        {card.button?.text || "Book Consultation"} <ArrowIcon />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <SurgeriesCostCardsClient />
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 3: GRAFT PRICING TIERS — Premium Pricing Cards
      ════════════════════════════════════════════════════════════ */}
      {graftPricing?.cards?.length > 0 ? (
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <EyebrowLabel text={graftPricing.badge || "Graft Pricing Tiers"} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                  {graftPricing.heading || "Hair Transplant Cost by Number of Grafts"}
                </h2>
                {graftPricing.description && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-xl font-sans leading-relaxed">
                    {graftPricing.description}
                  </p>
                )}
              </div>
              <div className="shrink-0 bg-[#FAF6F3] p-1.5 rounded-full border border-[#E8E4DF] shadow-sm inline-flex items-center gap-1">
                <span className="bg-[#e30a17] text-white text-[10px] font-extrabold px-4 py-1.5 rounded-full shadow-sm">
                  Graft Packages
                </span>
                <span className="text-gray-600 text-[10px] font-semibold px-3 py-1">
                  0% EMI Available
                </span>
              </div>
            </div>

            {/* Premium Pricing Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {graftPricing.cards
                .filter((c) => c.active !== false)
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                .slice(0, 4)
                .map((tier, i) => {
                  const isFeatured = tier.featured || i === 1;
                  return (
                    <div
                      key={i}
                      className={`relative bg-white flex flex-col transition-all duration-300 hover:-translate-y-1.5 rounded-3xl ${
                        isFeatured
                          ? "border-2 border-[#e30a17] shadow-2xl shadow-red-100 ring-4 ring-[#e30a17]/8"
                          : "border border-[#E8E4DF] shadow-md hover:shadow-xl"
                      }`}
                    >
                      {/* Most Popular floating pill */}
                      {isFeatured && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#e30a17] text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                          ★ Most Popular
                        </span>
                      )}

                      <div className="p-6 flex flex-col flex-1">
                        {/* Title row */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-[#e30a17]" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e30a17]">
                            {tier.title}
                          </span>
                        </div>

                        {/* Price — reduced font size */}
                        <div className="mb-3">
                          <span className="text-xl font-black tracking-tight text-[#e30a17] leading-tight">
                            {tier.price}
                          </span>
                          <p className="text-xs font-medium mt-0.5 text-gray-500">
                            {tier.graftRange}
                          </p>
                        </div>

                        {/* Description */}
                        {tier.description && (
                          <p className="text-[11px] leading-relaxed mb-4 font-sans border-b pb-3 text-gray-500 border-gray-100">
                            {tier.description}
                          </p>
                        )}

                        {/* Inclusions */}
                        <div className="flex-1 mb-5">
                          <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] mb-3 text-gray-400">
                            Inclusions
                          </p>
                          <ul className="space-y-2">
                            {tier.coverage && (
                              <li className="flex items-start gap-2 text-[11px] text-gray-700">
                                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 bg-[#e30a17] text-white">✓</span>
                                <span><strong className="text-gray-900">Coverage:</strong> {tier.coverage}</span>
                              </li>
                            )}
                            {tier.duration && (
                              <li className="flex items-start gap-2 text-[11px] text-gray-700">
                                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 bg-[#e30a17] text-white">✓</span>
                                <span><strong className="text-gray-900">Duration:</strong> {tier.duration}</span>
                              </li>
                            )}
                            {tier.features?.map((f, fi) => (
                              <li key={fi} className="flex items-start gap-2 text-[11px] text-gray-700">
                                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 bg-[#e30a17] text-white">✓</span>
                                <span>{f.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Button */}
                        <a
                          href={tier.buttonLink || "/contact"}
                          className={`inline-flex items-center justify-center w-full gap-2 font-bold py-3 px-4 text-xs transition-all duration-200 rounded-xl mt-auto ${
                            isFeatured
                              ? "bg-[#e30a17] text-white hover:bg-red-700 shadow-lg shadow-red-200"
                              : "bg-[#e30a17] text-white hover:bg-red-700 shadow-md shadow-red-100"
                          }`}
                        >
                          {tier.buttonText || "Get Free Quote"} <ArrowIcon />
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      ) : (
        <GraftTierCards />
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 4: PRICE FACTORS PROCESS (Image 2 Timeline Design)
          - Curved horizontal wavy step timeline connecting step circles!
          - Image 2 layout: Badge + Title left, Pill CTA button right!
          - Circular step nodes (01, 02, 03) connected by wavy track line
          - White factor cards below in theme Red (#e30a17)!
      ════════════════════════════════════════════════════════════ */}
      {(priceFactors?.factors?.length > 0 || priceFactors?.emiPlans?.length > 0) && (
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header: Title Left, Schedule Appointment Pill CTA Right (Image 2 Design) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
              <div>
                <EyebrowLabel text={priceFactors.badge || "Our Specialized Process"} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                  {priceFactors.heading || "What Determines Hair Transplant Cost?"}
                </h2>
                {priceFactors.description && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-2xl font-sans">
                    {priceFactors.description}
                  </p>
                )}
              </div>

              {/* Schedule Appointment Pill Button (Theme Red #e30a17) */}
              <a
                href={`${WA_BASE}Hi,%20I%20want%20to%20schedule%20an%20appointment%20to%20assess%20my%20hair%20transplant%20cost`}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-xs shadow-md transition-all"
              >
                Schedule Appointment <ArrowIcon />
              </a>
            </div>

            {/* Horizontal Connected Wave Process Line + Nodes (Image 2 Design) */}
            {priceFactors.factors?.length > 0 && (
              <div className="relative mb-12">
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
                  {priceFactors.factors.slice(0, 4).map((f, i) => {
                    const stepNum = String(i + 1).padStart(2, "0");
                    return (
                      <div key={i} className="flex flex-col items-center text-center">

                        {/* Circular Image / Icon Node (Image 2 Style) */}
                        <div className="relative mb-6">
                          <div className="w-24 h-24 rounded-full border-4 border-[#e30a17] bg-white shadow-lg overflow-hidden flex items-center justify-center p-1.5 transition-transform duration-300 hover:scale-105">
                            <div className="w-full h-full rounded-full bg-red-50 flex items-center justify-center text-[#e30a17] font-black text-lg">
                              {stepNum}
                            </div>
                          </div>

                          {/* Step Number Badge Pill */}
                          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#e30a17] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                            {stepNum}
                          </span>
                        </div>

                        {/* Card Below Circle */}
                        <div className="w-full bg-white rounded-2xl p-6 border border-[#E8E4DF] shadow-md hover:shadow-xl hover:border-[#e30a17]/40 transition-all flex flex-col justify-between flex-1">
                          <div>
                            <h3 className="font-bold text-sm text-gray-900 mb-2 leading-snug">
                              {f.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed font-sans">
                              {f.description}
                            </p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EMI Highlight Card — Premium Banner */}
            {priceFactors.emiPlans?.length > 0 && (
              <div className="mt-12 bg-gradient-to-r from-[#1a0a0a] to-[#2d0d0d] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-red-900/20">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="text-xl">💳</span>
                  </div>
                  <div>
                    <span className="inline-block bg-[#e30a17] text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-sm">
                      {priceFactors.emiBadge || "0% EMI Available"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {priceFactors.emiHeading || "Flexible Monthly Installment Plans"}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl font-sans">
                      Pay in easy monthly installments with zero interest. Confirm eligibility in 2 minutes.
                    </p>
                  </div>
                </div>
                <a
                  href={`${WA_BASE}Hi,%20I%20want%20to%20check%20EMI%20eligibility%20for%20hair%20transplant`}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 bg-white text-[#e30a17] hover:bg-gray-50 font-extrabold text-xs py-3.5 px-7 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Check EMI Eligibility <ArrowIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 5: TECHNIQUE COMPARISON TABLE
          - FIX 3: Enhanced comparison section with clean light card frame
          - Highlighted Sapphire FUE column with rich Ryan Red header badge
      ════════════════════════════════════════════════════════════ */}
      {techniqueComparison?.rows?.length > 0 && techniqueComparison?.columns?.length > 1 ? (
        <section className="py-16 md:py-24 bg-[#FAF6F3] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12 max-w-2xl mx-auto">
              <EyebrowLabel text={techniqueComparison.badge || "Technique Comparison"} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                {techniqueComparison.heading || "Compare Techniques"}
              </h2>
              {techniqueComparison.description && (
                <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-sans">{techniqueComparison.description}</p>
              )}
            </div>

            <div className="overflow-x-auto rounded-3xl border border-[#E8E4DF] bg-white shadow-xl">
              <table className="w-full text-xs sm:text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#FAF6F3]">
                    {techniqueComparison.columns.map((col, ci) => (
                      <th
                        key={ci}
                        className={`px-6 py-5 text-left font-bold text-gray-900 ${
                          col.highlighted ? "bg-[#e30a17] text-white" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{col.name}</span>
                          {col.badge && (
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              col.highlighted ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                            }`}>
                              {col.badge}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {techniqueComparison.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                        {row.label}
                      </td>
                      {row.values?.map((val, vi) => (
                        <td
                          key={vi}
                          className={`px-6 py-4 text-gray-800 font-medium ${
                            techniqueComparison.columns[vi + 1]?.highlighted ? "bg-red-50/40 font-bold text-gray-900" : ""
                          }`}
                        >
                          {val.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <CostComparisonGrid />
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 6: INCLUSIONS & GUARANTEE
      ════════════════════════════════════════════════════════════ */}
      {(includedSection?.hiddenCosts?.length > 0 || includedSection?.guarantees?.length > 0) && (
        <section className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-12 max-w-xl">
              <EyebrowLabel text={includedSection.badge || "Written Price Guarantee"} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                {includedSection.heading || "What's Included — Zero Surprise Charges"}
              </h2>
              {includedSection.description && (
                <p className="text-gray-500 text-xs sm:text-sm mt-2 font-sans">{includedSection.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {includedSection.hiddenCosts?.length > 0 && (
                <div className="bg-[#FAF6F3] rounded-3xl border border-[#E8E4DF] p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-9 h-9 rounded-xl bg-white border border-[#E8E4DF] flex items-center justify-center text-lg shadow-sm">📋</span>
                    <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">
                      Costs Covered in Your Package
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {includedSection.hiddenCosts.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 py-2 border-b border-gray-100 last:border-0">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px] font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {includedSection.guarantees?.length > 0 && (
                <div className="bg-gradient-to-br from-[#e30a17] to-[#b30812] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl shadow-red-200">
                  <div>
                    <span className="inline-block bg-white/20 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-white/30">
                      The Ryan Guarantee
                    </span>
                    <h3 className="font-black text-xl text-white mb-5">
                      100% Written Price Transparency
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-white/90 mb-8">
                      {includedSection.guarantees.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 text-white text-xs font-bold">
                            {item.icon || "✓"}
                          </span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={includedSection.buttonLink || "/contact"}
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#e30a17] hover:bg-gray-50 font-extrabold py-3.5 px-6 text-xs transition-all rounded-2xl shadow-lg hover:-translate-y-0.5"
                  >
                    {includedSection.buttonText || "Get Written Graft Quote"} <ArrowIcon />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 7: CONSULTATION & FORM — Premium Professional Layout
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-center">

            {/* ── Left Column: Headline, Benefits & Contact ── */}
            <div>
              <EyebrowLabel text={consultation?.badge || "Book Free Consultation"} />

              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                {consultation?.heading || "Get Your Free Hair Transplant Consultation in Mumbai"}
              </h2>

              {consultation?.description ? (
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans">
                  {consultation.description}
                </p>
              ) : (
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans">
                  Meet our expert doctors at our Mumbai centre for a detailed scalp analysis, graft count estimation, and personalised cost plan — completely free of charge.
                </p>
              )}

              {/* Benefits 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {(consultation?.features?.length > 0
                  ? consultation.features.map((f) => f.text || f)
                  : [
                      "Free Scalp Assessment & Graft Audit",
                      "Direct Consultation with Senior Surgeon",
                      "Written Cost Quote with Zero Hidden Fees",
                      "Personalised Recovery & Care Plan",
                    ]
                ).map((text, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-[#E8E4DF] shadow-xs flex items-start gap-3 hover:shadow-md hover:border-[#e30a17]/30 transition-all duration-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-red-50 text-[#e30a17] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 border border-red-100">
                      ✓
                    </span>
                    <span className="text-xs font-semibold text-gray-800 leading-snug">{text}</span>
                  </div>
                ))}
              </div>

              {/* Compact Action Buttons & Availability */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20free%20consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-red-200 hover:-translate-y-0.5"
                >
                  💬 WhatsApp Us
                </a>
                <a
                  href="tel:+919911111247"
                  className="inline-flex items-center gap-2 bg-white border border-[#E8E4DF] hover:border-gray-300 text-gray-800 text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-xs hover:-translate-y-0.5"
                >
                  📞 Call +91-9911111247
                </a>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Doctors Available Today
                </span>
              </div>
            </div>

            {/* ── Right Column: Clean Sleek Form Card ── */}
            <div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DF] shadow-2xl shadow-gray-200/60 relative">

                {/* Form Header */}
                <div className="mb-5 pb-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Schedule Your Free Consultation</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Takes less than 60 seconds · No obligation</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Secure
                  </span>
                </div>

                {/* Form Body */}
                <ContactForm plain />

                {/* Trust Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400 leading-snug">
                  <span className="text-emerald-600 text-sm">🔒</span>
                  <p className="text-[11px]">100% private &amp; confidential. Never shared with third parties.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FAQ SECTION
      ════════════════════════════════════════════════════════════ */}
      {faqItems.length > 0 && (
        <FAQCostSection faqs={faqItems.map((item) => ({ q: item.question, a: item.answer }))} />
      )}

      {/* Medical Disclaimer */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl font-sans">
            <strong className="text-gray-700">Medical &amp; pricing disclaimer:</strong> All costs listed on this page represent standard market and clinic ranges for general guidance. Exact pricing is determined after an individual scalp assessment by a qualified doctor. Results vary by patient.
          </p>
        </div>
      </div>
    </>
  );
}
