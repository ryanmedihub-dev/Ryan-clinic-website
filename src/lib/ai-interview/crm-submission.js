/**
 * Clinic Ryan — Server-side CRM and Google Sheets Dispatcher (Phase 2)
 *
 * Dispatches passing candidates to the existing production RyanCRM candidate API
 * (https://www.ryanmedihub.com/api/hr/candidates) and the Google Sheets webhook.
 *
 * NOTE: This module only executes when a candidate has successfully completed
 * the AI pre-screening assessment AND scored >= BASE_SCORE.
 */

import { ROLE_COMPETENCIES } from "./config.js";

const ALLOWED_POSITIONS = Object.keys(ROLE_COMPETENCIES);

const GOOGLE_SHEET_DIRECT_URL =
  "https://script.google.com/macros/s/AKfycbxPzMolRCpjM9BzcUeasbkgQoK-FgynFrQ_ddQgvNMiYncR2UB_0gdS4zcBtOoKboNj/exec";
const GOOGLE_SHEET_QR_URL =
  "https://script.google.com/macros/s/AKfycbxSYN6dn8TIFKpsN5FpljHxG-4QYex6KNKobIQQ9YgrKv2H3IHSCrhQBMWtNX1s4A5x/exec";
const RYAN_CRM_CANDIDATES_ENDPOINT = "https://www.ryanmedihub.com/api/hr/candidates";

/**
 * Validates and sanitizes raw candidate data submitted by the client.
 *
 * @param {Object} rawData - Candidate profile from form steps 1 & 2
 * @param {string} sessionPosition - The authoritative position from the verified AI session
 * @returns {{ valid: boolean, sanitized?: Object, error?: string }}
 */
export function validateAndNormalizeCandidateData(rawData, sessionPosition) {
  if (!rawData || typeof rawData !== "object") {
    return { valid: false, error: "Missing candidate profile data." };
  }

  const name = String(rawData.name || "").trim();
  const date = String(rawData.date || "").trim();
  const position = String(rawData.position || "").trim();
  const phone = String(rawData.phone || "").trim().replace(/[\s-]/g, "");
  const address = String(rawData.address || "").trim();
  const email = String(rawData.email || "").trim();
  const expectedSalary = Number(rawData.expectedSalary) || 0;
  const previousSalary = Number(rawData.previousSalary) || 0;
  const experienceType = rawData.experienceType === "Experienced" ? "Experienced" : "Fresher";
  const yearsOfExperience = Number(rawData.yearsOfExperience) || 0;
  const previousCompany = String(rawData.previousCompany || "").trim();
  const previousCompanyContact = String(rawData.previousCompanyContact || "").trim();
  const previousPosition = String(rawData.previousPosition || "").trim();
  const reasonForLeaving = String(rawData.reasonForLeaving || "").trim();
  const source = String(rawData.source || "direct").trim();
  const reference = String(rawData.reference || "").trim();

  // Basic required field validations
  if (!name) return { valid: false, error: "Candidate name is required." };
  if (!date) return { valid: false, error: "Interview date is required." };
  if (!position) return { valid: false, error: "Applied position is required." };
  if (!phone || !/^\+?[0-9]{10,15}$/.test(phone)) {
    return { valid: false, error: "A valid 10-15 digit phone number is required." };
  }
  if (!address) return { valid: false, error: "Address is required." };

  // Validate position is in allowed list
  if (!ALLOWED_POSITIONS.includes(position)) {
    return { valid: false, error: `Invalid position: "${position}".` };
  }

  // Cross-verify position consistency with signed AI session
  if (sessionPosition && position !== sessionPosition) {
    return {
      valid: false,
      error: `Position mismatch between form (${position}) and AI session (${sessionPosition}).`,
    };
  }

  // Validate HR ObjectId format if present (24 hex characters or valid string)
  if (reference && !/^[0-9a-fA-F]{24}$/.test(reference) && reference !== "69bd3e186706eb9cf318ffc9") {
    // If not matching strict 24-hex, ensure it's at least a safe non-empty identifier
    if (reference.length > 64) {
      return { valid: false, error: "Invalid HR reference identifier format." };
    }
  }

  // Format valid ISO interview date
  let interviewDateISO;
  try {
    interviewDateISO = new Date(date).toISOString();
  } catch {
    interviewDateISO = new Date().toISOString();
  }

  // Build exact CRM-compatible payload
  const candidatePayload = {
    name,
    position,
    phone,
    email,
    address,
    expectedSalary,
    previousSalary,
    experienceType,
    yearsOfExperience,
    previousCompany,
    previousCompanyContact,
    previousPosition,
    reasonForLeaving,
    source,
    interviewDate: interviewDateISO,
    ...(reference ? { assignedHr: reference } : {}),
    status: "Pending", // Established CRM status for new online submissions
  };

  // Build Google Sheet payload matching original structure
  const sheetPayload = {
    name,
    date,
    position,
    address,
    phone,
    email,
    expectedSalary: String(expectedSalary || ""),
    experienceType,
    yearsOfExperience: String(yearsOfExperience || ""),
    previousCompany,
    previousCompanyContact,
    previousPosition,
    previousSalary: String(previousSalary || ""),
    reasonForLeaving,
    reference,
    source,
  };

  return {
    valid: true,
    sanitized: {
      candidatePayload,
      sheetPayload,
      sheetUrl: source === "qr" ? GOOGLE_SHEET_QR_URL : GOOGLE_SHEET_DIRECT_URL,
    },
  };
}

