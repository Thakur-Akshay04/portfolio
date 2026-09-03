import { NextRequest, NextResponse } from "next/server";
import { queryRag } from "@/lib/rag/engine";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") || "";

  const response = queryRag(q);
  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const q = body.query || body.q || "";
    const response = queryRag(q);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Invalid JSON request" }, { status: 400 });
  }
}
