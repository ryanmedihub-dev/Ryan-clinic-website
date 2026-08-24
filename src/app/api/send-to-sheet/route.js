export async function POST(req) {
  const body = await req.json();

  const { name, phone, email, visitDate, visit, location, remarks } = body;

  const crmPayload = {
    name,
    phone,
    email,
    location,
    visitDate: visitDate || undefined,
    visitPlan: visit,
    remarks,
    tag: "Form Leads",
  };
  
  

  try {
    const response = await fetch("https://www.ryanmedihub.com/api/leads/create", {
      method: "POST",
      body: JSON.stringify(crmPayload),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "CRM API error");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending to Ryan CRM:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}