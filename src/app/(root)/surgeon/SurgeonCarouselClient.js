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

/* ─── DEFAULT SURGEON DATA (used as fallback when DB has few records) ────── */
const DEFAULT_SURGEONS = [
  {
    id: "delhi-lead",
    title: "Hair Transplant Surgeon in Delhi",
    slug: "hair-transplant-surgeon-in-delhi",
    doctorName: "Dr. Aman Singh Gosain",
    qualification: "MBBS, MS, MCh (Plastic Surgery)",
    designation: "Lead Hair Restoration Surgeon",
    location: "Delhi Clinic (Pitampura)",
    experience: "15+ Yrs",
    surgeries: "7,500+",
    rating: "4.9 ★",
    survivalRate: "98.4%",
    image: "/uploads/turkey-doctor.jpg",
    bio: "Dr. Aman Singh Gosain is a renowned Plastic & Reconstructive Surgeon with over 15 years of dedicated hair restoration experience. Trained in Turkey's advanced Sapphire FUE & Turkish Technique.",
    highlights: [
      "100% Doctor-Led Surgery (Zero technician handover)",
      "Turkey Sapphire FUE & Turkish Technique Certified",
      "Microscopic hairline design tailored to facial structure",
      "Comprehensive 18-Month Post-Op Recovery Care",
    ],
    featured: true,
  },
  {
    id: "mumbai-lead",
    title: "Hair Transplant Surgeon in Mumbai",
    slug: "hair-transplant-surgeon-in-mumbai",
    doctorName: "Dr. Pranendra Singh",
    qualification: "MBBS (AIIMS), MS (PGIMER), Turkey Fellow",
    designation: "Senior Hair Transplant Specialist",
    location: "Mumbai Clinic (Andheri West)",
    experience: "12+ Yrs",
    surgeries: "5,000+",
    rating: "4.9 ★",
    survivalRate: "97.8%",
    image: "/uploads/about-one.jpg",
    bio: "Specializing in dense-packing Bio-FUE and facial hair transplantation. Dr. Pranendra Singh has performed over 5,000 surgeries with extreme precision and natural hairlines.",
    highlights: [
      "AIIMS & PGIMER Qualified Plastic Surgeon",
      "Specialist in Bio-FUE & High-Density Grafts",
      "Pioneer in Pain-Free Local Anesthesia Protocol",
      "Comprehensive 18-Month Post-Op Recovery Care",
    ],
    featured: false,
  },
  {
    id: "hyderabad-lead",
    title: "Hair Transplant Surgeon in Hyderabad",
    slug: "hair-transplant-surgeon-in-hyderabad",
    doctorName: "Dr. R. K. Sharma",
    qualification: "MBBS, MS (Gen Surg), ISHRS Member",
    designation: "Senior Surgical Consultant",
    location: "Hyderabad Clinic (Banjara Hills)",
    experience: "14+ Yrs",
    surgeries: "6,200+",
    rating: "4.8 ★",
    survivalRate: "98.1%",
    image: "/uploads/service-two.jpg",
    bio: "Member of International Society of Hair Restoration Surgery (ISHRS). Known for natural graft angulation and donor area preservation strategies.",
    highlights: [
      "Active ISHRS International Member",
      "Expert in Donor Area Protection & Graft Longevity",
      "Micro-incisions using 0.7mm Sapphire Blades",
      "Comprehensive 18-Month Post-Op Recovery Care",
    ],
    featured: false,
  },
];

/* ─── Helper Components ─────────────────────────────────────────────────── */

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

function cleanExperienceString(str) {
  if (!str) return "15+ Yrs";
  let cleaned = String(str)
    .replace(/specialisation/gi, "")
    .replace(/experience/gi, "")
    .replace(/years/gi, "Yrs")
    .trim();
  if (!cleaned.toLowerCase().includes("yr")) {
    cleaned += " Yrs";
  }
  return cleaned;
}

