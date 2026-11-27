// Pure helpers for resolving, ordering, and expanding independent doctor profiles
// Shared across public branch pages (/[slug]), doctor detail pages (/doctors/[slug]),
// service data loaders, and unit tests.

export function isDemoDoctorSlug(slug) {
  return typeof slug === "string" && /^demo-doctor-/i.test(slug.trim());
}

export function isDoctorPubliclyEligible(doc, { allowDemo = false } = {}) {
  if (!doc || typeof doc !== "object") return false;
  if (doc.deletedAt) return false;
  if (doc.isActive === false) return false;
  const status = doc.status ? String(doc.status).trim().toLowerCase() : "published";
  if (status !== "published") return false;
  if (!allowDemo && isDemoDoctorSlug(doc.slug)) return false;
  return true;
}

export function sortDoctorsForDisplay(doctors = []) {
  if (!Array.isArray(doctors)) return [];
  return [...doctors].sort((a, b) => {
    const orderA = Number.isFinite(Number(a?.displayOrder)) ? Number(a.displayOrder) : 0;
    const orderB = Number.isFinite(Number(b?.displayOrder)) ? Number(b.displayOrder) : 0;
    if (orderA !== orderB) return orderA - orderB;

    const timeA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (timeA !== timeB) return timeB - timeA;

    const nameA = String(a?.basicInfo?.doctorName || a?.name || a?.pageName || "");
    const nameB = String(b?.basicInfo?.doctorName || b?.name || b?.pageName || "");
    return nameA.localeCompare(nameB);
  });
}

function getDocKey(doc, idx) {
  if (doc?._id) return `id:${String(doc._id)}`;
  if (doc?.slug) return `slug:${String(doc.slug).toLowerCase()}`;
  const name = doc?.basicInfo?.doctorName || doc?.doctorName || doc?.name || "";
  return name ? `name:${String(name).toLowerCase()}#${idx}` : `idx:${idx}`;
}

/**
 * Resolve all eligible doctors for a branch/service page:
 * 1. Explicit `assignedDoctors` array in exact admin-chosen order (real doctors prioritized).
 * 2. Matching published non-demo city doctors sorted by `displayOrder` asc, `createdAt` desc.
 * 3. Legacy single `assignedDoctor` if eligible and not already included.
 * 4. If NO real published non-demo doctors exist at all, allow a published legacy `demo-doctor-*`
 *    if it was explicitly assigned on the service (preserving unconfigured branch behavior cleanly).
 */
export function resolveBranchDoctors({
  assignedDoctors = [],
  assignedDoctor = null,
  cityDoctors = [],
} = {}) {
  const seen = new Set();
  const realDocs = [];

  const pushIfEligible = (doc, idx = 0) => {
    if (!isDoctorPubliclyEligible(doc, { allowDemo: false })) return;
    const key = getDocKey(doc, idx);
    if (seen.has(key)) return;
    seen.add(key);
    realDocs.push(doc);
  };

  if (Array.isArray(assignedDoctors)) {
    assignedDoctors.forEach((doc, idx) => pushIfEligible(doc, idx));
  }

  if (assignedDoctor && typeof assignedDoctor === "object") {
    pushIfEligible(assignedDoctor, 0);
  }

  if (Array.isArray(cityDoctors) && cityDoctors.length > 0) {
    const sortedCityDocs = sortDoctorsForDisplay(
      cityDoctors.filter((doc) => isDoctorPubliclyEligible(doc, { allowDemo: false }))
    );
    sortedCityDocs.forEach((doc, idx) => pushIfEligible(doc, idx));
  }

  if (realDocs.length > 0) {
    return realDocs;
  }

  // Fallback only if branch explicitly uses a published demo-doctor record and has 0 real doctors
  const demoFallback = [];
  const candidates = [
    ...(Array.isArray(assignedDoctors) ? assignedDoctors : []),
    ...(assignedDoctor ? [assignedDoctor] : []),
  ];
  for (const doc of candidates) {
    if (isDoctorPubliclyEligible(doc, { allowDemo: true })) {
      const key = getDocKey(doc, 0);
      if (!seen.has(key)) {
        seen.add(key);
        demoFallback.push(doc);
      }
    }
  }
  return demoFallback;
}

