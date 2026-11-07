import { Suspense } from "react"
import { Browser } from "@/components/Browser"
import type { SearchParams } from "@/lib/types"

type Props = {
  searchParams: Promise<SearchParams>
}

export default function Page({searchParams}: Props) {
  return (
    <main>
      <h1>Tokens</h1>

      <Suspense fallback={<p>Chargement…</p>}>
        <Browser searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
