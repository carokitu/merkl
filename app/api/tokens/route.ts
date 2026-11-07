import { NextRequest, NextResponse } from "next/server"
import { listTokens } from "@/lib/list-tokens"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const result = await listTokens({
    page: searchParams.get("page") ?? undefined,
    items: searchParams.get("items") ?? undefined,
    chainId: searchParams.get("chainId") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    verified: searchParams.get("verified") ?? undefined,
  })

  if (result.status === "invalid") {
    return NextResponse.json({ error: "Un ou plusieurs filtres ne sont pas valides." }, { status: 400 })
  }

  if (result.status === "unavailable") {
    return NextResponse.json({ error: "Merkl ne répond pas." }, { status: 502 })
  }

  return NextResponse.json({
    tokens: result.tokens,
    fetchedAt: result.fetchedAt,
  })
}
