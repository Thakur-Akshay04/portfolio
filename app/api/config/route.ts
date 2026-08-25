import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const email =
    process.env.NEXT_PUBLIC_PERSONAL_EMAIL ||
    process.env.PERSONAL_EMAIL ||
    "";
  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL ||
    process.env.GITHUB_URL ||
    "";
  const linkedinUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    process.env.LINKEDIN_URL ||
    "";
  const resumeUrl =
    process.env.NEXT_PUBLIC_RESUME_URL ||
    process.env.RESUME_URL ||
    "";

  return NextResponse.json(
    {
      email,
      githubUrl,
      linkedinUrl,
      resumeUrl,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
