import type { Problem } from "./types"

export function problem(status: number, detail: string): Problem {
  if (status === 404) return { type: "/errors/not-found", title: "Not Found", status, detail }
  if (status >= 500) return { type: "/errors/bad-gateway", title: "Bad Gateway", status: 502, detail }
  return { type: "/errors/bad-request", title: "Bad Request", status: 400, detail }
}

export async function problemFrom(response: Response): Promise<Problem> {
  try {
    const body = (await response.json()) as Partial<Problem>

    if (
      typeof body.type === "string" &&
      typeof body.title === "string" &&
      typeof body.status === "number" &&
      typeof body.detail === "string"
    ) {
      return {
        type: body.type,
        title: body.title,
        status: body.status,
        detail: body.detail,
        ...(typeof body.instance === "string" ? { instance: body.instance } : {}),
        ...(body.errors !== undefined ? { errors: body.errors } : {}),
      }
    }
  } catch {
    return problem(response.status, "Merkl ne répond pas.")
  }

  return problem(response.status, "Merkl ne répond pas.")
}
