import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import FAQCostSection from "./FAQCostSection";

export const metadata = {
  title: "Hair Transplant Cost in Delhi 2026 | Per Graft Price",
  description:
    "Hair transplant cost in Delhi: ₹40,000–₹3,50,000 (₹40–₹120/graft). Transparent doctor-led pricing, 0% EMI, free scalp analysis. Call +91-9911111247.",
  keywords: [
    "hair transplant cost in delhi",
    "hair transplant price in delhi",
    "per graft hair transplant cost delhi",
    "5000 grafts hair transplant cost delhi",
    "4000 grafts hair transplant cost delhi",
    "3000 grafts hair transplant cost delhi",
    "2000 grafts hair transplant cost delhi",
    "FUE hair transplant cost delhi",
    "Sapphire FUE cost delhi",
    "DHI hair transplant cost delhi",
    "affordable hair transplant delhi",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/hair-transplant-cost-in-delhi/",
  },
  openGraph: {
    title: "Hair Transplant Cost in Delhi 2026 | Per Graft Price",
    description:
      "₹40,000–₹3,50,000 · ₹40–₹120/graft · Free scalp analysis · 0% EMI.",
    url: "https://www.clinicryan.com/hair-transplant-cost-in-delhi/",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg",
        width: 1200,
        height: 630,
        alt: "Hair transplant cost in Delhi — Ryan Clinic per-graft pricing guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Transplant Cost in Delhi 2026 | Per Graft Price",
    description: "₹40–₹120/graft · Free scalp analysis · 0% EMI · Transparent pricing",
    images: [
      "https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg",
    ],
  },
};

// ─── constants ────────────────────────────────────────────────────────────────

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20know%20the%20exact%20hair%20transplant%20cost%20in%20Delhi";
const TEL = "tel:+919911111247";

const HERO_STATS = [
  { val: "₹40–₹120", label: "Per graft (doctor-led Sapphire FUE)" },
  { val: "From ₹40,000", label: "Starting cost" },
  { val: "0% EMI", label: "6 & 12-month plans" },
  { val: "4.9 ★", label: "Google rating · 10,000+ procedures" },
];

const SUMMARY_ROWS = [
  ["Pricing method", "Per graft — pay only for what you need"],
  ["Typical total range", "₹40,000 – ₹3,50,000"],
  ["Per-graft rate", "₹40–₹120 for doctor-led Sapphire FUE"],
  ["Free scalp analysis", "Yes — cost confirmed before you commit"],
  ["0% EMI", "6 & 12-month plans via leading banks"],
  ["Hidden charges", "None — full quote confirmed in writing"],
  ["Follow-up", "18 months free · WhatsApp support 7 days"],
  ["Location", "Pitampura, North Delhi · All Delhi NCR"],
];

const GRAFT_TIERS = [
  { grafts: "1,000 – 1,500", norwood: "NW 2–3", cost: "₹40,000 – ₹1,00,000", best: "Hairline & temple recession" },
  { grafts: "2,000", norwood: "NW 3", cost: "₹80,000 – ₹2,40,000", best: "Early-to-moderate hairline loss" },
  { grafts: "2,500 – 3,000", norwood: "NW 3–4", cost: "₹1,20,000 – ₹3,60,000", best: "Frontal + mid-scalp restoration" },
  { grafts: "4,000", norwood: "NW 4–5", cost: "₹1,60,000 – ₹3,50,000", best: "Advanced frontal + crown loss" },
  { grafts: "5,000+", norwood: "NW 5–6", cost: "₹2,00,000+", best: "Extensive baldness (often staged)" },
];

const TECHNIQUES = [
  { name: "FUT (Strip)", range: "₹25 – ₹60 / graft", notes: "Lowest cost · linear donor scar", tag: null },
  { name: "Standard FUE", range: "₹40 – ₹70 / graft", notes: "No linear scar · most popular", tag: null },
  { name: "Sapphire FUE", range: "₹55 – ₹120 / graft", notes: "Finer channels · denser packing · fastest healing", tag: "Ryan Clinic" },
  { name: "DHI (Implanter Pen)", range: "₹60 – ₹120 / graft", notes: "Precise angle & density control", tag: null },
];

const HIDDEN_COSTS = [
  "GST (18%) — confirm whether the quoted price is inclusive or exclusive",
  "Pre-op blood tests and scalp assessment fees",
  "Post-op medication kit and aftercare supplies",
  "PRP sessions (if recommended alongside the transplant)",
  "Follow-up consultations — free at Ryan Clinic, charged elsewhere",
  "Graft-count inflation — some clinics quote low, then add grafts on surgery day",
];

