import type { Token, Filters, ListResult } from "./types"

const MERKL_API_URL = "https://api.merkl.xyz/v4/tokens"
const MERKL_CHAINS_URL = "https://api.merkl.xyz/v4/chains"

type MerklToken = {
  id: string
  address: string
  name?: string | null
  chainId: number
  symbol: string
  displaySymbol?: string
  icon?: string
  verified: boolean
  price?: number | null
  updatedAt?: number | null
}

function toMerklUrl(filters: Filters) {
  const page = parseInteger(filters.page ?? null, 0)
  const items = parseInteger(filters.items ?? null, 20, 1, 1000)
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

async function chainNames() {
  const names = new Map<number, string>()

  try {
    const response = await fetch(MERKL_CHAINS_URL)
    if (!response.ok) return names

    const body = (await response.json()) as { id?: number; name?: string }[]
    if (!Array.isArray(body)) return names

    for (const chain of body) {
      if (typeof chain.id === "number" && chain.name) names.set(chain.id, chain.name)
    }
  } catch {
    return names
  }

  return names
}

function toToken(token: MerklToken, names: Map<number, string>): Token {
  return {
    id: token.id,
    address: token.address,
    name: token.name ?? null,
    chainId: token.chainId,
    chainName: names.get(token.chainId) ?? null,
    symbol: token.symbol,
    displaySymbol: token.displaySymbol,
    icon: token.icon || null,
    verified: token.verified,
    price: token.price ?? null,
    updatedAt: token.updatedAt ?? null,
  }
}

export async function listTokens(filters: Filters): Promise<ListResult> {
  const url = toMerklUrl(filters)

  if (!url) return { status: "invalid" }

  
  try {
    const [response, names] = await Promise.all([fetch(url), chainNames()])
    const fetchedAt = new Date().toISOString()

    if (response.status >= 400 && response.status < 500) return { status: "invalid" }
    if (!response.ok) return { status: "unavailable" }

    const body = (await response.json()) as MerklToken[]

    if (!Array.isArray(body)) return { status: "invalid" }

    return {
      status: "ok",
      fetchedAt,
      tokens: body.map((token) => toToken(token, names)),
    }
  } catch {
    return { status: "unavailable" }
  }
}
