"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useTrackCTA from "@/lib/useTrackCTA";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const WA_BASE = "https://api.whatsapp.com/send?phone=+919217958539&text=";

/* ─── DEFAULT DOCTORS DATA (used as fallback when DB has no published records) ─── */
const DEFAULT_DOCTORS = [
  {
    id: "dr-aman",
    name: "Dr. Aman Singh Gosain",
    doctorName: "Dr. Aman Singh Gosain",
    qualification: "MBBS, MS, MCh (Plastic Surgery)",
    designation: "Lead Hair Transplant Surgeon",
    location: "Delhi Clinic (Pitampura)",
    city: "Delhi",
    experience: "15+ Yrs",
    procedures: "7,500+",
    rating: "4.9 ★",
    survivalRate: "98.4%",
    image: "/uploads/turkey-doctor.jpg",
    slug: "hair-transplant-surgeon-in-delhi",
    targetHref: "/hair-transplant-surgeon-in-delhi",
    about: "Dr. Aman Singh Gosain is a renowned Plastic & Reconstructive Surgeon with over 15 years of dedicated hair restoration experience. Trained in Turkey's advanced Sapphire FUE & Turkish Technique.",
    specializations: ["Sapphire FUE", "Turkish Technique", "Beard & Eyebrow Transplant"],
    highlights: [
      "100% Doctor-Led Surgery (Zero technician handover)",
      "Turkey Sapphire FUE & Turkish Technique Certified",
      "Microscopic hairline design tailored to facial structure",
      "Comprehensive 18-Month Post-Op Recovery Care",
    ],
  },
  {
    id: "dr-pranendra",
    name: "Dr. Pranendra Singh",
    doctorName: "Dr. Pranendra Singh",
    qualification: "MBBS (AIIMS), MS (PGIMER), Turkey Fellow",
    designation: "Senior Hair Transplant Specialist",
    location: "Mumbai Clinic (Andheri)",
    city: "Mumbai",
    experience: "12+ Yrs",
    procedures: "5,000+",
    rating: "4.9 ★",
    survivalRate: "97.8%",
    image: "/uploads/about-one.jpg",
    slug: "dr-pranendra-singh",
    targetHref: "/doctors/dr-pranendra-singh",
    about: "Specializing in dense-packing Bio-FUE and facial hair transplantation. AIIMS qualified with over 5,000 surgeries performed with extreme hairline precision.",
    specializations: ["Bio-FUE Density", "Facial Hair Transplant", "Donor Area Recovery"],
    highlights: [
      "AIIMS & PGIMER Qualified Plastic Surgeon",
      "Specialist in Bio-FUE & High-Density Grafts",
      "Pioneer in Pain-Free Local Anesthesia Protocol",
      "Comprehensive 18-Month Post-Op Recovery Care",
    ],
  },
  {
    id: "dr-sharma",
    name: "Dr. R. K. Sharma",
    doctorName: "Dr. R. K. Sharma",
    qualification: "MBBS, MS (Gen Surg), ISHRS Member",
    designation: "Senior Surgical Consultant",
    location: "Hyderabad Clinic (Banjara Hills)",
    city: "Hyderabad",
    experience: "14+ Yrs",
    procedures: "6,200+",
    rating: "4.8 ★",
    survivalRate: "98.1%",
    image: "/uploads/service-two.jpg",
    slug: "dr-rk-sharma",
    targetHref: "/doctors/dr-rk-sharma",
    about: "Active member of ISHRS. Known for microscopic natural graft angulation and long-term donor preservation strategies.",
    specializations: ["ISHRS Micro-FUE", "Crown Density Restoration", "Graft Longevity Care"],
    highlights: [
      "Active ISHRS International Member",
      "Expert in Donor Area Protection & Graft Longevity",
      "Micro-incisions using 0.7mm Sapphire Blades",
      "Comprehensive 18-Month Post-Op Recovery Care",
    ],
  },
];

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
      <span className="text-[#D32F2F] text-[10.5px] font-extrabold tracking-[0.2em] uppercase font-sans">
        {text}
      </span>
    </div>
  );
}

function cleanExp(str) {
  if (!str) return "15+ Yrs";
  let s = String(str)
    .replace(/specialisation/gi, "")
    .replace(/experience/gi, "")
    .replace(/years/gi, "Yrs")
    .trim();
  if (!s.toLowerCase().includes("yr")) s += " Yrs";
  return s;
}

