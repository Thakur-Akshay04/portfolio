import { NextResponse } from "next/server";
import { Resend } from "resend";
import dns from "dns/promises";

import disposableDomains from "disposable-email-domains";
const DISPOSABLE_EMAIL_DOMAINS = new Set(disposableDomains as string[]);

/**
 * Validates that the email domain has valid MX (Mail Exchange) records.
 * Returns { valid: true } if the domain can receive email,
 * or { valid: false, reason: string } if it cannot.
 */
async function validateEmailDomain(email: string): Promise<{ valid: boolean; reason?: string }> {
  const domain = email.split("@")[1]?.toLowerCase();

  if (!domain) {
    return { valid: false, reason: "Invalid email format." };
  }

  // Check disposable email blocklist (exact match + subdomain match)
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, reason: "Disposable or temporary email addresses are not allowed." };
  }
  // Also catch subdomains like "random123.guerrillamail.com"
  const domainParts = domain.split(".");
  for (let i = 1; i < domainParts.length - 1; i++) {
    const parentDomain = domainParts.slice(i).join(".");
    if (DISPOSABLE_EMAIL_DOMAINS.has(parentDomain)) {
      return { valid: false, reason: "Disposable or temporary email addresses are not allowed." };
    }
  }

  try {
    const mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { valid: false, reason: "This email domain cannot receive mail. Please use a valid email address." };
    }
    return { valid: true };
  } catch {
    // DNS lookup failed — domain doesn't exist or has no MX records
    return { valid: false, reason: "This email domain does not exist. Please check for typos." };
  }
}

// Simple in-memory rate limiter store
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitStore = new Map<string, RateLimitRecord>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
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

import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let cfEnv: Record<string, string | undefined> = {};
    try {
      const ctx = await getCloudflareContext({ async: true });
      if (ctx && ctx.env) {
        cfEnv = ctx.env as Record<string, string | undefined>;
      }
    } catch {
      // Fallback for non-worker environments
    }

    const apiKey = cfEnv.RESEND_API_KEY || process.env.RESEND_API_KEY;
    const recipientEmail =
      cfEnv.PERSONAL_EMAIL ||
      cfEnv.NEXT_PUBLIC_PERSONAL_EMAIL ||
      process.env.PERSONAL_EMAIL ||
      process.env.NEXT_PUBLIC_PERSONAL_EMAIL ||
      "";

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
        { error: "Too many requests. Please try again after 15 minutes." },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json().catch(() => ({}));
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2.5. Validate email domain (DNS MX record check + disposable email block)
    const emailValidation = await validateEmailDomain(email.trim());
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.reason },
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
      to: [recipientEmail],
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
