import Leads from "@/models/leads";
import { withDB } from "@/lib/withDB";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw2QjldFW8b4vtfVF0HUJ2rp2rU-1L2590V6nS7zCqbUy5UjhS3japJAU5gdmhN7e3q/exec";

const handler = async (req) => {
  try {
    const body = await req.json();



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
