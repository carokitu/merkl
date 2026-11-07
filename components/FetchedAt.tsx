import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

export function FetchedAt({ fetchedAt }: { fetchedAt: string }) {
  const date = new Date(fetchedAt)
  const exact = format(date, "PPPp", { locale: fr })
  const relative = formatDistanceToNow(date, { addSuffix: true, locale: fr })

  return (
    <p>
      Mis à jour {relative}{" "}
      <time dateTime={fetchedAt} title={exact}>
        {exact}
      </time>
    </p>
  )
}
