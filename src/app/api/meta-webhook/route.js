import { NextResponse } from "next/server";

/* =============================
   CONFIG (NO .env FILE)
============================= */
const APP_ID = "1623238388850388";
const APP_SECRET = "bb8958e4917622d943852a520fd2b4bb";
const ACCESS_TOKEN =
  "EAAXEU6ONntQBQLYKrM0TV0zZAFnIwwi7JftwRRQm8ydG6DBut9KHLYK0z6k7ZCN15qfgqZAuvaVciwcMrTV5hFu69uTP6TNnEwww2ype9jZAZAAxvBLpzjZAVnxhKpRyfdyL5KHcH8JBeL93zdmzqWHGVQJzicjXmHZAaB7Wm7h4GMNI7RBG2ILXZBtFU0fw0LUtI7wZD";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw32O4DEKgyhYzIfxOKN6ixbTt6onH_UnAj6JWjDAbTqjngPNCPIK3dmL14InsyY6iXbw/exec";

/* =============================
   HELPER FUNCTIONS
============================= */
async function isAccessTokenValid(token) {
  const url = `https://graph.facebook.com/v17.0/debug_token?input_token=${token}&access_token=${APP_ID}|${APP_SECRET}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.data?.is_valid === true;
}

async function fetchLeadData(leadgenId) {
  const url = `https://graph.facebook.com/v17.0/${leadgenId}?access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Graph API error");
  return res.json();
}

/* =============================
   WEBHOOK HANDLER
============================= */
export async function POST(req) {
  try {
    const body = await req.json();

    if (
      !body?.entry?.[0]?.changes?.[0]?.value?.leadgen_id
    ) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    const value = body.entry[0].changes[0].value;

    const leadgen_id = value.leadgen_id;
    const form_id = value.form_id || "";
    const page_id = value.page_id || "";
    const adgroup_id = value.adgroup_id || "";
    const ad_id = value.ad_id || "";

    /* =============================
       FETCH LEAD DETAILS
    ============================= */
    const leadData = await fetchLeadData(leadgen_id);

    const fields = {};
    let name = "",
      phone = "",
      locationField = "",
      concern = "",
      duration = "",
      previous_treatment = "",
      treatment_type = "",
      budget = "",
      timeline = "";

    if (Array.isArray(leadData.field_data)) {
      for (const field of leadData.field_data) {
        const key = field.name;
        const val = field.values?.[0] || "";
        fields[key] = val;

        if (key === "full_name") name = val;
        if (key === "phone_number") phone = val;
        if (key === "which_clinic_location_do_you_want_to_visit?")
          locationField = val;
        if (key === "what_concerns_you_the_most?") concern = val;
        if (key === "how_long_have_you_been_facing_hair_loss?")
          duration = val;
        if (key === "have_you_done_any_treatment_before?")
          previous_treatment = val;
        if (key === "what_is_your_preferred_treatment_type?")
          treatment_type = val;
        if (key === "budget_range?") budget = val;
        if (key === "when_are_you_planning_your_procedure?")
          timeline = val;
      }
    }

    /* =============================
       LOCATION LOGIC
    ============================= */
    let location = "Unknown";
    if (locationField) {
      location = locationField.trim();
      if (location.toLowerCase() === "hyederabad") location = "Hyderabad";
    } else {
      const map = {
        "1504033817524272": "Mumbai",
        "1159728446281802": "Mumbai",
        "703827772710890": "Delhi",
        "1432450741365477": "Mumbai",
        "1310915394045335": "Hyderabad",
        "1247154580786195": "Hyderabad",
      };
      location = map[form_id] || "Unknown";
    }

    /* =============================
       TIME CONVERSION (UTC → IST)
    ============================= */
    let created_time = leadData.created_time;
    try {
      created_time = new Date(leadData.created_time).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
    } catch {}

    /* =============================
       FINAL DATA
    ============================= */
    const finalData = {
      lead_id: leadData.id,
      created_time,
      location,
      form_id,
      page_id,
      adgroup_id,
      ad_id,
      name,
      phone,
      concern,
      duration,
      previous_treatment,
      treatment_type,
      budget,
      timeline,
      fields,
    };

    /* =============================
       SEND TO GOOGLE SHEET
    ============================= */
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      data: finalData,
    });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
