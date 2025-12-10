import { User } from "./user.types"
import { Product } from "./product.types"

export interface CreateBrandDto {
  name: string
  description?: string
  image?: string
}

export interface UpdateBrandDto extends Partial<CreateBrandDto> {}

export interface BrandStatsDto {
  totalRevenue: number
  totalUnitsSold: number
  totalOrders: number
}

export interface Brand {
  id: string
  name: string
  slug: string
  description: string
  logoUrl: string | null
  deletedAt: string | null
  owner: User
  products: Product[]
}
