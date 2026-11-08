"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import type { Filters as TFilters } from "@/lib/types"

const FILTER_DELAY_MS = 400

type FilterValues = {
  search: string
  chainId: string
  verified: boolean
}

export function Filters({ filters }: { filters: TFilters }) {
  const router = useRouter()
  const pathname = usePathname()
  const [text, setText] = useState({
    search: filters.search ?? "",
    chainId: filters.chainId ?? "",
  })
  
  const isVerified = filters.verified === "true"
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current)
  }, [])


  function pushFilters(next: FilterValues) {
    const params = new URLSearchParams()
    const search = next.search.trim()
    const chainId = next.chainId.trim()

    if (search) params.set("search", search)
    if (chainId) params.set("chainId", chainId)
    if (next.verified) params.set("verified", "true")

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  function handleTextChange(field: "search" | "chainId", value: string) {
    const nextText = { ...text, [field]: value }
    setText(nextText)

    clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(
      () => pushFilters({ ...nextText, verified: isVerified }),
      FILTER_DELAY_MS,
    )
  }

  function handleVerifiedToggle() {
    clearTimeout(debounceTimer.current)
    pushFilters({ ...text, verified: !isVerified })
  }

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      sx={{ alignItems: { sm: "flex-end" }, mb: { xs: 4, sm: 6 } }}
    >
      <TextField
        label="Recherche"
        value={text.search}
        fullWidth
        variant="standard"
        onChange={(event) => handleTextChange("search", event.target.value)}
      />

      <TextField
        label="Chaîne"
        value={text.chainId}
        fullWidth
        variant="standard"
        slotProps={{
          htmlInput: { inputMode: "numeric" },
        }}
        onChange={(event) => handleTextChange("chainId", event.target.value)}
      />

      <Chip
        label="Vérifiés"
        clickable
        aria-pressed={isVerified}
        onClick={handleVerifiedToggle}
        sx={{
          alignSelf: "center",
          height: 32,
          borderRadius: 0,
          border: "1px solid var(--color-text)",
          bgcolor: isVerified ? "var(--color-text)" : "transparent",
          color: isVerified ? "var(--color-background)" : "var(--color-text)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          "&:hover": {
            bgcolor: isVerified ? "var(--color-text)" : "rgba(15, 33, 62, 0.06)",
          },
        }}
      />
    </Stack>
  )
}
