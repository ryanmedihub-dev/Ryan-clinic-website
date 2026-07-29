import Link from "next/link";
import { DBConnection } from "@/lib/db";
import CostPage from "@/models/CostPage";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import { AlertTriangle, ArrowRight, ShieldCheck, MapPin, Phone, CheckCircle2, Sparkles, Calculator } from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Hair Transplant Cost – City-Wise Pricing Guide | Ryan Clinic",
  description:
    "Compare hair transplant cost across Delhi, Mumbai & other cities. Per-graft pricing from ₹40, 0% EMI, doctor-led Sapphire FUE & DHI. Get your free scalp analysis today.",
  keywords: [
    "hair transplant cost",
    "hair transplant price india",
    "hair transplant cost delhi",
    "hair transplant cost mumbai",
    "per graft hair transplant cost",
    "affordable hair transplant",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/cost",
  },
  openGraph: {
    title: "Hair Transplant Cost – City-Wise Pricing Guide | Ryan Clinic",
    description:
      "Compare hair transplant cost across cities. Per-graft pricing from ₹40, 0% EMI, doctor-led procedures.",
    url: "https://www.clinicryan.com/cost",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
  },
};

/* ─── Data Fetching ──────────────────────────────────────────────────────── */

async function getAllCostPages() {
  try {
    await DBConnection();
    const pages = await CostPage.find({
      "settings.status": "published",
      "settings.isDeleted": { $ne: true },
    })
      .sort({ "settings.displayOrder": 1, createdAt: -1 })
      .select("title slug hero.pricingLine hero.stats seo.metaDescription services.cards settings intro.badge")
      .lean();
    return JSON.parse(JSON.stringify(pages));
  } catch (error) {
    console.error("Failed to fetch cost pages:", error);
    return [];
  }
}

/* ─── Default Cost Items (Rates Table) ────────────────────────────────── */

const DEFAULT_COST_ITEMS = [
  { id: "01", title: "Up to 1,000 Grafts", price: "Rs. 40,000/-", oldPrice: "from Rs. 30,000/-", duration: "4–5 hrs" },
  { id: "02", title: "1,000 – 1,500 Grafts", price: "Rs. 52,500/-", oldPrice: "from Rs. 40,000/-", duration: "5 hrs" },
  { id: "03", title: "1,500 – 2,000 Grafts", price: "Rs. 70,000/-", oldPrice: "from Rs. 55,000/-", duration: "6 hrs" },
  { id: "04", title: "2,000 – 2,500 Grafts", price: "Rs. 87,500/-", oldPrice: "from Rs. 73,000/-", duration: "7 hrs" },
  { id: "05", title: "2,500 – 3,000 Grafts", price: "Rs. 1,05,000/-", oldPrice: "from Rs. 90,000/-", duration: "8 hrs" },
  { id: "06", title: "3,000 – 3,500 Grafts", price: "Rs. 1,15,000/-", oldPrice: "from Rs. 95,000/-", duration: "9 hrs" },
  { id: "07", title: "3,500 – 4,000 Grafts", price: "Rs. 1,45,000/-", oldPrice: "from Rs. 1,25,000/-", duration: "9–10 hrs" },
];

/* ─── Section Label Helper ───────────────────────────────────────────────── */

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-2 h-2 rounded-full bg-[#e30a17]" />
      <span className="text-[#e30a17] text-[11px] font-bold tracking-[0.22em] uppercase">
        {text}
      </span>
    </div>
  );
}

/* ─── Page Component ─────────────────────────────────────────────────────── */

