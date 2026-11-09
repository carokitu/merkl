import { ITEMS_PER_PAGE } from "./constants"
import { fetchTokens } from "./merkl-api"
import { chainNames, toToken } from "./merkl-utils"
import { problem } from "./problem"
import type { Filters, ListResult } from "./types"

function toMerklParams(filters: Filters) {
  const page = parseInteger(filters.page ?? null, 0)
  const items = parseInteger(filters.items ?? null, ITEMS_PER_PAGE, 1, 1000)
  const search = filters.search?.trim() ?? ""
  const chainId = filters.chainId?.trim() ?? ""
  const verified = filters.verified?.trim() ?? ""

  if (
    page === null ||
    items === null ||
    (chainId !== "" && parseInteger(chainId, null, 0) === null)
  ) {
    return null
  }

  const params = new URLSearchParams()

  params.set("page", String(page))
  params.set("items", String(items))
  if (verified === "true") params.set("verified", "true")
  if (chainId) params.set("chainId", chainId)
  if (search) params.set("search", search)

  return params
}

function parseInteger(
  value: string | null,
  defaultValue: number | null,
  min = 0,
  max = 1_000_000,
) {
  if (value === null || value === "") return defaultValue

  const parsed = Number(value)

  if (!Number.isSafeInteger(parsed) || parsed < min) return null
  if (max && parsed > max) return max

  return parsed
}

export async function listTokens(filters: Filters): Promise<ListResult> {
  const params = toMerklParams(filters)

  if (!params) return problem(400, "Un ou plusieurs filtres ne sont pas valides.")

  try {
    const [body, names] = await Promise.all([fetchTokens(params), chainNames()])

    if (!Array.isArray(body)) return problem(400, "Un ou plusieurs filtres ne sont pas valides.")

    return {
      status: "ok",
      tokens: body.map((token) => toToken(token, names)),
    }
  } catch {
    return problem(502, "Merkl ne répond pas.")
  }
}
