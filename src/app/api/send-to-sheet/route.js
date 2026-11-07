import { captureLead } from "@/lib/leads";

export async function POST(req) {
  const { name, phone, email, visitDate, visit, location, remarks } = await req.json();

  if (!name || !phone) {
    return Response.json(
      { success: false, error: "Name and phone are required" },
      { status: 400 }
    );
  }

  const result = await captureLead({
    name,
    phone,
    email,
    location,
    visitDate: visitDate || undefined,
    visitPlan: visit,
    remarks,
    tag: "Form Leads",
    source: "send-to-sheet",
  });

  const ok = result.saved || result.sent;
  return Response.json({ success: ok, ...result }, { status: ok ? 200 : 500 });
}
