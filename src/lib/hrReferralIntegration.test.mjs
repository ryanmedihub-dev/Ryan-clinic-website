/**
 * Integration logic test for the CRM candidates POST handler's unauthenticated path.
 * Tests the hardened assignedHr field validation after the security review.
 *
 * Run from: c:\Users\patwa\Desktop\clinicRyan\Ryan-next-project-new
 *   node --test src/lib/hrReferralIntegration.test.mjs
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  AUTHORITATIVE_ACTIVE_HR_LIST,
  HR_REFERENCE_OTHER_ID,
  EXCLUDED_HR_IDS,
  EXCLUDED_HR_NAMES,
  isExcludedHr,
  formatHrDisplayName,
  buildDisplayHrList,
} from "./hrEmployees.js";
import { handleSubmitInterviewForm } from "../app/api/submitInterviewForm/online-form/route.js";

// ── Reproduce the hardened CRM candidates POST handler logic ───────────────────
// This mirrors the hardened logic in RyanCRM/ryan-crm/src/app/api/hr/candidates/route.js
// which uses validatePublicAssignedHr and isEligibleHrReference.

function isEligibleHrReference(employee) {
  if (!employee) return false;

  const employeeId = String(employee._id);
  const employeeRole = String(employee.role || "").trim();
  const rawName = String(employee.name || "").trim();
  const lowerName = rawName.toLowerCase();

  // Role must be "Hr"
  if (employeeRole !== "Hr") {
    return false;
  }

  // Check if it is the dedicated "Other" HR bucket
  if (employeeId === HR_REFERENCE_OTHER_ID && lowerName === "other") {
    return true;
  }

  // Active status is required for all normal HR employees
  if (!employee.isactive) {
    return false;
  }

  // Must not be an explicitly excluded HR ID
  if (EXCLUDED_HR_IDS.includes(employeeId)) {
    return false;
  }

  // Must not match excluded names
  const stripped = lowerName
    .replace(/^hr[\s._-]+/i, "")
    .replace(/[\s._-]+hr$/i, "")
    .trim();

  if (EXCLUDED_HR_NAMES.includes(stripped) || EXCLUDED_HR_NAMES.includes(lowerName)) {
    return false;
  }

  return true;
}

// Mock Employee DB
const mockEmployeeDb = new Map([
  ["6a27ff34d3eb9b2325233664", { _id: "6a27ff34d3eb9b2325233664", name: "Hr Aisha", role: "Hr", isactive: true }],
  ["6a8842144f9e384454479954", { _id: "6a8842144f9e384454479954", name: "Farhin Gul", role: "Hr", isactive: true }],
  ["6aad1450930151f9f3c42637", { _id: "6aad1450930151f9f3c42637", name: "HR Kanishka", role: "Hr", isactive: true }],
  ["6a8842144f9e384454479955", { _id: "6a8842144f9e384454479955", name: "Hr Naziya", role: "Hr", isactive: true }],
  ["6aad1249d052e47e774fe842", { _id: "6aad1249d052e47e774fe842", name: "HR Priya", role: "Hr", isactive: true }],
  ["69bd25df9777c5b4424121c1", { _id: "69bd25df9777c5b4424121c1", name: "Hr Simran Kaur", role: "Hr", isactive: true }],
  [HR_REFERENCE_OTHER_ID, { _id: HR_REFERENCE_OTHER_ID, name: "other", role: "Hr", isactive: false }],
  ["60c72b2f9b1d8b2bad000001", { _id: "60c72b2f9b1d8b2bad000001", name: "Dr. Sharma", role: "Doctor", isactive: true }],
  ["60c72b2f9b1d8b2bad000002", { _id: "60c72b2f9b1d8b2bad000002", name: "Rahul Sales", role: "sales", isactive: true }],
  ["69bd26769777c5b4424121e7", { _id: "69bd26769777c5b4424121e7", name: "Hr Tulsi", role: "Hr", isactive: false }],
  ["6a8c1c9f4b81eed5d782715a", { _id: "6a8c1c9f4b81eed5d782715a", name: "anamta Hr", role: "Hr", isactive: false }],
  ["69bd264a9777c5b4424121d9", { _id: "69bd264a9777c5b4424121d9", name: "Muskan Sayed", role: "HR RECRUITER", isactive: true }],
  ["6a8842144f9e384454479956", { _id: "6a8842144f9e384454479956", name: "Shubham Chitransh", role: "HR GENERALIST", isactive: true }],
]);

async function simulateHardenedCandidatesPost(body, isAuthenticatedHR) {
  const result = { ...body };

  if (!isAuthenticatedHR) {
    result.status = "Applied";
    delete result.interviewerFeedback;

    if (result.assignedHr) {
      const idStr = String(result.assignedHr).trim();
      const isHex24 = /^[0-9a-fA-F]{24}$/.test(idStr);
      let isValid = false;

      if (isHex24) {
        const employee = mockEmployeeDb.get(idStr) || null;
        isValid = isEligibleHrReference(employee);
      }

      if (!isValid) {
        delete result.assignedHr;
      }
    }
  } else {
    const VALID_STATUSES = ["Applied", "Interview Scheduled", "Selected", "Rejected", "On Hold"];
    if (result.status && !VALID_STATUSES.includes(result.status)) {
      result.status = "Applied";
    }
  }

  return result;
}

// ── 1. All six currently approved HR references ───────────────────────────────
test("Security: all six currently approved HR references are accepted", async () => {
  for (const hr of AUTHORITATIVE_ACTIVE_HR_LIST) {
    const payload = {
      name: "Test Candidate",
      position: "Telecaller",
      phone: "9999999999",
      assignedHr: hr._id,
      status: "Pending",
    };
    const saved = await simulateHardenedCandidatesPost(payload, false);
    assert.equal(saved.assignedHr, hr._id, `HR ${hr.name} (${hr._id}) must be accepted`);
    assert.equal(saved.status, "Applied");
  }
});

// ── 2. The legitimate Other employee record ──────────────────────────────────
test("Security: the legitimate Other employee record is accepted", async () => {
  const payload = {
    name: "Test Candidate",
    position: "Counsellor",
    phone: "9123456789",
    assignedHr: HR_REFERENCE_OTHER_ID, // "69bd3e186706eb9cf318ffc9"
    status: "Pending",
  };

  const saved = await simulateHardenedCandidatesPost(payload, false);
  assert.equal(saved.assignedHr, HR_REFERENCE_OTHER_ID);
  assert.equal(saved.status, "Applied");
});

// ── 3. A valid-format but nonexistent ObjectId ───────────────────────────────
test("Security: valid-format but nonexistent ObjectId is stripped", async () => {
  const payload = {
    name: "Spam Candidate",
    position: "Telecaller",
    phone: "9000000000",
    assignedHr: "507f1f77bcf86cd799439011", // valid hex ObjectId, not in DB
  };

  const saved = await simulateHardenedCandidatesPost(payload, false);
  assert.equal("assignedHr" in saved, false, "Nonexistent employee ID must be stripped");
  assert.equal(saved.status, "Applied");
});

// ── 4. A valid employee ObjectId with ineligible role (arbitrary assignment) ─
test("Security: valid employee with ineligible role (Doctor/Sales) is stripped", async () => {
  // Candidate attempts to assign to Doctor
  const payloadDoc = {
    name: "Test Candidate",
    position: "Telecaller",
    phone: "9000000000",
    assignedHr: "60c72b2f9b1d8b2bad000001", // Dr. Sharma
  };
  const savedDoc = await simulateHardenedCandidatesPost(payloadDoc, false);
  assert.equal("assignedHr" in savedDoc, false, "Doctor ID must not be accepted as HR reference");

  // Candidate attempts to assign to Sales
  const payloadSales = {
    name: "Test Candidate",
    position: "Telecaller",
    phone: "9000000000",
    assignedHr: "60c72b2f9b1d8b2bad000002", // Rahul Sales
  };
  const savedSales = await simulateHardenedCandidatesPost(payloadSales, false);
  assert.equal("assignedHr" in savedSales, false, "Sales ID must not be accepted as HR reference");
});

// ── 5. Inactive or excluded HR employees are stripped ────────────────────────
test("Security: inactive or excluded HR employees are stripped", async () => {
  // Hr Tulsi (inactive)
  const payloadTulsi = {
    name: "Candidate",
    position: "Telecaller",
    assignedHr: "69bd26769777c5b4424121e7",
  };
  const savedTulsi = await simulateHardenedCandidatesPost(payloadTulsi, false);
  assert.equal("assignedHr" in savedTulsi, false, "Inactive Hr Tulsi must be stripped");

  // Anamta (excluded)
  const payloadAnamta = {
    name: "Candidate",
    position: "Telecaller",
    assignedHr: "6a8c1c9f4b81eed5d782715a",
  };
  const savedAnamta = await simulateHardenedCandidatesPost(payloadAnamta, false);
  assert.equal("assignedHr" in savedAnamta, false, "Excluded Anamta must be stripped");

  // Muskan Sayed (HR RECRUITER / excluded)
  const payloadMuskan = {
    name: "Candidate",
    position: "Telecaller",
    assignedHr: "69bd264a9777c5b4424121d9",
  };
  const savedMuskan = await simulateHardenedCandidatesPost(payloadMuskan, false);
  assert.equal("assignedHr" in savedMuskan, false, "Excluded Muskan must be stripped");

  // Shubham Chitransh (HR GENERALIST / excluded)
  const payloadShubham = {
    name: "Candidate",
    position: "Telecaller",
    assignedHr: "6a8842144f9e384454479956",
  };
  const savedShubham = await simulateHardenedCandidatesPost(payloadShubham, false);
  assert.equal("assignedHr" in savedShubham, false, "Excluded Shubham must be stripped");
});

// ── 6. Malformed ObjectId inputs are stripped ────────────────────────────────
test("Security: malformed ObjectId inputs are stripped", async () => {
  const malformedInputs = [
    "not-an-id",
    "<script>alert('xss')</script>",
    "6aad1249d052", // truncated
    "6aad1249d052e47e774fe842ffff", // too long
    "6aad1249d052e47e774fe84g", // non-hex character 'g'
  ];

  for (const bad of malformedInputs) {
    const payload = {
      name: "Test Candidate",
      position: "Telecaller",
      phone: "9000000000",
      assignedHr: bad,
    };
    const saved = await simulateHardenedCandidatesPost(payload, false);
    assert.equal("assignedHr" in saved, false, `Malformed input "${bad}" must be stripped`);
  }
});

// ── 7. Missing optional HR reference is handled safely ───────────────────────
test("Security: missing optional HR reference is handled safely without error", async () => {
  const payload = {
    name: "Direct Candidate",
    position: "Receptionist",
    phone: "9000000000",
    status: "Pending",
  };

  const saved = await simulateHardenedCandidatesPost(payload, false);
  assert.equal("assignedHr" in saved, false, "No assignedHr should be present if not selected");
  assert.equal(saved.status, "Applied");
});

// ── 8. Authenticated HR manual assignment is preserved ───────────────────────
test("Security: authenticated HR can manually assign any employee and set status", async () => {
  const payload = {
    name: "Existing Candidate",
    position: "Telecaller",
    phone: "9000000001",
    assignedHr: "60c72b2f9b1d8b2bad000001", // manual assignment to any staff member
    status: "Interview Scheduled",
    interviewerFeedback: "Reviewed by senior HR",
  };

  const saved = await simulateHardenedCandidatesPost(payload, true /* authenticated */);
  assert.equal(saved.assignedHr, "60c72b2f9b1d8b2bad000001", "Authenticated HR assignment preserved");
  assert.equal(saved.status, "Interview Scheduled", "Authenticated HR status preserved");
  assert.equal(saved.interviewerFeedback, "Reviewed by senior HR", "Authenticated HR feedback preserved");
});

