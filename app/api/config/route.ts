import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

// Helpers to reduce cognitive complexity (SonarCloud)
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
  const email = (
    cfEnv.PERSONAL_EMAIL ||
    cfEnv.NEXT_PUBLIC_PERSONAL_EMAIL ||
    cfEnv.EMAIL ||
    cfEnv.NEXT_PUBLIC_EMAIL ||
    process.env.PERSONAL_EMAIL ||
    process.env.NEXT_PUBLIC_PERSONAL_EMAIL ||
    process.env.EMAIL ||
    process.env.NEXT_PUBLIC_EMAIL ||
    ""
  ).trim();

  // 2. GitHub Profile / ID Resolution
  const rawGithub = (
    cfEnv.GITHUB_URL ||
    cfEnv.NEXT_PUBLIC_GITHUB_URL ||
    cfEnv.GITHUB_ID ||
    cfEnv.NEXT_PUBLIC_GITHUB_ID ||
    cfEnv.GITHUB_USERNAME ||
    cfEnv.NEXT_PUBLIC_GITHUB_USERNAME ||
    process.env.GITHUB_URL ||
    process.env.NEXT_PUBLIC_GITHUB_URL ||
    process.env.GITHUB_ID ||
    process.env.NEXT_PUBLIC_GITHUB_ID ||
    process.env.GITHUB_USERNAME ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    ""
  ).trim();

  const githubUrl = resolveGithubUrl(rawGithub);

  // 3. LinkedIn Profile / ID Resolution
  const rawLinkedin = (
    cfEnv.LINKEDIN_URL ||
    cfEnv.NEXT_PUBLIC_LINKEDIN_URL ||
    cfEnv.LINKEDIN_ID ||
    cfEnv.NEXT_PUBLIC_LINKEDIN_ID ||
    cfEnv.LINKEDIN_PROFILE ||
    cfEnv.NEXT_PUBLIC_LINKEDIN_PROFILE ||
    process.env.LINKEDIN_URL ||
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    process.env.LINKEDIN_ID ||
    process.env.NEXT_PUBLIC_LINKEDIN_ID ||
    process.env.LINKEDIN_PROFILE ||
    process.env.NEXT_PUBLIC_LINKEDIN_PROFILE ||
    ""
  ).trim();

  const linkedinUrl = resolveLinkedinUrl(rawLinkedin);

  // 4. Resume URL Resolution
  const rawResume = (
    cfEnv.RESUME_URL ||
    cfEnv.NEXT_PUBLIC_RESUME_URL ||
    cfEnv.RESUME ||
    process.env.RESUME_URL ||
    process.env.NEXT_PUBLIC_RESUME_URL ||
    process.env.RESUME ||
    ""
  ).trim();

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
