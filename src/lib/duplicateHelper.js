/**
 * Helper utilities for CMS page duplication across all admin sections.
 */

/**
 * Generate a guaranteed unique slug for a duplicated document.
 * 
 * Given base slug "hair-transplant-surgery-in-delhi":
 * 1st duplicate: "hair-transplant-surgery-in-delhi-copy"
 * 2nd duplicate: "hair-transplant-surgery-in-delhi-copy-2"
 * 3rd duplicate: "hair-transplant-surgery-in-delhi-copy-3"
 *
 * @param {string} originalSlug - The original document's slug
 * @param {import('mongoose').Model} Model - The Mongoose model
 * @param {string} [slugFieldPath='slug'] - The path to the slug field in the schema
 * @param {object} [extraFilter={}] - Additional query constraints (e.g. active records only)
 * @returns {Promise<string>}
 */
export async function generateUniqueDuplicateSlug(
  originalSlug,
  Model,
  slugFieldPath = "slug",
  extraFilter = {}
) {
  const cleanOriginal = (originalSlug || "page")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  // Determine base without existing "-copy(-N)" suffix if already duplicating a copy
  const copySuffixRegex = /-copy(?:-\d+)?$/i;
  const baseSlug = cleanOriginal.replace(copySuffixRegex, "");

  // Candidate 1: baseSlug-copy
  let candidateSlug = `${baseSlug}-copy`;

  // Check if candidate exists
  let existing = await Model.findOne({
    ...extraFilter,
    [slugFieldPath]: { $regex: new RegExp(`^${escapeRegex(candidateSlug)}$`, "i") },
  }).lean();

  if (!existing) {
    return candidateSlug;
  }

  // Iterate with numbered suffixes: baseSlug-copy-2, baseSlug-copy-3...
  let counter = 2;
  while (counter <= 500) {
    candidateSlug = `${baseSlug}-copy-${counter}`;
    existing = await Model.findOne({
      ...extraFilter,
      [slugFieldPath]: { $regex: new RegExp(`^${escapeRegex(candidateSlug)}$`, "i") },
    }).lean();

    if (!existing) {
      return candidateSlug;
    }
    counter++;
  }

  // Fallback with timestamp if counter exceeds 500
  return `${baseSlug}-copy-${Date.now()}`;
}

/**
 * Escape special regex characters in string
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Specifically normalize SurgeonPage documents before duplication.
 * SurgeonPage schema uses imageSchema ({ url: String, alt: String }) across nested cards.
 *
 * @param {object} doc
 * @returns {object}
 */
export function normalizeSurgeonDoc(doc) {
  if (!doc || typeof doc !== "object") return doc;
  const cloned = JSON.parse(JSON.stringify(doc));

  const toImageObj = (val) => {
    if (!val) return { url: "", alt: "" };
    if (typeof val === "string") return { url: val, alt: "" };
    if (typeof val === "object") {
      const url = (typeof val.url === "string" && val.url) || (typeof val.image === "string" && val.image) || "";
      const alt = (typeof val.alt === "string" && val.alt) || (typeof val.imageAlt === "string" && val.imageAlt) || "";
      return { url, alt };
    }
    return { url: "", alt: "" };
  };

  if (cloned.hero?.doctorCard) {
    cloned.hero.doctorCard.image = toImageObj(cloned.hero.doctorCard.image);
  }

  if (Array.isArray(cloned.whySkill?.cards)) {
    cloned.whySkill.cards = cloned.whySkill.cards.map((c) => ({
      ...c,
      image: toImageObj(c.image),
    }));
  }

  if (Array.isArray(cloned.whyClinic?.cards)) {
    cloned.whyClinic.cards = cloned.whyClinic.cards.map((c) => ({
      ...c,
      image: toImageObj(c.image),
    }));
  }

  if (Array.isArray(cloned.procedures?.items)) {
    cloned.procedures.items = cloned.procedures.items.map((p) => ({
      ...p,
      image: toImageObj(p.image),
    }));
  }

  if (cloned.leadSurgeon?.doctorCard) {
    cloned.leadSurgeon.doctorCard.image = toImageObj(cloned.leadSurgeon.doctorCard.image);
  }

  return cloned;
}

/**
 * Update canonical URL inside an SEO object if it contains the original slug.
 *
 * @param {object} seo - The SEO object
 * @param {string} oldSlug - Original slug
 * @param {string} newSlug - Newly generated duplicate slug
 * @returns {object} Updated SEO object clone
 */
export function updateCanonicalInSeo(seo, oldSlug, newSlug) {
  if (!seo || typeof seo !== "object") return seo || {};
  const clonedSeo = JSON.parse(JSON.stringify(seo));

  // Canonical field could be canonicalUrl or canonical
  if (typeof clonedSeo.canonicalUrl === "string" && clonedSeo.canonicalUrl.trim()) {
    if (oldSlug && clonedSeo.canonicalUrl.includes(oldSlug)) {
      clonedSeo.canonicalUrl = clonedSeo.canonicalUrl.replace(
        new RegExp(escapeRegex(oldSlug), "g"),
        newSlug
      );
    }
  }

  if (typeof clonedSeo.canonical === "string" && clonedSeo.canonical.trim()) {
    if (oldSlug && clonedSeo.canonical.includes(oldSlug)) {
      clonedSeo.canonical = clonedSeo.canonical.replace(
        new RegExp(escapeRegex(oldSlug), "g"),
        newSlug
      );
    }
  }

  return clonedSeo;
}
