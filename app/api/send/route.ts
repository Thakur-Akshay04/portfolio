import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiter store
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitStore = new Map<string, RateLimitRecord>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_LIMIT = 3; // Max 3 emails per window

// Helper to escape HTML tags to prevent HTML Injection in emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured (missing API key)." },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);

    // 1. IP-based Rate Limiter Check
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const currentTime = Date.now();

    let record = rateLimitStore.get(ip);

    if (!record) {
      record = { count: 1, resetTime: currentTime + RATE_LIMIT_WINDOW_MS };
      rateLimitStore.set(ip, record);
    } else {
      if (currentTime > record.resetTime) {
        // Reset window
        record.count = 1;
        record.resetTime = currentTime + RATE_LIMIT_WINDOW_MS;
      } else {
        record.count += 1;
      }
    }

    if (record.count > MAX_LIMIT) {
      return NextResponse.json(
        { error: "Too many requests. Please try again after 10 minutes." },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Sanitize inputs to prevent HTML injection in the email
    const cleanName = escapeHtml(name.trim());
    const cleanEmail = escapeHtml(email.trim());
    const cleanSubject = escapeHtml(subject.trim());
    const cleanMessage = escapeHtml(message.trim());

    // 4. Send email
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.PERSONAL_EMAIL || process.env.NEXT_PUBLIC_PERSONAL_EMAIL || ""],
      replyTo: cleanEmail,
      subject: `New Portfolio Message: ${cleanSubject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Subject:</strong> ${cleanSubject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${cleanMessage}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
