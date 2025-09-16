export async function POST(req) {
  const body = await req.json();


  console.log(body)


  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzL0pXNsK0jSc4IKYK_TtiP2CV2nJEadA7LnOrBxqPLNUztZ9jH7DToTSMi4NElzZxW_Q/exec", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });



    if (!response.ok) {
      throw new Error("Google Script error");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending to Google Sheet:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
