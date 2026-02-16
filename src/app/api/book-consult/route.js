export async function POST(req) {
  try {
    const body = await req.json();
    
    console.log("📤 Sending data to Google Sheets:", body);

    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwd7YvpHm8oMKmigUW5dmIv2EF9824Tg9pXhnw1i0oXf-APkiF6CFWmB3kjk_niUlnD/exec";

    // ✅ Send to Google Sheets
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { 
        "Content-Type": "application/json",
      },
      redirect: "follow", // ✅ Important: Google Scripts often redirect
    });

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("❌ Failed to parse response as JSON:", parseError);
      throw new Error(`Invalid response from Google Script: ${responseText.substring(0, 100)}`);
    }

    if (!response.ok || !result.success) {
      throw new Error(result.error || `Google Script returned status ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error sending to Google Sheet:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}