export default function SurgeonCarouselClient({ dbPages = [] }) {
  const trackCTA = useTrackCTA();

  const surgeonsList = useCallback(() => {
    if (!dbPages || dbPages.length === 0) return DEFAULT_SURGEONS;

    return dbPages.map((page, idx) => {
      const hero = page.hero || {};
      const docCard = hero.doctorCard || {};
      const lead = page.leadSurgeon || {};
      const rawSlug = (page.slug || "").replace(/^\/+/, "").replace(/^surgeon\//, "");
      const targetHref = rawSlug === "hair-transplant-surgeon-in-delhi" ? `/${rawSlug}` : `/surgeon/${rawSlug}`;

      return {
        id: page._id || page.slug || idx,
        title: page.title || "Hair Transplant Surgeon",
        slug: page.slug,
        targetHref,
        doctorName: docCard.doctorName || lead.heading || page.title || "Dr. Specialist",
        qualification: docCard.qualification || "MBBS, MS, MCh (Plastic Surgery)",
        designation: docCard.designation || "Lead Hair Restoration Surgeon",
        location: hero.badge?.text || "Ryan Clinic Center",
        experience: cleanExperienceString(docCard.experience),
        surgeries: "5,000+",
        rating: "4.9 ★",
        survivalRate: "98.4%",
        image: docCard.image?.url || lead.doctorImage?.url || DEFAULT_SURGEONS[idx % DEFAULT_SURGEONS.length].image,
        bio: page.general?.shortDescription || page.seo?.metaDescription || hero.description || DEFAULT_SURGEONS[0].bio,
        highlights: [
          "100% Doctor-Led Surgery (Zero technician handover)",
          "Turkey Sapphire FUE & Turkish Technique Certified",
          "Microscopic hairline design tailored to facial structure",
          "Comprehensive 18-Month Post-Op Recovery Care",
        ],
        featured: page.settings?.featured || idx === 0,
      };
    });
  }, [dbPages])();

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

  // Auto-advance carousel every 6 seconds unless paused
  useEffect(() => {
    if (!isAutoplay || surgeonsList.length <= 1) return;
    const timer = setInterval(() => {
      const nextIdx = (activeIndex + 1) % surgeonsList.length;
      changeSlide(nextIdx);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, surgeonsList.length, activeIndex, changeSlide]);

  const activeSurgeon = surgeonsList[activeIndex] || surgeonsList[0];

  const handlePrev = () => {
    setIsAutoplay(false);
    const prevIdx = activeIndex === 0 ? surgeonsList.length - 1 : activeIndex - 1;
    changeSlide(prevIdx);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    const nextIdx = (activeIndex + 1) % surgeonsList.length;
    changeSlide(nextIdx);
  };

  return (
    <div className="w-full space-y-12 md:space-y-16 font-sans">

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO SPOTLIGHT CAROUSEL (Full Width, Smooth Fade Slide)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#FAF6F3] py-8 md:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header with Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
              <SectionLabel text="FEATURED SURGICAL LEADERSHIP" />
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                Meet Our Senior <span className="text-[#D32F2F]">Hair Surgeons</span>
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl font-sans">
                Board-certified specialists conducting 100% doctor-led hair transplant procedures.
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-gray-500 font-mono mr-2">
                0{activeIndex + 1} / 0{surgeonsList.length}
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous Surgeon"
                className="w-9 h-9 rounded-xl bg-white border border-gray-300 hover:border-[#D32F2F] hover:bg-[#D32F2F] hover:text-white text-gray-800 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Surgeon"
                className="w-9 h-9 rounded-xl bg-[#D32F2F] text-white border border-[#D32F2F] hover:bg-red-800 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Surgeon Spotlight Card with Smooth Fade/Slide Animation */}
          <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 ease-out transform ${
            isFading ? "opacity-30 scale-[0.99] translate-y-1" : "opacity-100 scale-100 translate-y-0"
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

              {/* ── LEFT: Doctor Photo ── */}
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[280px] sm:min-h-[340px] bg-gray-900 group overflow-hidden">
                <Image
                  src={activeSurgeon.image}
                  alt={activeSurgeon.doctorName}
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
                    {activeSurgeon.location}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#D32F2F] px-2.5 py-1 rounded-full shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    100% Doctor Performed
                  </span>
                </div>

                {/* Bottom Photo Label */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10">
                  <div className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider text-[#FFC107] bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full mb-1.5 border border-[#FFC107]/30">
                    <Award className="w-3 h-3 text-[#FFC107]" />
                    {activeSurgeon.designation}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">
                    {activeSurgeon.doctorName}
                  </h3>
                  <p className="text-xs text-red-100 font-medium">
                    {activeSurgeon.qualification}
                  </p>
                </div>

                <div className="absolute inset-y-0 left-0 w-1 bg-[#D32F2F]" />
              </div>

              {/* ── RIGHT: Surgeon Info & Stat Cards ── */}
              <div className="lg:col-span-7 p-5 sm:p-6 lg:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#D32F2F] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ★ {activeSurgeon.title}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 leading-snug">
                    {activeSurgeon.doctorName}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 font-sans line-clamp-3">
                    {activeSurgeon.bio}
                  </p>

                  {/* 4 Stat Boxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center transition-all duration-300 hover:border-[#D32F2F]/30 hover:bg-[#FFF9F6]">
                      <span className="text-base sm:text-lg font-black text-[#D32F2F] block leading-tight truncate max-w-full font-sans">
                        {activeSurgeon.experience}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Experience
                      </span>
                    </div>

                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center transition-all duration-300 hover:border-gray-400 hover:bg-white">
                      <span className="text-base sm:text-lg font-black text-gray-900 block leading-tight truncate max-w-full font-sans">
                        {activeSurgeon.surgeries}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Surgeries
                      </span>
                    </div>

                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/40">
                      <span className="text-base sm:text-lg font-black text-emerald-700 block leading-tight truncate max-w-full font-sans">
                        {activeSurgeon.survivalRate}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Graft Survival
                      </span>
                    </div>

                    <div className="bg-[#FAF6F3] p-2.5 rounded-xl border border-[#F0E6DE] text-center overflow-hidden flex flex-col justify-center items-center transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/40">
                      <span className="text-base sm:text-lg font-black text-amber-700 block leading-tight truncate max-w-full font-sans">
                        {activeSurgeon.rating}
                      </span>
                      <span className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider block mt-1 leading-none truncate max-w-full font-sans">
                        Patient Rating
                      </span>
                    </div>
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="mb-5 bg-[#FFFBF9] p-3.5 sm:p-4 rounded-xl border border-red-100">
                    <h4 className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                      <Sparkles className="w-3.5 h-3.5" /> Key Surgical Standards
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-700 font-medium">
                      {activeSurgeon.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11.5px] leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2.5">
                  <Link
                    href={activeSurgeon.targetHref || `/${activeSurgeon.slug}`}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-xs group active:scale-98"
                  >
                    <span>View Full Surgeon Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={`${WA_BASE}${encodeURIComponent(`Hi, I would like to book a consultation with ${activeSurgeon.doctorName}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-xs active:scale-98"
                    onClick={() => trackCTA({ type: "whatsapp", ctaName: `Book Surgeon: ${activeSurgeon.doctorName}`, buttonLocation: "Surgeon Spotlight" })}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* Carousel Slide Thumbnails Bar */}
          <div className="mt-5 flex items-center justify-center gap-2.5 overflow-x-auto pb-1">
            {surgeonsList.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setIsAutoplay(false);
                    changeSlide(idx);
                  }}
                  className={`flex items-center gap-2.5 p-2 px-3 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? "bg-white border-[#D32F2F] shadow-xs ring-1 ring-[#D32F2F]/30 scale-102"
                      : "bg-white/70 border-gray-200 hover:bg-white hover:border-gray-300 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <Image src={s.image} alt={s.doctorName} fill className="object-cover object-top" unoptimized />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isActive ? "text-[#D32F2F]" : "text-gray-800"}`}>
                      {s.doctorName}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate max-w-[110px]">
                      {s.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: ALL SURGEON PROFILES DIRECTORY (Grid & Cards List)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-left">
            <SectionLabel text="SURGEON DIRECTORY & BRANCH PAGES" />
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              All Surgeon <span className="text-[#D32F2F]">Profiles</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-1 max-w-2xl font-sans">
              Click any surgeon card below to read the complete surgical breakdown, hairline portfolio, patient reviews, and procedure pricing.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {surgeonsList.map((s) => (
              <div
                key={s.id}
                className="group bg-[#FAF6F3] rounded-2xl border border-[#EFE4DA] overflow-hidden p-5 hover:bg-white hover:shadow-md hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white shadow-xs">
                      <Image src={s.image} alt={s.doctorName} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" unoptimized />
                    </div>
                    <div>
                      <span className="inline-block text-[9.5px] font-bold uppercase tracking-wider text-[#D32F2F] bg-red-50 px-2 py-0.5 rounded-full mb-1">
                        {s.location}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#D32F2F] transition-colors leading-snug">
                        {s.doctorName}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {s.qualification.split("·")[0]}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-gray-800 mb-1.5">
                    {s.title}
                  </h4>

                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4 font-sans">
                    {s.bio}
                  </p>

                  <div className="space-y-1 mb-5 text-[11.5px] text-gray-700 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Doctor-Led Extraction &amp; Slits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{s.experience} Surgical Experience</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-700 transition-colors">
                    Full Profile
                  </span>
                  <Link
                    href={s.targetHref || `/${s.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D32F2F] group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Surgeon Page</span>
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
