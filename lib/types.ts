export type Token = {
  id: string
  name: string | null
  chainId: number
  symbol: string
  displaySymbol?: string
  verified: boolean
  price: number | null
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
