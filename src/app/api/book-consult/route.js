import { captureLead } from "@/lib/leads";

export async function POST(req) {
  const { name, phone, email, date, visit, city, notes } = await req.json();

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
    location: city,
    visitDate: date || undefined,
    visitPlan: visit,
    remarks: notes || "",
    tag: "Form Leads",
    source: "book-consult",
  });

  const ok = result.saved || result.sent;
  return Response.json({ success: ok, ...result }, { status: ok ? 200 : 500 });
}
