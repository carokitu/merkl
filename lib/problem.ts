import type { Problem } from "./types"

export function problem(status: number, detail: string): Problem {
  if (status >= 500) return { type: "/errors/bad-gateway", title: "Bad Gateway", status: 502, detail }
  return { type: "/errors/bad-request", title: "Bad Request", status: 400, detail }
}
