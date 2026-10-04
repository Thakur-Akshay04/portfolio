import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

// Helpers to resolve URLs cleanly
function resolveGithubUrl(raw: string): string {
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("github.com/")) return `https://${raw}`;
  return `https://github.com/${raw.replace(/^@/, "")}`;
}

function resolveLinkedinUrl(raw: string): string {
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("linkedin.com/")) return `https://${raw}`;
  if (raw.startsWith("in/")) return `https://linkedin.com/${raw}`;
  return `https://linkedin.com/in/${raw}`;
}

function resolveResumeUrl(raw: string): string {
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

function getFirstValid(cfEnv: Record<string, string | undefined>, keys: string[]): string {
  for (const key of keys) {
    const val = cfEnv[key] || process.env[key];
    if (val && typeof val === "string" && val.trim().length > 0) {
      return val.trim();
    }
  }
  return "";
}

export async function GET() {
  let cfEnv: Record<string, string | undefined> = {};
  try {
    const ctx = await getCloudflareContext({ async: true });
    if (ctx?.env) {
      cfEnv = ctx.env as Record<string, string | undefined>;
    }
  } catch {
    // Fallback when running outside Cloudflare Worker environment
  }

  // 1. Email Resolution
  const email = getFirstValid(cfEnv, [
    "NEXT_PUBLIC_PERSONAL_EMAIL",
    "PERSONAL_EMAIL",
    "NEXT_PUBLIC_EMAIL",
    "EMAIL",
    "CONTACT_EMAIL",
    "TO_EMAIL",
  ]);

  // 2. GitHub Profile / ID Resolution
  const rawGithub = getFirstValid(cfEnv, [
    "NEXT_PUBLIC_GITHUB_URL",
    "GITHUB_URL",
    "NEXT_PUBLIC_GITHUB",
    "GITHUB",
    "NEXT_PUBLIC_GITHUB_USERNAME",
    "GITHUB_USERNAME",
    "NEXT_PUBLIC_GITHUB_ID",
    "GITHUB_ID",
  ]);
  const githubUrl = resolveGithubUrl(rawGithub);

  // 3. LinkedIn Profile / ID Resolution
  const rawLinkedin = getFirstValid(cfEnv, [
    "NEXT_PUBLIC_LINKEDIN_URL",
    "LINKEDIN_URL",
    "NEXT_PUBLIC_LINKEDIN",
    "LINKEDIN",
    "NEXT_PUBLIC_LINKEDIN_PROFILE",
    "LINKEDIN_PROFILE",
    "NEXT_PUBLIC_LINKEDIN_ID",
    "LINKEDIN_ID",
  ]);
  const linkedinUrl = resolveLinkedinUrl(rawLinkedin);

  // 4. Resume URL Resolution
  const rawResume = getFirstValid(cfEnv, [
    "NEXT_PUBLIC_RESUME_URL",
    "RESUME_URL",
    "NEXT_PUBLIC_RESUME_LINK",
    "RESUME_LINK",
    "NEXT_PUBLIC_RESUME",
    "RESUME",
    "CV_URL",
    "CV",
  ]);
  const resumeUrl = resolveResumeUrl(rawResume);

  return NextResponse.json(
    {
      email,
      githubUrl,
      linkedinUrl,
      resumeUrl,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
