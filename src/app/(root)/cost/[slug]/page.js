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
import {
  RefreshCw, CalendarDays, DollarSign, Stethoscope, CreditCard, CalendarCheck, ShieldCheck, FileText,
  Zap, Leaf, Gem, Lock, CheckCircle2, ArrowRight, Syringe, TrendingUp, Clock, BadgeCheck
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

/* ═══════════════════════════════════════════════════════════════
   CITY-SPECIFIC DEFAULTS
   Used as fallbacks when admin hasn't filled visitClinic fields
═══════════════════════════════════════════════════════════════ */
const CITY_DEFAULTS = {
  delhi: {
    badge: "Our Delhi Clinic",
    address: "CD 163, Block CD,\nDakshini Pitampura,\nPitampura,\nNew Delhi – 110034",
    timings: "Monday – Saturday: 10:00 AM – 7:00 PM",
    landmark: "Near Pitampura TV Tower",
    nearbyAreas: ["Pitampura", "Rohini", "Shalimar Bagh", "Kohat Enclave", "Shakurpur"],
    phone: "+91-9911111247",
    whatsapp: "+919217958539",
    buttonText: "Get Directions to Delhi Clinic",
    buttonLink: "https://maps.app.goo.gl/pitampura-ryan-clinic",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.0680820882073!2d77.12774987550765!3d28.70136867562095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e90bec783b%3A0x5f2c5fea9f5b3d7!2sPitampura%2C%20New%20Delhi%2C%20Delhi%20110034!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin",
  },
  mumbai: {
    badge: "Mumbai Clinic Location",
    address: "MHADA 4 Bungalow, 168, Phase D,\nSV Patel Nagar, Andheri West,\nMumbai – 400053",
    timings: "Monday – Saturday: 10:00 AM – 7:00 PM",
    landmark: "Near Four Bungalows Market, Andheri West",
    nearbyAreas: ["Andheri West", "Juhu", "Lokhandwala", "Bandra", "Goregaon", "Versova"],
    phone: "+91-9911111247",
    whatsapp: "+919217958539",
    buttonText: "Get Directions to Mumbai Clinic",
    buttonLink: "https://maps.app.goo.gl/mumbai-ryan-clinic",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9025831434!2d72.83205547477044!3d19.131648550278396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a41c04ea7%3A0xe3d07ae1e81b9d4e!2sAndheri%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1691234567891!5m2!1sen!2sin",
  },
  hyderabad: {
    badge: "Hyderabad Clinic Location",
    address: "Ryan Hair Clinic,\nAndheri West Road, Banjara Hills,\nHyderabad – 500034",
    timings: "Monday – Saturday: 10:00 AM – 7:00 PM",
    landmark: "Near Banjara Hills Road No. 10",
    nearbyAreas: ["Banjara Hills", "Jubilee Hills", "Somajiguda", "Begumpet", "Ameerpet"],
    phone: "+91-9911111247",
    whatsapp: "+919217958539",
    buttonText: "Get Directions to Hyderabad Clinic",
    buttonLink: "https://maps.app.goo.gl/hyderabad-ryan-clinic",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9248702305536!2d78.44583867473484!3d17.41258498342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb971c85b2a681%3A0x7a09f81ea61a6c4!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1691234567892!5m2!1sen!2sin",
  },
};

function getCityDefaults(cityName) {
  const key = (cityName || "").toLowerCase().trim();
  if (key.includes("mumbai")) return CITY_DEFAULTS.mumbai;
  if (key.includes("hyderabad")) return CITY_DEFAULTS.hyderabad;
  return CITY_DEFAULTS.delhi; // default fallback
}


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

  // Extract city from page title first (most reliable — e.g. "Cost in Mumbai" → "Mumbai").
  // visitClinic.city is only a fallback in case the title doesn't contain a city name.
  const city =
    (page.title ? (page.title.match(/in\s+([A-Za-z\s]+?)(?:\s*[-–,|]|$)/i)?.[1]?.trim() || "") : "") ||
    page.visitClinic?.city ||
    "Delhi";

  const lowerCity = city.toLowerCase();
  const defaultGeoRegion = lowerCity.includes("mumbai")
    ? "IN-MH"
    : lowerCity.includes("hyderabad")
    ? "IN-TG"
    : "IN-DL";
  const defaultGeoPosition = lowerCity.includes("mumbai")
    ? "19.0760;72.8777"
    : lowerCity.includes("hyderabad")
    ? "17.4126;78.4477"
    : "28.6996;77.1308";
  const defaultIcbm = lowerCity.includes("mumbai")
    ? "19.0760, 72.8777"
    : lowerCity.includes("hyderabad")
    ? "17.4126, 78.4477"
    : "28.6996, 77.1308";

  const otherMeta = {};
  const geoRegion = seo.geoRegion || defaultGeoRegion;
  const geoPlacename = seo.geoPlacename || city;
  const geoPosition = seo.geoPosition || defaultGeoPosition;
  const icbm = seo.icbm || defaultIcbm;

  if (geoRegion) otherMeta["geo.region"] = geoRegion;
  if (geoPlacename) otherMeta["geo.placename"] = geoPlacename;
  if (geoPosition) otherMeta["geo.position"] = geoPosition;
  if (icbm) otherMeta["ICBM"] = icbm;

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
    other: otherMeta,
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

function GenericCostSection({ sec }) {
  const items = (sec.items || []).filter((i) => i.active !== false);
  const layout =
    sec.layout ||
    (sec.sectionKey === "session-vs-package"
      ? "comparison"
      : sec.sectionKey === "total-sessions-cost"
      ? "timeline"
      : sec.sectionKey === "worth-it"
      ? "suitability"
      : sec.sectionKey === "maintenance-cost"
      ? "highlight"
      : "cards");

  // ═══ Icon resolver — maps DB icon string/emoji to Lucide component ═══
  const ICON_MAP = {
    "🔄": RefreshCw, "📅": CalendarDays, "💰": DollarSign, "🩺": Stethoscope,
    "💳": CreditCard, "📆": CalendarCheck, "🛡️": ShieldCheck, "📄": FileText,
    "⚡": Zap, "🌱": Leaf, "💎": Gem, "🔒": Lock, "✓": CheckCircle2,
    "→": ArrowRight, "💉": Syringe, "📊": TrendingUp, "⏱": Clock, "✅": BadgeCheck,
  };
  const resolveIcon = (iconStr) => {
    const LucideIcon = ICON_MAP[iconStr];
    if (LucideIcon) return <LucideIcon className="w-5 h-5" strokeWidth={1.75} />;
    return <span className="text-base leading-none">{iconStr}</span>;
  };

  // ═══ HIGHLIGHT layout — clean white card grid with Lucide icons ═══
  if (layout === "highlight" && items.length > 0) {
    return (
      <section className="bg-white py-14 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            {sec.badge && <EyebrowLabel text={sec.badge} />}
            {sec.heading && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mt-2">
                {sec.heading}
              </h2>
            )}
            {sec.description && (
              <p className="text-gray-500 text-sm leading-relaxed mt-3 font-sans whitespace-pre-line">
                {sec.description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item, ii) => (
              <div
                key={ii}
                className="group bg-[#FAF6F3] hover:bg-white border border-[#E8E4DF] hover:border-[#e30a17]/25 hover:shadow-lg rounded-2xl p-6 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#e30a17] group-hover:bg-[#e30a17] group-hover:text-white group-hover:border-[#e30a17] transition-all duration-300">
                  {resolveIcon(item.icon)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1.5 leading-snug">{item.title}</h4>
                  {item.description && (
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ═══ CHECKLIST layout — clean white two-column payment card grid ═══
  if (layout === "checklist" && items.length > 0) {
    return (
      <section className="bg-white py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: header */}
            <div>
              {sec.badge && (
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e30a17] mb-4">
                  <span className="w-6 h-px bg-[#e30a17] inline-block" />
                  {sec.badge}
                </span>
              )}
              {sec.heading && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
                  {sec.heading}
                </h2>
              )}
              {sec.description && (
                <p className="text-gray-500 text-sm leading-relaxed font-sans">{sec.description}</p>
              )}
              <div className="mt-8 inline-flex items-center gap-3 bg-[#FAF6F3] border border-gray-200 rounded-2xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#e30a17]">
                  <Lock className="w-4 h-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">100% Transparent Pricing</p>
                  <p className="text-[11px] text-gray-500 font-sans">No hidden fees. All terms in writing.</p>
                </div>
              </div>
            </div>
            {/* Right: 2-col checklist grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item, ii) => (
                <div
                  key={ii}
                  className="relative bg-[#FAF6F3] hover:bg-white border border-[#E8E4DF] hover:border-[#e30a17]/30 hover:shadow-lg rounded-2xl p-5 transition-all duration-300 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#e30a17]">
                      {resolveIcon(item.icon)}
                    </div>
                    <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" strokeWidth={2.5} />
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{item.title}</p>
                    {item.subtitle && <p className="text-[10px] font-semibold text-[#e30a17] uppercase tracking-wide mt-0.5">{item.subtitle}</p>}
                    {item.description && <p className="text-xs text-gray-500 mt-1.5 font-sans leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF6F3] py-12 md:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-8 max-w-3xl">
          {sec.badge && <EyebrowLabel text={sec.badge} />}
          {sec.heading && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {sec.heading}
            </h2>
          )}
          {sec.description && (
            <div className="text-gray-600 text-sm md:text-base leading-relaxed mt-3 font-sans space-y-3 whitespace-pre-line">
              {sec.description}
            </div>
          )}
        </div>

        {/* 1. COMPARISON (Package Comparison: Single Session vs Course Package) */}
        {(layout === "comparison" || sec.sectionKey === "session-vs-package") && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-8">
            {items.map((item, ii) => (
              <div
                key={ii}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  item.highlight
                    ? "bg-gradient-to-b from-red-50/60 to-white border-2 border-[#e30a17]/40 shadow-xl"
                    : "bg-white border border-[#E8E4DF] shadow-sm hover:shadow-md"
                }`}
              >
                {item.badge && (
                  <span className={`absolute -top-3 left-6 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${
                    item.highlight ? "bg-[#e30a17] text-white" : "bg-gray-900 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon && (
                      <div className="w-10 h-10 rounded-xl bg-[#FAF6F3] border border-gray-200 flex items-center justify-center text-[#e30a17] shrink-0">
                        {resolveIcon(item.icon)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-black text-gray-900">{item.title}</h3>
                      {item.subtitle && <p className="text-xs text-gray-500 font-sans">{item.subtitle}</p>}
                    </div>
                  </div>

                  {item.value && (
                    <div className="my-4 pb-4 border-b border-gray-100 flex flex-wrap items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#e30a17]">{item.value}</span>
                      {item.label && <span className="text-xs text-gray-500">{item.label}</span>}
                      {item.secondaryValue && (
                        <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          {item.secondaryValue}
                        </span>
                      )}
                    </div>
                  )}

                  {item.description && (
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 font-sans">{item.description}</p>
                  )}

                  {item.features?.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {item.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-xs text-gray-700">
                          <RedCheck />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {item.ctaText && (
                  <a
                    href={item.ctaLink || "/contact"}
                    className={`mt-4 inline-flex items-center justify-center gap-2 font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md ${
                      item.highlight
                        ? "bg-[#e30a17] hover:bg-red-700 text-white"
                        : "bg-gray-900 hover:bg-black text-white"
                    }`}
                  >
                    {item.ctaText} <ArrowIcon />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 2. TIMELINE / TREATMENT PLAN (Stage 1-2, Stage 3, Post-Transplant) */}
        {(layout === "timeline" || sec.sectionKey === "total-sessions-cost") && items.length > 0 && (
          <div className="space-y-6 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, ii) => (
                <div key={ii} className="relative bg-white rounded-3xl border border-[#E8E4DF] p-6 shadow-sm hover:shadow-md hover:border-[#e30a17]/30 transition-all flex flex-col justify-between">
                  {item.badge && (
                    <span className="absolute -top-3 left-6 bg-[#e30a17] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <span className="w-9 h-9 rounded-xl bg-red-50 text-[#e30a17] flex items-center justify-center border border-red-100">
                        {resolveIcon(item.icon) || <span className="font-black text-xs">{String(ii + 1).padStart(2, "0")}</span>}
                      </span>
                      {item.subtitle && <span className="text-[11px] font-semibold text-gray-400">{item.subtitle}</span>}
                    </div>

                    <h3 className="font-extrabold text-base text-gray-900 mb-3">{item.title}</h3>

                    {item.value && (
                      <div className="bg-[#FAF6F3] rounded-2xl p-3 mb-3 border border-gray-100 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400">{item.label || "Initial Sessions"}</p>
                          <p className="text-sm font-black text-gray-900">{item.value}</p>
                        </div>
                        {item.secondaryValue && (
                          <div className="text-right border-l border-gray-200 pl-3">
                            <p className="text-[10px] uppercase font-bold text-gray-400">{item.secondaryLabel || "Maintenance"}</p>
                            <p className="text-xs font-bold text-[#e30a17]">{item.secondaryValue}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {item.description && (
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle Doctor Consultation Info Strip Below */}
            <div className="bg-white rounded-2xl border border-[#E8E4DF] p-4 flex items-center gap-3 text-xs text-gray-600 shadow-xs">
              <span className="w-7 h-7 rounded-xl bg-red-50 text-[#e30a17] flex items-center justify-center shrink-0 font-bold">🩺</span>
              <p className="font-sans leading-snug">
                <strong>Physician Assessment Note:</strong> Exact session requirement and interval are finalized by the doctor during your trichoscopy scalp audit.
              </p>
            </div>
          </div>
        )}

        {/* 3. SUITABILITY — premium split-panel diagnostic design */}
        {(layout === "suitability" || sec.sectionKey === "worth-it") && items.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-3xl shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {items.map((item, ii) => {
                const isPositive = item.type === "positive" || ii === 0;
                return (
                  <div
                    key={ii}
                    className={`relative flex flex-col p-7 sm:p-10 ${
                      isPositive
                        ? "bg-gradient-to-br from-[#f0faf5] to-white border-r border-emerald-100"
                        : "bg-gradient-to-br from-[#fffbf0] to-white"
                    }`}
                  >
                    {/* Coloured top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${isPositive ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-amber-400 to-amber-600"}`} />

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                        isPositive ? "bg-emerald-100 border border-emerald-200" : "bg-amber-100 border border-amber-200"
                      }`}>
                        {isPositive ? "✅" : "⚠️"}
                      </div>
                      <div>
                        <span className={`inline-block text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1.5 ${
                          isPositive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {item.subtitle || (isPositive ? "Best Candidates" : "Limitations")}
                        </span>
                        <h3 className={`text-lg font-black leading-tight ${isPositive ? "text-emerald-950" : "text-amber-950"}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-xs text-gray-600 leading-relaxed mb-5 font-sans border-l-2 pl-3 border-gray-200">{item.description}</p>
                    )}

                    {item.features?.length > 0 && (
                      <ul className="space-y-3">
                        {item.features.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-3">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                              isPositive ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                            }`}>
                              {isPositive ? "✓" : "!"}
                            </span>
                            <span className="text-xs font-medium text-gray-800 leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {/* 6. DEFAULT CARDS GRID */}
        {(layout === "cards" || (!["comparison", "timeline", "suitability", "highlight", "checklist"].includes(layout) && items.length > 0)) && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {items.map((item, ii) => (
              <div key={ii} className="bg-white rounded-2xl border border-[#E8E4DF] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#e30a17]/30 transition-all flex flex-col justify-between">
                <div>
                  {item.icon && <span className="block text-2xl mb-3">{item.icon}</span>}
                  {item.title && <h3 className="font-bold text-sm text-gray-900 mb-2">{item.title}</h3>}
                  {item.description && <p className="text-xs text-gray-500 leading-relaxed font-sans">{item.description}</p>}
                </div>
                {item.ctaText && (
                  <a
                    href={item.ctaLink || "/contact"}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] hover:underline"
                  >
                    {item.ctaText} <ArrowIcon className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Physician Scalp Audit Callout Banner when items array is empty */}
        {items.length === 0 && (
          <div className="mt-8 bg-gradient-to-r from-[#1a0a0a] via-[#2a0e0e] to-[#1a0a0a] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e30a17]/20 border border-[#e30a17]/40 flex items-center justify-center shrink-0 text-xl text-[#e30a17]">
                🩺
              </div>
              <div>
                <span className="inline-block bg-[#e30a17] text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-xs">
                  Doctor Evaluation
                </span>
                <h4 className="text-lg font-bold text-white">Customized Scalp Assessment &amp; Pricing</h4>
                <p className="text-xs text-gray-300 mt-1 max-w-xl font-sans leading-relaxed">
                  Exact treatment plans, session counts, and package discounts are finalized after a personalized trichoscopy examination with our specialist doctor.
                </p>
              </div>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20to%20book%20a%20free%20PRP%20scalp%20evaluation"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
            >
              Book Scalp Audit <ArrowIcon />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}


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
    pricingOptions, contentSections, mythsFacts, visitClinic,
  } = page;

  // Extract city from page title first (most reliable — e.g. "Cost in Mumbai" → "Mumbai").
  // visitClinic.city is only a fallback in case the title doesn't contain a city name.
  const cityName =
    (page.title ? (page.title.match(/in\s+([A-Za-z\s]+?)(?:\s*[-–,|]|$)/i)?.[1]?.trim() || "") : "") ||
    visitClinic?.city ||
    "Delhi";

  const faqItems = faq?.faqs || faq?.items || [];

  /* includedSection: canonical path is items[], with hiddenCosts[] fallback for legacy docs */
  const includedItems =
    (includedSection?.items?.length > 0)
      ? includedSection.items
      : (includedSection?.hiddenCosts || []);
  const includedDisclosures =
    (includedSection?.disclosures?.length > 0)
      ? includedSection.disclosures
      : (includedSection?.guarantees || []);

  const isPrpPage = page.pageType === "prp" || (page.title && page.title.toLowerCase().includes("prp"));

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

  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: page.title,
    description: page.seo?.metaDescription || page.hero?.pricingLine || "",
    url: `https://www.clinicryan.com/cost/${page.slug}`,
    lastReviewed: page.updatedAt ? new Date(page.updatedAt).toISOString().split("T")[0] : "2026-08-10",
    reviewedBy: {
      "@type": "Person",
      name: "Dr. Pranendra Singh",
      jobTitle: "Senior Plastic Surgeon & Hair Restoration Specialist",
      identifier: "Delhi Medical Council DMC-68492",
    },
    ...(isPrpPage ? {
      about: {
        "@type": "MedicalTherapy",
        name: "Platelet-Rich Plasma Therapy",
        alternateName: "PRP Hair Treatment",
      }
    } : {}),
  };

  const medicalClinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `Ryan Clinic ${cityName}`,
    telephone: "+91-9911111247",
    url: "https://www.clinicryan.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "CD 163, Block CD, Dakshini Pitampura",
      addressLocality: "Pitampura, New Delhi",
      postalCode: "110034",
      addressCountry: "IN",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ryan Clinic",
    url: "https://www.clinicryan.com",
    logo: "https://www.clinicryan.com/uploads/logo-2.png",
    sameAs: ["https://api.whatsapp.com/send?phone=+919217958539"],
  };

  const vis = page.sectionVisibility || {};

  // Use pricingOptions.items as primary source for per-session/package pricing.
  // Fall back to page.pricing.cards only if pricingOptions.items is empty (legacy support).
  // Never merge both — that would render every card twice.
  const genericPricingItems = (
    pricingOptions?.items?.length > 0
      ? pricingOptions.items
      : (page.pricing?.cards || [])
  ).filter((i) => i.active !== false);

  const formattedDate = page.updatedAt
    ? new Date(page.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "10 August 2026";

  return (
    <>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalClinicSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* ── Page Banner (Hero Banner) ─────────── */}
      {vis.hero !== false && (
        <PageBanner
          breadcrumb={hero?.breadcrumbs && hero.breadcrumbs.length > 0 ? hero.breadcrumbs : ["Home", "Cost", page.title]}
          title={hero?.title || page.title}
          description={hero?.pricingLine || ""}
          bgImage={hero?.heroImage || "/uploads/1752667815707-fue-banner_ro9ae6.webp"}
          alt={hero?.heroImageAlt || page.title}
          city={cityName}
          pageType={page.pageType}
          stats={hero?.stats && hero.stats.length > 0 ? hero.stats : (isPrpPage ? [
            { value: "Doctor-Led", label: "PRP Treatment" },
            { value: "Transparent", label: "Session Pricing" },
            { value: cityName, label: "Ryan Clinic" },
          ] : null)}
        />
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 1: INTRO — Premium Two-Column Layout
      ════════════════════════════════════════════════════════════ */}
      {vis.intro !== false && (
        <section className="bg-white py-14 md:py-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-14 lg:gap-20 items-center">

              {/* Left: Headline + trust + CTA */}
              <div>
                <EyebrowLabel text={intro?.badge || `${cityName} Pricing Guide`} />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                  {intro?.heading || page.title}
                </h2>

                {/* Medical Reviewer Byline */}
                <div className="flex items-center gap-3 bg-[#FAF6F3] border border-[#E8E4DF] rounded-xl px-4 py-2.5 mb-6 text-xs text-gray-600 font-sans shadow-xs">
                  <span className="w-7 h-7 rounded-full bg-[#e30a17]/10 text-[#e30a17] font-extrabold flex items-center justify-center shrink-0 text-xs">🩺</span>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Written &amp; medically reviewed by <a href="/doctors/hair-transplant-doctor-in-delhi" className="text-[#e30a17] hover:underline font-bold">Dr. Pranendra Singh, MS, MCh</a>
                      <span className="text-gray-400 font-normal ml-1">· Delhi Medical Council DMC-68492</span>
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      Last updated: {formattedDate}
                    </p>
                  </div>
                </div>

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
                    isPrpPage ? "Doctor-Led Treatment" : "Doctor-Led Surgery",
                    "Written Cost Guarantee",
                    "0% EMI Available",
                    "Free Scalp Analysis",
                  ].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 bg-[#FAF6F3] border border-[#E8E4DF] text-[#333] text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex flex-wrap gap-3 items-center">
                  <CTAButtons
                    primary={isPrpPage ? "Book Free PRP Assessment" : "Book Free Doctor Assessment"}
                    city={cityName}
                    title={page.title}
                    pageType={page.pageType}
                  />
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
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 2: PROCEDURES AVAILABLE CARDS — Premium Cards
      ════════════════════════════════════════════════════════════ */}
      {vis.services !== false && (
        services?.cards?.length > 0 ? (
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
                  href={`https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(`Hi, I want to compare all procedure costs in ${cityName}`)}`}
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
          // Only show hair-transplant fallback for hair-transplant page type
          (page.pageType === "hair-transplant" || !page.pageType) ? <SurgeriesCostCardsClient /> : null
        )
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 3: GRAFT PRICING TIERS — Premium Pricing Cards
      ════════════════════════════════════════════════════════════ */}
      {vis.graftPricing !== false && (
        graftPricing?.cards?.length > 0 ? (
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
                        className={`relative bg-white flex flex-col transition-all duration-300 hover:-translate-y-1.5 rounded-3xl ${isFeatured
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
                            className={`inline-flex items-center justify-center w-full gap-2 font-bold py-3 px-4 text-xs transition-all duration-200 rounded-xl mt-auto ${isFeatured
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
          // Only show hair-transplant fallback for hair-transplant page type
          (page.pageType === "hair-transplant" || !page.pageType) ? <GraftTierCards /> : null
        )
      )}

      {/* ════════════════════════════════════════════════════════════
          PRICING OPTIONS — Generic per-session/package pricing
          (PRP, DHI, and future cost types; Hair Transplant uses graftPricing)
      ════════════════════════════════════════════════════════════ */}
      {vis.pricing !== false && genericPricingItems.length > 0 && (
        <section className="bg-[#FAF6F3] py-16 md:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-xl">
              <EyebrowLabel text={pricingOptions?.badge || page.pricing?.badge || "Transparent Pricing"} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                {pricingOptions?.heading || page.pricing?.heading || "Treatment Pricing & Packages"}
              </h2>
              {(pricingOptions?.description || page.pricing?.description) && (
                <p className="text-gray-500 text-xs sm:text-sm mt-2 font-sans">
                  {pricingOptions?.description || page.pricing?.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {genericPricingItems.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)).map((item, i) => (
                <div key={i} className="relative bg-white rounded-3xl border border-[#E8E4DF] p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#e30a17]/30 transition-all duration-300 flex flex-col">
                  {item.badge && (
                    <span className="absolute -top-3 left-6 bg-[#e30a17] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                      {item.badge}
                    </span>
                  )}
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-gray-900">{item.title}</h3>
                    {item.subtitle && <p className="text-xs text-gray-500 mt-1 font-sans">{item.subtitle}</p>}
                  </div>
                  {item.price ? (
                    <div className="mb-4">
                      <span className="text-2xl sm:text-3xl font-black text-[#e30a17]">{item.price}</span>
                      {item.priceSuffix && <span className="text-xs text-gray-500 ml-1">{item.priceSuffix}</span>}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-gray-400 italic">Price confirmed after consultation</span>
                    </div>
                  )}
                  {item.description && (
                    <p className="text-xs text-gray-600 leading-relaxed mb-5 font-sans flex-1">{item.description}</p>
                  )}
                  {item.features?.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {item.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-xs text-gray-700">
                          <RedCheck />
                          <span>{typeof feat === "object" ? feat.text : feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={item.ctaLink || item.buttonLink || "/contact"}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md"
                  >
                    {item.ctaText || item.buttonText || "Book Consultation"} <ArrowIcon />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          SECTION 4: PRICE FACTORS PROCESS (Image 2 Timeline Design)
      ════════════════════════════════════════════════════════════ */}
      {vis.priceFactors !== false && (priceFactors?.factors?.length > 0 || priceFactors?.emiPlans?.length > 0) && (
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header: Title Left, Schedule Appointment Pill CTA Right (Image 2 Design) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
              <div>
                <EyebrowLabel text={priceFactors.badge || "Our Specialized Process"} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                  {priceFactors.heading || "What Determines Treatment Cost?"}
                </h2>
                {priceFactors.description && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-2xl font-sans">
                    {priceFactors.description}
                  </p>
                )}
              </div>

              {/* Schedule Appointment Pill Button (Theme Red #e30a17) */}
              <a
                href={`https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(
                  isPrpPage
                    ? `Hi, I want to schedule a PRP consultation in ${cityName}`
                    : `Hi, I want to schedule an appointment for hair transplant in ${cityName}`
                )}`}
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
                            <p className="text-xs text-gray-500 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: f.description }} />
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
                  href={`https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(
                    isPrpPage
                      ? `Hi, I want to check EMI eligibility for PRP treatment in ${cityName}`
                      : `Hi, I want to check EMI eligibility for hair transplant in ${cityName}`
                  )}`}
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
          SECTION 6: INCLUSIONS & GUARANTEE
      ════════════════════════════════════════════════════════════ */}
      {vis.includedSection !== false && (includedItems.length > 0 || includedDisclosures.length > 0) && (
        <section className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-12 max-w-xl">
              <EyebrowLabel text={includedSection?.badge || "Written Price Guarantee"} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                {includedSection?.heading || "What's Included — Zero Surprise Charges"}
              </h2>
              {includedSection?.description && (
                <p className="text-gray-500 text-xs sm:text-sm mt-2 font-sans">{includedSection.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {includedItems.length > 0 && (
                <div className="bg-[#FAF6F3] rounded-3xl border border-[#E8E4DF] p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-9 h-9 rounded-xl bg-white border border-[#E8E4DF] flex items-center justify-center text-lg shadow-sm">📋</span>
                    <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">
                      Costs Covered in Your Package
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {includedItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 py-2 border-b border-gray-100 last:border-0">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px] font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item.text || item.title || item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {includedDisclosures.length > 0 && (
                <div className="bg-gradient-to-br from-[#e30a17] to-[#b30812] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl shadow-red-200">
                  <div>
                    <span className="inline-block bg-white/20 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-white/30">
                      The Ryan Guarantee
                    </span>
                    <h3 className="font-black text-xl text-white mb-5">
                      100% Written Price Transparency
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-white/90 mb-8">
                      {includedDisclosures.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 text-white text-xs font-bold">
                            {item.icon || "✓"}
                          </span>
                          <span>{item.text || item.title || item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={includedSection?.buttonLink || "/contact"}
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#e30a17] hover:bg-gray-50 font-extrabold py-3.5 px-6 text-xs transition-all rounded-2xl shadow-lg hover:-translate-y-0.5"
                  >
                    {includedSection?.buttonText || "Get Free Quote"} <ArrowIcon />
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
      {vis.consultation !== false && (
        <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-center">

              {/* ── Left Column: Headline, Benefits & Contact ── */}
              <div>
                <EyebrowLabel text={consultation?.badge || "Book Free Consultation"} />

                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                  {consultation?.heading || `Get Your Free Consultation in ${cityName}`}
                </h2>

                {consultation?.description ? (
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans">
                    {consultation.description}
                  </p>
                ) : (
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans">
                    Meet our expert doctors at our {cityName} centre for a detailed scalp assessment, treatment recommendations, and personalised cost plan — completely free of charge.
                  </p>
                )}

                {/* Benefits 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {(consultation?.features?.length > 0
                    ? consultation.features.map((f) => f.text || f)
                    : [
                      "Free Scalp Assessment & Audit",
                      "Direct Consultation with Senior Specialist",
                      "Written Cost Quote with Zero Hidden Fees",
                      "Personalised Treatment & Aftercare Plan",
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
                    href={`https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(
                      isPrpPage
                        ? `Hi, I want a free PRP consultation in ${cityName}`
                        : `Hi, I want a free hair transplant consultation in ${cityName}`
                    )}`}
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
      )}

      {/* ════════════════════════════════════════════════════════════
          TECHNIQUE / TREATMENT COMPARISON TABLE
      ════════════════════════════════════════════════════════════ */}
      {vis.priceFactors !== false && techniqueComparison?.columns?.length > 0 && techniqueComparison?.rows?.length > 0 && (
        <section className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <EyebrowLabel text={techniqueComparison.badge || "Comparison"} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                {techniqueComparison.heading || "Treatment Comparison"}
              </h2>
              {techniqueComparison.description && (
                <p className="text-gray-500 text-xs sm:text-sm mt-2 font-sans">{techniqueComparison.description}</p>
              )}
            </div>
            <div className="overflow-x-auto rounded-2xl border border-[#E8E4DF] shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#FAF6F3] border-b border-[#E8E4DF]">
                    <th className="text-left px-5 py-4 text-xs font-extrabold text-gray-700 uppercase tracking-wider w-1/4">Option</th>
                    {techniqueComparison.columns.map((col, ci) => (
                      <th key={ci} className={`px-5 py-4 text-center text-xs font-extrabold uppercase tracking-wider ${col.highlighted ? "bg-[#e30a17] text-white" : "text-gray-700"}`}>
                        {col.name}
                        {col.badge && (
                          <span className={`block text-[9px] font-bold mt-0.5 ${col.highlighted ? "text-white/80" : "text-[#e30a17]"}`}>{col.badge}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {techniqueComparison.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 text-xs font-semibold text-gray-800">{row.label}</td>
                      {techniqueComparison.columns.map((col, ci) => (
                        <td key={ci} className={`px-5 py-4 text-xs text-center ${col.highlighted ? "font-bold text-[#e30a17]" : "text-gray-600"}`}>
                          {row.values?.[ci]?.value || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          CONTENT SECTIONS — Generic educational sections
      ════════════════════════════════════════════════════════════ */}
      {(contentSections || []).filter((sec) => sec.enabled !== false).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)).map((sec, si) => (
        <GenericCostSection key={sec.sectionKey || si} sec={sec} />
      ))}

      {/* ════════════════════════════════════════════════════════════
          MYTHS VS FACTS
      ════════════════════════════════════════════════════════════ */}
      {mythsFacts?.pairs?.filter((p) => p.active !== false).length > 0 && (
        <section className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <EyebrowLabel text={mythsFacts.badge || "Common Misconceptions"} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                {mythsFacts.heading || "Myths vs Facts"}
              </h2>
              {mythsFacts.description && (
                <p className="text-gray-500 text-xs sm:text-sm mt-2 font-sans">{mythsFacts.description}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mythsFacts.pairs.filter((p) => p.active !== false).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)).map((pair, pi) => (
                <div key={pi} className="rounded-3xl border border-[#E8E4DF] overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="bg-red-50 border-b border-red-100 px-6 py-4 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#e30a17] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✗</span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e30a17] block mb-1">Myth</span>
                      <p className="text-sm font-semibold text-gray-800 leading-snug">{pair.myth}</p>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-4 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block mb-1">Fact</span>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">{pair.fact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          VISIT CLINIC — Location / Address Block
      ════════════════════════════════════════════════════════════ */}
      {vis.clinic !== false && (() => {
        const vc = visitClinic || {};
        const cityDefaults = getCityDefaults(cityName);

        // Admin data takes priority; city defaults fill any gaps
        const vcBadge        = vc.badge        || cityDefaults.badge;
        const vcHeading      = vc.heading      || `Visiting Ryan Clinic in ${cityName}`;
        const vcDescription  = vc.description  || `Visit our modern ${cityName} clinic for a private trichoscopy examination and custom treatment quote.`;
        const vcAddress      = vc.address      || cityDefaults.address;
        const vcTimings      = vc.timings      || cityDefaults.timings;
        const vcLandmark     = vc.landmark     || cityDefaults.landmark;
        const vcNearbyAreas  = (vc.nearbyAreas && vc.nearbyAreas.length > 0) ? vc.nearbyAreas : cityDefaults.nearbyAreas;
        const vcPhone        = vc.phone        || cityDefaults.phone;
        const vcWhatsapp     = vc.whatsapp     || cityDefaults.whatsapp;
        const vcButtonLink   = vc.buttonLink   || cityDefaults.buttonLink;
        const vcButtonText   = vc.buttonText   || cityDefaults.buttonText;
        const vcMapEmbedUrl  = vc.mapEmbedUrl  || cityDefaults.mapEmbedUrl;

        return (
          <section className="bg-[#FAF6F3] py-16 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div>
                  <EyebrowLabel text={vcBadge} />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
                    {vcHeading}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-sans">
                    {vcDescription}
                  </p>

                  <div className="bg-white rounded-2xl border border-[#E8E4DF] p-6 space-y-4 shadow-sm">
                    {vcAddress && (
                      <div className="flex items-start gap-3">
                        <span className="text-[#e30a17] text-base shrink-0 mt-0.5">📍</span>
                        <div>
                          <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1">Address</p>
                          <p className="text-sm font-semibold text-gray-800 whitespace-pre-line">{vcAddress}</p>
                        </div>
                      </div>
                    )}
                    <div className={`flex items-start gap-3 ${vcAddress ? "border-t border-gray-100 pt-4" : ""}`}>
                      <span className="text-[#e30a17] text-base shrink-0 mt-0.5">🕐</span>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1">Clinic Hours</p>
                        <p className="text-sm font-semibold text-gray-800">{vcTimings}</p>
                      </div>
                    </div>
                    {vcLandmark && (
                      <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                        <span className="text-[#e30a17] text-base shrink-0 mt-0.5">🏢</span>
                        <div>
                          <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-1">Landmark</p>
                          <p className="text-sm font-semibold text-gray-800">{vcLandmark}</p>
                        </div>
                      </div>
                    )}
                    {vcNearbyAreas.length > 0 && (
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-2">Nearby Areas</p>
                        <div className="flex flex-wrap gap-2">
                          {vcNearbyAreas.map((area, ai) => (
                            <span key={ai} className="bg-[#FAF6F3] border border-[#E8E4DF] text-xs font-semibold text-gray-700 px-3 py-1 rounded-full">{area}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-3">
                      <a
                        href={`tel:${vcPhone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 bg-white border border-[#E8E4DF] text-gray-800 text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs hover:border-gray-300 transition-all"
                      >
                        📞 {vcPhone}
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send?phone=${vcWhatsapp.replace(/\D/g, "")}&text=${encodeURIComponent(
                          isPrpPage
                            ? `Hi, I want a free PRP consultation in ${cityName}`
                            : `Hi, I want a free hair transplant consultation in ${cityName}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#e30a17] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md hover:bg-red-700 transition-all"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                    {vcButtonLink && (
                      <div className="border-t border-gray-100 pt-4">
                        <a
                          href={vcButtonLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md"
                        >
                          {vcButtonText} <ArrowIcon />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {vcMapEmbedUrl ? (
                  <div className="rounded-3xl overflow-hidden border border-[#E8E4DF] shadow-sm h-80 lg:h-full min-h-[400px]">
                    <iframe
                      src={vcMapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${cityName} Clinic Location Map`}
                    />
                  </div>
                ) : (
                  <div className="rounded-3xl bg-white border border-[#E8E4DF] h-64 lg:h-full min-h-[400px] flex flex-col items-center justify-center gap-4 text-center p-8 shadow-sm">
                    <span className="text-5xl">📍</span>
                    <div>
                      <p className="font-bold text-gray-800 text-sm mb-1">{cityName} Clinic Directions</p>
                      <p className="text-xs text-gray-500 font-sans">
                        Visit our clinic in {cityName} or contact our medical team for instant location guidance.
                      </p>
                    </div>
                    <a
                      href={`https://api.whatsapp.com/send?phone=919217958539&text=${encodeURIComponent(`Hi, I need directions to Ryan Clinic in ${cityName}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#e30a17] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md hover:bg-red-700 transition-all"
                    >
                      💬 Ask for Directions
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ════════════════════════════════════════════════════════════
          FAQ SECTION
      ════════════════════════════════════════════════════════════ */}
      {vis.faq !== false && faqItems.length > 0 && (
        <FAQCostSection
          faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
          pageType={page.pageType}
          cityName={cityName}
        />
      )}

      {/* Medical Disclaimer */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl font-sans">
            <strong className="text-gray-700">Medical &amp; pricing disclaimer:</strong> Ryan Clinic prices shown above represent published clinic rates. Market ranges shown elsewhere are indicative figures for comparison. Final treatment recommendations and exact applicable charges are confirmed during an individual scalp assessment by a qualified doctor. Results vary by patient.
          </p>
        </div>
      </div>
    </>
  );
}

