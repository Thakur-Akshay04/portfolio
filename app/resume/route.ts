import { getResolvedConfig } from "@/lib/server-config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { resumeUrl } = await getResolvedConfig();

  if (resumeUrl) {
    return new Response(null, {
      status: 307,
      headers: {
        Location: resumeUrl,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }

  // Fallback if no resume URL configured
  const url = new URL(request.url);
  return new Response(null, {
    status: 307,
    headers: {
      Location: `${url.origin}/#about`,
    },
  });
}
