import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { BadgeCheck } from "lucide-react"
import { BackButton } from "@/components/BackButton"
import { TokenIcon } from "@/components/TokenIcon"
import type { Token as TToken } from "@/lib/types"

const nameSize = "clamp(2.4rem, 6vw, 4.2rem)"

const badgeSx = {
  height: 26,
  borderRadius: 0,
  bgcolor: "transparent",
  color: "var(--color-text)",
  border: "1px solid var(--color-text)",
  fontWeight: 700,
  letterSpacing: "0.08em",
  "& .MuiChip-label": { px: 1.1 },
}

function tokenSymbol(token: TToken) {
  return token.displaySymbol && token.displaySymbol !== token.symbol ? token.displaySymbol : token.symbol
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

function formatUpdatedAt(updatedAt: number) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(updatedAt * 1000),
  )
}

export function Token({ token }: { token: TToken }) {
  const symbol = tokenSymbol(token)
  const label = token.name?.trim() || symbol
  const showSymbol = Boolean(token.name?.trim()) && symbol !== label

  return (
    <Stack spacing={3}>
      <BackButton />

      <Stack
        spacing={4}
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: { xs: 3, sm: 4 },
          border: "1px solid var(--color-divider)",
          boxShadow: "6px 6px 0 rgba(15, 33, 62, 0.08)",
          transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
          "&:hover": {
            borderColor: "var(--color-divider)",
            transform: "translateY(-5px)",
            boxShadow: "0 28px 36px -24px rgba(15, 33, 62, 0.55)",
          },
        }}
      >
        <Stack direction="row" spacing={2.5}>
          <TokenIcon src={token.icon} label={label} size={84} />

          <Stack spacing={1}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography sx={{ fontSize: nameSize, fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.95 }}>
                {label}
              </Typography>
              {token.verified ? (
                <Box sx={{ display: "inline-flex", flexShrink: 0, fontSize: nameSize, "& svg": { width: "0.72em", height: "0.72em" } }}>
                  <BadgeCheck aria-label="Vérifié" strokeWidth={2.4} />
                </Box>
              ) : null}
            </Stack>
            {showSymbol ? (
              <Typography color="text.secondary" sx={{ fontWeight: 650, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                {symbol}
              </Typography>
            ) : null}
            <Stack direction="row" spacing={1} sx={{ alignSelf: "flex-start" }}>
              <Chip label={token.chainName ?? "Inconnue"} size="small" sx={badgeSx} />
              {token.isNative ? <Chip label="Natif" size="small" sx={badgeSx} /> : null}
            </Stack>
          </Stack>
        </Stack>

        <Typography sx={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em" }}>
          {token.price != null ? formatUsd(token.price) : "—"}
        </Typography>

        <Stack component="dl" spacing={0} sx={{ m: 0 }}>
          <Detail label="Adresse" value={token.address} />
          <Detail label="Identifiant" value={token.id} />
          <Detail label="Mis à jour" value={token.updatedAt != null ? formatUpdatedAt(token.updatedAt) : "—"} />
        </Stack>
      </Stack>
    </Stack>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      component="div"
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 0.5, sm: 3 }}
      sx={{ justifyContent: "space-between", py: 1.75, borderTop: "1px solid var(--color-divider)" }}
    >
      <Typography component="dt" color="text.secondary" sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        {label}
      </Typography>
      <Typography component="dd" sx={{ m: 0, fontWeight: 600, textAlign: { sm: "right" }, overflowWrap: "anywhere" }}>
        {value}
      </Typography>
    </Stack>
  )
}