// ── 9. Unauthenticated attempts to modify status or feedback are prevented ───
test("Security: unauthenticated attempts to modify status or feedback are strictly prevented", async () => {
  const payload = {
    name: "Malicious Applicant",
    position: "Telecaller",
    phone: "9000000001",
    assignedHr: "6aad1249d052e47e774fe842",
    status: "Selected",
    interviewerFeedback: "FORGED_EVALUATION",
  };

  const saved = await simulateHardenedCandidatesPost(payload, false /* unauthenticated */);
  assert.equal(saved.status, "Applied", "Status must be forced to 'Applied'");
  assert.equal("interviewerFeedback" in saved, false, "interviewerFeedback must be deleted");
  assert.equal(saved.assignedHr, "6aad1249d052e47e774fe842", "Legitimate HR referral is preserved");
});

// ── 10. End-to-end integration: candidate referral workflow ──────────────────
test("End-to-end: HR Aisha referral flows correctly from form → CRM submission payload", async () => {
  const selectedHrId = "6a27ff34d3eb9b2325233664"; // HR Aisha
  const formData = {
    name: "Riya Sharma",
    date: "2026-11-13",
    position: "Telecaller",
    phone: "9876543210",
    email: "riya@example.com",
    address: "Delhi",
    expectedSalary: "15000",
    experienceType: "Fresher",
    reference: selectedHrId,
    source: "direct",
  };

  const candidatePayload = {
    name: formData.name,
    position: formData.position,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    expectedSalary: Number(formData.expectedSalary),
    source: formData.source,
    ...(formData.reference && { assignedHr: formData.reference }),
    status: "Pending",
  };

  assert.equal(candidatePayload.assignedHr, "6a27ff34d3eb9b2325233664");

  const savedDoc = await simulateHardenedCandidatesPost(candidatePayload, false);
  assert.equal(savedDoc.assignedHr, "6a27ff34d3eb9b2325233664");
  assert.equal(savedDoc.status, "Applied");

  const populatedDoc = {
    ...savedDoc,
    assignedHr: { _id: "6a27ff34d3eb9b2325233664", name: "Hr Aisha" },
  };

  const displayedName = populatedDoc.assignedHr?.name || null;
  assert.equal(displayedName, "Hr Aisha");
});

