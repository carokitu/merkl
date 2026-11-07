import type { Filters as TFilters } from "@/lib/types"

export function Filters({ filters }: { filters: TFilters }) {
  return (
    <form method="get">
      <label>
        Chaîne
        <input name="chainId" inputMode="numeric" defaultValue={filters.chainId ?? ""} />
      </label>
      <label>
        Recherche
        <input name="search" defaultValue={filters.search ?? ""} />
      </label>
      <label>
        Vérifié
        <select name="verified" defaultValue={filters.verified ?? ""}>
          <option value="">Tous</option>
          <option value="true">Vérifiés</option>
          <option value="false">Non vérifiés</option>
        </select>
      </label>
      <button type="submit">Filtrer</button>
    </form>
  )
}
