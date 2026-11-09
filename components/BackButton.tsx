"use client"

import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  function handleClick() {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push("/")
  }

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{ alignSelf: "flex-start", borderRadius: 0, borderColor: "var(--color-text)", color: "var(--color-text)" }}
    >
      Retour
    </Button>
  )
}
