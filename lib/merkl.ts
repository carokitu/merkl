import type { Token } from "./types"

export const MERKL_API_URL = "https://api.merkl.xyz/v4/tokens"

const MERKL_CHAINS_URL = "https://api.merkl.xyz/v4/chains"

export type MerklToken = {
  id: string
  address: string
  name?: string | null
  chainId: number
  symbol: string
  displaySymbol?: string
  icon?: string
  verified: boolean
  isNative: boolean
  price?: number | null
  updatedAt?: number | null
}

export async function chainNames() {
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

export function toToken(token: MerklToken, names: Map<number, string>): Token {
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
    isNative: token.isNative,
    price: token.price ?? null,
    updatedAt: token.updatedAt ?? null,
  }
}
