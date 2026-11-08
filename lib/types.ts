export type Token = {
  id: string
  address: string
  name: string | null
  chainId: number
  chainName: string | null
  symbol: string
  displaySymbol?: string
  icon: string | null
  verified: boolean
  price: number | null
  updatedAt: number | null
}

export type ListResult =
  | { status: "ok"; tokens: Token[]; fetchedAt: string }
  | { status: "invalid" }
  | { status: "unavailable" }

export type SearchParams = Record<string, string | string[] | undefined>

export type Filters = {
  page?: string
  items?: string
  chainId?: string
  search?: string
  verified?: string
}
