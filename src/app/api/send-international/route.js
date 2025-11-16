export async function POST(req) {
  try {
    const body = await req.json();


    // ✅ Send to Google Sheets
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwXmhraJdZ5pZE-CrzkIC-gi1CMK4biJ_h1J2o1w4fahUhRDuAhCVsYuCl-wsUtxyTO/exec",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Google Script error");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending to Google Sheet:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
