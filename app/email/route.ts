import { getResolvedConfig } from "@/lib/server-config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { email } = await getResolvedConfig();

  if (email) {
    return new Response(null, {
      status: 307,
      headers: {
        Location: `mailto:${email}`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }

  const url = new URL(request.url);
  return new Response(null, {
    status: 307,
    headers: {
      Location: `${url.origin}/contact`,
    },
  });
}
