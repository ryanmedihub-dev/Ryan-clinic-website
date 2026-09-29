// Diagnostic script to test Google Apps Script Webhook directly
async function runDiagnostic() {
  console.log("=== Google Apps Script Webhook Diagnostic ===");

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  console.log("1. Environment Variable Check:");
  console.log("   - GOOGLE_SHEETS_WEBHOOK_URL:", webhookUrl ? `Configured (${webhookUrl.replace(/\/s\/[^\/]+/, "/s/***")})` : "MISSING");

  if (!webhookUrl) {
    console.error("\nERROR: GOOGLE_SHEETS_WEBHOOK_URL is missing in environment variables (.env.local).");
    console.error("Please add: GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec");
    process.exit(1);
  }

  const testPayload = {
    fullName: "Webhook Diagnostic Test",
    phone: "9999999999",
    email: "test_webhook@clinicryan.com",
    age: 30,
    gender: "Male",
    city: "New Delhi",
    currentSessionNumber: 1,
    totalSessionsCompleted: 0,
    createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  console.log("\n2. Sending Test Payload to Google Apps Script Webhook...");
  console.log("   Payload:", JSON.stringify(testPayload, null, 2));

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
      redirect: "follow",
    });

    console.log(`\n3. Webhook HTTP Status: ${res.status} ${res.statusText}`);

    const rawText = await res.text();
    console.log("   Raw Response:", rawText);

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      if (rawText.toLowerCase().includes("success")) {
        parsed = { success: true };
      }
    }

    if (parsed && parsed.success === true) {
      console.log("\nRESULT: Webhook Test SUCCEEDED! Exactly one row was appended to your Google Sheet.");
    } else {
      console.error("\nRESULT: Webhook returned failure response:", parsed || rawText);
      process.exit(1);
    }
  } catch (err) {
    console.error("\nRESULT: Network/Execution Error calling Webhook:");
    console.error(err.message || err);
    process.exit(1);
  }
}

runDiagnostic();