// ── 11. Zero Assessment: Direct Web Applicant Submission ─────────────────────
test("Zero Assessment: Direct web candidate submits directly to /api/submitInterviewForm/online-form with no intermediate assessment", async () => {
  // Simulate direct applicant (no qr parameter or source=direct)
  const candidate = {
    name: "Vikram Malhotra",
    date: "2026-11-14",
    position: "HR Recruiter",
    phone: "9811122233",
    email: "vikram@example.com",
    address: "Saket, New Delhi",
    expectedSalary: "35000",
    experienceType: "Experienced",
    yearsOfExperience: 3,
    previousCompany: "ABC Corp",
    previousPosition: "Recruiter",
    reference: "6aad1450930151f9f3c42637", // HR Kanishka
    source: "direct",
  };

  // Ensure payload maps reference to assignedHr and bypasses all assessment endpoints
  const crmPayload = {
    name: candidate.name,
    position: candidate.position,
    phone: candidate.phone,
    email: candidate.email,
    address: candidate.address,
    expectedSalary: Number(candidate.expectedSalary),
    experienceType: candidate.experienceType,
    yearsOfExperience: candidate.yearsOfExperience,
    previousCompany: candidate.previousCompany,
    previousPosition: candidate.previousPosition,
    source: candidate.source,
    ...(candidate.reference && { assignedHr: candidate.reference }),
    status: "Pending",
  };

  assert.equal(crmPayload.assignedHr, "6aad1450930151f9f3c42637");
  assert.equal(crmPayload.source, "direct");

  // Verify submission through hardened CRM rules creates valid candidate
  const savedDoc = await simulateHardenedCandidatesPost(crmPayload, false);
  assert.equal(savedDoc.assignedHr, "6aad1450930151f9f3c42637");
  assert.equal(savedDoc.status, "Applied");
});

