import { NextResponse } from "next/server";

type ContactPayload = { name?: string; email?: string; message?: string };

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  // TODO: send an email to Yessenia (Resend) and save the lead to the leads system.
  console.log("[contact] new message", { name, email, length: message.length });

  return NextResponse.json({ ok: true });
}
