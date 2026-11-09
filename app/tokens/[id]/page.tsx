import { Suspense } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Token } from "@/components/Token"
import { getToken } from "@/lib/get-token"
import { BackButton } from "@/components/BackButton"

type Props = {
  params: Promise<{ id: string }>
}

async function TokenRequest({ params }: Props) {
  const { id } = await params
  const result = await getToken(id)

  if (result.status === "ok") return <Token token={result.token} />

  return (
    <>
      <BackButton />
      <Typography sx={{ fontSize: "1.25rem", mt: 5 }}>
        {result.status >= 500 ? "Merkl ne répond pas. Le token ne peut pas s'afficher." : result.detail}
      </Typography>
    </>
  )
}

export default function Page({ params }: Props) {
  return (
    <Box component="main" sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2.5, sm: 5 }, pt: { xs: 5, sm: 8 }, pb: 12 }}>
      <Typography sx={{ mb: 1.5, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase" }}>
        Merkl
      </Typography>
      <Suspense fallback={<Typography sx={{ fontSize: "1.25rem" }}>Chargement…</Typography>}>
        <TokenRequest params={params} />
      </Suspense>
    </Box>
  )
}
