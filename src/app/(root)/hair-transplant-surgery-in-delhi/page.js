import Image from "next/image";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "./FAQSection";
import {
  AnimatedStatsGrid,
  AnimatedCard,
  Reveal,
  RevealSection,
  RevealList,
} from "./AnimatedPage";

export const metadata = {
  title: "Best Hair Transplant Surgery in Delhi | Ryan Clinic",
  description:
    "Hair transplant surgery in Delhi at Ryan Clinic — doctor-led FUE & THI in a sterile OT, local anaesthesia, same-day discharge. Free consult. Book your surgery.",
  keywords: [
    "hair transplant surgery in Delhi",
    "best hair transplant surgery in Delhi",
    "Sapphire FUE hair transplant Delhi",
    "THI hair transplant Delhi",
    "safe hair transplant surgery Delhi",
    "doctor-led hair transplant Delhi",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Hair Transplant Surgery in Delhi — Doctor-Led FUE & THI | Ryan Clinic",
    description:
      "Safe, minimally-invasive hair transplant surgery in Delhi performed by certified doctors. What it involves, safety, recovery and cost.",
    url: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1752667815707-fue-banner_ro9ae6.webp",
        width: 1200,
        height: 630,
        alt: "Best Hair Transplant Surgery in Delhi — Ryan Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Transplant Surgery in Delhi — Doctor-Led FUE & THI | Ryan Clinic",
    description:
      "Safe, minimally-invasive hair transplant surgery in Delhi performed by certified doctors. What it involves, safety, recovery and cost.",
    images: ["https://www.clinicryan.com/uploads/1752667815707-fue-banner_ro9ae6.webp"],
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20consultation%20for%20hair%20transplant%20surgery";
const TEL = "tel:+919217958539";

const HERO_STATS = [
  { val: "10,000+", label: "Procedures Completed" },
  { val: "12+ Years", label: "Clinical Experience" },
  { val: "From ₹40,000", label: "Starting Price" },
  { val: "0% EMI", label: "6 & 12-Month Plans" },
];

const TECHNIQUES = [
  {
    num: "01",
    title: "FUE (Follicular Unit Extraction)",
    desc: "Follicular units are removed individually with a micro-punch, then implanted. No linear scar; donor hair can be kept short. Suits most patients.",
  },
  {
    num: "02",
    title: "Sapphire FUE",
    desc: "An FUE refinement where recipient channels are created with sapphire-tipped blades — finer, smoother sites that support dense placement and clean healing.",
    tag: "Ryan Clinic Exclusive",
  },
  {
    num: "03",
    title: "THI (Turkey Hair Implantation)",
    desc: "A Choi implanter pen creates the site and places the graft in one motion — fine control over angle, depth, and direction. Enables no-shave surgery.",
    tag: "Ryan Clinic Exclusive",
  },
];

const SAFETY_POINTS = [
  { title: "Local Anaesthesia Only", desc: "No general anaesthesia, avoiding the systemic risks of being put under." },
  { title: "Outpatient, Same-Day Discharge", desc: "No hospital admission for a standard case." },
  { title: "Minimal Wounds", desc: "Tiny extraction points and fine recipient channels heal quickly with negligible scabbing." },
  { title: "Sterile OT & Single-Use Instruments", desc: "Certified operating protocols that reduce infection risk to near zero." },
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

const NORWOOD_ROWS = [
  { grade: "Grade 2–3", pattern: "Hairline / temple recession", grafts: "~1,000–2,000" },
  { grade: "Grade 4–5", pattern: "Larger frontal + crown loss", grafts: "~2,000–3,500" },
  { grade: "Grade 6–7", pattern: "Extensive baldness", grafts: "~4,000+ (often staged)" },
];

const PRE_OP = [
  { title: "Avoid Blood-Thinners", desc: "Stop aspirin, vitamin E, or blood-thinning supplements 5–7 days before surgery (only as medically directed)." },
  { title: "No Alcohol & Smoking", desc: "Avoid alcohol and nicotine for at least 3–5 days before the procedure to improve blood flow and graft survival." },
  { title: "Arrange Transit", desc: "Arrange a companion to drive you home — local anaesthesia and mild sedatives are used." },
  { title: "Wash Your Scalp", desc: "Wash hair with a mild shampoo the morning of surgery or the night before." },
  { title: "Wear Button-Up Clothing", desc: "Avoid pullover garments so grafts aren't disturbed when changing after the procedure." },
];

const STEPS = [
  { title: "1. Preparation & Local Anaesthesia", desc: "Donor and recipient areas are cleaned and numbed. Only the initial injections sting briefly; the surgery itself is largely painless." },
  { title: "2. Graft Extraction", desc: "Follicular units are removed from the DHT-resistant donor zone with a micro-punch, sorted, and preserved. Unhurried extraction protects graft quality." },
  { title: "3. Implantation", desc: "Grafts are placed at the correct angle, depth, and direction — by Choi pen (THI) or into sapphire-created channels (Sapphire FUE) — building density from the hairline back." },
  { title: "4. Same-Day Discharge", desc: "You go home the same day with written aftercare instructions, a post-op medication kit, and a follow-up plan." },
];

const RECOVERY = [
  { time: "Days 1–3", title: "Initial Healing", desc: "Mild soreness, possible forehead swelling, small crusts forming. Sleep semi-upright." },
  { time: "Days 4–14", title: "Return to Desk Work", desc: "Most people return to desk work by Day 5–7. Gentle washing per instructions. Crusts flake off; redness fades." },
  { time: "Weeks 3–6", title: "Shock Shedding", desc: "Transplanted hairs fall out. This is completely normal — the follicle stays and regrows." },
  { time: "Months 3–18", title: "New Growth & Final Result", desc: "New growth starts at 3 months, noticeable density by 6–9 months, and final mature results at 12–18 months." },
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
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8358485292723!2d72.83401567606775!3d19.059496487095945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130722db1%3A0xe7b3d324be806be4!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  "Gurgaon": {
    address: "Sector 43, Next to Gold Course Road Metro Pillar, Gurugram – 122002",
    phone: "+91-9217958539",
    hours: "Monday – Sunday, 9:00 AM – 7:00 PM",
    metro: "Sector 42-43 Rapid Metro Station",
    parking: "Dedicated secure basement parking for clinic visitors",
    served: "Golf Course Road, DLF Phase 1-5, Sohna Road, Sector 56, Sector 45 & all Gurgaon NCR",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.9702213702167!2d77.09848567625895!3d28.449574992383862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18bc3a5fffff%3A0x6b8fef3e536bf32a!2sGolf%20Course%20Rd%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.clinicryan.com" },
    { "@type": "ListItem", position: 2, name: "Hair Transplant", item: "https://www.clinicryan.com/hair-transplant-in-delhi" },
    { "@type": "ListItem", position: 3, name: "Hair Transplant Surgery in Delhi", item: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/" },
  ],
};

// ─── Shared Sub-Components (UI Only) ──────────────────────────────────────────

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#e30a17] shadow-sm animate-pulse" />
      <span className="text-[#e30a17] text-[11px] font-bold tracking-[0.2em] uppercase">
        {text}
      </span>
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
        <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {primary}
      </a>
      <a
        href={TEL}
        className="inline-flex items-center justify-center gap-2 border border-gray-200/80 bg-white hover:bg-gray-50 text-[#302658] hover:text-[#e30a17] hover:border-red-200 font-semibold py-4 px-7 text-sm tracking-wide transition-all duration-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5"
      >
        <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Surgeon
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HairTransplantSurgeryDelhi({ city = "Delhi" }) {
  const details = CITY_DETAILS[city] || CITY_DETAILS["Delhi"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── 1. Premium Custom Hero Banner ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F7F5F2] pt-24 pb-16 lg:py-28 border-b border-gray-100">
        {/* Background Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#302658 1px, transparent 1px), linear-gradient(90deg, #302658 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Home</span>
                <span className="text-[10px] text-gray-300">/</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hair Transplant</span>
                <span className="text-[10px] text-gray-300">/</span>
                <span className="text-[10px] font-bold text-[#e30a17] uppercase tracking-widest">Surgery in {city}</span>
              </div>

              {/* Tag / Badge */}
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e30a17]" />
                <span className="text-[10px] font-bold text-[#e30a17] uppercase tracking-widest">Turkey-Certified Medical Care</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#302658] tracking-tight leading-[1.08] font-sans">
                Best Hair Transplant <span className="text-[#e30a17]">Surgery</span> in {city}
              </h1>

              {/* Sub-headline */}
              <p className="text-gray-600 text-sm md:text-base max-w-xl leading-relaxed font-sans">
                Experience elite doctor-led Sapphire FUE &amp; THI in a fully sterile operating theatre. Same-day discharge with 18-month structured post-op growth cycles.
              </p>

              {/* Trust Features Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3">
                {[
                  "100% Doctor-Led Operations",
                  " Turkey-Trained Lead Surgeon",
                  "Single-Use Surgical Kits Only",
                  "0% EMI Options Available",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-[#e30a17] flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <CTAButtons primary="Schedule Free Scalp Analysis" city={city} />
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Main Image Frame */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white">
                  <Image
                    src="/uploads/1757752021638-1752734248947-Hair Transplant 1.jpg"
                    alt={`Best Hair Transplant Clinic in ${city}`}
                    fill
                    className="object-cover object-center"
                    unoptimized
                    priority
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302658]/40 via-transparent to-transparent" />
                </div>

                {/* Floating Gold Quality Seal badge */}
                <div className="absolute -bottom-6 -left-6 bg-white border border-gray-150 rounded-2xl shadow-xl p-4 max-w-[200px] flex items-center gap-3.5 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 text-xl font-bold">
                    ★
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#302658] leading-tight">NABH Standard OT</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">High Sterilization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats Grid & Introduction Section ──────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Animated Stats Widgets */}
          <AnimatedStatsGrid stats={HERO_STATS} />

          {/* Intro + Summary Card Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
            {/* Left Content column */}
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <SectionLabel text="Surgical Excellence" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mb-5">
                  About Hair Transplant Surgery in {city}
                </h2>
                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                  <p>
                    Hair transplant surgery in {city} is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — ensuring no general anaesthesia risks and no hospital stay. A surgeon relocates your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently.
                  </p>
                  <p className="font-medium text-[#302658]">
                    At Ryan Clinic, every step of your hair transplant surgery is doctor-led and carried out in a sterile operating theatre, with a free scalp analysis, an exact graft count, and transparent pricing before you commit.
                  </p>
                </div>
                <div className="mt-8">
                  <CTAButtons primary="Book Free Consultation" city={city} />
                </div>
              </Reveal>
            </div>

            {/* Right Summary Table Column */}
            <div className="lg:col-span-5">
              <Reveal direction="right" delay={120}>
                <div className="bg-[#F7F5F2] rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-base font-bold text-[#302658] mb-4 pb-3 border-b border-gray-200/50">
                    Procedure Summary
                  </h3>
                  <div className="space-y-3.5">
                    {[
                      ["Procedure type", "Minor Outpatient Surgery", "📋"],
                      ["Anaesthesia", "Local Numbs Only", "💉"],
                      ["Discharge", "Same-Day Return Home", "🏡"],
                      ["Techniques", "Sapphire FUE & THI (Choi Pen)", "🔬"],
                      ["Starting price", "From ₹40,000 (Transparent)", "💰"],
                      ["EMI Plans", "0% EMI options available", "💳"],
                      ["Aftercare Followup", "18 Months Active Growth Tracker", "📅"],
                      ["Clinic Location", `Pitampura, North ${city} / NCR`, "📍"],
                    ].map(([label, value, emoji], i) => (
                      <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-gray-200/20 last:border-0 last:pb-0">
                        <span className="text-gray-500 font-medium flex items-center gap-2">
                          <span className="text-sm">{emoji}</span>
                          {label}
                        </span>
                        <span className="font-semibold text-[#302658] text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What is Hair Transplant? (Procedure Science) ───────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Procedure Science" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                What is Hair Transplant Surgery?
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Surgery relocates your own follicles from the DHT-resistant &ldquo;donor&rdquo; zone to thinning spots. Once moved, the follicles keep their resistance, allowing permanent natural hair growth.
              </p>
            </div>
          </RevealSection>

          {/* Premium Science Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedCard className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300" delay={0}>
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#e30a17] flex items-center justify-center text-xl font-bold mb-6">
                🧬
              </div>
              <h3 className="text-lg font-bold text-[#302658] mb-3">
                Grafted follicles are permanent
              </h3>
              <p className="text-gray-500 text-sm md:text-[14.5px] leading-relaxed">
                Transplanted hair resists hormone shedding and stays permanent. However, native hair outside the transplant zone can continue to thin over time, which is why structured medical therapy is recommended alongside surgery.
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300" delay={120}>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl font-bold mb-6">
                ⌛
              </div>
              <h3 className="text-lg font-bold text-[#302658] mb-3">
                Finite donor hair supply
              </h3>
              <p className="text-gray-500 text-sm md:text-[14.5px] leading-relaxed">
                A transplant relocates existing hair; it doesn&apos;t generate new roots. Skilled hair surgeons follow a strategic hairline design to ensure optimal graft survival while conserving your limited donor supply for the future.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* ── 4. Is It Safe? (Safety & Standards) ────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Content column */}
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <SectionLabel text="Safety &amp; Standards" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mb-5">
                  Is Hair Transplant Surgery Safe?
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                  Yes, when performed in a fully sterile clinical environment by qualified surgeons. We minimize risks through strict medical protocols:
                </p>

                {/* Safety check list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {SAFETY_POINTS.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs shrink-0 font-extrabold mt-0.5">✓</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#302658]">{item.title}</h4>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-amber-900 leading-relaxed flex gap-3">
                  <span className="text-lg leading-none shrink-0 mt-0.5">💡</span>
                  <div>
                    <strong className="font-bold text-amber-950">Patient Transparency Note:</strong> Any minor surgery carries minor temporary risks. A reliable medical facility will guide you through them honestly rather than promising impossible &ldquo;zero-risk&rdquo; guarantees.
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Verify Doctor Care Column */}
            <div className="lg:col-span-5">
              <Reveal direction="right" delay={150}>
                <div className="bg-[#1a1430] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                  {/* Subtle decorative glow overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">GOLD MEDICAL STANDARD</p>
                  <h3 className="text-xl font-bold text-white mb-4">Insist on Doctor-Led Care</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    A clinical hair transplant demands physician precision. Confirm your surgeon — rather than a clinic assistant or technician — handles extraction, recipient channel cuts, and placement.
                  </p>
                  <div className="divide-y divide-white/10">
                    {[
                      { val: "100%", label: "Physician-performed surgical steps" },
                      { val: "NABH", label: "Certified Sterile OT Environment" },
                      { val: "Zero", label: "Reused or shared surgical blades" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 py-4">
                        <span className="text-2xl font-extrabold text-[#e30a17] w-14 shrink-0">{item.val}</span>
                        <span className="text-gray-300 text-xs font-medium leading-snug">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Surgical Techniques comparison ────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Surgical Techniques" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                Surgical Methodologies Offered in {city}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                We utilize advanced, micro-graft extraction techniques designed to eliminate long linear scars, promoting quicker scalp recovery.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
            {TECHNIQUES.map((tech, i) => (
              <AnimatedCard key={i} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between" delay={i * 100}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Method {tech.num}</span>
                    {tech.tag && (
                      <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-1 uppercase tracking-wider rounded-md">{tech.tag}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#302658] mb-3">{tech.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">{tech.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-50">
                  <span className="text-xs font-bold text-[#e30a17] hover:underline cursor-pointer">Learn details →</span>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <RevealSection>
            <div className="text-center">
              <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#e30a17] hover:underline">
                Full cost &amp; technical breakdown of FUE vs THI → Hair Transplant Cost Guide
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 6. Norwood Scale & Indicative Graft Counts ───────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Quality Points */}
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <SectionLabel text="Quality Benchmarks" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mb-5">
                  What Defines a Premium Surgery?
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                  Review and verify key quality points for any hair clinic before choosing your surgeon:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {QUALITY_POINTS.map((point, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e30a17] shrink-0 mt-2" />
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans">{point}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right Norwood Scale Table */}
            <div className="lg:col-span-5">
              <Reveal direction="right" delay={120}>
                <div className="bg-[#F7F5F2] rounded-3xl border border-gray-150 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-[#302658] mb-1">Norwood Scale &amp; Graft Estimates</h3>
                  <p className="text-xs text-gray-400 mb-5 leading-relaxed font-sans">
                    Estimates only — exact graft requirements are determined during personal scalp checks.
                  </p>
                  
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#1a1430] text-white">
                          <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-white/80">Norwood Grade</th>
                          <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-white/80">Loss Pattern</th>
                          <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-white/80">Est. Grafts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {NORWOOD_ROWS.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3.5 font-bold text-[#302658]">{row.grade}</td>
                            <td className="px-4 py-3.5 text-xs text-gray-500 font-sans">{row.pattern}</td>
                            <td className="px-4 py-3.5 font-bold text-[#e30a17] text-right">{row.grafts}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5">
                    <CTAButtons primary="Analyze My Scalp Pattern" city={city} />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Guidelines & Step-By-Step Day of Surgery ─────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Pre-Op Guidelines */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <SectionLabel text="Pre-Operative Guidelines" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight">
                  Before Your Surgery
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed">
                  Careful preparation ensures optimal graft survival and smooth scalp healing.
                </p>
              </div>

              <div className="space-y-4">
                {PRE_OP.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-[#e30a17] text-xs font-extrabold shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#302658] mb-0.5">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps (Day of Surgery) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <SectionLabel text="Day of Surgery" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight">
                  Step-by-Step Procedure
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed">
                  A typical session takes a few hours to a full day. You will remain awake and comfortable throughout.
                </p>
              </div>

              <div className="space-y-4">
                {STEPS.map((step, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200/60 last:border-0 last:pb-0">
                    <h4 className="text-sm font-bold text-[#302658] mb-1">{step.title}</h4>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#1a1430] text-white p-5 rounded-2xl text-xs md:text-sm leading-relaxed shadow-lg flex gap-3.5 items-center">
                <span className="text-xl">🎧</span>
                <p className="text-gray-300">
                  Most patients listen to music, stream shows on a tablet, or simply rest during the procedure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Recovery Timeline Section ──────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel text="Post-Op Recovery" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mt-2 mb-4">
                After Your Surgery: Recovery Timeline
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Because micro-wounds heal rapidly, recovery is fast. Normal strenuous activities can typically resume around Week 3.
              </p>
            </div>
          </RevealSection>

          {/* Premium Visual Timeline Track */}
          <div className="relative max-w-5xl mx-auto mb-12">
            {/* Timeline connection line (Desktop) */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-100 -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {RECOVERY.map((stage, i) => (
                <AnimatedCard key={i} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between" delay={i * 90}>
                  <div>
                    {/* Visual node */}
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#e30a17] flex items-center justify-center font-bold text-[10px] mb-4">
                      {stage.time}
                    </div>
                    <h3 className="text-base font-bold text-[#302658] mb-2">{stage.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">{stage.desc}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          <RevealSection delay={200}>
            <div className="flex justify-center">
              <CTAButtons city={city} />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 9. Doctor Profiles ────────────────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <SectionLabel text="Ryan Certified Surgeons" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mt-2">
                  Meet Your Surgical Specialists in {city}
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2">
                  Ryan Clinic only employs qualified medical doctors to perform surgical extractions and channel incisions.
                </p>
              </div>
              <a href="/doctors" className="shrink-0 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 px-5 text-sm transition-all rounded-xl shadow-sm">
                View Full Team
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </RevealSection>

          {/* Premium Doctor Cards Grid with imagery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Dr. Pranendra Singh",
                role: "Medical Director & Chief Surgeon",
                image: "/uploads/turkey-doctor.jpg",
                quals: [
                  "MBBS — AIIMS, New Delhi",
                  "MS General Surgery — PGIMER, Chandigarh",
                  "Fellowship in Hair Restoration — Istanbul, Turkey",
                  "Member, ISHRS (International Society of Hair Restoration Surgery)",
                  "15+ years experience · 5,000+ procedures completed",
                ],
                link: "/about/dr-pranendra-singh",
              },
              {
                name: "Dr. Rohit Verma",
                role: "Hair Restoration & Hairline Specialist",
                image: "/uploads/gallery.jpg",
                quals: [
                  "MBBS — Maulana Azad Medical College, Delhi",
                  "MS General Surgery — University of Delhi",
                  "Diploma in Trichology — IAT Certified Programme",
                  "Specialist in Natural Hairline Artistry & DHI Choi Pen",
                  "8+ years experience · 1,800+ procedures completed",
                ],
                link: "/doctors",
              },
            ].map((doc, i) => (
              <AnimatedCard key={i} className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group" delay={i * 130}>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
                  {/* Doctor Portrait */}
                  <div className="sm:col-span-5 relative aspect-[4/5] sm:aspect-auto sm:h-full min-h-[220px]">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 sm:from-transparent to-transparent" />
                  </div>

                  {/* Doctor Credentials */}
                  <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                    <div>
                      <p className="text-[#e30a17] text-[10px] font-bold uppercase tracking-widest mb-1">{doc.role}</p>
                      <h3 className="text-xl font-bold text-[#302658] mb-4">{doc.name}</h3>
                      <ul className="space-y-2">
                        {doc.quals.map((q, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-500 font-sans leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e30a17] shrink-0 mt-1.5" />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-50">
                      <a href={doc.link} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e30a17] hover:underline">
                        View Surgeon Profile
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Cost & Pricing Section ───────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Cost Explanation */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal direction="left">
                <SectionLabel text="Transparent Pricing" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight mt-2">
                  Cost of Hair Transplant Surgery
                </h2>
                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                  <p>
                    Transplant surgeries are priced transparently per graft. Your final cost is calculated based on graft count and technique, beginning from ₹40,000 with 0% EMI plans.
                  </p>
                </div>
                
                <div className="flex gap-4 items-start bg-amber-50 border border-amber-200/60 rounded-2xl p-5 shadow-sm">
                  <span className="text-xl leading-none shrink-0 mt-0.5">⚠️</span>
                  <div>
                    <h4 className="text-sm font-bold text-amber-900 mb-1">Cheaper options carry higher risks</h4>
                    <p className="text-xs text-amber-800 leading-relaxed font-sans">
                      Suspiciously cheap per-graft prices frequently indicate technician-led operations where graft survival is poor. Correcting a failed transplant can end up costing twice as much.
                    </p>
                  </div>
                </div>
                
                <div>
                  <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1 text-sm font-bold text-[#e30a17] hover:underline">
                    View complete price sheet → Cost of Hair Transplant
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Why Choose Ryan list column */}
            <div className="lg:col-span-5">
              <Reveal direction="right" delay={120}>
                <div className="bg-[#F7F5F2] border border-gray-150 rounded-3xl p-6 shadow-sm">
                  <p className="text-[10px] font-bold text-[#e30a17] uppercase tracking-widest mb-4">THE RYAN ADVANTAGE</p>
                  <ul className="space-y-3.5">
                    {[
                      "100% Doctor-Led Operations Only",
                      "Sapphire FUE & THI customized to case",
                      "Fully sterile operating theatre environments",
                      "Natural hairline mapping for high density",
                      "Free post-op scalp checkups and analysis",
                      "18-month structured care cycles",
                      "0% Interest EMI options from banks",
                    ].map((point, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-red-50 text-[#e30a17] flex items-center justify-center shrink-0 text-[10px] font-extrabold">✓</span>
                        <p className="text-xs md:text-sm text-gray-700 font-semibold font-sans">{point}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <CTAButtons city={city} />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Center Location details ──────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Text details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <SectionLabel text="Visit Our Center" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight">
                  Visiting Ryan Clinic in {city}
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed">
                  Our clinic is easily accessible and equipped with the latest surgical technology.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <table className="w-full text-xs md:text-sm text-left">
                  <tbody>
                    {[
                      ["Address", details.address, "📍"],
                      ["Phone", details.phone, "📞"],
                      ["Hours", details.hours, "⏰"],
                      ["Metro Transit", details.metro, "🚇"],
                      ["Parking", details.parking, "🚘"],
                      ["Areas Served", details.served, "🌍"],
                    ].map(([label, val, emoji], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-3.5 font-bold text-[#302658] w-[35%] align-top flex items-center gap-2">
                          <span>{emoji}</span>
                          {label}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 font-medium font-sans leading-relaxed">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-96 relative bg-white">
                <iframe
                  title={`Ryan Clinic ${city} Map`}
                  src={details.mapSrc}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Book Consultation Section ────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Request block */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <SectionLabel text="Consultation Booking" />
                <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight">
                  Free Scalp Analysis &amp; Quote
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed">
                  Request a private, zero-obligation scalp review. Our surgeons call you back within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: "📞", label: "Direct Phone Line", href: TEL, text: details.phone },
                  { icon: "💬", label: "WhatsApp Support", href: WA + `%20in%20${city}`, text: "Chat directly for quick responses", ext: true },
                  { icon: "📅", label: "Appointment scheduler", href: "/book-consult", text: "Fill online consultation form" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-[#F7F5F2] hover:bg-red-50/20 transition-all">
                    <span className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-lg shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                      <a href={item.href} target={item.ext ? "_blank" : undefined} rel={item.ext ? "noopener noreferrer" : undefined} className="text-sm font-bold text-[#302658] hover:text-[#e30a17] transition-colors">{item.text}</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "12+", l: "Years of Experience" },
                  { n: "10,000+", l: "Procedures Completed" },
                  { n: "95%+", l: "Graft Survival Rate" },
                  { n: "4.9 ★", l: "Google rating" },
                ].map((s) => (
                  <div key={s.n} className="bg-white border border-gray-150 rounded-2xl p-4 text-center shadow-sm">
                    <p className="text-2xl font-extrabold text-[#e30a17]">{s.n}</p>
                    <p className="text-[11px] font-semibold text-gray-500 mt-1 font-sans">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live callback form */}
            <div className="lg:col-span-6 bg-[#F7F5F2] p-6 md:p-8 rounded-3xl border border-gray-150 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. Accordion FAQs ────────────────────────────────────────── */}
      <FAQSection faqs={FAQS} />

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <div className="bg-[#F7F5F2] border-t border-gray-200/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl font-sans">
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
