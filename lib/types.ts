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
  isNative: boolean
  price: number | null
  updatedAt: number | null
}

export type Problem = {
  type: string
  title: string
  status: number
  detail: string
  instance?: string
  errors?: unknown
}

export type ListResult =
  | { status: "ok"; tokens: Token[]; fetchedAt: string }
  | Problem

export type TokenResult =
  | { status: "ok"; token: Token; fetchedAt: string }
  | Problem

export type SearchParams = Record<string, string | string[] | undefined>

export type Filters = {
  page?: string
  items?: string
  chainId?: string
  search?: string
  verified?: string
}
