import { Box } from "lucide-react"
import { RecyclabilityStatus } from "@/types"
import { Badge } from "./ui/badge"

export default function BadgeRecyclability({
  status,
}: {
  status: RecyclabilityStatus
}) {
  let text = ""
  let variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined = "outline"

  switch (status) {
    case RecyclabilityStatus.FULLY_RECYCLABLE:
      text = "Totalmente Reciclable"
      variant = "default"
      break
    case RecyclabilityStatus.PARTIALLY_RECYCLABLE:
      text = "Parcialmente Reciclable"
      variant = "secondary"
      break
    case RecyclabilityStatus.NOT_RECYCLABLE:
      text = "No Reciclable"
      variant = "destructive"
      break
    case RecyclabilityStatus.NOT_APPLICABLE:
    default:
      text = "No Aplica"
      variant = "outline"
      break
  }

  return (
    <div className="flex items-center gap-2">
      <Box className="h-4 w-4 text-muted-foreground" />
      <Badge variant={variant}>{text}</Badge>
    </div>
  )
}
