export interface CreateBrandDto {
  name: string
  description?: string
  logoUrl?: string
}

export interface BrandStatsDto {
  totalRevenue: number
  totalUnitsSold: number
  totalOrders: number
}
