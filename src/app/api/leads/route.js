import Leads from "@/models/leads";
import { withDB } from "@/lib/withDB";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbySTrYSm42Pz8tglWfDWoLTeAp5dLnWosdarSTTs-qAyPxRDHaXbgGkrubjiXlNB34X/exec";

const handler = async (req) => {
  try {
    const body = await req.json();


    // ✅ Validate phone number (10 digits only)
    // if (!/^\d{10}$/.test(body.phone)) {
    //   return new Response(
    //     JSON.stringify({
    //       success: false,
    //       message: "Phone number must be exactly 10 digits",
    //     }),
    //     { status: 400 }
    //   );
    // }

    // ✅ Save to DB (allow duplicates now)
    const newLead = await Leads.create(body);

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => console.log("✅ Lead also sent to Google Sheets"))
      .catch((err) =>
        console.error("⚠️ Failed to send lead to Google Sheets:", err)
      );

    return new Response(
      JSON.stringify({ success: true, data: newLead }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Server Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
