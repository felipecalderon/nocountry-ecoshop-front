export enum RewardType {
  DONATION = "DONATION",
  COUPON = "COUPON",
  PRODUCT = "PRODUCT",
}

export interface WalletBalance {
  id: string
  userId: string
  balance: number
  level: string
  version: number
  createdAt: string
  updatedAt: string
}

export interface WalletReward {
  id: string
  name: string
  description: string
  costInPoints: number
  imageUrl: string
  stock: number
  isActive: boolean
  type: RewardType
  metadata: {
    discountPercentage: number
    validDays: number
  } | null
  createdAt: string
  updatedAt: string
}

export type RewardAdminDto = Omit<
  WalletReward,
  "id" | "createdAt" | "updatedAt" | "imageUrl"
>

export interface CreateRewardDto {
  rewardId: string
  amount: number
}
