import Link from "next/link";
import { DBConnection } from "@/lib/db";
import SurgeryPageModel from "@/models/surgeryPage";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import SurgeryCarouselClient from "./SurgeryCarouselClient";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Scissors,
  Activity,
  Sparkles,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Hair Transplant Surgery – Advanced FUE & Turkish Technique Procedures | Ryan Clinic",
  description:
    "Explore hair transplant surgery guides across Delhi & branch clinics. Doctor-led Sapphire FUE & Turkish Technique, 98.4% graft survival, sterile operating theatres, 0% EMI.",
  keywords: [
    "hair transplant surgery",
    "hair transplant surgery in delhi",
    "sapphire fue surgery",
    "turkish technique hair transplant india",
    "hair restoration procedure",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/surgery",
  },
  openGraph: {
    title: "Hair Transplant Surgery – Advanced FUE & Turkish Technique Procedures | Ryan Clinic",
    description:
      "Doctor-led hair transplant procedures with microscopic precision and 98.4% graft survival rate.",
    url: "https://www.clinicryan.com/surgery",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1752734248947-Hair Transplant 1.jpg",
        alt: "Ryan Clinic Hair Transplant Surgery",
      },
    ],
  },
};

/* ─── Data Fetching ──────────────────────────────────────────────────────── */

async function getAllSurgeryPages() {
  try {
    await DBConnection();
    const pages = await SurgeryPageModel.find({
      "settings.isDeleted": { $ne: true },
      "settings.status": { $ne: "draft" },
    })
      .sort({ "settings.displayOrder": 1, createdAt: -1 })
      .select("pageName slug landingCardImage hero introduction seo settings")
      .lean();
    return JSON.parse(JSON.stringify(pages));
  } catch (error) {
    console.error("Failed to fetch surgery pages:", error);
    return [];
  }
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

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

/* ─── Main Landing Page ──────────────────────────────────────────────────── */

export default async function SurgeryIndexPage() {
  const pages = await getAllSurgeryPages();

  return (
    <>
      {/* ── 1. Page Banner ───────────────────────────────────────────── */}
      <PageBanner
        breadcrumb="Surgery Pages"
        title="Hair Transplant Surgery & Treatment Guides"
        description="Doctor-Led Sapphire FUE & Turkish Technique · Microscopic Channel Creation · 98.4% Graft Survival · Sterile OT Facilities"
        bgImage="/uploads/1752734248947-Hair Transplant 1.jpg"
        alt="Ryan Clinic Hair Transplant Surgery"
      />

      {/* ── 2. Surgery Carousel Section (3D Focus Perspective Style) ──── */}
      <SurgeryCarouselClient dbPages={pages} />

      {/* ── 3. Procedure Standards & Tech ──────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <SectionLabel text="Surgical Innovations" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight font-serif">
              State-of-the-Art <span className="italic text-[#e30a17]">Restoration Technology</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-3 font-sans">
              We combine Turkey&apos;s finest Sapphire micro-blades and Choi implanter pens to achieve maximum density with zero scalp scarring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#e30a17] flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">
                  Sapphire FUE Blades
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Gemstone sapphire instruments create 0.7–0.9mm micro-slits for faster healing, reduced tissue trauma, and back-to-work in 5 days.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#e30a17] flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">
                  Choi Implanter Pens (Turkish Technique)
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Follicles are implanted directly into recipient zones without pre-made slits when maximum density is required.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#e30a17] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">
                  18-Month Recovery Tracking
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Free post-op follow-ups at months 1, 3, 6, 12, and 18 ensure your hairline progress is monitored until full hair density matures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Free Consultation Section ───────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionLabel text="Procedure Assessment" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5 font-serif">
                Schedule Your <br />
                <span className="italic text-[#e30a17]">Free Surgery Analysis</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-sans">
                Book a 1-on-1 consultation with our senior surgeon to determine your exact graft requirements, recommended technique, and transparent price quote.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "10,000+", l: "Surgeries Conducted" },
                  { n: "0%", l: "Surgical Infection Rate" },
                  { n: "98.4%", l: "Graft Survival Rate" },
                  { n: "4.9 ★", l: "Patient Satisfaction" },
                ].map((s) => (
                  <div key={s.n} className="bg-white rounded-2xl border border-[#F0E6DE] p-4 text-center">
                    <p className="text-xl md:text-2xl font-bold text-[#e30a17] font-serif">{s.n}</p>
                    <p className="text-xs text-gray-600 mt-1 font-medium font-sans">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6DE] shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Medical Disclaimer ────────────────────────────────────── */}
      <div className="bg-[#F7F5F2] border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl font-sans">
            <strong className="text-gray-700">Medical Disclaimer:</strong> Hair transplant surgery is an invasive medical procedure. Procedure descriptions and timelines provided on this page are for medical guidance. Individual hair loss stages and recovery rates vary per patient.
          </p>
        </div>
      </div>
    </>
  );
}
