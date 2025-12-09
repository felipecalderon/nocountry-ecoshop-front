import { MaterialComposition } from "./material.types"

/**
 * Nivel de amigabilidad ecológica (EcoBadgeLevel)
 */
export type EcoBadgeLevel = "LOW" | "MEDIUM" | "HIGH"

/**
 * Estado de Reciclabilidad (RecyclabilityStatus)
 */
export enum RecyclabilityStatus {
  NOT_APPLICABLE = "NOT_APPLICABLE",
  NOT_RECYCLABLE = "NON_RECYCLABLE",
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
  carbonFootprint: string
  waterUsage: string
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
  price: string
  stock: number
  sku: string
  originCountry: string
  recyclabilityStatus: RecyclabilityStatus
  imageAltText: string
  deletedAt: Date | null
  environmentalImpact: EnviromentalImpact
  materials: MaterialComposition[]
  certifications: Certification[]
}

export interface CreateProductDto {
  name: string
  image: string
  description: string
  price: number
  stock: number
  sku: string
  originCountry: string
  weightKg: number
  recyclabilityStatus: RecyclabilityStatus
  imageAltText?: string
  environmentalImpact: {
    recycledContent: number
    materials: MaterialComposition[]
  }
  materials: MaterialComposition[]
  certificationIds: string[]
}

/**
 * Payload específico para la creación de productos (según requerimientos)
 */
export interface CreateProductPayload {
  name: string
  image: string
  description: string
  price: number
  stock: number
  originCountry: string
  weightKg: number
  imageAltText?: string
  environmentalImpact: {
    recycledContent: number
    materials: Array<{
      materialCompositionId: string
      percentage: number
    }>
  }
  certificationIds: string[]
}
