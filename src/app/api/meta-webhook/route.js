import { NextResponse } from 'next/server';

const VERIFY_TOKEN = '123456';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

/**
 * This will handle POST requests later
 * (lead data will come here)
 */
export async function POST(request) {
  const body = await request.json();

  console.log('META WEBHOOK DATA:', JSON.stringify(body, null, 2));

  return NextResponse.json({ success: true });
}
