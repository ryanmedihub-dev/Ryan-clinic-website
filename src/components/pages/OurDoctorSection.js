"use client";

// OurDoctorSection.js
// Usage: <OurDoctorSection city="Delhi" doctor={{ name, title, image, stats, bioLines, qualifications, certifications, specializations }} />
import useTrackCTA from "@/lib/useTrackCTA";

const DEFAULT_QUALIFICATIONS = [
  { degree: "MBBS", institute: "AIIMS, New Delhi" },
  { degree: "MS – General Surgery", institute: "PGIMER, Chandigarh" },
  { degree: "Fellowship – Hair Restoration", institute: "Istanbul, Turkey" },
];

const DEFAULT_CERTIFICATIONS = [
  "Turkey Sapphire FUE Certification — Istanbul Hair Institute",
  "NABH-Certified Operating Surgeon",
  "ISHRS Member — International Society of Hair Restoration Surgery",
  "Best Hair Transplant Surgeon — India 2022 & 2023",
];

const DEFAULT_STATS = [
  { num: "12+", label: "Years of Experience" },
  { num: "10,000+", label: "Procedures Done" },
  { num: "95%+", label: "Graft Survival" },
  { num: "4.9★", label: "Google Rating" },
];

const DEFAULT_SPECIALIZATIONS = [
  "Turkey Sapphire FUE",
  Turkish Technique Choi Pen",
  "Hairline Design",
  "Crown Restoration",
  "High-Density FUE",
  "Female Hair Loss",
];

export default function OurDoctorSection({ city = "Delhi", doctor }) {
  const trackCTA = useTrackCTA();
  const name = doctor?.name || "Dr. Pranendra Singh";
  const doctorTitle = doctor?.title || "Medical Director & Chief Surgeon";
  const image = doctor?.image || "/uploads/gallery.jpg";
  const stats = doctor?.stats?.length ? doctor.stats : DEFAULT_STATS;
  const bioLines = doctor?.bioLines?.length
    ? doctor.bioLines
    : [
        `Your hair transplant in ${city} is led by Dr. Pranendra Singh, founder of Ryan Clinic and India's foremost authority on Turkey's Sapphire FUE technique. Trained directly under Turkey's leading specialists in Istanbul, Dr. Singh personally performs every surgical step and has overseen 10,000+ successful procedures across Delhi, Mumbai, and Hyderabad.`,
        `His commitment is simple: every patient receives world-class Turkey-certified care, with a doctor at every stage of surgery — never a technician.`,
      ];
  const qualifications = doctor?.qualifications?.length ? doctor.qualifications : DEFAULT_QUALIFICATIONS;
  const certifications = doctor?.certifications?.length ? doctor.certifications : DEFAULT_CERTIFICATIONS;
  const specializations = doctor?.specializations?.length ? doctor.specializations : DEFAULT_SPECIALIZATIONS;

  return (
    <section className="py-20 bg-white">
      <div className="containerFull px-4 md:px-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            Your Surgeon in {city}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-10">
          Meet Your Hair Transplant{" "}
          <span className="text-[#D32F2F]">Surgeon</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── Left: Photo + stats ── */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">

            {/* Photo card */}
            <div className="relative rounded-2xl overflow-hidden mb-5 aspect-4/5 shadow-lg">
              <img
                src={image}
                alt={`${name} — hair transplant surgeon in ${city}`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)" }} />
              <div className="absolute inset-y-0 left-0 w-1 bg-[#D32F2F]" />

              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Turkey Certified
                </span>
              </div>

              {/* Identity */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <span className="block w-8 h-0.5 mb-2 rounded-full bg-yellow-400/80" />
                <h3 className="text-xl font-bold text-white leading-tight">{name}</h3>
                <p className="text-[12px] text-white/55 mt-0.5">{doctorTitle}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center hover:border-red-100 transition-colors">
                  <p className="text-2xl font-bold text-gray-900">{s.num}</p>
                  <p className="text-xs text-gray-400 font-medium tracking-wide mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Profile ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Bio */}
            <div className="bg-[#F7F5F2] rounded-2xl p-5 md:p-6">
              {bioLines.map((line, i) => (
                <p key={i} className={`text-[15px] text-gray-700 leading-[1.85] ${i < bioLines.length - 1 ? "mb-4" : ""}`}>
                  {line}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1 h-5 rounded-full bg-[#D32F2F]" />
                <span className="text-xs font-black tracking-[0.18em] uppercase text-gray-500">
                  Education & Qualifications
                </span>
              </div>
              <ul className="space-y-3.5">
                {qualifications.map((q) => (
                  <li key={q.degree} className="flex items-start gap-3">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="text-sm font-semibold block text-gray-900">{q.degree}</span>
                      <span className="text-xs text-gray-400">{q.institute}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1 h-5 rounded-full bg-[#D32F2F]" />
                <span className="text-xs font-black tracking-[0.18em] uppercase text-gray-500">
                  Certifications & Awards
                </span>
              </div>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="#D4A937">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
                    </svg>
                    <span className="text-sm text-gray-600 leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specializations */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1 h-5 rounded-full bg-[#D32F2F]" />
                <span className="text-xs font-black tracking-[0.18em] uppercase text-gray-500">
                  Specializations
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specializations.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-[#D32F2F] border border-red-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation%20with%20Dr.%20Pranendra%20Singh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-6 text-sm tracking-wide transition-colors rounded-xl"
                onClick={() => trackCTA({ type: "whatsapp", ctaName: `Doctor Book Consultation: ${name}`, buttonLocation: "Doctor Profile Section" })}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Book Consultation with {name}
              </a>
              <a
                href="/about/dr-pranendra-singh/"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-4 px-6 text-sm tracking-wide transition-all rounded-xl"
              >
                Full Profile →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
