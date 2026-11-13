/**
 * Authoritative HR reference configuration and helpers.
 * Source of truth: RyanCRM employees collection ({ role: "Hr", isactive: true }).
 *
 * This provides reliable HR reference options for the public /interview-form page,
 * ensuring the dropdown remains functional even when upstream CRM requires authentication
 * or is temporarily unreachable.
 */

// Specific CRM ObjectId for the "Other" HR bucket
export const HR_REFERENCE_OTHER_ID = "69bd3e186706eb9cf318ffc9";

// Excluded HR employee IDs (inactive or explicitly excluded from public reference)
export const EXCLUDED_HR_IDS = Object.freeze([
  "6a8c1c9f4b81eed5d782715a", // Anamta
  "69bd264a9777c5b4424121d9", // Muskan
  "6a8842144f9e384454479956", // Shubham Chitransh
]);

// Excluded HR names (case-insensitive, trimmed)
export const EXCLUDED_HR_NAMES = Object.freeze([
  "shubham chitransh",
  "anamta",
  "muskan",
]);

/**
 * Authoritative list of active, eligible HR employees from RyanCRM.
 * Queried from RyanCRM MongoDB where { role: "Hr", isactive: true }.
 */
export const AUTHORITATIVE_ACTIVE_HR_LIST = Object.freeze([
  { _id: "6a27ff34d3eb9b2325233664", name: "Hr Aisha" },
  { _id: "6a8842144f9e384454479954", name: "Farhin Gul" },
  { _id: "6aad1450930151f9f3c42637", name: "HR Kanishka" },
  { _id: "6a8842144f9e384454479955", name: "Hr Naziya" },
  { _id: "6aad1249d052e47e774fe842", name: "HR Priya" },
  { _id: "69bd25df9777c5b4424121c1", name: "Hr Simran Kaur" },
]);

/**
 * Check if an HR record should be excluded from the public dropdown.
 * Matches by normalized name or exact ObjectId.
 *
 * @param {{ _id?: string, name?: string } | null | undefined} hr
 * @returns {boolean}
 */
export function isExcludedHr(hr) {
  if (!hr) return false;
  const name = hr.name || "";
  const lower = name.trim().toLowerCase();
  const stripped = lower
    .replace(/^hr[\s._-]+/i, "")
    .replace(/[\s._-]+hr$/i, "")
    .trim();

  if (EXCLUDED_HR_NAMES.includes(stripped) || EXCLUDED_HR_NAMES.includes(lower)) {
    return true;
  }

  if (hr._id && EXCLUDED_HR_IDS.includes(String(hr._id))) {
    return true;
  }

  return false;
}

/**
 * Format the HR display name with the standardized "HR " prefix.
 * Avoids duplicate prefixes such as "HR HR <Name>".
 *
 * @param {string} rawName
 * @returns {string}
 */
export function formatHrDisplayName(rawName) {
  const trimmed = (rawName || "").trim();
  if (/^hr\s+/i.test(trimmed)) {
    return trimmed.replace(/^hr\s+/i, "HR ");
  }
  return `HR ${trimmed}`;
}

/**
 * Build the complete list of formatted display HR options.
 *
 * @param {Array<{ _id: string, name: string }>} employees
 * @returns {Array<{ _id: string, displayName: string }>}
 */
export function buildDisplayHrList(employees = AUTHORITATIVE_ACTIVE_HR_LIST) {
  if (!Array.isArray(employees)) return [];
  return employees
    .filter((hr) => !isExcludedHr(hr))
    .map((hr) => ({
      _id: String(hr._id),
      displayName: formatHrDisplayName(hr.name),
    }));
}

