"use client"

import Box from "@mui/material/Box"
import { useEffect, useRef, useState } from "react"

export function TokenIcon({ src, label, size }: { src: string | null; label: string; size: number }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const letter = label.slice(0, 1).toUpperCase()

  useEffect(() => {
    const image = imageRef.current
    if (image?.complete && image.naturalWidth === 0) setFailedSrc(src)
  }, [src])

  if (!src || failedSrc === src) {
    return (
      <Box
        aria-hidden
        sx={{
          width: size,
          height: size,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          border: "2px solid var(--color-text)",
          bgcolor: "var(--color-paper)",
          color: "var(--color-text)",
          fontSize: size >= 80 ? "2rem" : "1.15rem",
          fontWeight: 600,
        }}
      >
        {letter}
      </Box>
    )
  }

  return (
    <Box
      component="img"
      ref={imageRef}
      src={src}
      onError={() => setFailedSrc(src)}
      sx={{ width: size, height: size, flexShrink: 0, objectFit: "contain" }}
    />
  )
}