const RYAN_GUARANTEES = [
  { icon: "✓", text: "Complete cost confirmed in writing before you commit" },
  { icon: "✓", text: "Based on exact graft count from a free scalp analysis" },
  { icon: "✓", text: "No surprise add-ons or day-of price changes" },
  { icon: "✓", text: "18 months of follow-up consultations included free" },
  { icon: "✓", text: "0% EMI — zero interest charged on any plan" },
];

const FACTORS = [
  { n: "01", title: "Number of Grafts", desc: "The primary driver. More grafts = higher total. Your count is confirmed in a free scalp assessment." },
  { n: "02", title: "Technique", desc: "FUT is most affordable. Sapphire FUE and DHI cost more due to specialised tools and skill required." },
  { n: "03", title: "Doctor vs Technician", desc: "Doctor-led surgery costs more and is the single biggest factor in graft survival and final result quality." },
  { n: "04", title: "Clinic Location", desc: "South Delhi and Gurgaon clinics typically charge 30–50% more than North Delhi for the same procedure." },
  { n: "05", title: "Facility Standards", desc: "A sterile OT with single-use instruments carries real cost — this is not where a good clinic cuts corners." },
];

const NCR_AREAS = [
  "Rohini", "Pitampura", "Shalimar Bagh", "Model Town", "Karol Bagh",
  "Connaught Place", "Dwarka", "Janakpuri", "Rajouri Garden", "Saket",
  "South Delhi", "Noida", "Gurgaon", "Ghaziabad", "Faridabad",
];

