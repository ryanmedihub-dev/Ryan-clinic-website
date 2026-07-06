import Image from "next/image";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const doctors = [
  {
    id: 1,
    name: "Dr. Pranendra Singh",
    designation: "Medical Director & Chief Surgeon",
    experience: "15+",
    procedures: "5,000+",
    rating: "4.9",
    successRate: "95%+",
    location: "Delhi",
    languages: ["Hindi", "English", "Punjabi"],
    image: "/uploads/turkey-doctor.jpg",
    specialtyBadge: "Turkey FUE Director",
    about:
      "Founder of Ryan Clinic and India's foremost authority on Turkey's Sapphire FUE technique. Trained directly under Turkey's leading specialists in Istanbul. With 15+ years and 5,000+ procedures, Dr. Singh is the reason Ryan Clinic is India's only clinic certified to perform authentic Sapphire FUE with the original Choi Pen.",
    qualifications: [
      { degree: "MBBS", institute: "AIIMS, New Delhi" },
      { degree: "MS – General Surgery", institute: "PGIMER, Chandigarh" },
      { degree: "Fellowship – Hair Restoration", institute: "Istanbul, Turkey" },
    ],
    specializations: ["Turkey Sapphire FUE", "DHI Choi Pen", "Hairline Design", "Crown Restoration", "High-Density FUE"],
    certifications: [
      "Turkey Sapphire FUE Certification — Istanbul Hair Institute",
      "NABH-Certified Operating Surgeon",
      "ISHRS Member — International Society of Hair Restoration Surgery",
      "Best Hair Transplant Surgeon — India 2022 & 2023",
    ],
    achievements: [
      "Featured in Times of India, NDTV Health, Hindustan Times",
      "200+ NRI patients from UK, USA, UAE & Australia",
      "Trained under Dr. Koray Erdogan — Turkey's #1 specialist",
    ],
  },
  {
    id: 2,
    name: "Dr. Arvind Mehta",
    designation: "Senior Hair Transplant Surgeon",
    experience: "12+",
    procedures: "3,500+",
    rating: "4.8",
    successRate: "92%+",
    location: "Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    image: "/uploads/turkey-1.jpeg",
    specialtyBadge: "DNB Plastic Surgeon",
    about:
      "Leads Ryan Clinic's Mumbai branch with 12+ years of surgical precision. A DNB-certified plastic surgeon and Turkey FUE specialist, Dr. Mehta is sought after for complex beard, eyebrow, and full-scalp crown restorations. Rated 4.8★ across 800+ verified Google reviews.",
    qualifications: [
      { degree: "MBBS", institute: "KEM Hospital, Mumbai" },
      { degree: "DNB – Plastic Surgery", institute: "National Board of Examinations" },
      { degree: "Turkey-Certified FUE Specialist", institute: "Istanbul, Turkey" },
    ],
    specializations: ["Sapphire FUE", "Beard Transplant", "Eyebrow Restoration", "Crown Restoration"],
    certifications: [
      "DNB Plastic Surgery — National Board of Examinations",
      "Turkey FUE Certification — Istanbul Hair Institute",
      "NABH-Certified Operating Surgeon",
    ],
    achievements: [
      "3,500+ successful procedures across Mumbai branch",
      "Specialist in complex multi-session crown restorations",
      "Rated #1 hair transplant surgeon in Andheri, Mumbai",
    ],
  },
  {
    id: 3,
    name: "Dr. Priya Kapoor",
    designation: "Trichologist & Dermatologist",
    experience: "10+",
    procedures: "2,800+",
    rating: "4.9",
    successRate: "N/A",
    location: "Hyderabad",
    languages: ["Hindi", "English", "Telugu"],
    image: "/uploads/about-one.jpg",
    specialtyBadge: "IAT Trichologist",
    about:
      "Ryan Clinic's lead dermatologist and trichologist at the Hyderabad branch. With an MD in Dermatology and an IAT Fellowship in Trichology, Dr. Kapoor specialises in diagnosing root causes of hair loss — particularly in women. Hyderabad's most sought-after specialist for female pattern hair loss and PRP therapy.",
    qualifications: [
      { degree: "MBBS", institute: "Osmania Medical College, Hyderabad" },
      { degree: "MD – Dermatology", institute: "Nizam's Institute of Medical Sciences" },
      { degree: "Fellowship – Trichology (IAT)", institute: "International Association of Trichologists" },
    ],
    specializations: ["Female Pattern Hair Loss", "PRP Therapy", "LLLT Laser Therapy", "Scalp Diagnosis", "Alopecia Treatment"],
    certifications: [
      "MD Dermatology — NMC Recognised",
      "Trichology Fellowship — IAT Certified",
      "PRP & Regenerative Medicine Certification",
    ],
    achievements: [
      "India's leading female pattern hair loss specialist",
      "2,800+ PRP and non-surgical sessions completed",
      "Published research on female alopecia in peer-reviewed journals",
    ],
  },
  {
    id: 4,
    name: "Dr. Rohit Verma",
    designation: "Hair Restoration & Hairline Specialist",
    experience: "8+",
    procedures: "1,800+",
    rating: "4.8",
    successRate: "91%+",
    location: "Delhi",
    languages: ["Hindi", "English"],
    image: "/uploads/turkey-2.jpeg",
    specialtyBadge: "Hairline Artistry",
    about:
      "Ryan Clinic's hairline artistry specialist — combining surgical precision with a trained eye for natural aesthetics. His dual expertise in restoration surgery and trichology means he handles both the procedure and long-term hair health. Trusted for hairlines so natural they're completely undetectable, even to barbers.",
    qualifications: [
      { degree: "MBBS", institute: "Maulana Azad Medical College, Delhi" },
      { degree: "MS – General Surgery", institute: "University of Delhi" },
      { degree: "Diploma – Trichology", institute: "IAT Certified Programme" },
    ],
    specializations: ["Natural Hairline Design", "FUE Hair Transplant", "FUE + PRP Combo", "Temple & Frontal Restoration"],
    certifications: [
      "MS General Surgery — NMC Recognised",
      "IAT Trichology Diploma",
      "Hairline Design & Artistry Certification",
    ],
    achievements: [
      "Known for 'undetectable' hairlines — featured in lifestyle media",
      "1,800+ procedures with zero reported complications",
      "Preferred surgeon for stage actors and media professionals",
    ],
  },
];

