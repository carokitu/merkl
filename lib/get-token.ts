import { chainNames, MERKL_API_URL, toToken, type MerklToken } from "./merkl"
import { problem, problemFrom } from "./problem"
import type { TokenResult } from "./types"

export async function getToken(id: string): Promise<TokenResult> {
  const tokenId = id.trim()
  if (!tokenId) return problem(400, "Cet identifiant n'est pas valide.")

  try {
    const [response, names] = await Promise.all([
      fetch(`${MERKL_API_URL}/${encodeURIComponent(tokenId)}`),
      chainNames(),
    ])
    const fetchedAt = new Date().toISOString()

    if (!response.ok) return problemFrom(response)

    const body = (await response.json()) as MerklToken
    if (!body?.id) return problem(400, "Cet identifiant n'est pas valide.")

    return { status: "ok", fetchedAt, token: toToken(body, names) }
  } catch {
    return problem(502, "Merkl ne répond pas.")
  }
}
