// app/api/submitInterviewForm/online-form/route.js

export async function handleSubmitInterviewForm(req, { fetchFn = fetch } = {}) {
  try {
    const body = await req.json();

    // ── 1. Google Sheets URLs ──────────────────────────────────────────────────
    const directUrl = "https://script.google.com/macros/s/AKfycbxPzMolRCpjM9BzcUeasbkgQoK-FgynFrQ_ddQgvNMiYncR2UB_0gdS4zcBtOoKboNj/exec";
    const qrUrl     = "https://script.google.com/macros/s/AKfycbxSYN6dn8TIFKpsN5FpljHxG-4QYex6KNKobIQQ9YgrKv2H3IHSCrhQBMWtNX1s4A5x/exec";
    const sheetUrl  = body.source === "qr" ? qrUrl : directUrl;

    // ── 2. Candidates API payload ──────────────────────────────────────────────
    // Map the online form fields → Interviewer model fields
    const candidatePayload = {
      name:                   body.name,
      position:               body.position,
      phone:                  body.phone,
      email:                  body.email,
      address:                body.address,
      expectedSalary:         body.expectedSalary ? Number(body.expectedSalary) : 0,
      previousSalary:         body.previousSalary ? Number(body.previousSalary) : 0,
      experienceType:         body.experienceType,
      yearsOfExperience:      body.yearsOfExperience ? Number(body.yearsOfExperience) : 0,
      previousCompany:        body.previousCompany        || "",
      previousCompanyContact: body.previousCompanyContact || "",
      previousPosition:       body.previousPosition       || "",
      reasonForLeaving:       body.reasonForLeaving        || "",
      source:                 body.source                  || "direct",
      interviewDate:          body.date ? new Date(body.date).toISOString() : new Date().toISOString(),
      // reference holds the HR ObjectId selected in the form
      ...(body.reference && { assignedHr: body.reference }),
      status: "Pending",   // default status for new online submissions
    };

    // ── 3. Fire both requests in parallel ─────────────────────────────────────
    const [sheetRes, candidateRes] = await Promise.allSettled([
      fetchFn(sheetUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      }),
      fetchFn("https://www.ryanmedihub.com/api/hr/candidates", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(candidatePayload),
      }),
    ]);

    // ── 4. Evaluate Google Sheet result (Secondary destination) ───────────────
    let sheetOk = false;
    if (sheetRes.status === "fulfilled") {
      const text = await sheetRes.value.text().catch(() => "");
      try {
        const data = JSON.parse(text);
        sheetOk = !!data.ok;
      } catch {
        sheetOk = false;
      }
    }

    // ── 5. Evaluate Candidates API result (Primary destination) ───────────────
    let candidateOk = false;
    let candidateError = "Request failed";
    let candidateStatus = 502;

    if (candidateRes.status === "fulfilled") {
      const resVal = candidateRes.value;
      const data = await resVal.json().catch(() => ({}));
      candidateOk = resVal.ok && data.success;
      if (!candidateOk) {
        candidateError = data.message || "Candidate save failed in CRM";
        candidateStatus = (resVal.status >= 400 && resVal.status < 600) ? resVal.status : 502;
      }
    } else {
      candidateError = candidateRes.reason?.message || "CRM network error";
      candidateStatus = 502;
    }

    // ── 6. RyanCRM is the primary destination: Fail-closed if CRM fails ───────
    // If RyanCRM fails, reject with non-2xx HTTP status regardless of Google Sheets status.
    if (!candidateOk) {
      return Response.json(
        {
          ok: false,
          message: `Application submission failed: ${candidateError}. Please check your details and try again or contact the clinic.`,
          ...(sheetOk && { sheetSaved: true, sheetNote: "Application was recorded in backup sheet but failed CRM registration" }),
        },
        { status: candidateStatus }
      );
    }

    // ── 7. RyanCRM succeeded ──────────────────────────────────────────────────
    return Response.json({
      ok: true,
      ...(!sheetOk && { sheetWarning: "Google Sheet write failed — data saved to CRM only" }),
    });

  } catch (err) {
    return Response.json({ ok: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  return handleSubmitInterviewForm(req);
}