export default function DoctorCarouselClient({ initialDoctors = [] }) {
  const trackCTA = useTrackCTA();

  const doctorList = useCallback(() => {
    if (!initialDoctors || initialDoctors.length === 0) return DEFAULT_DOCTORS;

    return initialDoctors.map((doc, idx) => {
      const b = doc.basicInfo || {};
      const prof = doc.surgeonProfile || doc.hero || {};
      const rawSlug = (doc.slug || "").replace(/^\/+/, "").replace(/^doctors\//, "");
      const targetHref = rawSlug.startsWith("/") ? rawSlug : `/doctors/${rawSlug}`;

      return {
        id: doc._id || doc.slug || idx,
        name: b.doctorName || doc.pageName || "Dr. Specialist",
        doctorName: b.doctorName || doc.pageName || "Dr. Specialist",
        qualification: prof.qualification || b.designation || "MBBS, MS (Plastic Surgery)",
        designation: b.designation || "Hair Transplant Surgeon",
        location: b.city ? `${b.city} Clinic` : "Ryan Clinic Center",
        city: b.city || "Delhi",
        experience: cleanExp(b.yearsExperience ? `${b.yearsExperience}` : "15"),
        procedures: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : "5,000+",
        rating: b.rating ? `${b.rating} ★` : "4.9 ★",
        survivalRate: b.successRate || "98.4%",
        image: b.profileImage?.image || b.profileImage?.url || DEFAULT_DOCTORS[idx % DEFAULT_DOCTORS.length].image,
        slug: doc.slug,
        targetHref,
        about: prof.bio || prof.about || b.shortDescription || doc.seo?.metaDescription || DEFAULT_DOCTORS[0].about,
        specializations: prof.specializations?.length
          ? prof.specializations
          : ["Sapphire FUE", "Turkish Technique", "Beard & Eyebrow Transplant"],
        highlights: [
          "100% Doctor-Led Surgery (Zero technician handover)",
          "Turkey Sapphire FUE & Turkish Technique Certified",
          "Microscopic hairline design tailored to facial structure",
          "Comprehensive 18-Month Post-Op Recovery Care",
        ],
        featured: doc.featured || idx === 0,
      };
    });
  }, [initialDoctors])();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const changeSlide = useCallback((newIndex) => {
    if (newIndex === activeIndex || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsFading(false);
    }, 220);
  }, [activeIndex, isFading]);

  useEffect(() => {
    if (!isAutoplay || doctorList.length <= 1) return;
    const timer = setInterval(() => {
      const nextIdx = (activeIndex + 1) % doctorList.length;
      changeSlide(nextIdx);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, doctorList.length, activeIndex, changeSlide]);

  const activeDoc = doctorList[activeIndex] || doctorList[0];

  const handlePrev = () => {
    setIsAutoplay(false);
    const prevIdx = activeIndex === 0 ? doctorList.length - 1 : activeIndex - 1;
    changeSlide(prevIdx);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    const nextIdx = (activeIndex + 1) % doctorList.length;
    changeSlide(nextIdx);
  };

  return (
    <div className="w-full space-y-12 md:space-y-16 font-sans">

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO SPOTLIGHT CAROUSEL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#FAF6F3] py-8 md:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header with Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
              <SectionLabel text="FEATURED MEDICAL TEAM" />
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                Meet Our Expert <span className="text-[#D32F2F]">Doctors</span>
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl font-sans">
                India&apos;s Turkey-certified hair restoration doctors. 100% doctor-led procedures.
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-gray-500 font-mono mr-2">
                0{activeIndex + 1} / 0{doctorList.length}
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous Doctor"
                className="w-9 h-9 rounded-xl bg-white border border-gray-300 hover:border-[#D32F2F] hover:bg-[#D32F2F] hover:text-white text-gray-800 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Doctor"
                className="w-9 h-9 rounded-xl bg-[#D32F2F] text-white border border-[#D32F2F] hover:bg-red-800 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Doctor Spotlight Card */}
          <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 ease-out transform ${
            isFading ? "opacity-30 scale-[0.99] translate-y-1" : "opacity-100 scale-100 translate-y-0"
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

              {/* ── LEFT: Doctor Photo ── */}
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[280px] sm:min-h-[340px] bg-gray-900 group overflow-hidden">
                <Image
                  src={activeDoc.image}
                  alt={activeDoc.name}
                  fill
                  className={`object-cover object-top transition-all duration-500 ease-out ${
                    isFading ? "opacity-40 scale-105 blur-xs" : "opacity-100 scale-100 blur-none"
                  }`}
                  unoptimized
                  priority
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 40%, rgba(15,8,8,0.85) 100%)",
                  }}
                />

                {/* Top Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-sm border border-white/20 px-2.5 py-1 rounded-full shadow-xs">
                    <MapPin className="w-3 h-3 text-[#FFC107]" />
                    {activeDoc.location || activeDoc.city}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#D32F2F] px-2.5 py-1 rounded-full shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    Turkey Certified
                  </span>
                </div>

                {/* Bottom Photo Label */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10">
                  <div className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-[#FFC107] bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full mb-1.5 border border-[#FFC107]/30">
                    <Award className="w-3 h-3 text-[#FFC107]" />
                    {activeDoc.designation}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">
                    {activeDoc.name}
                  </h3>
                  <p className="text-xs text-red-100 font-medium">
                    {activeDoc.qualification}
                  </p>
                </div>

                <div className="absolute inset-y-0 left-0 w-1 bg-[#D32F2F]" />
              </div>

              {/* ── RIGHT: Doctor Info & Stat Cards ── */}
              <div className="lg:col-span-7 p-5 sm:p-6 lg:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#D32F2F] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ★ Senior Specialist Profile
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 leading-snug">
                    {activeDoc.name}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 font-sans line-clamp-3">
                    {activeDoc.about}
                  </p>

                  {/* 4 Stat Boxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center">
                      <span className="text-base sm:text-lg font-black text-[#D32F2F] block leading-tight truncate max-w-full font-sans">
                        {activeDoc.experience}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Experience
                      </span>
                    </div>

                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center">
                      <span className="text-base sm:text-lg font-black text-gray-900 block leading-tight truncate max-w-full font-sans">
                        {activeDoc.procedures}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Procedures
                      </span>
                    </div>

                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center">
                      <span className="text-base sm:text-lg font-black text-emerald-700 block leading-tight truncate max-w-full font-sans">
                        {activeDoc.survivalRate || "98.4%"}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Graft Survival
                      </span>
                    </div>

                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center">
                      <span className="text-base sm:text-lg font-black text-amber-700 block leading-tight truncate max-w-full font-sans">
                        {activeDoc.rating || "4.9 ★"}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Patient Rating
                      </span>
                    </div>
                  </div>

                  {/* Specializations & Highlights */}
                  {activeDoc.specializations && activeDoc.specializations.length > 0 && (
                    <div className="mb-5 bg-[#FFFBF9] p-3.5 sm:p-4 rounded-xl border border-red-100">
                      <h4 className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                        <Sparkles className="w-3.5 h-3.5" /> Specializations
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-700 font-semibold">
                        {activeDoc.specializations.map((spec, i) => (
                          <span key={i} className="inline-flex items-center gap-1 bg-white border border-red-200 text-[#D32F2F] px-2.5 py-0.5 rounded-lg shadow-xs text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2.5">
                  {activeDoc.slug && (
                    <Link
                      href={activeDoc.targetHref || `/doctors/${activeDoc.slug}`}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-xs group active:scale-98"
                    >
                      <span>View Full Doctor Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}

                  <a
                    href={`${WA_BASE}${encodeURIComponent(`Hi, I would like to book a consultation with ${activeDoc.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-xs active:scale-98"
                    onClick={() => trackCTA({ type: "whatsapp", ctaName: `Book Doctor: ${activeDoc.name}`, buttonLocation: "Doctor Spotlight" })}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* Carousel Slide Thumbnails */}
          <div className="mt-5 flex items-center justify-center gap-2.5 overflow-x-auto pb-1">
            {doctorList.map((d, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={d.id || idx}
                  onClick={() => {
                    setIsAutoplay(false);
                    changeSlide(idx);
                  }}
                  className={`flex items-center gap-2.5 p-2 px-3 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? "bg-white border-[#D32F2F] shadow-xs ring-1 ring-[#D32F2F]/30 scale-102"
                      : "bg-white/70 border-gray-200 hover:bg-white"
                  }`}
                >
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <Image src={d.image} alt={d.name} fill className="object-cover object-top" unoptimized />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isActive ? "text-[#D32F2F]" : "text-gray-800"}`}>
                      {d.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate max-w-[110px]">
                      {d.location || d.city}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: ALL DOCTORS DIRECTORY (Grid & Cards List)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-left">
            <SectionLabel text="DOCTOR DIRECTORY & CLINIC SPECIALISTS" />
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight font-sans">
              All Doctor <span className="text-[#D32F2F]">Profiles</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-1 max-w-2xl font-sans">
              Click any doctor card below to read their medical credentials, surgical experience, specializations, and book a consultation.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctorList.map((d) => (
              <div
                key={d.id}
                className="group bg-[#FAF6F3] rounded-2xl border border-[#EFE4DA] overflow-hidden p-5 hover:bg-white hover:shadow-md hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white shadow-xs">
                      <Image src={d.image} alt={d.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" unoptimized />
                    </div>
                    <div>
                      <span className="inline-block text-[9.5px] font-bold uppercase tracking-wider text-[#D32F2F] bg-red-50 px-2 py-0.5 rounded-full mb-1">
                        {d.location || d.city}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#D32F2F] transition-colors leading-snug">
                        {d.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {d.qualification.split("·")[0]}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-gray-800 mb-1.5">
                    {d.designation}
                  </h4>

                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4 font-sans">
                    {d.about}
                  </p>

                  <div className="space-y-1 mb-5 text-[11.5px] text-gray-700 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Doctor-Led Hair Restoration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{d.experience} Surgical Experience</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-700 transition-colors">
                    Full Profile
                  </span>
                  <Link
                    href={d.targetHref || `/doctors/${d.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D32F2F] group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Doctor Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