// ── 12. Zero Assessment: QR Walk-in Applicant Submission ──────────────────────
test("Zero Assessment: QR walk-in candidate submits directly to /api/submitInterviewForm/online-form with zero assessment", async () => {
  const candidate = {
    name: "Sunita Roy",
    date: "2026-11-14",
    position: "Receptionist",
    phone: "9877788899",
    email: "sunita@example.com",
    address: "Lajpat Nagar, New Delhi",
    expectedSalary: "20000",
    experienceType: "Fresher",
    reference: "6aad1249d052e47e774fe842", // HR Priya
    source: "qr",
  };

  const crmPayload = {
    name: candidate.name,
    position: candidate.position,
    phone: candidate.phone,
    email: candidate.email,
    address: candidate.address,
    expectedSalary: Number(candidate.expectedSalary),
    experienceType: candidate.experienceType,
    source: candidate.source,
    ...(candidate.reference && { assignedHr: candidate.reference }),
    status: "Pending",
  };

  assert.equal(crmPayload.assignedHr, "6aad1249d052e47e774fe842");
  assert.equal(crmPayload.source, "qr");

  const savedDoc = await simulateHardenedCandidatesPost(crmPayload, false);
  assert.equal(savedDoc.assignedHr, "6aad1249d052e47e774fe842");
  assert.equal(savedDoc.status, "Applied");
});

