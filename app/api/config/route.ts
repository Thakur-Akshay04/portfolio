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

  let githubUrl = "";
  if (rawGithub) {
    if (rawGithub.startsWith("http://") || rawGithub.startsWith("https://")) {
      githubUrl = rawGithub;
    } else if (rawGithub.startsWith("github.com/")) {
      githubUrl = `https://${rawGithub}`;
    } else {
      githubUrl = `https://github.com/${rawGithub.replace(/^@/, "")}`;
    }
  }

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

  let linkedinUrl = "";
  if (rawLinkedin) {
    if (rawLinkedin.startsWith("http://") || rawLinkedin.startsWith("https://")) {
      linkedinUrl = rawLinkedin;
    } else if (rawLinkedin.startsWith("linkedin.com/")) {
      linkedinUrl = `https://${rawLinkedin}`;
    } else if (rawLinkedin.startsWith("in/")) {
      linkedinUrl = `https://linkedin.com/${rawLinkedin}`;
    } else {
      linkedinUrl = `https://linkedin.com/in/${rawLinkedin}`;
    }
  }

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

  let resumeUrl = "";
  if (rawResume) {
    if (rawResume.startsWith("http://") || rawResume.startsWith("https://")) {
      resumeUrl = rawResume;
    } else {
      resumeUrl = `https://${rawResume}`;
    }
  }

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
