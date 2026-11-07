import type { Token, Filters, ListResult } from "./types"

const MERKL_API_URL = "https://api.merkl.xyz/v4/tokens"

type MerklToken = {
  id: string
  name?: string | null
  chainId: number
  symbol: string
  displaySymbol?: string
  verified: boolean
  price?: number | null
}

function toMerklUrl(filters: Filters) {
  const page = parseInteger(filters.page ?? null, 0)
  const items = parseInteger(filters.items ?? null, 20, 1, 1000)
  const search = filters.search?.trim() ?? ""
  const chainId = filters.chainId?.trim() ?? ""
  const verified = filters.verified?.trim() ?? ""
  const verifiedIsValid = verified === "true" || verified === "false"

  if (
    page === null ||
    items === null ||
    (verified !== "" && !verifiedIsValid) ||
    (chainId !== "" && parseInteger(chainId, null, 0) === null)
  ) {
    return null
  }

  const url = new URL(MERKL_API_URL)

  url.searchParams.set("page", String(page))
  url.searchParams.set("items", String(items))
  if (verifiedIsValid) url.searchParams.set("verified", verified)
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

function toToken(token: MerklToken): Token {
  return {
    id: token.id,
    name: token.name ?? null,
    chainId: token.chainId,
    symbol: token.symbol,
    displaySymbol: token.displaySymbol,
    verified: token.verified,
    price: token.price ?? null,
  }
}

export async function listTokens(filters: Filters): Promise<ListResult> {
  const url = toMerklUrl(filters)

  if (!url) return { status: "invalid" }

  
  try {
    const response = await fetch(url)
    const fetchedAt = new Date().toISOString()

    if (response.status >= 400 && response.status < 500) return { status: "invalid" }
    if (!response.ok) return { status: "unavailable" }

    const body = (await response.json()) as MerklToken[]

    if (!Array.isArray(body)) return { status: "invalid" }

    return {
      status: "ok",
      fetchedAt,
      tokens: body.map(toToken),
    }
  } catch {
    return { status: "unavailable" }
  }
}
