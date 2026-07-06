"use client";

import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "./FAQSection";
import PageBanner from "@/components/layouts/pageBanner";
import {
  AnimatedCard,
  Reveal,
  RevealSection,
} from "./AnimatedPage";
import {
  Dna,
  Hourglass,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Home,
  Microscope,
  CreditCard,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Star,
  AlertTriangle,
  Headphones,
  Lightbulb,
  ArrowRight,
  Clock,
  Scissors,
  Zap,
  Award,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20consultation%20for%20hair%20transplant%20surgery";
const TEL = "tel:+919217958539";

const TECHNIQUES = [
  {
    num: "01",
    icon: <Scissors className="w-6 h-6" />,
    title: "FUE",
    subtitle: "Follicular Unit Extraction",
    desc: "Follicular units are removed individually with a micro-punch, then implanted. No linear scar; donor hair can be kept short. Suits most patients.",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    num: "02",
    icon: <Zap className="w-6 h-6" />,
    title: "Sapphire FUE",
    subtitle: "Ryan Clinic Exclusive",
    desc: "Recipient channels are created with sapphire-tipped blades — finer, smoother sites that support dense placement and cleaner healing.",
    color: "from-[#e30a17] to-red-700",
    bg: "bg-red-50",
    text: "text-[#e30a17]",
    featured: true,
  },
  {
    num: "03",
    icon: <Award className="w-6 h-6" />,
    title: "THI",
    subtitle: "Turkey Hair Implantation — Exclusive",
    desc: "A Choi implanter pen creates the site and places the graft in one motion — fine control over angle, depth, and direction. Enables no-shave surgery.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
];

const SAFETY_POINTS = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Local Anaesthesia Only", desc: "No general anaesthesia, avoiding the systemic risks of being put under." },
  { icon: <Home className="w-5 h-5" />, title: "Outpatient, Same-Day Discharge", desc: "No hospital admission for a standard case." },
  { icon: <Activity className="w-5 h-5" />, title: "Minimal Wounds", desc: "Tiny extraction points and fine recipient channels heal quickly with negligible scabbing." },
  { icon: <Award className="w-5 h-5" />, title: "Sterile OT & Single-Use Instruments", desc: "Certified operating protocols that reduce infection risk to near zero." },
];

const QUALITY_POINTS = [
  "A qualified doctor performing every surgical step — extraction, channel opening, and placement — never delegated to technicians.",
  "A surgical technique matched strictly to your case (Sapphire FUE/THI), not a fixed package.",
  "A sterile, properly-equipped operating theatre with single-use instruments.",
  "Natural hairline design — soft and irregular at the front, denser behind, matched to your face and age.",
  "Real before-and-afters and genuine reviews from comparable patients.",
  "Transparent, per-graft pricing with no day-of surprises.",
  "Honest candidacy — being told clearly if surgery isn't right for you.",
  "Structured aftercare and follow-up through the full growth cycle.",
];

const STEPS = [
  {
    num: "01",
    tag: "Day of Surgery",
    image: "/uploads/turkey-2.jpeg",
    title: "Preparation & Local Anaesthesia",
    desc: "Donor and recipient areas are cleaned and numbed. Only the initial injections sting briefly; the surgery itself is largely painless.",
    icon: <Syringe className="w-5 h-5" />,
  },
  {
    num: "02",
    tag: "Surgery",
    image: "/uploads/turkey-doctor.jpg",
    title: "Graft Extraction",
    desc: "Follicular units are removed from the DHT-resistant donor zone with a micro-punch, sorted, and preserved. Unhurried extraction protects graft quality.",
    icon: <Scissors className="w-5 h-5" />,
  },
  {
    num: "03",
    tag: "Surgery",
    image: "/uploads/gallery.jpg",
    title: "Implantation",
    desc: "Grafts are placed at the correct angle, depth, and direction — by Choi pen (THI) or into sapphire-created channels (Sapphire FUE) — building density from the hairline back.",
    icon: <Activity className="w-5 h-5" />,
  },
  {
    num: "04",
    tag: "Post-Op",
    image: "/uploads/1757752021638-1752734248947-Hair Transplant 1.jpg",
    title: "Same-Day Discharge",
    desc: "You go home the same day with written aftercare instructions, a post-op medication kit, and a structured 18-month follow-up plan.",
    icon: <Home className="w-5 h-5" />,
  },
];

const RECOVERY = [
  { time: "Days 1–3", label: "Initial Healing", desc: "Mild soreness, possible forehead swelling, small crusts forming. Sleep semi-upright.", icon: <Activity className="w-6 h-6" />, color: "bg-blue-50 text-blue-600 border-blue-100" },
  { time: "Days 4–14", label: "Desk Work", desc: "Most people return to desk work by Day 5–7. Gentle washing per instructions. Crusts flake off; redness fades.", icon: <TrendingUp className="w-6 h-6" />, color: "bg-amber-50 text-amber-600 border-amber-100" },
  { time: "Weeks 3–6", label: "Shock Shedding", desc: "Transplanted hairs fall out. This is completely normal — the follicle stays and regrows.", icon: <Hourglass className="w-6 h-6" />, color: "bg-red-50 text-[#e30a17] border-red-100" },
  { time: "Months 3–18", label: "Full Growth", desc: "New growth starts at 3 months, noticeable density by 6–9 months, final results at 12–18 months.", icon: <Star className="w-6 h-6" />, color: "bg-green-50 text-green-600 border-green-100" },
];

const DOCTORS = [
  {
    name: "Dr. Pranendra Singh",
    role: "Medical Director & Chief Surgeon",
    image: "/uploads/turkey-doctor.jpg",
    exp: "15+ Years",
    procedures: "5,000+",
    quals: [
      "MBBS — AIIMS, New Delhi",
      "MS General Surgery — PGIMER, Chandigarh",
      "Fellowship in Hair Restoration — Istanbul, Turkey",
      "Member, ISHRS",
    ],
    link: "/about/dr-pranendra-singh",
  },
  {
    name: "Dr. Rohit Verma",
    role: "Hair Restoration & Hairline Specialist",
    image: "/uploads/gallery.jpg",
    exp: "8+ Years",
    procedures: "1,800+",
    quals: [
      "MBBS — Maulana Azad Medical College, Delhi",
      "MS General Surgery — University of Delhi",
      "Diploma in Trichology — IAT Certified",
      "Specialist in DHI Choi Pen Technique",
    ],
    link: "/doctors",
  },
];

const FAQS = [
  { q: "Is hair transplant surgery safe?", a: "For suitable candidates, it's a low-risk outpatient procedure when performed by qualified doctors in a sterile facility under local anaesthesia. Minor, temporary side effects can occur; serious complications are uncommon." },
  { q: "Is a hair transplant a major surgery?", a: "No. It's a minor, minimally-invasive procedure done under local anaesthesia with no general anaesthesia and no hospital stay for a standard case. The wounds are tiny and heal quickly." },
  { q: "Does hair transplant surgery hurt?", a: "The numbing injections sting briefly; after that the surgery is largely painless. You stay awake and comfortable throughout." },
  { q: "Will I be awake during the surgery?", a: "Yes — it's done under local anaesthesia, so you're awake and comfortable. Most patients listen to music, watch something, or rest." },
  { q: "How long does the surgery take?", a: "A few hours to a full day depending on the number of grafts. You're discharged the same day." },
  { q: "How long is recovery after the surgery?", a: "Most people return to desk work in about 5–7 days. Crusts fall off by around day 10, shock shedding happens at 3–6 weeks, and final results show at 12–18 months." },
  { q: "Are the results of the surgery permanent?", a: "The transplanted hair is generally permanent because the donor follicles resist DHT. Native hair can still thin, so some patients use maintenance therapy or a future session." },
  { q: "Will the surgery leave scars?", a: "With FUE/THI there's no linear scar — only tiny dot marks that fade and hide under surrounding hair." },
  { q: "Who is a good candidate for hair transplant surgery?", a: "Adults with stable, pattern-type loss, adequate donor density, and realistic expectations. A free scalp analysis confirms whether surgery suits you." },
  { q: "What makes the best hair transplant surgery in Delhi?", a: "Doctor-led surgery, a technique matched to your case, a sterile OT, natural hairline design, real results and reviews, transparent pricing, and proper aftercare." },
  { q: "What are the risks of hair transplant surgery?", a: "Mostly temporary: swelling, numbness, redness, minor folliculitis, and shock shedding. Small risks of infection or bleeding are kept low with sterile technique and aftercare." },
  { q: "Can women have hair transplant surgery?", a: "Yes — suitable women with pattern thinning, a high hairline, or traction alopecia, with no-shave options. A careful diagnosis comes first." },
  { q: "How much does hair transplant surgery cost in Delhi?", a: "It's priced per graft and depends mainly on graft count and technique. Ryan Clinic's pricing starts from ₹40,000, with 0% EMI; your exact price is confirmed after a free scalp analysis." },
  { q: "Do I need to shave my head for the surgery?", a: "Not always — THI enables no-shave or partial-shave surgery. Your surgeon advises based on the area and graft count." },
  { q: "How do I book my surgery consultation?", a: "Call or WhatsApp +91-9217958539, or use the booking form. You'll get a scalp analysis, graft count, and cost breakdown with no obligation." },
];

const CITY_DETAILS = {
  "Delhi": {
    address: "CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034",
    phone: "+91-9217958539",
    hours: "Monday – Sunday, 9:00 AM – 7:00 PM",
    metro: "Kohat Enclave / Pitampura Metro Station (Red Line)",
    parking: "Service lane parking directly in front of the clinic",
    served: "Pitampura, Rohini, Shalimar Bagh, Model Town, Ashok Vihar, Paschim Vihar, Punjabi Bagh & all Delhi NCR",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4116262963073!2d77.13524977626922!3d28.677322982361664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03923ef1f5c3%3A0xbcc0e2bcf398c8c2!2sRyan%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  "Mumbai": {
    address: "Bandra West Premium Complex, Landmark Mall, Mumbai – 400050",
    phone: "+91-9217958539",
    hours: "Monday – Sunday, 9:00 AM – 7:00 PM",
    metro: "Bandra Railway Station / Local Transit",
    parking: "Valet parking available at the main entrance",
    served: "Bandra, Andheri, Juhu, Khar, Santa Cruz, Worli, South Mumbai & all Mumbai MMR",
    mapSrc: ""
  },
  "Gurgaon": {
    address: "Sector 43, Next to Gold Course Road Metro Pillar, Gurugram – 122002",
    phone: "+91-9217958539",
    hours: "Monday – Sunday, 9:00 AM – 7:00 PM",
    metro: "Sector 42-43 Rapid Metro Station",
    parking: "Dedicated secure basement parking for clinic visitors",
    served: "Golf Course Road, DLF Phase 1-5, Sohna Road, Sector 56, Sector 45 & all Gurgaon NCR",
    mapSrc: ""
  }
};

// ─── UI Helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#e30a17] shadow-sm animate-pulse" />
      <span className="text-[#e30a17] text-[11px] font-bold tracking-[0.2em] uppercase">{text}</span>
    </div>
  );
}

