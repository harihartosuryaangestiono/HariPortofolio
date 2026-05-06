import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Name must be at least 2 characters." },
        { status: 400 },
      );
    }
    if (!email.includes("@") || email.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 },
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    // Production-ready hook:
    // - integrate with Resend/SendGrid, or store into a DB, etc.
    // Keeping this lightweight + Vercel-friendly by default.
    console.log("[contact]", { name, email, messageLength: message.length });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }
}

