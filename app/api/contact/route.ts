import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 * Forwards submissions to CONTACT_WEBHOOK_URL (Formspree, Make, n8n, your own server…).
 * If that variable isn't set, it replies 503 so the form can explain itself.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "");

  // Bots fill the hidden field — pretend it worked and drop it.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message || message.length > 5000 || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message, source: "derfive-contact-form" }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] forwarding failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
