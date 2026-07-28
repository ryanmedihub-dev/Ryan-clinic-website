/**
 * General-purpose slug utility for surgery pages.
 *
 * Converts any string to a clean, URL-safe slug:
 *   "Hair Transplant Surgery in Delhi" → "hair-transplant-surgery-in-delhi"
 *   "Beard Transplant in Delhi"        → "beard-transplant-in-delhi"
 *
 * Use `generateSlug` everywhere you need to produce a slug from free-form text.
 * The old `generateSurgeryPageDetails` export is kept for backward compatibility
 * but delegates to `generateSlug` internally.
 */

/**
 * Convert any text into a URL-safe slug.
 * @param {string} text
 * @returns {string}
 */
export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // strip special chars except hyphens
    .replace(/\s+/g, "-")       // spaces → hyphens
    .replace(/-+/g, "-")        // collapse consecutive hyphens
    .replace(/^-|-$/g, "");     // trim leading/trailing hyphens
}

/**
 * @deprecated Use `generateSlug` directly.
 * Kept for backward compatibility with existing API routes that still import this.
 */
export function generateSurgeryPageDetails(city) {
  const formattedCity = city.trim();
  const pageName = `Hair Transplant Surgery in ${formattedCity}`;
  const slug = generateSlug(pageName);
  return { pageName, slug };
}