/**
 * Dispatches PRP submission data to the configured Google Apps Script Web App webhook.
 *
 * Payload structure:
 * {
 *   fullName,
 *   phone,
 *   email,
 *   age,
 *   gender,
 *   city,
 *   currentSessionNumber,
 *   totalSessionsCompleted,
 *   createdAt
 * }
 *
 * Expects Google Apps Script to return: { success: true }
 *
 * @param {Object} data - Patient and PRP submission data
 * @returns {Promise<Object>} The parsed Apps Script JSON response
 */
export async function appendPRPToGoogleSheet(data) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("==================== GOOGLE SHEETS WEBHOOK ERROR ====================");
    console.error("HTTP Status        : 500 (Configuration Error)");
    console.error("Error Code         : MISSING_WEBHOOK_URL");
    console.error("Error Message      : GOOGLE_SHEETS_WEBHOOK_URL environment variable is not defined.");
    console.error("=====================================================================");

    const err = new Error("GOOGLE_SHEETS_WEBHOOK_URL environment variable is not defined.");
    err.code = "MISSING_WEBHOOK_URL";
    throw err;
  }

  // Clean, readable timestamp formatted for Asia/Kolkata
  const createdAtFormatted = data.createdAt
    ? new Date(data.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const payload = {
    fullName: String(data.fullName || "").trim(),
    phone: String(data.phone || "").trim(),
    email: data.email ? String(data.email).trim().toLowerCase() : "",
    age: Number(data.age),
    gender: data.gender,
    city: String(data.city || "").trim(),
    currentSessionNumber: Number(data.currentSessionNumber),
    totalSessionsCompleted: Number(data.totalSessionsCompleted),
    createdAt: createdAtFormatted,
    date: createdAtFormatted, // fallback alias if Apps Script reads date
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) {
      throw new Error(`Google Apps Script responded with HTTP status ${res.status}`);
    }

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      // If Apps Script returns raw text e.g. "Success" or HTML error
      if (text.toLowerCase().includes("success")) {
        json = { success: true };
      } else {
        throw new Error(`Invalid JSON response from Google Apps Script: ${text.slice(0, 100)}`);
      }
    }

    if (!json || json.success !== true) {
      const errMsg = json?.error || json?.message || "Google Apps Script indicated failure (success: false)";
      throw new Error(errMsg);
    }

    return json;
  } catch (error) {
    console.error("==================== GOOGLE SHEETS WEBHOOK ERROR ====================");
    console.error("Webhook URL        :", webhookUrl ? webhookUrl.replace(/\/s\/[^\/]+/, "/s/***") : "NOT SET");
    console.error("Error Message      :", error?.message || "Unknown error");
    console.error("=====================================================================");
    throw error;
  }
}
