import type { Filters, SearchParams } from "./types"

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export function paramsToFilters(
  params: SearchParams,
): Filters {
  return {
    page: first(params.page),
    items: first(params.items),
    chainId: first(params.chainId),
    search: first(params.search),
    verified: first(params.verified),
  }
}
