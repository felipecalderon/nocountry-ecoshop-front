export interface CreateBrandDto {
  name: string
  description?: string
  image?: string
}

export interface BrandStatsDto {
  totalRevenue: number
  totalUnitsSold: number
  totalOrders: number
}
