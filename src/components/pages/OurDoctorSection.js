"use client";

// OurDoctorSection.js
// Usage: <OurDoctorSection city="Delhi" doctor={...} cmsDoctor={...} />
import useTrackCTA from "@/lib/useTrackCTA";

export default function OurDoctorSection({
  city = "Delhi",
  doctor,
  cmsDoctor,
  settings,
  sectionSettings,
  meetYourSurgeon,
}) {
  const trackCTA = useTrackCTA();

  const secSettings = settings || sectionSettings || meetYourSurgeon || {};

  // If section is explicitly disabled in branch settings, do not render
  if (secSettings?.enabled === false) {
    return null;
  }

  // Single source of truth: doctor must be provided from CMS
  const doc = doctor || cmsDoctor;
  const name =
    doc?.basicInfo?.doctorName ||
    doc?.basicInfo?.name ||
    doc?.doctorName ||
    doc?.name;

  if (!doc || !name) {
    return null;
  }

  const doctorTitle =
    doc.basicInfo?.designation || doc.designation || "Hair Restoration Specialist";
  const image =
    doc.basicInfo?.profileImage?.image ||
    doc.basicInfo?.profileImage?.url ||
    doc.profileImage?.image ||
    doc.profileImage?.url ||
    doc.image ||
    "/uploads/gallery.jpg";

  // Dynamic badge: branch setting override first, then Doctor CMS certs
  // If branch explicitly sets badgeText (even to ""), respect it — prevents default "Board Certified" on demo doctors
  const badgeText = (() => {
    if (typeof secSettings?.badgeText === "string") return secSettings.badgeText.trim();
    if (doc.badge) return doc.badge;
    const certs = doc.doctorCard?.certifications || [];
    const isTurkey = certs.some((c) =>
      /turkey/i.test(typeof c === "string" ? c : c?.title || "")
    );
    if (isTurkey) return "Turkey Certified";
    if (doc.medicalReviewer?.isVerified) return "Verified Surgeon";
    if (doc.comparison?.leftCard?.badge) return doc.comparison.leftCard.badge;
    return "Board Certified";
  })();

  // Derive stats dynamically from CMS without inventing fake claims
  const stats = (() => {
    if (doc.stats?.length) return doc.stats;
    const s = [];
    const b = doc.basicInfo;
    if (b?.yearsExperience) {
      s.push({ num: `${b.yearsExperience}+ Yrs`, label: "Surgical Experience" });
    }
    if (b?.proceduresCount) {
      s.push({ num: `${Number(b.proceduresCount).toLocaleString()}+`, label: "Procedures Done" });
    }
    if (b?.successRate) {
      s.push({ num: b.successRate, label: "Graft Survival" });
    }
    if (b?.rating) {
      s.push({ num: `${b.rating}★`, label: "Google Rating" });
    }
    return s;
  })();

  // Derive bio dynamically from Doctor CMS without cross-doctor claim contamination
  const bioLines = (() => {
    if (doc.bioLines?.length) return doc.bioLines;
    if (doc.doctorCard?.cardDescription?.trim()) {
      const parts = doc.doctorCard.cardDescription
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length) return parts;
    }
    if (doc.surgeonProfile?.about?.trim()) {
      const parts = doc.surgeonProfile.about
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length) return parts;
    }
    if (doc.hero?.description?.trim()) {
      return [doc.hero.description.trim()];
    }
    return [];
  })();

  // Qualifications dynamically from Doctor CMS
  const qualifications = (() => {
    if (doc.qualifications?.length) return doc.qualifications;
    if (doc.doctorCard?.qualifications?.length) {
      const valid = doc.doctorCard.qualifications
        .filter((q) => q && (q.degree?.trim() || q.institute?.trim()))
        .map((q) => ({ degree: q.degree || "", institute: q.institute || "" }));
      if (valid.length) return valid;
    }
    if (doc.credentials?.tabs?.length) {
      const valid = doc.credentials.tabs
        .filter((t) => t && t.title?.trim())
        .map((t) => ({ degree: t.title, institute: t.hint || t.description || "" }));
      if (valid.length) return valid;
    }
    if (doc.keyFacts?.qualifications?.trim()) {
      return [
        {
          degree: doc.keyFacts.qualifications.trim(),
          institute: doc.keyFacts.registration || "Medical Council Registered",
        },
      ];
    }
    return [];
  })();

  // Certifications dynamically from Doctor CMS
  const certifications = (() => {
    if (doc.certifications?.length) return doc.certifications;
    if (doc.doctorCard?.certifications?.length) {
      const valid = doc.doctorCard.certifications
        .map((c) => (typeof c === "string" ? c : c?.title || c?.name || ""))
        .filter((c) => c && c.trim());
      if (valid.length) return valid;
    }
    if (doc.surgeonProfile?.achievements?.length) {
      const valid = doc.surgeonProfile.achievements
        .map((c) => (typeof c === "string" ? c : c?.title ? `${c.title}${c.description ? ` — ${c.description}` : ""}` : ""))
        .filter((c) => c && c.trim());
      if (valid.length) return valid;
    }
    return [];
  })();

  // Specializations dynamically from Doctor CMS
  const specializations = (() => {
    if (doc.specializations?.length) return doc.specializations;
    if (doc.doctorCard?.specializations?.length) {
      const valid = doc.doctorCard.specializations
        .map((s) => (typeof s === "string" ? s : s?.title || s?.name || ""))
        .filter((s) => s && s.trim());
      if (valid.length) return valid;
    }
    if (doc.surgeonProfile?.specializations?.length) {
      const valid = doc.surgeonProfile.specializations
        .map((s) => (typeof s === "string" ? s : s?.title || s?.name || ""))
        .filter((s) => s && s.trim());
      if (valid.length) return valid;
    }
    return [];
  })();

  const doctorSlug = doc.slug ? doc.slug.replace(/^\/+/, "").replace(/^doctors\//, "") : "";
  const doctorProfileHref = doctorSlug ? `/doctors/${doctorSlug}` : "/doctors";

  // Branch-specific section labels
  const eyebrowText = secSettings?.eyebrow?.trim() || `Your Surgeon in ${city}`;
  const headingText = secSettings?.heading?.trim() || "";
  const consultationBtnLabel = secSettings?.consultationButtonLabel?.trim() || `Book Consultation with ${name}`;
  const profileBtnLabel = secSettings?.profileButtonLabel?.trim() || (doctorSlug ? "View Full Profile →" : "View Doctors Directory →");

  // No hardcoded fallback — if doctor has no phone, CTAs are hidden to avoid fake WhatsApp links (demo doctors)
  const doctorPhone = doc.basicInfo?.whatsappNumber || doc.basicInfo?.phoneNumber || "";
  const cleanPhone = doctorPhone.replace(/[^\d+]/g, "");

  return (
    <section className="py-20 bg-white" data-debug-section="meet-your-surgeon">
      <div className="containerFull px-4 md:px-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            {eyebrowText}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-10">
          {headingText ? (
            headingText.includes("Surgeon") ? (
              <>
                {headingText.split("Surgeon")[0]}
                <span className="text-[#D32F2F]">Surgeon</span>
                {headingText.split("Surgeon").slice(1).join("Surgeon")}
              </>
            ) : (
              headingText
            )
          ) : (
            <>
              Meet Your Hair Transplant{" "}
              <span className="text-[#D32F2F]">Surgeon</span>
            </>
          )}
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
              {badgeText && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    {badgeText}
                  </span>
                </div>
              )}

              {/* Identity */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <span className="block w-8 h-0.5 mb-2 rounded-full bg-yellow-400/80" />
                <h3 className="text-xl font-bold text-white leading-tight">{name}</h3>
                <p className="text-[12px] text-white/55 mt-0.5">{doctorTitle}</p>
              </div>
            </div>

            {/* Stats (Rendered only when valid stats exist in CMS) */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center hover:border-red-100 transition-colors">
                    <p className="text-2xl font-bold text-gray-900">{s.num}</p>
                    <p className="text-xs text-gray-400 font-medium tracking-wide mt-1 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Profile ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Bio */}
            {bioLines.length > 0 && (
              <div className="bg-[#F7F5F2] rounded-2xl p-5 md:p-6">
                {bioLines.map((line, i) => (
                  <p key={i} className={`text-[15px] text-gray-700 leading-[1.85] ${i < bioLines.length - 1 ? "mb-4" : ""}`}>
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Education & Qualifications (Rendered only when valid qualifications exist in CMS) */}
            {qualifications.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-1 h-5 rounded-full bg-[#D32F2F]" />
                  <span className="text-xs font-black tracking-[0.18em] uppercase text-gray-500">
                    Education & Qualifications
                  </span>
                </div>
                <ul className="space-y-3.5">
                  {qualifications.map((q, idx) => (
                    <li key={`${q.degree}-${idx}`} className="flex items-start gap-3">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold block text-gray-900">{q.degree}</span>
                        {q.institute && <span className="text-xs text-gray-400">{q.institute}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certifications & Awards (Rendered only when valid certifications exist in CMS) */}
            {certifications.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-1 h-5 rounded-full bg-[#D32F2F]" />
                  <span className="text-xs font-black tracking-[0.18em] uppercase text-gray-500">
                    Certifications & Awards
                  </span>
                </div>
                <ul className="space-y-3">
                  {certifications.map((c, idx) => (
                    <li key={`${c}-${idx}`} className="flex items-start gap-3">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="#D4A937">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
                      </svg>
                      <span className="text-sm text-gray-600 leading-snug">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specializations (Rendered only when valid specializations exist in CMS) */}
            {specializations.length > 0 && (
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
            )}

            {/* CTA — only shown when doctor has a real contact phone/WhatsApp number.
              Demo doctors (phone = "") intentionally hide both CTAs to prevent
              fake contact links. Delhi's real doctor is unaffected. */}
            {cleanPhone && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                <a
                  href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Hi, I'd like to book a consultation with ${name} in ${city}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-6 text-sm tracking-wide transition-colors rounded-xl"
                  onClick={() => trackCTA({ type: "whatsapp", ctaName: `Doctor Book Consultation: ${name}`, buttonLocation: "Doctor Profile Section" })}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  {consultationBtnLabel}
                </a>
                <a
                  href={doctorProfileHref}
                  className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-4 px-6 text-sm tracking-wide transition-all rounded-xl"
                >
                  {profileBtnLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
