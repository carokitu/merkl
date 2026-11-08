"use client"

import type { ChangeEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import MuiPagination from "@mui/material/Pagination"

export function Pagination({ page, hasNext }: { page: number; hasNext: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const count = page + (hasNext ? 2 : 1)

  function handlePageChange(_event: ChangeEvent<unknown>, nextPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (nextPage <= 1) params.delete("page")
    else params.set("page", String(nextPage - 1))

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  if (count <= 1) return null

  return (
    <MuiPagination
      count={count}
      page={page + 1}
      variant="outlined"
      onChange={handlePageChange}
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
        "& .MuiPaginationItem-root": { borderRadius: 0 },
      }}
      size="large"
    />
  )
}
