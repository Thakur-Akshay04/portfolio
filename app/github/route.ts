import { getResolvedConfig } from "@/lib/server-config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { githubUrl } = await getResolvedConfig();

  if (githubUrl) {
    return new Response(null, {
      status: 307,
      headers: {
        Location: githubUrl,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }

  const url = new URL(request.url);
  return new Response(null, {
    status: 307,
    headers: {
      Location: `${url.origin}/`,
    },
  });
}