/**
 * Dispatches a passing candidate to RyanCRM and Google Sheets.
 *
 * @param {Object} sanitizedData
 * @param {Object} sanitizedData.candidatePayload - Exact CRM payload with assignedHr
 * @param {Object} sanitizedData.sheetPayload - Google Sheet payload
 * @param {string} sanitizedData.sheetUrl - Target Sheet webhook URL
 * @returns {Promise<{ crmOk: boolean, sheetOk: boolean, crmError?: string, sheetError?: string }>}
 */
export async function submitPassingCandidateToCrm({ candidatePayload, sheetPayload, sheetUrl }) {
  const timeoutMs = 15000;

  // Dispatch to both endpoints in parallel
  const [sheetRes, candidateRes] = await Promise.allSettled([
    fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetPayload),
      signal: AbortSignal.timeout(timeoutMs),
    }),
    fetch(RYAN_CRM_CANDIDATES_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidatePayload),
      signal: AbortSignal.timeout(timeoutMs),
    }),
  ]);

  // 1. Evaluate Google Sheet result
  let sheetOk = false;
  let sheetError = "";
  if (sheetRes.status === "fulfilled") {
    try {
      const text = await sheetRes.value.text();
      const data = JSON.parse(text);
      sheetOk = !!data.ok;
      if (!sheetOk) sheetError = "Google Sheet returned non-ok response";
    } catch {
      sheetOk = false;
      sheetError = "Failed to parse Google Sheet response";
    }
  } else {
    sheetError = sheetRes.reason?.message || "Google Sheet network timeout";
  }

  // 2. Evaluate RyanCRM result
  let crmOk = false;
  let crmError = "";
  if (candidateRes.status === "fulfilled") {
    try {
      const data = await candidateRes.value.json().catch(() => ({}));
      crmOk = candidateRes.value.ok && (data.success || data.ok);
      if (!crmOk) crmError = data.message || `CRM returned status ${candidateRes.value.status}`;
    } catch {
      crmOk = false;
      crmError = "Failed to parse RyanCRM response";
    }
  } else {
    crmError = candidateRes.reason?.message || "RyanCRM network timeout";
  }

  return {
    crmOk,
    sheetOk,
    crmError,
    sheetError,
  };
}
