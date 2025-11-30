import { Leaf } from "lucide-react"
import { EcoBadgeLevel } from "@/types/product.types"
import { Badge } from "./ui/badge"

export default function BadgeLevel({ level }: { level: EcoBadgeLevel }) {
  let text = ""
  let color = "bg-gray-500 hover:bg-gray-500/80"

  switch (level) {
    case "HIGH":
      text = "Alto Impacto Ecológico"
      color = "bg-green-600 hover:bg-green-600/80"
      break
    case "MEDIUM":
      text = "Medio Impacto Ecológico"
      color = "bg-yellow-600 hover:bg-yellow-600/80"
      break
    case "LOW":
      text = "Bajo Impacto Ecológico"
      color = "bg-red-600 hover:bg-red-600/80"
      break
  }

  return (
    <div className="flex items-center space-x-2">
      <Leaf className="h-4 w-4 text-muted-foreground" />
      <Badge className={`${color} text-white`} variant="default">
        {text}
      </Badge>
    </div>
  )
}
