import Link from "next/link"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { BadgeCheck } from "lucide-react"
import { TokenIcon } from "@/components/TokenIcon"
import type { Token } from "@/lib/types"

const nameSize = "clamp(1.4rem, 2.5vw, 1.9rem)"

const cardSx = {
  alignItems: "center",
  display: "grid",
  gridTemplateColumns: "minmax(0, 4fr) auto minmax(0, 1fr)",
  columnGap: 2,
  rowGap: 1,
  px: 2,
  py: 2.25,
  bgcolor: "var(--color-paper)",
  border: "1px solid var(--color-divider)",
  boxShadow: "6px 6px 0 rgba(15, 33, 62, 0.08)",
  transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
  "&:hover": {
    borderColor: "var(--color-divider)",
    transform: "translateY(-5px)",
    boxShadow: "0 28px 36px -24px rgba(15, 33, 62, 0.55)",
  },
}

const badgeSx = {
  height: 26,
  borderRadius: 0,
  bgcolor: "transparent",
  color: "var(--color-text)",
  border: "1px solid var(--color-text)",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontSize: "0.68rem",
  "& .MuiChip-label": { px: 1.1 },
}

function tokenSymbol(token: Token) {
  return token.displaySymbol ?? token.symbol
}

function tokenLabel(token: Token) {
  const name = token.name?.trim()
  return name || tokenSymbol(token)
}

function formatUsd(price: number) {
  const magnitude = Math.abs(price)
  const maximumFractionDigits = magnitude >= 1 ? 2 : magnitude >= 0.01 ? 4 : 8

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
    minimumFractionDigits: magnitude >= 1 ? 2 : 0,
  }).format(price)
}

export function List({ tokens }: { tokens: Token[] }) {
  if (tokens.length === 0) {
    return (
      <Stack spacing={1}>
        <Typography>Aucun token ne correspond à ces filtres.</Typography>
        <Button href="/" variant="text" sx={{ alignSelf: "flex-start", px: 0 }}>
          Réinitialiser les filtres
        </Button>
      </Stack>
    )
  }

  return (
    <Stack
      component="ul"
      spacing={2}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {tokens.map((token) => {
        const symbol = tokenSymbol(token)
        const label = tokenLabel(token)
        const showSymbol = Boolean(token.name?.trim()) && symbol !== label

        return (
          <Box component="li" key={token.id}>
            <Link href={`/tokens/${token.id}`} style={{ display: "block", color: "inherit", textDecoration: "none" }}>
              <Stack sx={cardSx}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flex: "1 1 16rem", minWidth: 0 }}>
                    <TokenIcon src={token.icon} label={label} size={52} />

                  <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1 }}>
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", minWidth: 0 }}>
                      <Typography noWrap sx={{ minWidth: 0, fontSize: nameSize, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.05 }}>
                        {label}
                      </Typography>
                      {token.verified ? (
                        <Box
                          sx={{
                            display: "inline-flex",
                            flexShrink: 0,
                            color: "var(--color-text)",
                            "& svg": { width: nameSize, height: nameSize },
                          }}
                        >
                          <BadgeCheck aria-label="Vérifié" strokeWidth={2.4} />
                        </Box>
                      ) : null}
                    </Stack>
                    {showSymbol ? (
                      <Typography noWrap color="text.secondary" sx={{ fontSize: "0.78rem", fontWeight: 650, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                        {symbol}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>

                <Typography sx={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                  {token.price != null ? formatUsd(token.price) : "—"}
                </Typography>

                <Stack direction="row" spacing={0.75} useFlexGap sx={{ justifyContent: "flex-end" }}>
                  <Chip label={token.chainName ?? "Inconnue"} size="small" sx={badgeSx} />
                </Stack>
              </Stack>
            </Link>
          </Box>
        )
      })}
    </Stack>
  )
}
