import Link from "next/link"
import type { Token } from "@/lib/types"

export function List({ tokens }: { tokens: Token[] }) {
  if (tokens.length === 0) {
    return (
      <>
        <p>Aucun token ne correspond à ces filtres.</p>
        <Link href="/">Réinitialiser les filtres</Link>
      </>
    )
  }

  return (
    <ul>
      {tokens.map((token) => (
        <li key={token.id}>
          {token.displaySymbol ?? token.symbol} {token.name} — chaîne {token.chainId}
          {token.verified ? " — vérifié" : " — non vérifié"}
          {token.price != null ? ` — $${token.price}` : ""}
        </li>
      ))}
    </ul>
  )
}