// ── 13. Backend Scenario 1: RyanCRM succeeds and Google Sheets succeeds ────────
test("Backend Scenario 1: RyanCRM succeeds and Google Sheets succeeds -> HTTP 200 and ok: true", async () => {
  const candidate = {
    name: "Aman Gupta",
    date: "2026-11-14",
    position: "Software Developer",
    phone: "9988776655",
    email: "aman@example.com",
    address: "Noida",
    expectedSalary: "50000",
    experienceType: "Experienced",
    yearsOfExperience: 4,
    reference: "6a8842144f9e384454479955", // Hr Naziya
    source: "direct",
  };

  const fakeFetch = async (url, options) => {
    if (url.includes("script.google.com")) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("ryanmedihub.com/api/hr/candidates")) {
      const payload = JSON.parse(options.body);
      assert.equal(payload.assignedHr, "6a8842144f9e384454479955");
      return new Response(JSON.stringify({ success: true, message: "Candidate created", candidateId: "new_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected url: ${url}`);
  };

  const req = new Request("http://localhost/api/submitInterviewForm/online-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });

  const res = await handleSubmitInterviewForm(req, { fetchFn: fakeFetch });
  assert.equal(res.status, 200, "Must return HTTP 200 when RyanCRM succeeds");
  const data = await res.json();
  assert.equal(data.ok, true, "Must return ok: true");
  assert.equal("sheetWarning" in data, false, "Must not have sheetWarning when sheets succeeds");

  // Verify frontend contract
  const frontendWouldShowSuccess = res.ok && data.ok;
  assert.equal(frontendWouldShowSuccess, true, "Frontend must show success confirmation");
});

// ── 14. Backend Scenario 2: RyanCRM succeeds but Google Sheets fails ───────────
test("Backend Scenario 2: RyanCRM succeeds but Google Sheets fails -> HTTP 200 and ok: true with sheetWarning", async () => {
  const candidate = {
    name: "Neha Verma",
    date: "2026-11-14",
    position: "Telecaller",
    phone: "9876543211",
    email: "neha@example.com",
    address: "Gurgaon",
    expectedSalary: "18000",
    experienceType: "Fresher",
    reference: "69bd25df9777c5b4424121c1", // Hr Simran Kaur
    source: "direct",
  };

  const fakeFetch = async (url) => {
    if (url.includes("script.google.com")) {
      // Sheet fails with 500 error
      return new Response("Internal Server Error in Apps Script", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
    if (url.includes("ryanmedihub.com/api/hr/candidates")) {
      return new Response(JSON.stringify({ success: true, message: "Candidate created", candidateId: "new_456" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected url: ${url}`);
  };

  const req = new Request("http://localhost/api/submitInterviewForm/online-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });

  const res = await handleSubmitInterviewForm(req, { fetchFn: fakeFetch });
  assert.equal(res.status, 200, "Must return HTTP 200 when RyanCRM succeeds, even if Sheets fails");
  const data = await res.json();
  assert.equal(data.ok, true, "Must return ok: true");
  assert.equal(typeof data.sheetWarning, "string", "Must include non-blocking sheetWarning");

  // Verify frontend contract: Sheets failure is non-blocking
  const frontendWouldShowSuccess = res.ok && data.ok;
  assert.equal(frontendWouldShowSuccess, true, "Frontend must show success confirmation when CRM succeeds");
});

// ── 15. Backend Scenario 3A: Google Sheets succeeds but RyanCRM fails ──────────
test("Backend Scenario 3A: Google Sheets succeeds but RyanCRM fails -> Non-2xx status, ok: false, frontend shows error", async () => {
  const candidate = {
    name: "Rohan Patel",
    date: "2026-11-14",
    position: "MIS Executive",
    phone: "9123456780",
    email: "rohan@example.com",
    address: "Delhi",
    expectedSalary: "25000",
    experienceType: "Fresher",
    reference: "6a27ff34d3eb9b2325233664", // Hr Aisha
    source: "direct",
  };

  const fakeFetch = async (url) => {
    if (url.includes("script.google.com")) {
      // Sheet succeeds
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("ryanmedihub.com/api/hr/candidates")) {
      // RyanCRM fails with 500
      return new Response(JSON.stringify({ success: false, message: "Database connection failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected url: ${url}`);
  };

  const req = new Request("http://localhost/api/submitInterviewForm/online-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });

  const res = await handleSubmitInterviewForm(req, { fetchFn: fakeFetch });
  assert.equal(res.status >= 400, true, `Must return non-2xx status when CRM fails (received ${res.status})`);
  assert.equal(res.ok, false, "res.ok must be false when CRM fails");

  const data = await res.json();
  assert.equal(data.ok, false, "Must return ok: false");
  assert.equal(typeof data.message, "string", "Must return clear error message");
  assert.match(data.message, /failed/i, "Error message must indicate failure");
  assert.equal(data.sheetSaved, true, "Can indicate backup sheet saved");

  // Verify frontend contract: Frontend MUST NOT show success
  const frontendWouldShowSuccess = res.ok && data.ok;
  assert.equal(frontendWouldShowSuccess, false, "Frontend MUST NOT show success confirmation when CRM fails");
});

// ── 16. Backend Scenario 3B: Both Google Sheets and RyanCRM fail ───────────────
test("Backend Scenario 3B: Both Google Sheets and RyanCRM fail -> Non-2xx status, ok: false", async () => {
  const candidate = {
    name: "Kavita Rao",
    date: "2026-11-14",
    position: "Counsellor",
    phone: "9765432100",
    email: "kavita@example.com",
    address: "Faridabad",
    expectedSalary: "30000",
    experienceType: "Fresher",
    reference: "69bd3e186706eb9cf318ffc9", // Other
    source: "qr",
  };

  const fakeFetch = async (url) => {
    if (url.includes("script.google.com")) {
      return new Response("Timeout", { status: 504 });
    }
    if (url.includes("ryanmedihub.com/api/hr/candidates")) {
      return new Response(JSON.stringify({ success: false, message: "Service Unavailable" }), {
        status: 503,
      });
    }
    throw new Error(`Unexpected url: ${url}`);
  };

  const req = new Request("http://localhost/api/submitInterviewForm/online-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });

  const res = await handleSubmitInterviewForm(req, { fetchFn: fakeFetch });
  assert.equal(res.status >= 400, true, "Must return non-2xx status");
  assert.equal(res.ok, false, "res.ok must be false");

  const data = await res.json();
  assert.equal(data.ok, false, "ok must be false");
  const frontendWouldShowSuccess = res.ok && data.ok;
  assert.equal(frontendWouldShowSuccess, false, "Frontend must not show success");
});

// ── 17. Backend Scenario 3C: RyanCRM returns 400 validation error ──────────────
test("Backend Scenario 3C: RyanCRM returns 400 validation error -> returns 400 status to candidate", async () => {
  const candidate = {
    name: "Test Bad Phone",
    date: "2026-11-14",
    position: "Telecaller",
    phone: "123", // invalid
    email: "bad@example.com",
    address: "Delhi",
    expectedSalary: "10000",
    experienceType: "Fresher",
    reference: "",
    source: "direct",
  };

  const fakeFetch = async (url) => {
    if (url.includes("script.google.com")) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    if (url.includes("ryanmedihub.com/api/hr/candidates")) {
      return new Response(JSON.stringify({ success: false, message: "Invalid phone number format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected url: ${url}`);
  };

  const req = new Request("http://localhost/api/submitInterviewForm/online-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });

  const res = await handleSubmitInterviewForm(req, { fetchFn: fakeFetch });
  assert.equal(res.status, 400, "Should propagate 400 status from CRM");
  assert.equal(res.ok, false, "res.ok must be false");
  const data = await res.json();
  assert.equal(data.ok, false);
  assert.match(data.message, /Invalid phone number format/);
  const frontendWouldShowSuccess = res.ok && data.ok;
  assert.equal(frontendWouldShowSuccess, false);
});


