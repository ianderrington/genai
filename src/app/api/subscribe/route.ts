import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();

  // Resend audience list
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    const res = await fetch('https://api.resend.com/audiences/' + process.env.RESEND_AUDIENCE_ID + '/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: normalized }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('[subscribe] resend error', res.status, err);
      return NextResponse.json({ error: 'subscription failed' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  // Buttondown
  if (process.env.BUTTONDOWN_API_KEY) {
    const res = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: normalized }),
    });
    if (!res.ok && res.status !== 409 /* already subscribed */) {
      const err = await res.text();
      console.error('[subscribe] buttondown error', res.status, err);
      return NextResponse.json({ error: 'subscription failed' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  // No provider configured — log and accept gracefully so the UI works during dev
  console.log('[subscribe] no provider configured, email:', normalized);
  return NextResponse.json({ ok: true });
}
