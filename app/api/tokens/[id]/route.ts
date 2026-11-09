import { NextResponse } from "next/server"
import { getToken } from "@/lib/get-token"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const result = await getToken(id)

  if (result.status !== "ok") {
    return NextResponse.json(result, {
      status: result.status,
      headers: { "content-type": "application/problem+json" },
    })
  }

  return NextResponse.json({
    token: result.token,
    fetchedAt: result.fetchedAt,
  })
}
