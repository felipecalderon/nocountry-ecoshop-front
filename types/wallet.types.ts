export interface RedeemPointsDto {
  rewardId: string
  amount: number
}

export interface CreateRewardDto {
  name: string
  description?: string
  costInPoints: number
  imageUrl?: string
  stock?: number
  type: "DONATION" | "COUPON" | "PRODUCT"
  isActive?: boolean
}