function extractImageUrl(val, fallback = "/uploads/turkey-doctor.jpg") {
  if (!val) return fallback;
  if (typeof val === "string") return val.trim() || fallback;
  if (typeof val === "object" && typeof val.image === "string") {
    return val.image.trim() || fallback;
  }
  return fallback;
}

function normalizeNameForCompare(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/\bdr\.?\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function extractQualificationsFromDoc(doc) {
  if (Array.isArray(doc?.qualifications) && doc.qualifications.length) {
    return doc.qualifications;
  }
  if (Array.isArray(doc?.doctorCard?.qualifications)) {
    const valid = doc.doctorCard.qualifications
      .filter((q) => q && (q.degree?.trim() || q.institute?.trim()))
      .map((q) => ({ degree: q.degree || "", institute: q.institute || "" }));
    if (valid.length) return valid;
  }
  if (Array.isArray(doc?.credentials?.tabs)) {
    const valid = doc.credentials.tabs
      .filter((t) => t && t.title?.trim())
      .map((t) => ({ degree: t.title, institute: t.hint || t.description || "" }));
    if (valid.length) return valid;
  }
  if (doc?.keyFacts?.qualifications?.trim()) {
    return [
      {
        degree: doc.keyFacts.qualifications.trim(),
        institute: doc.keyFacts.registration || "",
      },
    ];
  }
  return [];
}

function extractStringList(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        if (item.title && item.description) return `${item.title} — ${item.description}`;
        return String(item.title || item.name || item.description || "").trim();
      }
      return "";
    })
    .filter(Boolean);
}

/**
 * Converts eligible Doctor documents into completely independent profile objects.
 * Handles BOTH:
 * - Multiple standalone Doctor documents (1 profile per Doctor doc)
 * - Legacy/combined Doctor documents with `teamDoctors[]` (1 independent profile per entry,
 *   without cross-copying personal qualifications/bio/experience/image from another doctor).
 */
