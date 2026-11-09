import { fetchChains } from "./merkl-api"
import type { Token } from "./types"

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
  const body = await fetchChains()

  if (!Array.isArray(body)) {
    throw new Error("Invalid Merkl chains response")
  }

  const names = new Map<number, string>()

  for (const chain of body) {
    if (
      typeof chain.id === "number" &&
      Number.isInteger(chain.id) &&
      typeof chain.name === "string" &&
      chain.name.trim()
    ) {
      names.set(chain.id, chain.name.trim())
    }
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
