import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export async function GET() {
  let cfEnv: Record<string, string | undefined> = {};
  try {
    const ctx = await getCloudflareContext({ async: true });
    if (ctx && ctx.env) {
      cfEnv = ctx.env as Record<string, string | undefined>;
    }
  } catch {
    // Fallback when running outside Cloudflare Worker environment
  }

  const email = (
    cfEnv.NEXT_PUBLIC_PERSONAL_EMAIL ||
    cfEnv.PERSONAL_EMAIL ||
    process.env.NEXT_PUBLIC_PERSONAL_EMAIL ||
    process.env.PERSONAL_EMAIL ||
    ""
  ).trim();

  const githubUrl = (
    cfEnv.NEXT_PUBLIC_GITHUB_URL ||
    cfEnv.GITHUB_URL ||
    process.env.NEXT_PUBLIC_GITHUB_URL ||
    process.env.GITHUB_URL ||
    ""
  ).trim();

  const linkedinUrl = (
    cfEnv.NEXT_PUBLIC_LINKEDIN_URL ||
    cfEnv.LINKEDIN_URL ||
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    process.env.LINKEDIN_URL ||
    ""
  ).trim();

  const resumeUrl = (
    cfEnv.NEXT_PUBLIC_RESUME_URL ||
    cfEnv.RESUME_URL ||
    process.env.NEXT_PUBLIC_RESUME_URL ||
    process.env.RESUME_URL ||
    ""
  ).trim();

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
