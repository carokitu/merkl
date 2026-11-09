import { ITEMS_PER_PAGE } from "./constants"
import { chainNames, MERKL_API_URL, toToken, type MerklToken } from "./merkl"
import { problem, problemFrom } from "./problem"
import type { Filters, ListResult } from "./types"

function toMerklUrl(filters: Filters) {
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

  const url = new URL(MERKL_API_URL)

  url.searchParams.set("page", String(page))
  url.searchParams.set("items", String(items))
  if (verified === "true") url.searchParams.set("verified", "true")
  if (chainId) url.searchParams.set("chainId", chainId)
  if (search) url.searchParams.set("search", search)

  return url
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
  const url = toMerklUrl(filters)

  if (!url) return problem(400, "Un ou plusieurs filtres ne sont pas valides.")

  try {
    const [response, names] = await Promise.all([fetch(url), chainNames()])
    const fetchedAt = new Date().toISOString()

    if (!response.ok) return problemFrom(response)

    const body = (await response.json()) as MerklToken[]

    if (!Array.isArray(body)) return problem(400, "Un ou plusieurs filtres ne sont pas valides.")

    return {
      status: "ok",
      fetchedAt,
      tokens: body.map((token) => toToken(token, names)),
    }
  } catch {
    return problem(502, "Merkl ne répond pas.")
  }
}
