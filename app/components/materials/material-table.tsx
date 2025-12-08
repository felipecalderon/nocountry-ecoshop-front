import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Material } from "@/types"
import {
  ChevronDown,
  ChevronUp,
  Cloud,
  Droplets,
  Leaf,
  Pencil,
  Trash2,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

export default function MaterialRow({
  material,
  isExpanded,
  onToggle,
  onEdit,
  onDelete,
}: {
  material: Material
  isExpanded: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-card transition-colors hover:bg-muted/30">
      {/* Main Row Content */}
      <div
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`p-2 rounded-full ${
              material.isEcoFriendly
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <Leaf className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium truncate">{material.name}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
              <span>
                {material.isEcoFriendly ? "Eco-Friendly" : "Estándar"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center mr-4">
            {material.isEcoFriendly && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
              >
                Eco Friendly
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
          >
            <Pencil className="h-4 w-4 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="ml-1 text-muted-foreground">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Stats */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-muted/20"
          >
            <div className="p-4 pt-0 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <Cloud className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Huella de Carbono</p>
                  <p className="text-muted-foreground">
                    {material.carbonFootprintPerKg} kg CO2e / kg
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <Droplets className="h-5 w-5 text-cyan-500" />
                <div>
                  <p className="font-medium">Uso de Agua</p>
                  <p className="text-muted-foreground">
                    {material.waterUsagePerKg} L / kg
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <Leaf className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Eco Friendly</p>
                  <p className="text-muted-foreground">
                    {material.isEcoFriendly ? "Sí" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
