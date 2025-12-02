import { fetcher } from "@/lib/fetcher"
import { RedeemPointsDto, CreateRewardDto } from "@/types"

export const getBalance = async () => {
  try {
    return await fetcher("GET", "/wallet/balance")
  } catch (error) {
    console.error("Error fetching wallet balance:", error)
    return null
  }
}

export const getHistory = async () => {
  try {
    return await fetcher("GET", "/wallet/history")
  } catch (error) {
    console.error("Error fetching wallet history:", error)
    return []
  }
}

export const redeemPoints = async (data: RedeemPointsDto) => {
  try {
    return await fetcher("POST", "/wallet/redeem", { data })
  } catch (error) {
    console.error("Error redeeming points:", error)
    throw error
  }
}

export const getRewards = async () => {
  try {
    return await fetcher("GET", "/wallet/rewards")
  } catch (error) {
    console.error("Error fetching rewards:", error)
    return []
  }
}

export const createReward = async (data: CreateRewardDto) => {
  try {
    return await fetcher("POST", "/wallet/rewards", { data })
  } catch (error) {
    console.error("Error creating reward:", error)
    throw error
  }
}
