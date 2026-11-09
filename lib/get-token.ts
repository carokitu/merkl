import { fetchToken } from "./merkl-api"
import { chainNames, toToken } from "./merkl-utils"
import { problem } from "./problem"
import type { TokenResult } from "./types"

export async function getToken(id: string): Promise<TokenResult> {
  const tokenId = id.trim()
  if (!tokenId) return problem(400, "Cet identifiant n'est pas valide.")

  try {
    const [body, names] = await Promise.all([fetchToken(tokenId), chainNames()])

    if (!body?.id) return problem(400, "Cet identifiant n'est pas valide.")

    return { status: "ok", token: toToken(body, names) }
  } catch {
    return problem(502, "Merkl ne répond pas.")
  }
}
