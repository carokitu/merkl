import Typography from "@mui/material/Typography"

type Props = {
  status: number
  detail: string
}

export function ListStatus({ status, detail }: Props) {
  if (status < 500) {
    return <Typography color="error">{detail}</Typography>
  }

  return <Typography color="warning">Merkl ne répond pas. La liste ne peut pas s&apos;afficher.</Typography>
}