export function expandDoctorProfiles(rawDoctors = [], fallbackCity = "") {
  if (!Array.isArray(rawDoctors)) return [];
  const profiles = [];
  const seenNames = new Set();

  for (let docIdx = 0; docIdx < rawDoctors.length; docIdx++) {
    const doc = rawDoctors[docIdx];
    if (!doc || typeof doc !== "object") continue;

    const city = String(doc.basicInfo?.city || doc.city || doc.location || fallbackCity || "").trim();
    const clinicName = doc.basicInfo?.clinicName || "Ryan Clinic";
    const clinicAddress = doc.basicInfo?.clinicAddress || "";
    const whatsappNumber = doc.basicInfo?.whatsappNumber || doc.whatsapp || "";
    const phoneNumber = doc.basicInfo?.phoneNumber || doc.phone || "";
    const parentSlug = doc.slug ? String(doc.slug).replace(/^\/+/, "").replace(/^doctors\//, "") : "";
    const parentName = String(doc.basicInfo?.doctorName || doc.doctorName || doc.name || "").trim();
    const isCombinedParentName = parentName.includes("&") || parentName.includes(" and ");

    const team = Array.isArray(doc.teamDoctors)
      ? doc.teamDoctors.filter((td) => td && td.doctorName?.trim())
      : [];

    if (team.length > 0) {
      team.forEach((td, tIdx) => {
        const tdName = td.doctorName.trim();
        const dedupeKey = `${normalizeNameForCompare(tdName)}@${city.toLowerCase()}`;
        if (seenNames.has(dedupeKey)) return;
        seenNames.add(dedupeKey);

        const matchesParentIdentity =
          !isCombinedParentName &&
          normalizeNameForCompare(tdName) === normalizeNameForCompare(parentName);

        const qualification = String(td.qualification || "").trim();
        const tdImage = extractImageUrl(
          td.profileImage?.image ? td.profileImage : null,
          extractImageUrl(
            matchesParentIdentity ? doc.basicInfo?.profileImage : null,
            extractImageUrl(doc.basicInfo?.profileImage, "/uploads/turkey-doctor.jpg")
          )
        );

        const aboutText = String(td.about || "").trim();
        const bioLines = aboutText
          ? aboutText.split(/\n+/).map((p) => p.trim()).filter(Boolean)
          : matchesParentIdentity && doc.doctorCard?.cardDescription?.trim()
            ? doc.doctorCard.cardDescription.split(/\n+/).map((p) => p.trim()).filter(Boolean)
            : [
                `${tdName}${qualification ? ` (${qualification})` : ""} consults at ${clinicName}${city ? ` in ${city}` : ""} for personalized scalp evaluation and doctor-led hair restoration.`,
              ];

        const tdYears = Number(td.yearsExperience || (matchesParentIdentity ? doc.basicInfo?.yearsExperience : 0) || 0);
        const tdCases = Number(td.proceduresCount || (matchesParentIdentity ? doc.basicInfo?.proceduresCount : 0) || 0);
        const tdSuccessRate = td.successRate || (matchesParentIdentity ? doc.basicInfo?.successRate : "") || "";
        const tdRating = Number(td.rating ?? doc.basicInfo?.rating ?? 0);

        const stats = [];
        if (tdYears > 0) stats.push({ num: `${tdYears}+ Yrs`, label: "Surgical Experience" });
        if (tdCases > 0) stats.push({ num: `${tdCases.toLocaleString()}+`, label: "Procedures Done" });
        if (tdSuccessRate) stats.push({ num: tdSuccessRate, label: "Graft Survival" });
        if (tdRating > 0) stats.push({ num: `${tdRating}★`, label: "Google Rating" });

        const qualifications = [];
        if (qualification) {
          qualifications.push({ degree: qualification, institute: td.institute || "" });
        } else if (matchesParentIdentity) {
          qualifications.push(...extractQualificationsFromDoc(doc));
        }

        const certifications = Array.isArray(td.certifications) && td.certifications.length
          ? extractStringList(td.certifications)
          : matchesParentIdentity
            ? (extractStringList(doc.doctorCard?.certifications).length
                ? extractStringList(doc.doctorCard?.certifications)
                : extractStringList(doc.surgeonProfile?.achievements))
            : [];

        const specializations = Array.isArray(td.specializations) && td.specializations.length
          ? extractStringList(td.specializations)
          : (extractStringList(doc.doctorCard?.specializations).length
              ? extractStringList(doc.doctorCard?.specializations)
              : extractStringList(doc.surgeonProfile?.specializations));

        profiles.push({
          id: `${doc._id || parentSlug || docIdx}-team-${tIdx}`,
          sourceDoctorId: doc._id ? String(doc._id) : "",
          name: tdName,
          qualification,
          designation: td.designation?.trim() || (city ? `Hair Transplant Doctor — ${city}` : doc.basicInfo?.designation || "Hair Restoration Specialist"),
          city,
          clinicName,
          clinicAddress,
          profileImage: tdImage,
          profileAlt: td.profileImage?.alt || `${tdName}${qualification ? ` (${qualification})` : ""} — Hair Transplant Doctor${city ? ` in ${city}` : ""}`,
          badge: td.badge || (matchesParentIdentity ? (doc.badge || "") : ""),
          isVerified: Boolean(
            td.isVerified ||
            (matchesParentIdentity && (doc.isVerified || doc.medicalReviewer?.isVerified))
          ),
          yearsExperience: tdYears,
          proceduresCount: tdCases,
          successRate: tdSuccessRate,
          rating: tdRating,
          stats,
          bioLines,
          qualifications,
          certifications,
          specializations,
          slug: td.slug ? String(td.slug).replace(/^\/+/, "").replace(/^doctors\//, "") : parentSlug,
          whatsappNumber,
          phoneNumber,
          isDemo: isDemoDoctorSlug(parentSlug),
        });
      });
      continue;
    }

    const name = parentName || doc.pageName || "";
    if (!name) continue;
    const dedupeKey = `${normalizeNameForCompare(name)}@${city.toLowerCase()}`;
    if (seenNames.has(dedupeKey)) continue;
    seenNames.add(dedupeKey);

    const yearsExperience = Number(doc.yearsExperience || doc.basicInfo?.yearsExperience || 0);
    const proceduresCount = Number(doc.proceduresCountNum || doc.basicInfo?.proceduresCount || 0);
    const successRate = doc.successRate || doc.basicInfo?.successRate || "";
    const rating = Number(doc.rating ?? doc.basicInfo?.rating ?? 0);

    const stats = Array.isArray(doc.stats) && doc.stats.length > 0 ? doc.stats : (() => {
      const s = [];
      if (yearsExperience > 0) s.push({ num: `${yearsExperience}+ Yrs`, label: "Surgical Experience" });
      if (proceduresCount > 0) s.push({ num: `${proceduresCount.toLocaleString()}+`, label: "Procedures Done" });
      if (successRate) s.push({ num: successRate, label: "Graft Survival" });
      if (rating > 0) s.push({ num: `${rating}★`, label: "Google Rating" });
      return s;
    })();

    const bioLines = Array.isArray(doc.bioLines) && doc.bioLines.length > 0
      ? doc.bioLines
      : doc.doctorCard?.cardDescription?.trim()
        ? doc.doctorCard.cardDescription.split(/\n+/).map((p) => p.trim()).filter(Boolean)
        : doc.surgeonProfile?.about?.trim()
          ? doc.surgeonProfile.about.split(/\n+/).map((p) => p.trim()).filter(Boolean)
          : doc.about?.trim()
            ? doc.about.split(/\n+/).map((p) => p.trim()).filter(Boolean)
            : doc.hero?.description?.trim()
              ? [doc.hero.description.trim()]
              : [];

    const qualification = String(
      doc.doctorCard?.shortQualification || doc.keyFacts?.qualifications || doc.qualification || ""
    ).trim();

    const qualifications = extractQualificationsFromDoc(doc);
    const certifications = extractStringList(doc.certifications).length
      ? extractStringList(doc.certifications)
      : extractStringList(doc.doctorCard?.certifications).length
        ? extractStringList(doc.doctorCard?.certifications)
        : extractStringList(doc.surgeonProfile?.achievements);

    const specializations = extractStringList(doc.specializations).length
      ? extractStringList(doc.specializations)
      : extractStringList(doc.doctorCard?.specializations).length
        ? extractStringList(doc.doctorCard?.specializations)
        : extractStringList(doc.surgeonProfile?.specializations);

    profiles.push({
      id: doc._id ? String(doc._id) : `doc-${docIdx}`,
      sourceDoctorId: doc._id ? String(doc._id) : "",
      name,
      qualification,
      designation: doc.basicInfo?.designation || doc.designation || "Hair Restoration Specialist",
      city,
      clinicName,
      clinicAddress,
      profileImage: extractImageUrl(doc.basicInfo?.profileImage || doc.profileImage || doc.image, "/uploads/turkey-doctor.jpg"),
      profileAlt: doc.basicInfo?.profileImage?.alt || `${name} — ${doc.basicInfo?.designation || "Hair Transplant Surgeon"}`,
      badge: doc.badge || doc.comparison?.leftCard?.badge || "",
      isVerified: Boolean(doc.isVerified || doc.basicInfo?.isVerified || doc.medicalReviewer?.isVerified),
      yearsExperience,
      proceduresCount,
      successRate,
      rating,
      stats,
      bioLines,
      qualifications,
      certifications,
      specializations,
      slug: parentSlug,
      whatsappNumber,
      phoneNumber,
      philosophy: doc.surgeonProfile?.philosophy || "",
      philosophyHeading: doc.surgeonProfile?.philosophyHeading || "",
      isDemo: isDemoDoctorSlug(parentSlug),
      rawDoc: doc,
    });
  }

  return profiles;
}
