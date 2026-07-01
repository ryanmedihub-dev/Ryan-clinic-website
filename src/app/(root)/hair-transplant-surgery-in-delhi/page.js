import PageBanner from "@/components/layouts/pageBanner";
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

// ─── constants ────────────────────────────────────────────────────────────────

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20consultation%20for%20hair%20transplant%20surgery%20in%20Delhi";
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
    tag: "Ryan Clinic",
  },
  {
    num: "03",
    title: "THI (Turkey Hair Implantation)",
    desc: "A Choi implanter pen creates the site and places the graft in one motion — fine control over angle, depth, and direction. Enables no-shave surgery.",
    tag: "Ryan Clinic",
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

// ─── structured data ──────────────────────────────────────────────────────────

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

// ─── shared sub-components ────────────────────────────────────────────────────

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
      <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.18em] uppercase">
        {text}
      </span>
    </div>
  );
}

function CTAButtons({ primary = "Book Free Scalp Analysis", center = false }) {
  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl"
      >
        {primary}
      </a>
      <a
        href={TEL}
        className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all rounded-xl"
      >
        Call +91-9217958539
      </a>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function HairTransplantSurgeryDelhi() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <PageBanner
        breadcrumb="Hair Transplant Surgery in Delhi"
        title="Hair Transplant Surgery in Delhi"
        description="Doctor-Led Sapphire FUE & THI · Sterile OT · Same-Day Discharge · 0% EMI"
        bgImage="/uploads/1752667815707-fue-banner_ro9ae6.webp"
        alt="Best Hair Transplant Surgery in Delhi at Ryan Clinic"
      />

      {/* ── 1. Hero Stats + Intro ─────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stats strip — count-up animation */}
          <AnimatedStatsGrid stats={HERO_STATS} />

          {/* Intro + summary table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal direction="left">
              <SectionLabel text="Surgical Excellence" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Best Hair Transplant Surgery in Delhi
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-5">
                Hair transplant surgery in Delhi is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — no general anaesthesia and no hospital stay for a standard case. A surgeon moves your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently.
              </p>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                At Ryan Clinic in Pitampura, every step of the hair transplant surgery is doctor-led and carried out in a sterile operating theatre, with a free scalp analysis, an exact graft count, and transparent pricing before you commit.
              </p>
              <CTAButtons primary="Schedule Free Scalp Analysis" />
            </Reveal>

            {/* Summary rows */}
            <Reveal direction="right" delay={120}>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["Procedure type", "Minor, minimally-invasive outpatient surgery"],
                      ["Anaesthesia", "Local only — no general anaesthesia"],
                      ["Discharge", "Same-day — no hospital admission"],
                      ["Techniques", "Sapphire FUE & THI (Choi Pen)"],
                      ["Starting price", "From ₹40,000 — per graft, fully transparent"],
                      ["EMI", "0% on 6 & 12-month plans"],
                      ["Follow-up", "18 months free · WhatsApp support 7 days"],
                      ["Location", "Pitampura, North Delhi · All Delhi NCR"],
                    ].map(([label, value], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-5 py-3.5 font-semibold text-gray-800 w-[42%] text-[13px]">{label}</td>
                        <td className="px-5 py-3.5 text-gray-600 text-[13px]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. What is Hair Transplant Surgery? ──────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionLabel text="Procedure Science" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                  What is Hair Transplant Surgery?
                </h2>
                <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                  Hair transplant surgery relocates your own hair follicles from a &ldquo;donor&rdquo; zone to bald or thinning areas. Donor follicles resist DHT (the hormone behind pattern hair loss) and keep that resistance after being moved — so they grow permanently in their new position. Modern surgery is minimally invasive: local anaesthesia, outpatient, same-day home.
                </p>
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <AnimatedCard className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#D32F2F]/30 hover:shadow-md" delay={0}>
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F] shrink-0" />
                Transplanted hair is permanent — native hair still needs care
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Surgery restores grafted areas; it doesn&apos;t freeze pattern loss elsewhere. Many patients pair surgery with medical therapy (minoxidil and/or finasteride, where appropriate) and some plan a future session.
              </p>
            </AnimatedCard>
            <AnimatedCard className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#D32F2F]/30 hover:shadow-md" delay={120}>
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F] shrink-0" />
                You have a finite donor supply
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Surgery redistributes hair; it can&apos;t create new follicles. Conservative, well-planned design — not maximum grafts in one sitting — is the mark of a skilled surgeon. Your free scalp analysis maps your supply realistically.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* ── 3. Is It Safe? ───────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Reveal direction="left">
              <SectionLabel text="Safety &amp; Standards" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Is Hair Transplant Surgery in Delhi Safe?
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                For suitable candidates, it is considered a low-risk outpatient procedure when performed by qualified doctors in a sterile facility. Several factors make it safer than people expect:
              </p>
              <RevealList className="space-y-4 mb-8" stagger={100}>
                {SAFETY_POINTS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 list-none">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-gray-900 text-[13.5px]">{item.title}: </strong>
                      <span className="text-gray-500 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </RevealList>
              <div className="bg-red-50/60 border border-[#D32F2F]/20 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
                <strong>Honest note:</strong> &ldquo;Safe&rdquo; doesn&apos;t mean zero risk. Like any surgery, minor temporary risks can occur. A good clinic discusses them openly — that transparency is itself a sign of quality.
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div className="bg-[#1a1430] text-white p-8 rounded-2xl">
                <p className="text-[#FFC107] text-[11px] font-bold uppercase tracking-[0.18em] mb-2">Verify Doctor-Led Care</p>
                <h3 className="text-xl font-bold text-white mb-4">Before choosing any clinic, ask:</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  Who is performing the extraction, channel opening, and placement? Insist on certified medical doctors — not clinic assistants or technicians.
                </p>
                <ul className="divide-y divide-white/10">
                  {[
                    { val: "100%", label: "Doctor-led extraction & implantation" },
                    { val: "NABH", label: "Sterile Operating Theatre protocols" },
                    { val: "Zero", label: "Shared or reused surgical instruments" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 py-4">
                      <span className="text-2xl font-bold text-white w-16 shrink-0">{item.val}</span>
                      <span className="text-gray-400 text-xs leading-snug">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Techniques ────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionLabel text="Surgical Techniques" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                  Types of Hair Transplant Surgery in Delhi
                </h2>
                <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                  Modern hair transplant surgery uses follicular-unit techniques, which leave only tiny dot-like marks rather than a long linear scar.
                </p>
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {TECHNIQUES.map((tech, i) => (
              <AnimatedCard key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#D32F2F] hover:shadow-md" delay={i * 100}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-wider">Technique {tech.num}</span>
                  {tech.tag && (
                    <span className="bg-[#FFC107] text-black text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded">{tech.tag}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{tech.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tech.desc}</p>
              </AnimatedCard>
            ))}
          </div>

          <RevealSection>
            <div className="text-center">
              <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D32F2F] hover:underline">
                Want the full technical breakdown of FUE vs THI and recovery? → Hair Transplant in Delhi
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 5. Best Surgery + Norwood Table ──────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div>
              <SectionLabel text="Quality Benchmarks" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                What Makes the Best Hair Transplant Surgery in Delhi?
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                &ldquo;Best&rdquo; should mean things you can verify, not slogans. Judge any clinic — including this one — against this list:
              </p>
              <ul className="space-y-3">
                {QUALITY_POINTS.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0 mt-2" />
                    <p className="text-sm text-gray-500 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Norwood table */}
            <div>
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Norwood Scale &amp; Indicative Graft Counts</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Indicative only — your real count is confirmed at consultation. One graft holds 1–4 hairs.
                </p>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1a1430]">
                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">Grade</th>
                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">Pattern</th>
                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">Grafts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NORWOOD_ROWS.map((row, i) => (
                        <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}>
                          <td className="px-5 py-4 font-bold text-gray-900 text-sm">{row.grade}</td>
                          <td className="px-5 py-4 text-gray-500 text-xs">{row.pattern}</td>
                          <td className="px-5 py-4 font-bold text-[#D32F2F] text-sm">{row.grafts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <CTAButtons primary="Get My Exact Graft Count — Free" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Pre-Op & Step-By-Step ─────────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Pre-op */}
            <div>
              <SectionLabel text="Pre-Operative Guidelines" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Before Your Hair Transplant Surgery
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                Good outcomes start before the operating theatre. Follow this pre-op checklist:
              </p>
              <ul className="space-y-5">
                {PRE_OP.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#D32F2F] text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <h4 className="text-[13.5px] font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* During surgery */}
            <div>
              <SectionLabel text="Day of Surgery" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                During the Surgery: Step by Step
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                A typical session at Ryan Clinic runs from a few hours to a full day depending on graft count. Throughout, you stay awake and comfortable.
              </p>
              <ul className="space-y-5">
                {STEPS.map((step, i) => (
                  <li key={i} className="pb-5 border-b border-gray-200 last:border-0 last:pb-0">
                    <h4 className="text-[13.5px] font-semibold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-[#1a1430] text-white p-5 rounded-xl text-sm leading-relaxed">
                Most patients listen to music, watch something on a tablet, or simply rest during the procedure.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Recovery Timeline ─────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionLabel text="Post-Op Recovery" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                  After Your Surgery: Recovery &amp; Results
                </h2>
                <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                  Because the wounds are tiny, surgical recovery is generally quick. Strenuous activity typically resumes around week 3.
                </p>
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {RECOVERY.map((stage, i) => (
              <AnimatedCard key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-[#D32F2F]/30 hover:shadow-sm" delay={i * 90}>
                <div className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-wider mb-2">{stage.time}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{stage.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{stage.desc}</p>
              </AnimatedCard>
            ))}
          </div>
          <RevealSection delay={200}>
            <CTAButtons />
          </RevealSection>
        </div>
      </section>

      {/* ── 8. Surgeons ──────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionLabel text="Our Delhi Surgeons" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                  Surgeons &amp; Credentials
                </h2>
                <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                  Every surgical step is performed by a qualified doctor — not delegated to technicians.
                </p>
              </div>
              <a href="/doctors" className="shrink-0 inline-flex items-center gap-2 border border-gray-300 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3 px-5 text-sm transition-all rounded-xl">
                View Full Team →
              </a>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                name: "Dr. Pranendra Singh",
                role: "Medical Director & Chief Surgeon",
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
              <AnimatedCard key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#D32F2F]/30 hover:shadow-md" delay={i * 130}>
                <div className="px-6 py-5 border-b border-gray-100">
                  <p className="text-[#D32F2F] text-[11px] font-bold uppercase tracking-[0.18em] mb-1">{doc.role}</p>
                  <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {doc.quals.map((q, j) => (
                    <li key={j} className="flex items-center gap-3 px-6 py-3.5">
                      <span className="w-4 h-4 rounded-full bg-[#D32F2F] flex items-center justify-center shrink-0 text-white text-[9px] font-bold">✓</span>
                      <p className="text-sm text-gray-600">{q}</p>
                    </li>
                  ))}
                </ul>
                <div className="px-6 py-4">
                  <a href={doc.link} className="text-xs font-bold text-[#D32F2F] hover:underline">View Full Profile →</a>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Cost ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel text="Pricing" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Cost of Hair Transplant Surgery in Delhi
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-5">
                Hair transplant surgery in Delhi is priced per graft, so your total depends mainly on how many grafts you need and the technique chosen. At Ryan Clinic, your exact all-inclusive price is confirmed after a free scalp analysis, starting from ₹40,000, with 0% EMI available.
              </p>
              <div className="flex gap-3 items-start bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8">
                <span className="text-xl shrink-0 mt-0.5">⚠️</span>
                <div>
                  <p className="text-[13px] font-semibold text-amber-800 mb-1">The cheapest surgery is rarely the best value</p>
                  <p className="text-xs text-amber-700 leading-relaxed">Very low per-graft prices often signal high-volume, technician-led work where graft survival suffers. Corrective surgery after a failed transplant costs far more.</p>
                </div>
              </div>
              <a href="/hair-transplant-cost-in-delhi" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D32F2F] hover:underline">
                Full cost breakdown → Hair Transplant Cost in Delhi
              </a>
            </div>

            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-6">
                <p className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-[0.18em] mb-4">Why Ryan Clinic</p>
                <ul className="space-y-3">
                  {[
                    "Doctor-led at every step — extraction, channel creation, and implantation",
                    "Sapphire FUE & THI with the Choi pen, matched to your case",
                    "Sterile OT, single-use surgical-grade instruments",
                    "Natural-first hairline design for undetectable results",
                    "Free scalp analysis + transparent per-graft pricing",
                    "18-month follow-up · WhatsApp support 7 days",
                    "0% EMI on 6 & 12-month plans via leading banks",
                  ].map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full bg-[#D32F2F] flex items-center justify-center shrink-0 text-white text-[9px] font-bold">✓</span>
                      <p className="text-sm text-gray-600">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <CTAButtons />
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Location ─────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel text="Visit Us" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Visiting Ryan Clinic in Delhi
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                Our Delhi centre is in Pitampura (North-West Delhi), convenient from across the city and NCR.
              </p>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["Address", "CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034"],
                      ["Phone", "+91-9217958539"],
                      ["Hours", "Monday – Sunday, 9:00 AM – 7:00 PM"],
                      ["Metro", "Kohat Enclave / Pitampura Metro Station (Red Line)"],
                      ["Parking", "Service lane parking directly in front of the clinic"],
                      ["Served areas", "Pitampura, Rohini, Shalimar Bagh, Model Town, Ashok Vihar, Paschim Vihar, Punjabi Bagh & all Delhi NCR"],
                    ].map(([label, value], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-5 py-3.5 font-semibold text-gray-800 w-[36%] text-[13px] align-top">{label}</td>
                        <td className="px-5 py-3.5 text-gray-600 text-[13px]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-96 relative">
              <iframe
                title="Ryan Clinic Pitampura Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.4116262963073!2d77.13524977626922!3d28.677322982361664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03923ef1f5c3%3A0xbcc0e2bcf398c8c2!2sRyan%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Book Consultation ─────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel text="Book Your Consultation" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Get a Free Scalp Analysis &amp; Exact Cost
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                Get a free clinical scalp analysis, your exact graft count, and a transparent cost breakdown — with zero obligation. Our medical team calls you back within 24 hours.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  { icon: "📞", label: "Call Now", href: TEL, text: "+91-9217958539" },
                  { icon: "💬", label: "WhatsApp", href: WA, text: "Chat directly for fastest reply", ext: true },
                  { icon: "📅", label: "Request Callback", href: "/book-consult", text: "Use our online booking form" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-lg shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                      <a href={item.href} target={item.ext ? "_blank" : undefined} rel={item.ext ? "noopener noreferrer" : undefined} className="text-sm font-semibold text-gray-800 hover:text-[#D32F2F] transition-colors">{item.text}</a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Trust stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: "12+", l: "Years of experience" },
                  { n: "10,000+", l: "Procedures completed" },
                  { n: "90%+", l: "Graft survival rate" },
                  { n: "4.9 ★", l: "Google rating" },
                ].map((s) => (
                  <div key={s.n} className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-4 text-center">
                    <p className="text-xl font-bold text-[#D32F2F]">{s.n}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. FAQs ─────────────────────────────────────────────────── */}
      <FAQSection faqs={FAQS} />

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            <strong className="text-gray-500">Medical disclaimer:</strong> This page is general information and does not replace a personal medical consultation. Suitability and results vary between individuals. Last medically reviewed: June 25, 2026 by Dr. Pranendra Singh (MBBS, MS General Surgery, Fellowship in Hair Restoration — Istanbul).{" "}
            <a href="/privacy-policy" className="underline text-[#D32F2F] hover:opacity-75">Privacy Policy</a>
            {" · "}
            <a href="/terms-and-conditions" className="underline text-[#D32F2F] hover:opacity-75">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </>
  );
}
