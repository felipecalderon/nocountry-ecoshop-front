export interface CarbonFootprintBreakdown {
  productId: string
  productName: string
  quantity: number
  co2PerUnit: number
  waterPerUnit: number
  subtotalCO2: number
  subtotalWater: number
}

export interface CarbonFootprintResult {
  totalCO2: number
  totalWater: number
  breakdown: CarbonFootprintBreakdown[]
}

export interface CarbonFootprintDisplayProps {
  footprint: CarbonFootprintResult
  showBreakdown?: boolean
}

export interface CarbonImpactProps {
  level: "low" | "medium" | "high"
  label: string
  color: string
  description: string
}

export interface ImpactLevelProps {
  impact: CarbonImpactProps
  progressPercent: number
}

export interface ProductBreakdownProps {
  breakdown: CarbonFootprintBreakdown[]
}
