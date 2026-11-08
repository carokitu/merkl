import Typography from "@mui/material/Typography"

type Props = {
  status: "ok" | "invalid" | "unavailable"
}

export function ListStatus({ status }: Props) {
  if (status === "invalid") {
    return <Typography color="error">Un ou plusieurs filtres ne sont pas valides.</Typography>
  }

  if (status === "unavailable") {
    return <Typography color="warning">Merkl ne répond pas. La liste ne peut pas s&apos;afficher.</Typography>
  }
}
