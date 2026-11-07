import { captureLead } from "@/lib/leads";

export async function POST(req) {
  const { name, phone, email, location, service, message } = await req.json();

  if (!name || !phone) {
    return Response.json(
      { success: false, error: "Name and phone are required" },
      { status: 400 }
    );
  }

  const remarks = [service && `Service: ${service}`, message && `Message: ${message}`]
    .filter(Boolean)
    .join(" | ");

  const result = await captureLead({
    name,
    phone,
    email,
    location,
    remarks,
    tag: "Google Leads",
    serviceType: service,
    message,
    source: "google-leads",
  });

  const ok = result.saved || result.sent;
  return Response.json({ success: ok, ...result }, { status: ok ? 200 : 500 });
}
