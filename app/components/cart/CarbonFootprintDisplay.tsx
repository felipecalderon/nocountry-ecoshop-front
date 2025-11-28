"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { Earth, Droplet, Factory, Info, HeartHandshake } from "lucide-react"
import {
  CarbonFootprintResult,
  getCarbonImpactLevel,
  getCarbonEquivalence,
} from "@/lib/carbonCalculator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"

interface CarbonFootprintDisplayProps {
  footprint: CarbonFootprintResult
  showBreakdown?: boolean
}

function CarbonFootprintDisplay({
  footprint,
  showBreakdown = false,
}: CarbonFootprintDisplayProps) {
  const { totalCO2, totalWater, breakdown } = footprint
  const impact = getCarbonImpactLevel(totalCO2)
  const equivalences = getCarbonEquivalence(totalCO2)

  const progressPercent = Math.min((totalCO2 / 10) * 100, 100)

  return (
    <Card className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Earth className="h-5 w-5 text-green-600" />
            Impacto Ambiental
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  Cálculo estimado basado en la composición de materiales de
                  cada producto
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Huella de carbono de tu pedido</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Factory className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Emisiones CO₂</span>
            </div>
            <div>
              <p className="text-3xl font-bold">{totalCO2.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">kg CO₂ equiv.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Uso de agua</span>
            </div>
            <div>
              <p className="text-3xl font-bold">{totalWater.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">litros</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Nivel de impacto</span>
            <Badge
              variant={impact.level === "low" ? "default" : "secondary"}
              className={impact.color}
            >
              {impact.label}
            </Badge>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground">{impact.description}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Equivalente a:</p>
          <ul className="space-y-1">
            {equivalences.map((equiv, idx) => (
              <li
                key={idx}
                className="text-xs text-muted-foreground flex items-center gap-2"
              >
                <span className="text-green-600">•</span>
                {equiv}
              </li>
            ))}
          </ul>
        </div>

        {showBreakdown && breakdown.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium">Desglose por producto:</p>
            <div className="space-y-2">
              {breakdown.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-xs"
                >
                  <span className="text-muted-foreground truncate flex-1">
                    {item.productName} (x{item.quantity})
                  </span>
                  <span className="font-medium ml-2">
                    {item.subtotalCO2.toFixed(2)} kg CO₂
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
          <p className="text-xs text-green-800 dark:text-green-100 flex items-center gap-2">
            <HeartHandshake className="h-4 w-4" />
            Al elegir productos sostenibles, estás contribuyendo a reducir el
            impacto ambiental
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default CarbonFootprintDisplay
