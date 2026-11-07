type Props = {
  status: "ok" | "invalid" | "unavailable"
}

export async function ListStatus({ status }: Props) {
  if (status === "invalid") {
    return <p>Un ou plusieurs filtres ne sont pas valides.</p>
  }

  if (status === "unavailable") {
    return <p>Merkl ne répond pas. La liste ne peut pas s&apos;afficher.</p>
  }
}
