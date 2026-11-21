import Link from "next/link";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Activity,
  Stethoscope,
} from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Clinical Hair & Skin Treatments in Delhi | Ryan Clinic",
  description:
    "Explore clinical hair loss therapies, PRP treatment, chemical skin peels, and eyebrow restoration at Ryan Clinic in Delhi. Doctor-led consultations and personalised care.",
  keywords: [
    "hair loss treatment delhi",
    "prp hair treatment delhi",
    "alopecia treatment delhi",
    "chemical skin peels delhi",
    "eyebrow transplant delhi",
    "clinical hair restoration ryan clinic",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/treatments",
  },
  openGraph: {
    title: "Clinical Hair & Skin Treatments in Delhi | Ryan Clinic",
    description:
      "Explore clinical hair loss therapies, PRP treatment, chemical skin peels, and eyebrow restoration at Ryan Clinic in Delhi. Doctor-led consultations and personalised care.",
    url: "https://www.clinicryan.com/treatments",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1752746168716-PRP 1.jpg",
        width: 1200,
        height: 630,
        alt: "Clinical Hair and Skin Treatments at Ryan Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical Hair & Skin Treatments in Delhi | Ryan Clinic",
    description:
      "Explore clinical hair loss therapies, PRP treatment, chemical skin peels, and eyebrow restoration at Ryan Clinic in Delhi.",
    images: ["https://www.clinicryan.com/uploads/1752746168716-PRP 1.jpg"],
  },
};

/* ─── Treatment Card Data ─────────────────────────────────────────────────── */

const TREATMENT_CARDS = [
  {
    title: "Alopecia Treatment",
    slug: "/alopecia-treatments",
    category: "Clinical Hair Loss Evaluation",
    description:
      "Comprehensive clinical assessment and medically supervised care plans for diverse hair loss conditions, including alopecia areata and androgenetic alopecia.",
    highlights: [
      "Accurate diagnostic evaluation before treatment",
      "Medically indicated therapeutic options",
      "Structured long-term management and monitoring",
    ],
    ctaLabel: "View Alopecia Care",
  },
  {
    title: "PRP Hair Treatment",
    slug: "/prp-hair-loss-treatment-in-delhi",
    category: "Regenerative Hair Therapy",
    description:
      "Doctor-led Platelet-Rich Plasma therapy utilizing concentrated autologous growth factors to support hair follicle health and density.",
    highlights: [
      "Autologous, biocompatible process from your own blood",
      "Minimally invasive scalp micro-injections",
      "Individualised session protocol following assessment",
    ],
    ctaLabel: "View PRP Therapy",
  },
  {
    title: "Chemical Skin Peels",
    slug: "/chemical-skin-peels",
    category: "Dermatological Skin Care",
    description:
      "Personalised dermatological peel treatments selected according to skin type, tone, and specific concerns in a controlled clinical environment.",
    highlights: [
      "Individual skin assessment and medical history review",
      "Superficial, medium, and deeper peel formulations",
      "Structured post-peel aftercare and sun protection advice",
    ],
    ctaLabel: "View Skin Peels",
  },
  {
    title: "Eyebrow Restoration",
    slug: "/eyebrow-transplant",
    category: "Precision Follicular Restoration",
    description:
      "Doctor-led follicular implantation planned to blend naturally with your facial symmetry and restore thinning, sparse, or uneven eyebrows.",
    highlights: [
      "Individual brow assessment and natural angle design",
      "Precision follicular extraction and implantation",
      "Sterile clinical setting with guided recovery support",
    ],
    ctaLabel: "View Eyebrow Care",
  },
  {
    title: "Hair Fall & Loss Treatment in Delhi",
    slug: "/treatments/hair-fall-loss-treatment-in-delhi",
    category: "Delhi Clinical Consultation",
    description:
      "In-person clinical evaluation and targeted hair fall management protocols at our Delhi facility to evaluate active hair thinning and shedding.",
    highlights: [
      "In-depth scalp examination and clinical evaluation",
      "Tailored non-surgical care recommendations",
      "Consultations available at our Pitampura clinic",
    ],
    ctaLabel: "View Delhi Hair Fall Care",
  },
];

/* ─── Helper Component ────────────────────────────────────────────────────── */

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

/* ─── Breadcrumb JSON-LD ──────────────────────────────────────────────────── */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.clinicryan.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Treatments",
      item: "https://www.clinicryan.com/treatments",
    },
  ],
};

/* ─── Page Component ─────────────────────────────────────────────────────── */

export default function TreatmentsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── 1. Page Banner ── */}
      <PageBanner
        breadcrumb="Treatments"
        title="Clinical Hair & Skin Treatments"
        description="Doctor-led clinical evaluations, targeted hair restoration therapies, and dermatological skin care at Ryan Clinic in Delhi."
        bgImage="/uploads/1752746168716-PRP 1.jpg"
        alt="Clinical hair and skin treatments at Ryan Clinic Delhi"
        badgeText="Clinical Dermatology & Hair Care"
      />

      {/* ── 2. Directory Section ── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-left">
            <SectionLabel text="Clinical Services Directory" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight font-serif">
              Explore Our <span className="italic text-[#e30a17]">Treatment Options</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2 max-w-3xl font-sans">
              From diagnostic hair loss evaluations and regenerative PRP sessions to restorative eyebrow procedures and medical skin peels, select a treatment below to view clinical details and consultation availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREATMENT_CARDS.map((card) => (
              <Link
                key={card.slug}
                href={card.slug}
                className="group bg-white rounded-3xl border border-[#F0E6DE] overflow-hidden p-6 shadow-sm hover:shadow-xl hover:border-[#e30a17]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#e30a17] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3 text-[#e30a17]" />
                      {card.category}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-[#e30a17] transition-colors mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed mb-5 font-sans">
                    {card.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2 mb-6 text-xs text-gray-600 font-medium">
                    {card.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-gray-400 group-hover:text-gray-700 transition-colors">
                    Learn More
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] group-hover:translate-x-1 transition-transform">
                    {card.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Consultation Booking Section ── */}
      <section className="bg-white py-14 md:py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-4">
              <SectionLabel text="Consultation & Care Planning" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
                Schedule Your Treatment Assessment
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Whether you are exploring hair loss management or dermatological treatments, every procedure begins with an individual consultation to determine clinical suitability, realistic expectations, and a transparent care plan.
              </p>
              <div className="space-y-3 pt-2 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Clinical assessment led by trained medical professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Personalised treatment planning matched to your concerns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Pitampura, New Delhi clinical facility with modern hygiene standards</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

