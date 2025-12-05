"use client"

import { Earth, Droplet, Factory, Info, HeartHandshake } from "lucide-react"
import ImpactLevel from "./ImpactLevel"
import MetricCard from "./MetricCard"
import ProductBreakdown from "./ProductBreakdown"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import {
  getCarbonImpactLevel,
  getCarbonEquivalence,
} from "@/lib/carbonCalculator"
import { CarbonFootprintDisplayProps } from "@/types"

function CarbonFootprintDisplay({
  footprint,
  showBreakdown = false,
}: CarbonFootprintDisplayProps) {
  const { totalCO2, totalWater, breakdown } = footprint
  const impact = getCarbonImpactLevel(totalCO2)
  const equivalences = getCarbonEquivalence(totalCO2)

  const progressPercent = Math.min((totalCO2 / 40) * 100, 100)

  return (
    <Card className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-gray-800/60 dark:to-gray-800/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Earth className="h-5 w-5 text-green-600" />
            Impacto Ambiental
          </CardTitle>
          <TooltipProvider>
            <Tooltip aria-label="Tooltip">
              <TooltipTrigger aria-label="Tooltip trigger">
                <Info className="h-5 w-5 text-blue-500" />
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
          <MetricCard
            icon={Factory}
            label="Emisiones CO₂"
            value={totalCO2.toFixed(2)}
            unit="kg CO₂ equiv."
            iconColor="text-gray-600 dark:text-gray-400"
          />
          <MetricCard
            icon={Droplet}
            label="Uso de agua"
            value={totalWater.toFixed(2)}
            unit="litros"
            iconColor="text-blue-600"
          />
        </div>

        <ImpactLevel impact={impact} progressPercent={progressPercent} />

        <Accordion type="single" collapsible className="border-0">
          <AccordionItem value="details" className="border-0">
            <AccordionTrigger className="hover:no-underline py-2 px-4 text-sm font-medium bg-white hover:bg-gray-100 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/20 cursor-pointer">
              Ver más detalles del impacto ambiental
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              <section className="space-y-2">
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
              </section>

              {showBreakdown && breakdown.length > 0 && (
                <ProductBreakdown breakdown={breakdown} />
              )}

              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <p className="text-xs text-green-800 dark:text-green-100 flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4" />
                  Al elegir productos sostenibles, estás contribuyendo a reducir
                  el impacto ambiental
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default CarbonFootprintDisplay
