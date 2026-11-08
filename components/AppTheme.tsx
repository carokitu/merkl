"use client"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import type { ReactNode } from "react"

const theme = createTheme({
  cssVariables: { nativeColor: true },
  palette: {
    mode: "light",
    primary: { main: "var(--color-primary)" },
    background: { default: "var(--color-background)", paper: "var(--color-paper)" },
    text: { primary: "var(--color-text)", secondary: "var(--color-text-secondary)" },
    divider: "var(--color-divider)",
  },
  shape: { borderRadius: 0 },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    h1: { fontWeight: 500, letterSpacing: "-0.07em", lineHeight: 0.84 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "var(--color-background)" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: "var(--color-outline)" },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          borderRadius: 0,
          border: "1px solid var(--color-text)",
          boxShadow: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          "&:hover": { backgroundColor: "rgba(15, 33, 62, 0.06)" },
          "&.Mui-selected": {
            backgroundColor: "var(--color-text)",
            color: "var(--color-background)",
            "&:hover": { backgroundColor: "var(--color-text)" },
          },
        },
      },
    },
  },
})

export function AppTheme({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
