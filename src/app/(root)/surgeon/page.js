import { DBConnection } from "@/lib/db";
import SurgeonPage from "@/models/Surgeon";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import SurgeonCarouselClient from "./SurgeonCarouselClient";
import {
  ShieldCheck,
  Award,
  UserCheck,
} from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Hair Transplant Surgeons – Certified Surgical Experts | Ryan Clinic",
  description:
    "Meet Ryan Clinic's team of Turkey-certified, senior hair transplant surgeons. 100% doctor-led procedures, natural hairline artistry, zero technician handover.",
  keywords: [
    "hair transplant surgeon",
    "best hair transplant surgeon delhi",
    "doctor led hair transplant",
    "turkey certified surgeon india",
    "hair restoration doctor",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/surgeon",
  },
  openGraph: {
    title: "Hair Transplant Surgeons – Certified Surgical Experts | Ryan Clinic",
    description:
      "100% doctor-led hair transplant procedures. Meet our senior surgeons across Delhi and branch clinics.",
    url: "https://www.clinicryan.com/surgeon",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/turkey-doctor.jpg",
        alt: "Ryan Clinic Hair Transplant Surgeons",
      },
    ],
  },
};

/* ─── Data Fetching ──────────────────────────────────────────────────────── */

async function getAllSurgeonPages() {
  try {
    await DBConnection();
    const pages = await SurgeonPage.find({
      "settings.status": "published",
      "settings.isDeleted": { $ne: true },
    })
      .sort({ "settings.displayOrder": 1, createdAt: -1 })
      .select(
        "title slug hero general leadSurgeon settings seo"
      )
      .lean();
    return JSON.parse(JSON.stringify(pages));
  } catch (error) {
    console.error("Failed to fetch surgeon pages:", error);
    return [];
  }
}

/* ─── Section Label Helper ───────────────────────────────────────────────── */

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] animate-pulse" />
      <span className="text-[#D32F2F] text-[11px] font-extrabold tracking-[0.22em] uppercase font-sans">
        {text}
      </span>
    </div>
  );
}

/* ─── Main Landing Page ──────────────────────────────────────────────────── */

export default async function SurgeonIndexPage() {
  const pages = await getAllSurgeonPages();

  return (
    <>
      {/* ── 1. Page Banner ───────────────────────────────────────────── */}
      <PageBanner
        breadcrumb="Surgeon Directory"
        title="Hair Transplant Surgeons & Surgical Leadership"
        description="100% Doctor-Led Hair Restoration · ISHRS & Turkey Certified · Zero Technician Handover · Microscopic Natural Hairline Artistry"
        bgImage="/uploads/turkey-doctor.jpg"
        alt="Ryan Clinic Hair Transplant Surgeons"
      />

      {/* ── 2. Interactive Carousel Spotlight & Directory ────────────── */}
      <SurgeonCarouselClient dbPages={pages} />

      {/* ── 3. Why Surgical Skill Matters ──────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <SectionLabel text="Medical Standards & Excellence" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight font-serif">
              Why Choice of Surgeon <span className="italic text-[#D32F2F]">Defines Your Result</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-3 font-sans">
              A hair transplant is a microscopic surgical procedure. Delegating extractions or slit creation to technicians can lead to donor depletion and unnatural results. Here is how our surgeon-led care protects you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D32F2F] flex items-center justify-center mb-6">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">
                  0% Technician Handover
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                  From hairline drafting to graft harvesting and channel creation, every surgical step is personally executed by our board-certified surgeon.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D32F2F] flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">
                  Natural Hairline Artistry
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Single-hair micro-grafts are placed at precise 30–45° natural angles along the front line, matching your facial symmetry and natural swirl.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D32F2F] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">
                  Maximum Follicle Survival
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Harvested grafts are stored in chilled HypoThermosol solution to maintain 98.4% viability before micro-implantation with Choi pens.
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
              <SectionLabel text="Direct Surgeon Assessment" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5 font-serif">
                Consult Directly With <br />
                <span className="italic text-[#D32F2F]">Our Senior Surgeon</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-sans">
                No sales representatives. Speak directly with a qualified doctor for an honest scalp assessment, precise graft calculation, and customized restoration plan.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "15+", l: "Years Surgical Exp." },
                  { n: "10,000+", l: "Surgeries Conducted" },
                  { n: "98.4%", l: "Graft Survival Rate" },
                  { n: "4.9 ★", l: "Patient Satisfaction" },
                ].map((s) => (
                  <div key={s.n} className="bg-white rounded-2xl border border-[#F0E6DE] p-4 text-center shadow-xs">
                    <p className="text-xl md:text-2xl font-bold text-[#D32F2F] font-serif">{s.n}</p>
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
            <strong className="text-gray-700">Medical Disclaimer:</strong> All surgical procedures carry individual health variables. Surgeon qualifications and procedure details listed on this site represent verified medical credentials. Results and graft requirements vary by individual scalp condition.
          </p>
        </div>
      </div>
    </>
  );
}
