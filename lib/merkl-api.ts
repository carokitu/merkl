import type { MerklToken } from "./merkl-utils"
import { cacheLife } from "next/cache"

const MERKL_API_URL = "https://api.merkl.xyz/v4"

async function merklFetch<T>(url: string): Promise<T> {
  "use cache"

  cacheLife("minutes")

  const response = await fetch(url)
  return response.json() as Promise<T>
}

export function fetchTokens(params: URLSearchParams) {
  return merklFetch<MerklToken[]>(`${MERKL_API_URL}/tokens?${params.toString()}`)
}

export function fetchToken(id: string) {
  return merklFetch<MerklToken>(`${MERKL_API_URL}/tokens/${encodeURIComponent(id)}`)
}

export function fetchChains() {
  return merklFetch<{ id?: unknown; name?: unknown }[]>(`${MERKL_API_URL}/chains`)
}