const trustStats = [
  { value: "10,000+", label: "Successful Procedures" },
  { value: "95%+",    label: "Graft Survival Rate" },
  { value: "4.9 ★",  label: "Google Rating" },
  { value: "12+",     label: "Years of Excellence" },
];

/* ─────────────────────────────────────────
   SHARED MICRO-COMPONENTS
───────────────────────────────────────── */

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="block w-4 h-px shrink-0" style={{ background: "var(--primary-red)" }} />
      <span
        className="text-[9.5px] font-black tracking-[0.22em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {children}
      </span>
    </div>
  );
}

function TickIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0 mt-[2px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      style={{ color: "var(--primary-red)" }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function GoldStar() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 mt-[2px]" viewBox="0 0 20 20" fill="#C9A84C">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: "var(--text-muted)" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   DOCTOR CARD
───────────────────────────────────────── */
function DoctorCard({ doctor }) {
  const metrics = [
    { v: doctor.procedures, l: "Procedures" },
    { v: `${doctor.rating} ★`, l: "Google Rating" },
    { v: `${doctor.experience} Yrs`, l: "Experience" },
  ];

  return (
    <article
      className="group flex flex-col lg:flex-row rounded-2xl overflow-hidden transition-shadow duration-300"
      style={{
        background: "var(--bg-main)",
        border: "1px solid var(--border-light)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── PHOTO PANEL ────────────────────── */}
      <div className="relative aspect-[4/5] lg:aspect-auto lg:w-[38%] xl:w-[36%] shrink-0 overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />

        {/* multi-stop gradient — keeps top clear, blacks out bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 25%, rgba(10,5,5,0.55) 58%, rgba(10,5,5,0.97) 100%)",
          }}
        />

        {/* 3 px red left accent */}
        <div
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{ background: "var(--primary-red)" }}
        />

        {/* ── top badges ── */}
        <div className="absolute top-5 inset-x-5 flex items-start justify-between gap-2">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-full text-white leading-none"
            style={{
              background: "rgba(0,0,0,0.42)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <LocationIcon />
            {doctor.location}
          </span>

          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-full text-white leading-none"
            style={{ background: "var(--primary-red)" }}
          >
            <ShieldIcon />
            Certified
          </span>
        </div>

        {/* ── bottom identity block ── */}
        <div className="absolute bottom-0 inset-x-0 px-6 pb-6 pt-20">
          {/* specialty badge */}
          <span
            className="inline-flex items-center text-[9.5px] font-black tracking-[0.2em] uppercase mb-3 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(201,168,76,0.14)",
              color: "#D4A937",
              border: "1px solid rgba(201,168,76,0.32)",
            }}
          >
            {doctor.specialtyBadge}
          </span>

          <h3
            className="text-[26px] sm:text-[28px] font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {doctor.name}
          </h3>
          <p className="text-[12.5px] mt-1 leading-snug" style={{ color: "rgba(255,255,255,0.52)" }}>
            {doctor.designation}
          </p>
        </div>
      </div>

      {/* ── CONTENT PANEL ──────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 p-6 lg:p-8 gap-6">

        {/* ── metrics strip ── */}
        <div
          className="grid grid-cols-3 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border-light)" }}
        >
          {metrics.map((m, i) => (
            <div
              key={m.l}
              className="flex flex-col items-center justify-center py-4 px-2 text-center"
              style={{
                background: "var(--bg-soft)",
                borderRight: i < 2 ? "1px solid var(--border-light)" : "none",
              }}
            >
              <span
                className="text-xl sm:text-2xl font-bold leading-none"
                style={{ color: "var(--primary-red)" }}
              >
                {m.v}
              </span>
              <span
                className="text-[9px] font-bold uppercase tracking-wider mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {m.l}
              </span>
            </div>
          ))}
        </div>

        {/* ── about ── */}
        <p className="text-[13.5px] leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
          {doctor.about}
        </p>

        {/* ── specializations ── */}
        <div>
          <SectionLabel>Specializations</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {doctor.specializations.map((s) => (
              <span
                key={s}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-lg leading-none"
                style={{
                  background: "rgba(211,47,47,0.05)",
                  color: "var(--primary-red)",
                  border: "1px solid rgba(211,47,47,0.16)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── education ── */}
        <div>
          <SectionLabel>Education & Qualifications</SectionLabel>
          <ul className="space-y-3">
            {doctor.qualifications.map((q) => (
              <li key={q.degree} className="flex items-start gap-2.5">
                <TickIcon />
                <div className="leading-tight">
                  <span
                    className="text-[13px] font-semibold block"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {q.degree}
                  </span>
                  <span className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                    {q.institute}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── certifications ── */}
        <div
          className="rounded-xl p-4 sm:p-5"
          style={{
            background: "var(--bg-soft)",
            border: "1px solid var(--border-light)",
          }}
        >
          <SectionLabel>Certifications & Awards</SectionLabel>
          <ul className="space-y-2.5">
            {doctor.certifications.map((c) => (
              <li key={c} className="flex items-start gap-2.5">
                <TickIcon />
                <span className="text-[12.5px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── achievements ── */}
        <div>
          <SectionLabel>Notable Achievements</SectionLabel>
          <ul className="space-y-2.5">
            {doctor.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <GoldStar />
                <span className="text-[12.5px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                  {a}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── footer: languages + CTA ── */}
        <div
          className="mt-auto pt-5 flex flex-col sm:flex-row sm:items-center gap-3"
          style={{ borderTop: "1px solid var(--border-light)" }}
        >
          {/* languages */}
          <div className="flex items-center gap-2 sm:flex-1">
            <LanguageIcon />
            <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              {doctor.languages.join("  ·  ")}
            </span>
          </div>

          {/* CTA */}
          <a
            href={`https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I'd%20like%20to%20book%20a%20consultation%20with%20${encodeURIComponent(doctor.name)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 text-[13px] font-bold py-3.5 px-6 rounded-xl text-white whitespace-nowrap transition-opacity duration-200 hover:opacity-90 active:opacity-80"
            style={{
              background: "var(--primary-red)",
              boxShadow: "0 4px 20px rgba(211,47,47,0.3)",
            }}
          >
            <WhatsAppIcon />
            Book Free Consultation
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION EXPORT
───────────────────────────────────────── */
export default function DoctorsGrid() {
  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg-soft)" }}>
      <div className="containerFull">

        {/* ── section eyebrow + heading ── */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-8 h-px" style={{ background: "var(--primary-red)" }} />
          <span
            className="text-[10.5px] font-black tracking-[0.25em] uppercase"
            style={{ color: "var(--primary-red)" }}
          >
            Our Medical Team
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight"
              style={{
                color: "var(--text-primary)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Meet the Doctors{" "}
              <em className="not-italic" style={{ color: "var(--primary-red)" }}>
                Behind Your Results
              </em>
            </h2>
            <p
              className="text-[14px] md:text-[15px] mt-4 max-w-2xl leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Every procedure is performed exclusively by board-certified, Turkey-trained surgeons.
              No technicians. No shortcuts. Just world-class precision you can trust.
            </p>
          </div>
        </div>

        {/* ── trust stats bar ── */}
        {/* <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden mb-14"
          style={{
            border: "1px solid var(--border-light)",
            background: "var(--bg-main)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          }}
        >
          {trustStats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-7 px-4 text-center"
              style={{
                borderRight: i < trustStats.length - 1 ? "1px solid var(--border-light)" : "none",
              }}
            >
              <span
                className="text-3xl md:text-4xl font-bold leading-none"
                style={{
                  color: "var(--primary-red)",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {s.value}
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.16em] mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div> */}

        {/* ── cards stack ── */}
        <div className="flex flex-col gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* ── bottom note ── */}
        <p
          className="text-center text-[12px] mt-12 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          All doctors are NMC-registered &amp; certification-verified · Free scalp analysis with every
          consultation ·{" "}
          <a
            href="tel:+919911111247"
            className="font-bold transition-opacity hover:opacity-75"
            style={{ color: "var(--primary-red)" }}
          >
            +91-9911111247
          </a>
        </p>
      </div>
    </section>
  );
}