// app/api/submitInterviewForm/online-form/route.js

export async function POST(req) {
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
      fetch(sheetUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      }),
      fetch("https://www.ryanmedihub.com/api/hr/candidates", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(candidatePayload),
      }),
    ]);

    // ── 4. Evaluate Google Sheet result ───────────────────────────────────────
    let sheetOk = false;
    if (sheetRes.status === "fulfilled") {
      const text = await sheetRes.value.text();
      try {
        const data = JSON.parse(text);
        sheetOk = !!data.ok;
      } catch {
        sheetOk = false;
      }
    }

    // ── 5. Evaluate Candidates API result ─────────────────────────────────────
    let candidateOk = false;
    let candidateError = "Request failed";
    if (candidateRes.status === "fulfilled") {
      const data = await candidateRes.value.json().catch(() => ({}));
      candidateOk = candidateRes.value.ok && data.success;
      if (!candidateOk) candidateError = data.message || "Candidate save failed";
    } else {
      candidateError = candidateRes.reason?.message || "Network error";
    }

    // ── 6. Both failed → hard error ───────────────────────────────────────────
    if (!sheetOk && !candidateOk) {
      return Response.json(
        { message: `Sheet failed & Candidate API failed: ${candidateError}` },
        { status: 500 }
      );
    }

    // ── 7. Partial success → still 200 but include warnings ───────────────────
    return Response.json({
      ok: true,
      ...(! sheetOk     && { sheetWarning:     "Google Sheet write failed — data saved to CRM only" }),
      ...(!candidateOk  && { candidateWarning: `CRM save failed — data saved to Sheet only: ${candidateError}` }),
    });

  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}