export default async function CostIndexPage() {
  const cityPages = await getAllCostPages();

  return (
    <>
      {/* ── 1. Page Banner ───────────────────────────────────────────── */}
      <PageBanner
        breadcrumb="Hair Transplant Cost"
        title="Hair Transplant Cost Guide & City Pricing"
        description="Transparent Per-Graft Pricing · 0% Interest EMI · Doctor-Led Sapphire FUE & Turkish Technique · Free Scalp Analysis"
        bgImage="/uploads/1752667815707-fue-banner_ro9ae6.webp"
        alt="Hair transplant cost guide — Ryan Clinic pricing"
      />

      {/* ── 2. City-Wise Cost Pages & Links Grid ─────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-left">
            <SectionLabel text="City-Wise Pricing Pages" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight font-serif">
              Explore Hair Transplant Cost <span className="italic text-[#e30a17]">by City</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2 max-w-3xl font-sans">
              Select your preferred city below to view localized clinic details, doctor profiles, procedure packages, and direct booking options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityPages.length === 0 ? (
              <div className="col-span-full bg-white rounded-3xl border border-[#F0E6DE] p-12 text-center shadow-sm">
                <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold font-serif text-gray-800 mb-2">No Published Cost Pages Available</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto font-sans">
                  We are currently updating our city pricing guides. Please contact our team directly for a personalized cost quote.
                </p>
              </div>
            ) : (
              cityPages.map((page) => {
                const cleanSlug = (page.slug || "").replace(/^\/+/, "").replace(/^cost\//, "");
                const targetHref = `/cost/${cleanSlug}`;
                const displayTag = page.intro?.badge || page.location || page.title?.replace(/^Hair Transplant Cost (in|for)\s+/i, "") || "Branch Clinic";
                const displayBadge = page.badge || (page.settings?.featured ? "Popular" : null);

                return (
                  <Link
                    key={page._id || page.slug}
                    href={targetHref}
                    className="group bg-white rounded-3xl border border-[#F0E6DE] overflow-hidden p-6 shadow-sm hover:shadow-xl hover:border-[#e30a17]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Tag & City */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#e30a17] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
                          <MapPin className="w-3 h-3 text-[#e30a17]" />
                          {displayTag}
                        </span>
                        {displayBadge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            {displayBadge}
                          </span>
                        )}
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-[#e30a17] transition-colors mb-2">
                        {page.title}
                      </h3>

                      {/* Pricing Line */}
                      {page.hero?.pricingLine && (
                        <p className="text-xs font-semibold text-gray-700 bg-[#FAF6F3] p-2.5 rounded-xl border border-gray-100 mb-3">
                          {page.hero.pricingLine}
                        </p>
                      )}

                      {/* Description */}
                      {page.seo?.metaDescription && (
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-5 font-sans">
                          {page.seo.metaDescription}
                        </p>
                      )}

                      {/* Key features checklist */}
                      <div className="space-y-1.5 mb-6 text-xs text-gray-600 font-medium">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Doctor-Led Sapphire FUE &amp; DHI</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>0% Interest EMI Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Free Scalp Analysis &amp; Graft Audit</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold text-gray-400 group-hover:text-gray-700 transition-colors">
                        View Full Breakdown
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] group-hover:translate-x-1 transition-transform">
                        View Pricing
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── 3. Cost Table Section (Transparent Per-Graft Rates) ──────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <SectionLabel text="Transparent Per-Graft Rates" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight font-serif">
              Hair Transplant Cost <span className="italic text-[#e30a17]">in India</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mt-3 max-w-4xl font-sans">
              Hair transplant cost at Ryan Clinic starts from ₹40,000 and typically ranges up to ₹3,50,000, depending on graft count and technique (about ₹40–₹120 per graft for doctor-led Sapphire FUE). Your exact cost is confirmed after a free scalp analysis. 0% EMI is available.
            </p>
          </div>

          {/* Pricing Grid Container */}
          <div className="bg-[#FAF6F3] rounded-3xl border border-[#F0E6DE] overflow-hidden mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EFE5DC] bg-[#EFE5DC] gap-[1px]">
              {DEFAULT_COST_ITEMS.map((item) => (
                <div key={item.id} className="bg-[#FAF6F3] p-6 sm:p-7 flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs text-amber-900/40 font-mono font-medium">{item.id}</span>
                    <span className="inline-flex items-center gap-1.5 bg-[#F2E8E0] px-2.5 py-1 rounded-full text-xs text-gray-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.duration}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold text-[#e30a17] text-lg sm:text-xl tracking-tight">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      {item.oldPrice}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add-on Treatment Card */}
              <div className="bg-[#FAF6F3] p-6 sm:p-7 md:col-span-2 lg:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-amber-900/40 tracking-wider uppercase mb-1 font-mono">
                    Add-on Treatment
                  </p>
                  <h3 className="font-serif italic font-bold text-gray-900 text-xl sm:text-2xl">
                    PRP Therapy per Session
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-amber-900 text-xl sm:text-2xl">
                      Rs. 8,000/-
                    </p>
                    <p className="text-xs text-gray-400 font-normal">
                      from Rs. 4,000/-
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-[#F2E8E0] px-3 py-1 rounded-full text-xs text-gray-600 font-medium shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    1 hr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Beware Alert Banner */}
          <div className="w-full bg-[#FFFBF0] border border-amber-300/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm mb-10">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-950 text-sm sm:text-base">
                Beware of extremely cheap quotes
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed mt-0.5 font-sans">
                ₹15–25 per graft usually signals technician-led surgery. A hair transplant is permanent — and a poor one is very hard to fix. Always confirm a qualified doctor performs your surgery before booking on price alone.
              </p>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-[#F7F5F2] rounded-2xl border border-gray-200">
            <div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Need a customized graft calculation?</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Get instant pricing estimate from our medical team on WhatsApp.</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://api.whatsapp.com/send?phone=+919911111247&text=Hi,%20I%20would%20like%20a%20cost%20estimate%20for%20my%20hair%20transplant."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e30a17] hover:bg-red-700 text-white font-semibold py-3 px-6 text-sm rounded-xl shadow-md transition-all duration-200"
              >
                <Calculator className="w-4 h-4" />
                Calculate My Cost on WhatsApp
              </a>
              <a
                href="tel:+919911111247"
                className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 text-sm rounded-xl transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-[#e30a17]" />
                Call for Pricing Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Consultation & Contact Form ───────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionLabel text="Free Scalp Assessment" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5 font-serif">
                Get Your Exact Graft Count <br />
                <span className="italic text-[#e30a17]">And Written Price Quote</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                Don&apos;t rely on generic online estimates. Book a 10-minute free scalp analysis with a certified doctor to confirm your exact graft count and written cost breakdown — with zero obligation.
              </p>

              {/* Trust stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "15+", l: "Years Doctor Care" },
                  { n: "10,000+", l: "Surgeries Done" },
                  { n: "95%+", l: "Graft Survival Rate" },
                  { n: "4.9 ★", l: "Google Patient Rating" },
                ].map((s) => (
                  <div key={s.n} className="bg-[#FAF6F3] rounded-2xl border border-[#F0E6DE] p-4 text-center">
                    <p className="text-xl md:text-2xl font-bold text-[#e30a17]">{s.n}</p>
                    <p className="text-xs text-gray-600 mt-1 font-medium">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF6F3] rounded-3xl p-6 sm:p-8 border border-[#F0E6DE]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Medical Disclaimer ────────────────────────────────────── */}
      <div className="bg-[#F7F5F2] border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
            <strong className="text-gray-700">Medical &amp; pricing disclaimer:</strong> All costs listed on this site represent standard market and clinic ranges for general guidance. Exact pricing is determined after an individual scalp assessment by a qualified doctor. Results vary by patient.
          </p>
        </div>
      </div>
    </>
  );
}

