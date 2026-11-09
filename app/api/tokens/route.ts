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

  if (result.status !== "ok") {
    return NextResponse.json(result, {
      status: result.status,
      headers: { "content-type": "application/problem+json" },
    })
  }

  return NextResponse.json({
    tokens: result.tokens,
  })
}
