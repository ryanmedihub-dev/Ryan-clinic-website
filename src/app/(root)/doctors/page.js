import { DBConnection } from "@/lib/db";
import Doctor from "@/models/Doctors";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import DoctorCarouselClient from "./DoctorCarouselClient";
import {
  ShieldCheck,
  Award,
  UserCheck,
} from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Meet the Doctors Behind Your Results | Ryan Clinic",
  description:
    "Every procedure is performed exclusively by board-certified, Turkey-trained surgeons. No technicians. No shortcuts. Just world-class precision you can trust.",
  keywords: [
    "hair transplant doctors",
    "turkey certified doctors india",
    "best hair transplant doctors delhi",
    "doctor led hair transplant",
    "ryan clinic medical team",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/doctors",
  },
  openGraph: {
    title: "Meet the Doctors Behind Your Results | Ryan Clinic",
    description:
      "Every procedure is performed exclusively by board-certified, Turkey-trained surgeons. No technicians. No shortcuts. Just world-class precision you can trust.",
    url: "https://www.clinicryan.com/doctors",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/turkey-doctor.jpg",
        alt: "Ryan Clinic Hair Restoration Doctors",
      },
    ],
  },
};

/* ─── Data Fetching (Dynamic MongoDB Query) ───────────────────────────────── */

async function getAllDoctorsPages() {
  try {
    await DBConnection();
    const doctors = await Doctor.find({
      deletedAt: null,
      status: "published",
      // Exclude temporary demo profiles — they are CMS-only records for branch testing,
      // not real public doctor profiles. Branch pages resolve doctors via
      // services.assignedDoctor (Mongoose populate), so they are unaffected.
      slug: { $not: /^demo-doctor-/i },
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(doctors));
  } catch (error) {
    console.error("Failed to fetch doctors from MongoDB:", error);
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

/* ─── Main Doctors Page ──────────────────────────────────────────────────── */

export default async function DoctorsPage() {
  const dbDoctors = await getAllDoctorsPages();

  return (
    <>
      {/* ── 1. Page Banner ───────────────────────────────────────────── */}
      <PageBanner
        breadcrumb="Our Medical Team"
        title="Meet the Doctors Behind Your Results"
        description="Every procedure is performed exclusively by board-certified, Turkey-trained surgeons. No technicians. No shortcuts. Just world-class precision you can trust."
        bgImage="/uploads/turkey-doctor.jpg"
        alt="Ryan Clinic Expert Hair Transplant Doctors"
      />

      {/* ── 2. Interactive Spotlight Carousel & Dynamic Doctor Directory ── */}
      <DoctorCarouselClient initialDoctors={dbDoctors} />

      {/* ── 3. Medical Standards & Excellence ────────────────────────── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <SectionLabel text="Medical Standards & Excellence" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight font-sans">
              Why Choice of Doctor <span className="text-[#D32F2F]">Defines Your Result</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-3 font-sans">
              A hair transplant is a microscopic surgical procedure. Delegating extractions or channel creation to technicians can lead to donor depletion and unnatural results. Here is how our doctor-led care protects you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D32F2F] flex items-center justify-center mb-6">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-sans text-gray-900 mb-3">
                  0% Technician Handover
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans">
                  From hairline drafting to graft harvesting and channel creation, every surgical step is personally executed by our board-certified doctor.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF6F3] rounded-3xl p-8 border border-[#F0E6DE] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D32F2F] flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-sans text-gray-900 mb-3">
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
                <h3 className="text-xl font-bold font-sans text-gray-900 mb-3">
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
              <SectionLabel text="Direct Doctor Assessment" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5 font-sans">
                Consult Directly With <br />
                <span className="text-[#D32F2F]">Our Senior Doctor</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-sans">
                No sales representatives. Speak directly with a qualified doctor for an honest scalp assessment, precise graft calculation, and customized restoration plan.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "15+", l: "Years Doctor Care" },
                  { n: "10,000+", l: "Surgeries Conducted" },
                  { n: "98.4%", l: "Graft Survival Rate" },
                  { n: "4.9 ★", l: "Patient Satisfaction" },
                ].map((s) => (
                  <div key={s.n} className="bg-white rounded-2xl border border-[#F0E6DE] p-4 text-center shadow-xs">
                    <p className="text-xl md:text-2xl font-bold text-[#D32F2F] font-sans">{s.n}</p>
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
            <strong className="text-gray-700">Medical Disclaimer:</strong> All medical procedures carry individual health variables. Doctor qualifications and credentials listed on this site represent verified medical qualifications. Results and graft requirements vary by individual scalp condition.
          </p>
        </div>
      </div>
    </>
  );
}
