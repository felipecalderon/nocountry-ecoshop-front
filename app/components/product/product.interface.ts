/**
 * Nivel de amigabilidad ecológica (EcoBadgeLevel)
 */
export type EcoBadgeLevel = "LOW" | "MEDIUM" | "HIGH"

/**
 * Estado de Reciclabilidad (RecyclabilityStatus)
 */
export enum RecyclabilityStatus {
  NOT_APPLICABLE = "NOT_APPLICABLE",
  NOT_RECYCLABLE = "NOT_RECYCLABLE",
  PARTIALLY_RECYCLABLE = "PARTIALLY_RECYCLABLE",
  FULLY_RECYCLABLE = "FULLY_RECYCLABLE",
}

/**
 * Interfaz para cada elemento de la lista 'certifications'.
 */
export interface Certification {
  id: string
  name: string
  badgeUrl: string
}

/**
 * Interfaz para el objeto 'enviromentalImpact'.
 */
export interface EnviromentalImpact {
  id: string
  recycledContent: number
  ecoBadgeLevel: EcoBadgeLevel
}

/**
 * Interfaz para cada elemento de la lista 'materialComposition'.
 */
export interface MaterialComposition {
  id: string
  material: string
  percentage: number
  isEcoFriendly: boolean
  carbonFootprint: number
  waterUsage: number
}

/**
 * Interfaz Principal del Producto Sostenible
 */
export interface Product {
  id: string
  slug: string
  name: string
  image: string
  description: string
  price: number
  stock: number
  sku: string
  originCountry: string
  recyclabilityStatus: RecyclabilityStatus
  imageAltText: string
  deletedAt: Date | null
  enviromentalImpact: EnviromentalImpact
  materialComposition: MaterialComposition[]
  certifications: Certification[]
}

export type ProductProps = { product: Product }