const FAQS = [
  { q: "What is the cost of a hair transplant in Delhi in 2026?", a: "Hair transplant cost in Delhi in 2026 ranges from ₹40,000 to ₹3,50,000, typically ₹40–₹120 per graft depending on technique and graft count. At Ryan Clinic your exact cost is confirmed after a free scalp analysis, with 0% EMI available on 6 and 12-month plans." },
  { q: "What is the per-graft hair transplant cost in Delhi?", a: "Per-graft hair transplant cost in Delhi generally falls between ₹40 and ₹120, varying by technique — FUT is lowest, Sapphire FUE highest. Be cautious of quotes at ₹15–25 per graft, as these usually indicate technician-led work and a graft-survival risk." },
  { q: "How much does a 2000-graft hair transplant cost in Delhi?", a: "A 2000-graft hair transplant in Delhi typically costs ₹80,000 to ₹2,40,000 depending on technique and clinic. 2000 grafts suit early-to-moderate hairline recession (Norwood 2–3) and are usually completed in a single day session under local anaesthesia." },
  { q: "How much does a 3000-graft hair transplant cost in Delhi?", a: "A 3000-graft hair transplant in Delhi generally costs ₹1,20,000 to ₹3,60,000, depending on the technique chosen. 3000 grafts cover moderate frontal and mid-scalp loss and are a common requirement for Norwood grade 3–4 patients." },
  { q: "How much does a 4000-graft hair transplant cost in Delhi?", a: "A 4000-graft hair transplant in Delhi typically ranges from ₹1,60,000 to ₹3,50,000. This graft count addresses advanced frontal and crown loss (Norwood 4–5) and may be staged for the best density and graft survival." },
  { q: "How much does a 5000-graft hair transplant cost in Delhi?", a: "A 5000-graft hair transplant in Delhi usually costs ₹2,00,000 and above, often performed over one extended or two sessions. 5000+ grafts are needed for extensive baldness (Norwood 5–6), and a free assessment confirms whether your donor area can support it." },
  { q: "What is the FUE hair transplant cost in Delhi?", a: "FUE hair transplant cost in Delhi ranges from about ₹50,000 to ₹2,50,000, depending on graft count. FUE leaves no linear scar and offers faster healing, making it the most popular technique among Delhi patients despite a higher per-graft price than FUT." },
  { q: "What is the cost of a Sapphire FUE hair transplant in Delhi?", a: "Sapphire FUE hair transplant cost in Delhi is typically at the premium end of the FUE range because it uses sapphire-tipped blades for finer channels, denser packing, and faster healing. At Ryan Clinic, your precise cost is set after a free scalp and donor-density analysis." },
  { q: "What is the DHI hair transplant cost in Delhi?", a: "DHI hair transplant cost in Delhi generally starts around ₹80,000 and rises with graft count, as it uses an implanter pen for precise control over angle and density. The right technique for your case is recommended during consultation rather than chosen on price alone." },
  { q: "Why does hair transplant cost vary so much between Delhi clinics?", a: "Hair transplant cost in Delhi varies by technique, graft count, and crucially whether a doctor or technician performs the surgery. Clinic location also matters — South Delhi and Gurgaon clinics often charge 30–50% more — so always compare what's included, not just the headline price." },
  { q: "Is EMI available for a hair transplant in Delhi?", a: "Yes, Ryan Clinic offers 0% EMI on hair transplants in Delhi through 6 and 12-month plans via leading banks, with no interest charged. Your monthly instalment is calculated from your confirmed graft count after a free assessment, so the cost is fully transparent." },
  { q: "Is a hair transplant in Delhi cheaper than in other cities?", a: "Hair transplant cost in Delhi is competitive with other metros, though South Delhi and Gurgaon premium clinics can cost more than smaller cities. The deciding factor should be doctor-led surgery and graft survival rather than the lowest price, since corrective surgery costs far more later." },
  { q: "Where can I get the best hair transplant in North Delhi?", a: "Ryan Clinic in Pitampura offers doctor-led hair transplants in North Delhi, serving Rohini, Pitampura, Shalimar Bagh, and surrounding areas. Patients across North and West Delhi choose it for Sapphire FUE, transparent per-graft pricing, and 18 months of free follow-up." },
  { q: "Is there a good hair transplant clinic in Pitampura or Rohini?", a: "Yes, Ryan Clinic is located in Pitampura and is easily accessible from Rohini, offering Sapphire FUE and FUE hair transplants under doctor-led care. Its central North Delhi location makes consultations and follow-ups convenient for nearby patients." },
  { q: "Do you offer hair transplants across Delhi NCR?", a: "Yes, Ryan Clinic serves patients from across Delhi NCR, including Noida, Gurgaon, Ghaziabad, and Faridabad, from its Pitampura clinic in North Delhi. Out-of-city patients receive WhatsApp support seven days a week and free follow-up consultations for 18 months." },
  { q: "What is a doctor-led hair transplant and why does it matter?", a: "A doctor-led hair transplant means a qualified surgeon — not a technician — performs the extraction and implantation. This matters because many Delhi clinics advertise a senior surgeon's name while technicians do the actual work, which directly affects precision and graft survival." },
  { q: "How can I avoid hidden charges in a Delhi hair transplant?", a: "To avoid hidden charges, insist on transparent per-graft pricing confirmed in writing before surgery, since some Delhi clinics inflate graft counts so the final bill is 2–3 times the quote. Ryan Clinic confirms your graft count and total cost upfront after a free analysis." },
  { q: "How do I choose the best hair transplant clinic in Delhi?", a: "Choose a Delhi hair transplant clinic that is doctor-led, sterile, and transparent about per-graft pricing, with verifiable before/after results and genuine reviews. Avoid clinics that pressure you, hide who operates, or quote unusually cheap per-graft rates." },
  { q: "Is an affordable hair transplant in Delhi also safe?", a: "An affordable hair transplant in Delhi can be safe, but only if it remains doctor-led and performed in a sterile facility with single-use instruments. Extremely low prices often come from technician-led, high-volume clinics, so prioritise safety and survival rate over cost alone." },
  { q: "Can women get a hair transplant in Delhi, and what does it cost?", a: "Yes, women in Delhi can get hair transplants for female-pattern thinning, traction alopecia, or a high hairline, with discreet no-shave options. Cost depends on the grafts required and is confirmed after a scalp assessment, with the same per-graft pricing and 0% EMI as for men." },
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
    { "@type": "ListItem", position: 3, name: "Hair Transplant Cost in Delhi", item: "https://www.clinicryan.com/hair-transplant-cost-in-delhi/" },
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

function CTAButtons({ primary = "Get Free Cost Estimate", center = false }) {
  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <a
        href={WA}
        className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl"
      >
        {primary}
      </a>
      <a
        href={TEL}
        className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all rounded-xl"
      >
        Call +91-9911111247
      </a>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function HairTransplantCostDelhi() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <PageBanner
        breadcrumb="Hair Transplant Cost in Delhi"
        title="Hair Transplant Cost in Delhi (2026)"
        description="₹40,000–₹3,50,000 · ₹40–₹120/graft · Free Scalp Analysis · 0% EMI"
        bgImage="/uploads/1752667815707-fue-banner_ro9ae6.webp"
        alt="Hair transplant cost in Delhi — Ryan Clinic per-graft pricing guide"
      />

      {/* ── 1. Hero stats + intro ────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {HERO_STATS.map((s, i) => (
              <div
                key={i}
                className="text-center rounded-2xl py-6 px-4 border border-gray-100 bg-gray-50"
              >
                <p className="text-2xl md:text-3xl font-bold text-[#D32F2F] leading-none mb-2">
                  {s.val}
                </p>
                <p className="text-xs text-gray-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Intro + summary table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel text="2026 Pricing Guide" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Hair Transplant Cost in Delhi —{" "}
                <span className="text-[#D32F2F]">Plain &amp; Simple</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                At Ryan Clinic, every patient gets a per-graft price confirmed in writing after a
                free scalp analysis — not a take-it-or-leave-it package. You only pay for the grafts
                your hair loss actually needs.
              </p>
              <CTAButtons primary="Book Free Scalp Analysis" />
            </div>

            {/* Summary table */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <tbody>
                  {SUMMARY_ROWS.map(([label, value], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-5 py-3.5 font-semibold text-gray-800 w-[42%] text-[13px]">
                        {label}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 text-[13px]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Graft count pricing table ─────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Pricing by Graft Count" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                Cost by Number of Grafts
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                Your graft count is determined by your Norwood grade and density goal — and can
                only be confirmed after a free scalp assessment.
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm overflow-x-auto mb-6">
            <table className="w-full min-w-130">
              <thead>
                <tr className="bg-[#1a1430]">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    Grafts
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    NW Grade
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    Typical Cost
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70 hidden md:table-cell">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody>
                {GRAFT_TIERS.map((t, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-100 transition-colors hover:bg-red-50/40 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">{t.grafts}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">{t.norwood}</td>
                    <td className="px-6 py-4 font-bold text-[#D32F2F] text-lg">{t.cost}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell">{t.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-3 text-gray-400 text-xs mb-10">
            <span className="w-6 h-px bg-gray-300 shrink-0" />
            Prices are indicative. Your exact cost is confirmed after a free scalp assessment.
          </div>

          <CTAButtons primary="Get My Exact Graft Count — Free" />
        </div>
      </section>

      {/* ── 3. Per-graft by technique ─────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div className="lg:sticky lg:top-28">
              <SectionLabel text="Per-Graft Pricing" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Cost per Graft —{" "}
                <span className="text-[#D32F2F]">by Technique</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                Priced per graft means you pay for exactly what your case needs. The technique you
                choose determines the per-graft rate — your doctor recommends the right one after
                assessing your scalp.
              </p>

              {/* Warning box */}
              <div className="flex gap-4 items-start bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
                <span className="text-xl shrink-0 mt-0.5">⚠️</span>
                <div>
                  <p className="text-[13px] font-semibold text-amber-800 mb-1">
                    Beware of very cheap quotes (₹15–25/graft)
                  </p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    This almost always signals technician-led surgery. A hair transplant is
                    permanent — a poor one is expensive and difficult to correct. Always confirm
                    a qualified doctor performs the entire procedure before booking on price alone.
                  </p>
                </div>
              </div>
            </div>

            {/* Technique table */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1a1430]">
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">
                      Technique
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70">
                      Per Graft
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-white/70 hidden sm:table-cell">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TECHNIQUES.map((t, i) => (
                    <tr
                      key={i}
                      className={`border-t border-gray-100 ${
                        t.tag ? "bg-red-50/50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold ${
                              t.tag ? "text-[#D32F2F]" : "text-gray-800"
                            }`}
                          >
                            {t.name}
                          </span>
                          {t.tag && (
                            <span className="bg-[#FFC107] text-black text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded">
                              {t.tag}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-bold text-base ${
                            t.tag ? "text-[#D32F2F]" : "text-gray-800"
                          }`}
                        >
                          {t.range}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs hidden sm:table-cell leading-snug">
                        {t.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. What's included + Ryan transparency ───────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Transparency & Inclusions" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
            What&apos;s Included — and What to{" "}
            <span className="text-[#D32F2F]">Watch Out For</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-12 max-w-2xl">
            A low headline price can hide extras that push your real bill 20–35% higher. Before
            committing anywhere, confirm exactly what the quote covers.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Hidden costs checklist */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">
                  Costs to Confirm in Any Delhi Clinic Quote
                </h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {HIDDEN_COSTS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 px-6 py-4">
                    <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </span>
                    <p className="text-sm text-gray-600 leading-snug">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ryan guarantee */}
            <div className="bg-[#1a1430] rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10">
                <span className="text-[#FFC107] text-[11px] font-bold uppercase tracking-[0.18em]">
                  Ryan Clinic Promise
                </span>
                <h3 className="font-bold text-white text-lg mt-1">
                  No Surprises. No Hidden Charges.
                </h3>
              </div>
              <ul className="divide-y divide-white/10">
                {RYAN_GUARANTEES.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 px-6 py-4">
                    <span className="w-5 h-5 rounded-full bg-[#D32F2F] flex items-center justify-center shrink-0 text-white text-[10px] font-bold">
                      {item.icon}
                    </span>
                    <p className="text-sm text-gray-300 leading-snug">{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className="px-6 py-5">
                <a
                  href={WA}
                  className="inline-flex items-center justify-center w-full gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl"
                >
                  See What&apos;s Included →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Cost factors + EMI ────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Cost factors */}
            <div>
              <SectionLabel text="Cost Factors" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                What Affects the Price?
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                Five factors explain almost every price difference across Delhi clinics — knowing
                them helps you compare quotes fairly.
              </p>
              <div className="space-y-3">
                {FACTORS.map((f) => (
                  <div
                    key={f.n}
                    className="flex items-start gap-4 bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 hover:border-[#D32F2F]/20 hover:bg-red-50/20 transition-colors duration-200"
                  >
                    <span className="text-[11px] font-bold text-[#D32F2F] bg-white border border-red-100 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {f.n}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-gray-900 mb-0.5">{f.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI + NCR */}
            <div className="space-y-6">

              {/* EMI card */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-[#1a1430] px-6 py-5">
                  <span className="text-[#FFC107] text-[11px] font-bold uppercase tracking-[0.18em]">
                    Easy Payment
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">0% EMI Available</h3>
                </div>
                <div className="px-6 py-5 bg-white">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    Pay for your hair transplant in easy monthly instalments — zero interest
                    charged. Your exact EMI is calculated from your confirmed graft count after the
                    free assessment.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { plan: "6 Months", eg: "₹1,20,000 → ₹20,000/mo" },
                      { plan: "12 Months", eg: "₹1,20,000 → ₹10,000/mo" },
                    ].map((e, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3.5 text-center">
                        <p className="font-bold text-sm text-gray-900">{e.plan}</p>
                        <p className="text-xs text-gray-500 mt-1">{e.eg}</p>
                        <span className="mt-2 inline-block text-[9px] font-bold uppercase tracking-wider text-[#D32F2F] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                          0% Interest
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={WA}
                    className="inline-flex items-center justify-center w-full gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm transition-colors rounded-xl"
                  >
                    Check Your EMI Options →
                  </a>
                </div>
              </div>

              {/* Areas we serve */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Serving All Delhi NCR</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Same transparent per-graft pricing from our Pitampura clinic — wherever you
                  travel from.
                </p>
                <div className="flex flex-wrap gap-2">
                  {NCR_AREAS.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Is it worth it + contact form ────────────────────────── */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — copy + value prop */}
            <div>
              <SectionLabel text="Get Your Exact Cost" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                Online Estimates Are a Guide.{" "}
                <span className="text-[#D32F2F]">A Free Scalp Analysis Is the Answer.</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6">
                Your real cost depends on your exact graft count, which a 10-minute scalp assessment
                confirms. Get your free analysis, graft count, and full written cost breakdown — zero
                obligation. Our team calls you back within 24 hours.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { n: "12+", l: "Years of experience" },
                  { n: "10,000+", l: "Procedures completed" },
                  { n: "90%+", l: "Graft survival rate" },
                  { n: "4.9 ★", l: "Google rating" },
                ].map((s) => (
                  <div key={s.n} className="bg-white rounded-xl border border-gray-200 px-4 py-4 text-center">
                    <p className="text-xl font-bold text-[#D32F2F]">{s.n}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Value statement */}
              <div className="bg-[#1a1430] rounded-2xl px-6 py-5">
                <p className="text-[#FFC107] text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                  Worth the Cost?
                </p>
                <p className="text-white text-sm leading-relaxed">
                  A hair transplant is a one-time, permanent solution using your own follicles.
                  The real question isn&apos;t &ldquo;what&apos;s the cheapest quote&rdquo; — it&apos;s{" "}
                  <em className="text-gray-300">what gives the safest, most natural result for life.</em>{" "}
                  Corrective surgery after a failed transplant costs far more.
                </p>
              </div>
            </div>

            {/* Right — contact form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────── */}
      <FAQCostSection faqs={FAQS} />

      {/* ── Disclaimer ──────────────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            <strong className="text-gray-500">Medical &amp; pricing disclaimer:</strong> All costs
            on this page are indicative 2026 market ranges for general guidance and do not constitute
            a quote. Your exact cost depends on an individual scalp assessment and graft count.
            Results vary between individuals. This page does not replace a personal medical
            consultation.{" "}
            <a href="/privacy-policy" className="underline text-[#D32F2F] hover:opacity-75">
              Privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
