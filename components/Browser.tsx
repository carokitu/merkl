import { Filters } from "@/components/Filters"
import { List } from "@/components/List"
import { listTokens } from "@/lib/list-tokens"
import { paramsToFilters } from "@/lib/params-to-filters"
import type { SearchParams } from "@/lib/types"
import { ListStatus } from "./ListStatus"

type Props = {
  searchParams: Promise<SearchParams>
}

export async function Browser({ searchParams }: Props) {
  const filters = paramsToFilters(await searchParams)
  const tokenList = await listTokens(filters)

  if (tokenList.status !== "ok") {
    return (
      <>
        <Filters filters={filters} />
        <ListStatus status={tokenList.status} />
      </>
    )
  }

  return (
    <>
      <Filters filters={filters} />
      <List tokens={tokenList.tokens} />
    </>
  )
}
