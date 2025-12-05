import { Product } from "@/types/product.types"
import { CarbonFootprintResult, CartItem } from "@/types"

export function calculateProductCarbonFootprint(product: Product): {
  co2: number
  water: number
} {
  if (product.environmentalImpact) {
    return {
      co2: parseFloat(product.environmentalImpact.carbonFootprint),
      water: parseFloat(product.environmentalImpact.waterUsage),
    }
  }
  return {
    co2: 0,
    water: 0,
  }
}

export function calculateCartCarbonFootprint(
  cartItems: CartItem[],
  products: Product[]
): CarbonFootprintResult {
  const breakdown = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.id)

    if (!product) {
      return {
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        co2PerUnit: 0,
        waterPerUnit: 0,
        subtotalCO2: 0,
        subtotalWater: 0,
      }
    }

    const { co2, water } = calculateProductCarbonFootprint(product)

    return {
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      co2PerUnit: co2,
      waterPerUnit: water,
      subtotalCO2: co2 * item.quantity,
      subtotalWater: water * item.quantity,
    }
  })

  const totalCO2 = breakdown.reduce((sum, item) => sum + item.subtotalCO2, 0)
  const totalWater = breakdown.reduce(
    (sum, item) => sum + item.subtotalWater,
    0
  )

  return {
    totalCO2,
    totalWater,
    breakdown,
  }
}

export function getCarbonImpactLevel(co2: number): {
  level: "low" | "medium" | "high"
  label: string
  color: string
  description: string
} {
  if (co2 < 1) {
    return {
      level: "low",
      label: "Impacto Bajo",
      color: "text-green-800 dark:text-green-200",
      description: "¡Excelente elección! Tu compra tiene un impacto mínimo.",
    }
  } else if (co2 < 5) {
    return {
      level: "medium",
      label: "Impacto Moderado",
      color: "text-yellow-600 dark:text-gray-800",
      description: "Tu compra tiene un impacto moderado en el medio ambiente.",
    }
  } else {
    return {
      level: "high",
      label: "Impacto Alto",
      color: "text-red-500 dark:text-red-800",
      description: "Considera agregar más productos eco-friendly.",
    }
  }
}

export function getCarbonEquivalence(co2Kg: number): string[] {
  const equivalences: string[] = []

  const carKm = (co2Kg / 0.12).toFixed(1)
  equivalences.push(`${carKm} km en auto`)

  const treesNeeded = (co2Kg / 20).toFixed(2)
  equivalences.push(`${treesNeeded} árboles por año para compensar`)

  const kwhEquivalent = (co2Kg / 0.5).toFixed(1)
  equivalences.push(`${kwhEquivalent} kWh de electricidad`)

  return equivalences
}
