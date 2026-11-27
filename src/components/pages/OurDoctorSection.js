"use client";

// OurDoctorSection.js
// Usage:
//   Single doctor: <OurDoctorSection city="Delhi" doctor={...} cmsDoctor={...} />
//   Multi-doctor:  <OurDoctorSection city="Mumbai" doctors={[...]} />
import useTrackCTA from "@/lib/useTrackCTA";
import { getValidImageSrc } from "@/lib/utils";
import { expandDoctorProfiles } from "@/lib/doctorProfiles.mjs";

function DoctorPhotoCard({
  image,
  alt,
  name,
  qualification,
  doctorTitle,
  badgeText,
  stats = [],
  orderClass = "",
}) {
  return (
    <div className={`lg:col-span-2 lg:sticky lg:top-28 ${orderClass}`}>
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black shadow-lg">
        <img
          src={image}
          alt={alt || name}
          className="w-full h-[380px] sm:h-[420px] lg:h-[480px] object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {badgeText && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {badgeText}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {name}
            {qualification ? (
              <span className="block sm:inline text-sm font-semibold text-red-200 sm:ml-2">
                ({qualification})
              </span>
            ) : null}
          </h3>
          <p className="text-red-300 text-xs font-medium mt-0.5">{doctorTitle}</p>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 mt-4 pt-3.5 border-t border-white/15">
              {stats.map((s) => (
                <div key={s.label} className="min-w-0">
                  <div className="text-sm font-bold text-white leading-none">{s.num}</div>
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DoctorProfileInfo({
  profile,
  city,
  consultationBtnLabel,
  profileBtnLabel,
  orderClass = "",
  trackCTA,
}) {
  const {
    name,
    qualification,
    designation,
    bioLines = [],
    qualifications = [],
    certifications = [],
    specializations = [],
    slug = "",
    whatsappNumber = "",
    phoneNumber = "",
  } = profile;

  const doctorProfileHref = slug ? `/doctors/${slug}` : "/doctors";
  const rawPhone = whatsappNumber || phoneNumber || "";
  const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
  const btnConsult = consultationBtnLabel || `Book Consultation with ${name}`;
  const btnProfile = profileBtnLabel || (slug ? "View Full Profile →" : "View Doctors Directory →");

  return (
    <div className={`lg:col-span-3 flex flex-col gap-6 ${orderClass}`}>
      {/* Identity sub-header on multi-doctor layouts */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D32F2F] block mb-1">
            {designation || `Hair Restoration Specialist${city ? ` — ${city}` : ""}`}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {name}
            {qualification ? (
              <span className="text-lg sm:text-xl font-semibold text-gray-500 ml-2">
                ({qualification})
              </span>
            ) : null}
          </h3>
        </div>
        {city && (
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            {city} Branch
          </span>
        )}
      </div>

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

      {/* Education & Qualifications */}
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

      {/* Certifications & Awards */}
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

      {/* Specializations */}
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

      {/* CTA — only shown when doctor has a verified contact phone/WhatsApp */}
      {cleanPhone && (
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
          <a
            href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Hi, I'd like to book a consultation with ${name} in ${city}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-6 text-sm tracking-wide transition-colors rounded-xl"
            onClick={() => trackCTA({ type: "whatsapp", ctaName: `Doctor Book Consultation: ${name}`, buttonLocation: "Doctor Profile Section" })}
          >
            <span>{btnConsult}</span>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href={doctorProfileHref}
            className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 text-sm rounded-xl transition-colors"
            onClick={() => trackCTA({ type: "navigation", ctaName: `Doctor View Full Profile: ${name}`, buttonLocation: "Doctor Profile Section" })}
          >
            {btnProfile}
          </a>
        </div>
      )}
    </div>
  );
}

export default function OurDoctorSection({
  city = "Delhi",
  doctor,
  cmsDoctor,
  doctors,
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

  // Normalize all doctors for this location (supports single doctor or multiple doctors)
  const rawDocs =
    Array.isArray(doctors) && doctors.length > 0
      ? doctors
      : doctor || cmsDoctor
        ? [doctor || cmsDoctor]
        : [];

  const expandedProfiles = expandDoctorProfiles(rawDocs, city);

  if (expandedProfiles.length === 0) {
    return null;
  }

  const isMultiDoctor = expandedProfiles.length >= 2;

  // Resolve section header copy
  const eyebrowText = (() => {
    const custom = secSettings?.eyebrow?.trim();
    if (custom) {
      if (isMultiDoctor && /^YOUR SURGEON IN /i.test(custom)) {
        return custom.replace(/^YOUR SURGEON IN /i, "YOUR SURGEONS IN ");
      }
      return custom;
    }
    return isMultiDoctor ? `Your Surgeons in ${city}` : `Your Surgeon in ${city}`;
  })();

  const headingText = (() => {
    const custom = secSettings?.heading?.trim();
    if (custom) {
      if (isMultiDoctor && custom === "Meet Your Hair Transplant Surgeon") {
        return "Meet Your Hair Transplant Surgeons";
      }
      return custom;
    }
    return "";
  })();

  // Helper to resolve per-doctor badge consistently with existing rules
  const resolveBadgeForProfile = (profile) => {
    if (typeof secSettings?.badgeText === "string") return secSettings.badgeText.trim();
    if (profile.badge) return profile.badge;
    const isTurkey = (profile.certifications || []).some((c) => /turkey/i.test(c));
    if (isTurkey) return "Turkey Certified";
    if (profile.isVerified) return "Verified Surgeon";
    return "Board Certified";
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CASE A — Exactly 1 doctor: Preserve existing single-doctor layout identically
  // ═══════════════════════════════════════════════════════════════════════════
  if (!isMultiDoctor) {
    const doc = rawDocs[0] || {};
    const singleProfile = expandedProfiles[0];
    const name = singleProfile.name;
    const doctorTitle = singleProfile.designation;
    const image = getValidImageSrc(singleProfile.profileImage, "/uploads/gallery.jpg");
    const badgeText = resolveBadgeForProfile(singleProfile);
    const stats = singleProfile.stats || [];
    const bioLines = singleProfile.bioLines || [];
    const qualifications = singleProfile.qualifications || [];
    const certifications = singleProfile.certifications || [];
    const specializations = singleProfile.specializations || [];
    const doctorSlug = singleProfile.slug;
    const doctorProfileHref = doctorSlug ? `/doctors/${doctorSlug}` : "/doctors";
    const consultationBtnLabel = secSettings?.consultationButtonLabel?.trim() || `Book Consultation with ${name}`;
    const profileBtnLabel = secSettings?.profileButtonLabel?.trim() || (doctorSlug ? "View Full Profile →" : "View Doctors Directory →");
    const doctorPhone = doc.basicInfo?.whatsappNumber || doc.basicInfo?.phoneNumber || singleProfile.whatsappNumber || singleProfile.phoneNumber || "";
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

          {/* ── Main grid (unchanged single-doctor layout) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* ── Left: Photo + stats ── */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black">
                <img
                  src={image}
                  alt={singleProfile.profileAlt || name}
                  className="w-full h-[380px] sm:h-[420px] lg:h-[480px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {badgeText && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {badgeText}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white leading-tight">{name}</h3>
                  <p className="text-red-300 text-xs font-medium mt-0.5">{doctorTitle}</p>

                  {stats.length > 0 && (
                    <div className="flex gap-4 mt-4 pt-3.5 border-t border-white/15">
                      {stats.map((s) => (
                        <div key={s.label}>
                          <div className="text-sm font-bold text-white leading-none">{s.num}</div>
                          <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Profile ── */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {bioLines.length > 0 && (
                <div className="bg-[#F7F5F2] rounded-2xl p-5 md:p-6">
                  {bioLines.map((line, i) => (
                    <p key={i} className={`text-[15px] text-gray-700 leading-[1.85] ${i < bioLines.length - 1 ? "mb-4" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
              )}

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

              {cleanPhone && (
                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Hi, I'd like to book a consultation with ${name} in ${city}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-6 text-sm tracking-wide transition-colors rounded-xl"
                    onClick={() => trackCTA({ type: "whatsapp", ctaName: `Doctor Book Consultation: ${name}`, buttonLocation: "Doctor Profile Section" })}
                  >
                    <span>{consultationBtnLabel}</span>
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href={doctorProfileHref}
                    className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 text-sm rounded-xl transition-colors"
                    onClick={() => trackCTA({ type: "navigation", ctaName: `Doctor View Full Profile: ${name}`, buttonLocation: "Doctor Profile Section" })}
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

  // ═══════════════════════════════════════════════════════════════════════════
  // CASE B — Two or more doctors: Separate complete profile blocks alternating:
  //   Doctor 1 (idx 0): Text Left, Image Card Right
  //   Doctor 2 (idx 1): Image Card Left, Text Right
  //   Doctor 3 (idx 2): Text Left, Image Card Right ...
  //   On mobile (< lg): consistent Image top (order-1), Text below (order-2)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <section className="py-20 bg-white" data-debug-section="meet-your-surgeon" data-multi-doctor="true">
      <div className="containerFull px-4 md:px-6">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            {eyebrowText}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-12">
          {headingText ? (
            headingText.includes("Surgeons") ? (
              <>
                {headingText.split("Surgeons")[0]}
                <span className="text-[#D32F2F]">Surgeons</span>
                {headingText.split("Surgeons").slice(1).join("Surgeons")}
              </>
            ) : headingText.includes("Surgeon") ? (
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
              <span className="text-[#D32F2F]">Surgeons</span>
            </>
          )}
        </h2>

        <div className="space-y-14 lg:space-y-20">
          {expandedProfiles.map((profile, idx) => {
            const isTextLeft = idx % 2 === 0;
            const infoOrderClass = isTextLeft ? "order-2 lg:order-1" : "order-2 lg:order-2";
            const imageOrderClass = isTextLeft ? "order-1 lg:order-2" : "order-1 lg:order-1";
            const badgeText = resolveBadgeForProfile(profile);
            const image = getValidImageSrc(profile.profileImage, "/uploads/gallery.jpg");

            return (
              <article
                key={profile.id || `${profile.name}-${idx}`}
                data-doctor-index={idx}
                data-doctor-layout={isTextLeft ? "text-left" : "image-left"}
                className={idx > 0 ? "pt-14 lg:pt-16 border-t border-gray-200/80" : ""}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
                  <DoctorProfileInfo
                    profile={profile}
                    city={profile.city || city}
                    consultationBtnLabel={
                      secSettings?.consultationButtonLabel?.trim()
                        ? `${secSettings.consultationButtonLabel.trim()} — ${profile.name}`
                        : `Book Consultation with ${profile.name}`
                    }
                    profileBtnLabel={secSettings?.profileButtonLabel?.trim()}
                    orderClass={infoOrderClass}
                    trackCTA={trackCTA}
                  />
                  <DoctorPhotoCard
                    image={image}
                    alt={profile.profileAlt || profile.name}
                    name={profile.name}
                    qualification={profile.qualification}
                    doctorTitle={profile.designation}
                    badgeText={badgeText}
                    stats={profile.stats}
                    orderClass={imageOrderClass}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