function CTAButtons({ primary = "Book Free Scalp Analysis", city = "Delhi", center = false }) {
  const dynamicWA = `https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20consultation%20for%20hair%20transplant%20surgery%20in%20${city}`;
  return (
    <div className={`flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>
      <a
        href={dynamicWA}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-[#e30a17] hover:bg-red-700 text-white font-semibold py-4 px-7 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-lg shadow-red-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        {primary}
      </a>
      <a
        href={TEL}
        className="inline-flex items-center justify-center gap-2 border border-gray-200/80 bg-white hover:bg-gray-50 text-[#302658] hover:text-[#e30a17] hover:border-red-200 font-semibold py-4 px-7 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5"
      >
        <Phone className="w-4 h-4" />
        Call Surgeon
      </a>
    </div>
  );
}

export default function SurgeryPageClient({ city }) {
  const details = CITY_DETAILS[city] || CITY_DETAILS["Delhi"];

  return (
    <>
      {/* ── 1. Page Banner ─────────────────────────────────────────────── */}
      <PageBanner
        breadcrumb={`Surgery in ${city}`}
        title={`Hair Transplant Surgery in ${city}`}
        description="Doctor-led Sapphire FUE & THI in a sterile OT. Same-day discharge, 18-month follow-up."
        bgImage="/uploads/1757752021638-1752734248947-Hair Transplant 1.jpg"
      />

      {/* ── 2. About Section (Premium Redesigned Showcase) ─────────────── */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#e30a17]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#302658]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal direction="left">
                <SectionLabel text="Surgical Excellence" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#302658] tracking-tight leading-none mb-6">
                  About Hair Transplant <br />
                  <span className="text-[#e30a17] relative inline-block">
                    Surgery
                    <span className="absolute bottom-1 left-0 w-full h-1 bg-[#e30a17]/10 rounded" />
                  </span> in {city}
                </h2>

                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed font-sans">
                  <p>
                    Hair transplant surgery in {city} is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — ensuring no general anaesthesia risks and no hospital stay. A surgeon relocates your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently.
                  </p>

                  {/* Highlighted box */}
                  <div className="bg-[#F7F5F2] border-l-4 border-[#e30a17] p-5 rounded-r-2xl my-6">
                    <p className="font-semibold text-[#302658]">
                      At Ryan Clinic, every step of your hair transplant surgery is doctor-led and carried out in a sterile operating theatre, with a free scalp analysis, an exact graft count, and transparent pricing before you commit.
                    </p>
                  </div>
                </div>

                {/* Key stats inside About section */}
                <div className="grid grid-cols-3 gap-4 pt-4 pb-6 border-y border-gray-100">
                  <div>
                    <p className="text-xl md:text-2xl font-black text-[#e30a17]">100%</p>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium">Doctor Led</p>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-black text-[#302658]">95%+</p>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium">Graft Survival</p>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-black text-[#302658]">NABH</p>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium">Sterile OT</p>
                  </div>
                </div>

                <div className="mt-8">
                  <CTAButtons primary="Book Free Consultation" city={city} />
                </div>
              </Reveal>
            </div>

            {/* Right Image Container — stacked two-image layout */}
            <div className="lg:col-span-6 w-full">
              <Reveal direction="right" delay={120}>
                {/* Outer wrapper with extra padding to give space for the front card to overflow */}
                <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[580px]">

                  {/* ── Back image (large, fills container) ── */}
                  <div className="absolute top-0 left-0 w-[90%] h-[90%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                      src="/uploads/turkey-2.jpeg"
                      alt={`Hair Transplant Surgery at Ryan Clinic ${city}`}
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-700"
                      unoptimized
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {/* Top label on back image */}
                    <div className="absolute top-5 left-5">
                      <span className="bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Sapphire FUE Procedure
                      </span>
                    </div>
                  </div>

                  {/* ── Front image (smaller card, overlapping bottom-right) ── */}
                  <div className="absolute bottom-0 right-0 w-[52%] h-[52%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
                    <Image
                      src="/uploads/turkey-doctor.jpg"
                      alt={`Doctor performing hair transplant surgery at Ryan Clinic`}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      unoptimized
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Small label inside front card */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-lg border border-gray-100">
                        <span className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#302658] leading-tight">100% Doctor-Led</p>
                          <p className="text-[10px] text-gray-500">Every incision &amp; graft</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Decorative dot accent between the two images ── */}
                  <div className="absolute top-[45%] right-[8%] w-14 h-14 rounded-full bg-[#e30a17]/10 border-2 border-[#e30a17]/20 z-0 hidden lg:block" />
                  <div className="absolute top-[48%] right-[11%] w-6 h-6 rounded-full bg-[#e30a17]/20 z-0 hidden lg:block" />

                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. What is Hair Transplant? — Criss-cross image+content ───── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Procedure Science" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                What is Hair Transplant Surgery?
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                Surgery relocates your own follicles from the DHT-resistant &ldquo;donor&rdquo; zone to thinning spots — where they grow permanently.
              </p>
            </div>
          </RevealSection>

          {/* Criss-cross rows */}
          {[
            {
              img: "/uploads/turkey-2.jpeg",
              label: "PERMANENT",
              icon: <Dna className="w-8 h-8" />,
              title: "Grafted follicles are permanent",
              desc: "Transplanted hair resists hormone shedding and stays permanent. However, native hair outside the transplant zone can continue to thin over time, which is why structured medical therapy is recommended alongside surgery.",
              points: ["DHT-resistant donor follicles", "Permanent natural hair growth", "No lifelong medication needed"],
              reverse: false,
            },
            {
              img: "/uploads/gallery.jpg",
              label: "STRATEGIC",
              icon: <Hourglass className="w-8 h-8" />,
              title: "Finite donor hair — artfully conserved",
              desc: "A transplant relocates existing hair; it doesn't generate new roots. Skilled hair surgeons follow a strategic hairline design to ensure optimal graft survival while conserving your limited donor supply for future needs.",
              points: ["Strategic hairline artistry", "Donor zone conservation", "Long-term planning approach"],
              reverse: true,
            },
          ].map((row, i) => (
            <div key={i} className={`flex flex-col ${row.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0 items-stretch mb-12 last:mb-0 rounded-3xl overflow-hidden shadow-sm border border-gray-100`}>
              {/* Image side with label */}
              <div className="lg:w-[45%] relative min-h-[320px]">
                <Image
                  src={row.img}
                  alt={row.title}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
                {/* Single bold word overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-white font-black tracking-[0.3em] select-none pointer-events-none"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", opacity: 0.18 }}
                  >
                    {row.label}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-xs font-bold tracking-widest uppercase">
                    {row.label}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:w-[55%] bg-white p-10 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#e30a17] flex items-center justify-center mb-6">
                  {row.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#302658] mb-4">{row.title}</h3>
                <p className      {/* ── 4. Safety Section ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <SectionLabel text="Safety & Standards" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mb-5">
                  Is Hair Transplant Surgery Safe?
                </h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
                  Yes, when performed in a fully sterile clinical environment by qualified surgeons. We minimize risks through strict medical protocols:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {SAFETY_POINTS.map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-[#F7F5F2] rounded-2xl border border-gray-100">
                      <span className="w-10 h-10 rounded-xl bg-white text-[#e30a17] flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-base text-[#302658]">{item.title}</h4>
                        <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="right" delay={150}>
                <div className="bg-[#1a1430] text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                  <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">GOLD MEDICAL STANDARD</p>
                  <h3 className="text-2xl font-bold text-white mb-4">Insist on Doctor-Led Care</h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    A clinical hair transplant demands physician precision. Confirm your surgeon — rather than a clinic assistant or technician — handles extraction, recipient channel cuts, and placement.
                  </p>
                  <div className="divide-y divide-white/10">
                    {[
                      { val: "100%", label: "Physician-performed surgical steps" },
                      { val: "NABH", label: "Certified Sterile OT Environment" },
                      { val: "Zero", label: "Reused or shared surgical blades" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 py-4">
                        <span className="text-2xl font-extrabold text-[#e30a17] w-16 shrink-0">{item.val}</span>
                        <span className="text-gray-300 text-sm font-medium leading-snug">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Full-width Patient Transparency Note */}
          <div className="mt-10">
            <Reveal>
              <div className="flex items-start gap-4 border-l-4 border-[#e30a17] bg-[#FFF8F8] rounded-r-2xl p-5">
                <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[#e30a17]" />
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <strong className="font-bold text-[#302658]">Patient Transparency Note:</strong> Any minor surgery carries minor temporary risks. A reliable medical facility will guide you through them honestly rather than promising impossible &ldquo;zero-risk&rdquo; guarantees.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>ronment" },
                      { val: "Zero", label: "Reused or shared surgical blades" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 py-4">
                        <span className="text-2xl font-extrabold text-[#e30a17] w-16 shrink-0">{item.val}</span>
                        <span className="text-gray-300 text-sm font-medium leading-snug">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Surgical Methodologies ─────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">

          {/* Header */}
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Surgical Techniques" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                Surgical Methodologies Offered in {city}
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                We utilize advanced micro-graft extraction techniques designed to eliminate linear scars and promote faster scalp recovery.
              </p>
            </div>
          </RevealSection>

          {/* Techniques — horizontal comparison table style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 rounded-3xl overflow-hidden shadow-sm">

            {/* ── Card 1: FUE ── */}
            <AnimatedCard delay={0} className="bg-white p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#302658]/8 flex items-center justify-center shrink-0">
                  <Scissors className="w-5 h-5 text-[#302658]" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Method 01</span>
              </div>
              <h3 className="text-2xl font-black text-[#302658] mb-1">FUE</h3>
              <p className="text-sm text-gray-400 font-semibold mb-4">Follicular Unit Extraction</p>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Follicular units are removed individually with a micro-punch, then implanted. No linear scar — donor hair can be kept short. Suits most candidates.
              </p>
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-2.5">
                {["No linear scar", "Short recovery period", "Wide candidate range"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-[#302658] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] mt-6 hover:underline">
                See pricing <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </AnimatedCard>

            {/* ── Card 2: Sapphire FUE — FEATURED ── */}
            <AnimatedCard delay={100} className="relative bg-[#1a1430] p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#e30a17]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 bg-[#e30a17] rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Most Popular
                  </div>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Method 02</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-1">Sapphire FUE</h3>
                <p className="text-sm text-white/50 font-semibold mb-4">Ryan Clinic Exclusive</p>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  Recipient channels are made with sapphire-tipped blades — finer, smoother incisions that support denser placement and dramatically cleaner healing.
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5">
                  {["Sapphire-tipped precision", "Denser graft placement", "Faster healing cycle"].map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                  {[["95%+", "Graft Survival"], ["Zero", "Linear Scars"]].map(([n, l]) => (
                    <div key={l}>
                      <p className="text-xl font-black text-white">{n}</p>
                      <p className="text-white/40 text-xs mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
                <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] mt-6 hover:underline">
                  See pricing <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </AnimatedCard>

            {/* ── Card 3: THI ── */}
            <AnimatedCard delay={200} className="bg-white p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#302658]/8 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#302658]" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Method 03</span>
              </div>
              <h3 className="text-2xl font-black text-[#302658] mb-1">THI</h3>
              <p className="text-sm text-gray-400 font-semibold mb-4">Turkey Hair Implantation</p>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                A Choi implanter pen creates the site and places the graft in one motion — precise control over angle, depth, and direction. Enables no-shave surgery for eligible patients.
              </p>
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-2.5">
                {["No-shave option", "Precise angle control", "Ryan Clinic exclusive"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-[#302658] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] mt-6 hover:underline">
                See pricing <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </AnimatedCard>
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-10 bg-[#F7F5F2] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 border border-gray-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#e30a17] mb-1">Not sure which technique suits you?</p>
              <h4 className="text-lg md:text-xl font-bold text-[#302658]">Get a free technique recommendation from our surgeons</h4>
            </div>
            <div className="shrink-0">
              <CTAButtons primary="Free Consult" city={city} />
            </div>
          </div>

          <div className="text-center mt-6">
            <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] hover:underline">
              Full cost &amp; technical breakdown of FUE vs THI → Hair Transplant Cost Guide <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>


      {/* ── 6. What Defines a Premium Surgery — full width ──────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <SectionLabel text="Quality Benchmarks" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mb-4">
              What Defines a Premium Surgery?
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-3xl">
              Review and verify key quality points for any hair clinic before choosing your surgeon:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUALITY_POINTS.map((point, i) => (
              <AnimatedCard key={i} className="bg-[#F7F5F2] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300" delay={i * 60}>
                <span className="w-8 h-8 rounded-full bg-[#e30a17]/10 text-[#e30a17] flex items-center justify-center text-xs font-extrabold mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-sans">{point}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Step-by-Step Procedure — vertical timeline with images ── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Day of Surgery" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                Step-by-Step Procedure
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                A typical session takes a few hours to a full day. You will remain awake and comfortable throughout.
              </p>
            </div>
          </RevealSection>

          {/* Vertical timeline */}
          <div className="relative">
            <div className="relative space-y-12">
              {/* Vertical line (Red & strictly bounded inside the steps container) */}
              <div className="absolute left-1/2 -translate-x-px top-2 bottom-2 w-0.5 bg-[#e30a17] hidden md:block" />

              {STEPS.map((step, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <div key={i} className={`flex flex-col md:flex-row gap-8 items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
                    {/* Image card */}
                    <div className="w-full md:w-[45%]">
                      <AnimatedCard className={`relative rounded-3xl overflow-hidden shadow-md ${isRight ? "md:ml-8" : "md:mr-8"}`} delay={i * 100}>
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover"
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 45vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#e30a17] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                              {step.tag}
                            </span>
                          </div>
                        </div>
                      </AnimatedCard>
                    </div>

                    {/* Center node */}
                    <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#e30a17] flex items-center justify-center text-[#e30a17] font-black text-sm shadow-md">
                        {step.num}
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="w-full md:w-[45%]">
                      <AnimatedCard className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm ${isRight ? "md:mr-8" : "md:ml-8"}`} delay={i * 100 + 50}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="w-9 h-9 rounded-xl bg-red-50 text-[#e30a17] flex items-center justify-center">
                            {step.icon}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {step.num}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#302658] mb-3">{step.title}</h3>
                        <p className="text-base text-gray-500 leading-relaxed">{step.desc}</p>
                      </AnimatedCard>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom note (Line does not slice through this now) */}
            <div className="mt-12 bg-[#1a1430] text-white p-6 rounded-2xl text-base leading-relaxed shadow-lg flex gap-4 items-center max-w-2xl mx-auto">
              <Headphones className="w-6 h-6 text-gray-300 shrink-0" />
              <p className="text-gray-300">Most patients listen to music, stream shows on a tablet, or simply rest during the procedure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Recovery Timeline — reference card grid layout ─────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Post-Op Recovery" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                After Your Surgery: Recovery Timeline
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                Because micro-wounds heal rapidly, recovery is fast. Normal strenuous activities can typically resume around Week 3.
              </p>
            </div>
          </RevealSection>

          {/* Reference-inspired bento: left big card + right 3 stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Left large highlighted featured card */}
            <AnimatedCard className="lg:col-span-2 bg-gradient-to-br from-[#302658] to-[#1a1430] text-white rounded-3xl p-10 flex flex-col justify-between shadow-xl" delay={0}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                  <Star className="w-7 h-7 text-amber-400" />
                </div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Months 3–18</p>
                <h3 className="text-3xl font-black text-white mb-4">New Growth &amp; Final Result</h3>
                <p className="text-white/70 text-base leading-relaxed">
                  New growth starts at 3 months, noticeable density by 6–9 months, and final mature results at 12–18 months.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                {[["12–18", "Months to final result"], ["95%+", "Graft survival rate"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-2xl font-black text-[#e30a17]">{n}</p>
                    <p className="text-white/50 text-xs mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Right 3 cards stacked */}
            <div className="lg:col-span-3 grid grid-cols-1 gap-5">
              {RECOVERY.slice(0, 3).map((stage, i) => (
                <AnimatedCard key={i} className="bg-[#F7F5F2] rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-5" delay={i * 100 + 80}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${stage.color}`}>
                    {stage.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{stage.time}</p>
                    <h4 className="text-lg font-bold text-[#302658] mb-1">{stage.label}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{stage.desc}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <CTAButtons city={city} />
          </div>
        </div>
      </section>

      {/* ── 9. Doctor Profiles — image top, content below ─────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <SectionLabel text="Ryan Certified Surgeons" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight mt-2">
                  Meet Your Surgical Specialists in {city}
                </h2>
                <p className="text-gray-500 text-base md:text-lg mt-2">
                  Ryan Clinic only employs qualified medical doctors to perform surgical extractions and channel incisions.
                </p>
              </div>
              <a href="/doctors" className="shrink-0 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 px-5 text-sm transition-all rounded-xl shadow-sm">
                View Full Team <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {DOCTORS.map((doc, i) => (
              <AnimatedCard key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 group" delay={i * 130}>
                {/* Image top */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302658]/80 via-[#302658]/20 to-transparent" />
                  {/* Stats overlay */}
                  <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                    <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-center">
                      <p className="text-white font-black text-lg leading-none">{doc.exp}</p>
                      <p className="text-white/60 text-[10px] mt-0.5">Experience</p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-center">
                      <p className="text-white font-black text-lg leading-none">{doc.procedures}</p>
                      <p className="text-white/60 text-[10px] mt-0.5">Procedures</p>
                    </div>
                  </div>
                </div>

                {/* Content below image */}
                <div className="p-8">
                  <p className="text-[#e30a17] text-[10px] font-bold uppercase tracking-widest mb-1">{doc.role}</p>
                  <h3 className="text-2xl font-bold text-[#302658] mb-5">{doc.name}</h3>
                  <ul className="space-y-2.5 mb-6">
                    {doc.quals.map((q, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-500 font-sans leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#e30a17] shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-5 border-t border-gray-50">
                    <a href={doc.link} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] hover:underline">
                      View Surgeon Profile <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Cost CTA — full-width banner ──────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1430] via-[#302658] to-[#1a1430]" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            {/* Red glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#e30a17]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#e30a17]/10 rounded-full blur-3xl" />

            <div className="relative z-10 p-10 md:p-16 text-center">
              {/* Top badge */}
              <div className="inline-flex items-center gap-2 bg-[#e30a17]/20 border border-[#e30a17]/30 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#e30a17] animate-pulse" />
                <span className="text-[#e30a17] text-[11px] font-bold uppercase tracking-widest">Transparent Pricing</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Cost of Hair Transplant Surgery
              </h2>
              <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-3">
                Starting from <span className="text-white font-bold">₹40,000</span> with 0% EMI. Priced transparently per graft — your exact cost is confirmed after a free scalp analysis.
              </p>
              <p className="text-amber-400/80 text-sm mb-10 flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Suspiciously cheap prices often mean technician-led ops with poor graft survival.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {[["₹40,000+", "Starting Price"], ["0% EMI", "6 & 12-Month Plans"], ["95%+", "Graft Survival"], ["Free", "Scalp Analysis"]].map(([n, l]) => (
                  <div key={l} className="bg-white/10 border border-white/10 rounded-2xl px-6 py-3 text-center backdrop-blur-sm">
                    <p className="text-xl font-black text-white">{n}</p>
                    <p className="text-white/50 text-xs mt-0.5">{l}</p>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20know%20the%20cost%20of%20hair%20transplant%20surgery%20in%20${city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#e30a17] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl text-base shadow-lg shadow-red-900/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Get My Price Estimate
                </a>
                <a
                  href={TEL}
                  className="inline-flex items-center gap-2 border border-white/25 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl text-base transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  Call for Pricing
                </a>
                <a
                  href="/hair-transplant-cost-in-delhi"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold py-4 px-4 transition-colors underline-offset-4 hover:underline"
                >
                  View full price guide <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Visiting Ryan Clinic — full-width, no map ─────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel text="Visit Our Center" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#302658] leading-tight tracking-tight">
              Visiting Ryan Clinic in {city}
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
              Our clinic is easily accessible and equipped with the latest surgical technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { icon: <MapPin className="w-5 h-5" />, label: "Address", val: details.address, color: "bg-red-50 text-[#e30a17]" },
              { icon: <Phone className="w-5 h-5" />, label: "Phone", val: details.phone, color: "bg-blue-50 text-blue-600" },
              { icon: <Clock className="w-5 h-5" />, label: "Hours", val: details.hours, color: "bg-green-50 text-green-600" },
              { icon: <ArrowRight className="w-5 h-5" />, label: "Metro Transit", val: details.metro, color: "bg-purple-50 text-purple-600" },
              { icon: <Star className="w-5 h-5" />, label: "Parking", val: details.parking, color: "bg-amber-50 text-amber-600" },
              { icon: <Users className="w-5 h-5" />, label: "Areas Served", val: details.served, color: "bg-indigo-50 text-indigo-600" },
            ].map(({ icon, label, val, color }, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  {icon}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm md:text-base text-[#302658] font-semibold leading-relaxed">{val}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButtons primary="Get Directions on WhatsApp" city={city} center />
          </div>
        </div>
      </section>

      {/* ── 12. Free Scalp Analysis & Quote ─────────────────────────────── */}
      <section id="appointment-form" className="relative overflow-hidden">
        {/* Split background: left dark, right light */}
        <div className="absolute inset-0 flex">
          <div className="w-full lg:w-1/2 bg-[#1a1430]" />
          <div className="hidden lg:block w-1/2 bg-[#F7F5F2]" />
        </div>
        {/* Red top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#e30a17]" />
        {/* Decorative glow */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#e30a17]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">

            {/* Left Column — Dark credentials panel */}
            <div className="py-20 lg:py-28 lg:pr-16 flex flex-col justify-center">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 bg-[#e30a17]/20 border border-[#e30a17]/30 rounded-full px-4 py-1.5 text-[11px] font-bold text-[#e30a17] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e30a17] animate-pulse" />
                  Consultation Booking
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
                Free Scalp<br />
                <span className="text-[#e30a17]">Analysis</span><br />
                <span className="text-white/60 text-3xl sm:text-4xl">&amp; Price Quote</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                Request a private, zero-obligation scalp review. Our clinical coordinators and surgeons will assess your case and call you back within 24 hours.
              </p>

              {/* Contact channels */}
              <div className="space-y-3 mb-10">
                {[
                  {
                    icon: <Phone className="w-4 h-4" />,
                    title: "Direct Surgeon Line",
                    val: details.phone,
                    link: TEL,
                  },
                  {
                    icon: <MessageCircle className="w-4 h-4" />,
                    title: "WhatsApp",
                    val: "Chat Instantly for Quick Estimates",
                    link: WA + `%20in%20${city}`,
                    ext: true,
                  },
                  {
                    icon: <Calendar className="w-4 h-4" />,
                    title: "Online Form",
                    val: "Fill the form to lock your slot →",
                    link: "#appointment-form",
                  }
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target={item.ext ? "_blank" : undefined}
                    rel={item.ext ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <span className="w-9 h-9 rounded-xl bg-[#e30a17]/20 text-[#e30a17] flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">{item.title}</p>
                      <p className="text-sm font-semibold text-white mt-0.5 truncate">{item.val}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { n: "12+", l: "Years Care" },
                  { n: "10K+", l: "Procedures" },
                  { n: "95%+", l: "Graft Rate" },
                  { n: "4.9 ★", l: "Reviews" }
                ].map((s) => (
                  <div key={s.l} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                    <p className="text-lg font-black text-[#e30a17]">{s.n}</p>
                    <p className="text-[9px] font-bold text-white/40 mt-0.5 uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Form panel */}
            <div className="py-20 lg:py-28 lg:pl-16 flex flex-col justify-center bg-[#F7F5F2] lg:bg-transparent">
              {/* Form header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#302658]">Request Consultation</h3>
                  <p className="text-sm text-gray-500 mt-1">Takes less than 60 seconds</p>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Secure</span>
                </div>
              </div>

              {/* Form — transparent background */}
              <div className="w-full">
                <ContactForm />
              </div>

              {/* Trust note */}
              <div className="mt-6 flex items-center gap-3 text-xs text-gray-400 leading-snug">
                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                <p>Your personal &amp; medical details are fully encrypted. We never share your contact info with third parties.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 13. FAQ ────────────────────────────────────────────────────── */}
      <FAQSection faqs={FAQS} />

      {/* ── Disclaimer ─────────────────────────────────────────────────── */}
      <div className="bg-[#F7F5F2] border-t border-gray-200/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 leading-relaxed max-w-4xl font-sans">
            <strong className="text-gray-500">Medical disclaimer:</strong> The content provided on this page is for general information only and does not substitute professional medical diagnosis or treatment options. Results can vary between candidates. Reviewed: June 2026 by Dr. Pranendra Singh (MBBS, MS, ISHRS Member).{" "}
            <a href="/privacy-policy" className="underline text-[#e30a17] hover:opacity-85 font-medium">Privacy Policy</a>
            {" · "}
            <a href="/terms-and-conditions" className="underline text-[#e30a17] hover:opacity-85 font-medium">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </>
  );
}
