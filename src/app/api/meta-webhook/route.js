import { NextResponse } from "next/server";

const VERIFY_TOKEN = "123456";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const hub_mode = searchParams.get("hub_mode");
  const hub_verify_token = searchParams.get("hub_verify_token");
  const hub_challenge = searchParams.get("hub_challenge");

  if (
    hub_mode === "subscribe" &&
    hub_verify_token === VERIFY_TOKEN
  ) {
    return new NextResponse(hub_challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}
