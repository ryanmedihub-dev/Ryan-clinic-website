import { DBConnection } from "./db";
import Leads from "@/models/leads";

const CRM_URL = "https://www.ryanmedihub.com/api/leads/create";

async function saveLocal(lead) {
  await DBConnection();
  return Leads.create(lead);
}

export async function sendToCrm({ name, phone, email, location, visitPlan, visitDate, remarks, tag }) {
  const res = await fetch(CRM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.LEADS_API_KEY || "",
    },
    body: JSON.stringify({ name, phone, email, location, visitPlan, visitDate, remarks, tag }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `CRM responded ${res.status}`);
  return data;
}

/**
 * Save the lead locally and push it to the CRM independently.
 * A CRM outage/bad API key never loses the lead; a DB outage never blocks the CRM.
 * Returns { saved, sent } — caller treats either one as a captured lead.
 */
export async function captureLead(lead) {
  const [db, crm] = await Promise.allSettled([saveLocal(lead), sendToCrm(lead)]);

  if (db.status === "rejected") {
    console.error("❌ Lead NOT saved to DB:", db.reason?.message, lead);
  }
  if (crm.status === "rejected") {
    console.error("❌ Lead NOT sent to CRM:", crm.reason?.message);
  }

  if (db.status === "fulfilled") {
    await Leads.updateOne(
      { _id: db.value._id },
      crm.status === "fulfilled"
        ? { crmStatus: "sent" }
        : { crmStatus: "failed", crmError: String(crm.reason?.message || "").slice(0, 300) }
    ).catch((e) => console.error("crmStatus update failed:", e.message));
  }

  return { saved: db.status === "fulfilled", sent: crm.status === "fulfilled" };
}

/**
 * Re-push one already-stored lead to the CRM (admin action for failed/pending rows).
 * Never throws: the outcome is written back onto the lead.
 */
export async function resendLead(id) {
  await DBConnection();
  const lead = await Leads.findById(id).lean();
  if (!lead) return { sent: false, error: "Lead not found" };

  try {
    await sendToCrm(lead);
    await Leads.updateOne({ _id: id }, { crmStatus: "sent", crmError: "" });
    return { sent: true };
  } catch (e) {
    const error = String(e?.message || "").slice(0, 300);
    await Leads.updateOne({ _id: id }, { crmStatus: "failed", crmError: error });
    console.error("Lead resend failed:", error);
    return { sent: false, error };
  }
}
