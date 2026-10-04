import { NextResponse } from "next/server";
import { getResolvedConfig } from "@/lib/server-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getResolvedConfig();

  return NextResponse.json(config, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
