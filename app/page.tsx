import { Suspense } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Browser } from "@/components/Browser"
import type { SearchParams } from "@/lib/types"

type Props = {
  searchParams: Promise<SearchParams>
}

export default function Page({ searchParams }: Props) {
  return (
    <Box component="main" sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2.5, sm: 5 }, pt: { xs: 5, sm: 8 }, pb: 12 }}>
      <Typography sx={{ mb: 1.5, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase" }}>
        Merkl
      </Typography>
      <Typography variant="h1" sx={{ fontSize: "clamp(4.75rem, 16vw, 9rem)", mb: 5 }}>
        Tokens
      </Typography>

      <Suspense fallback={<Typography sx={{ fontSize: "1.25rem" }}>Chargement…</Typography>}>
        <Browser searchParams={searchParams} />
      </Suspense>
    </Box>
  )
}
