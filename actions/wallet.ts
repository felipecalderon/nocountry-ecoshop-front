"use server"
import { fetcher } from "@/lib/fetcher"
import {
  CreateRewardDto,
  WalletReward,
  WalletBalance,
  RewardAdminDto,
} from "@/types"
import { auth0 } from "@/lib/auth0"
import { AxiosError } from "axios"

export const getBalance = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: WalletBalance }>("GET", "/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching wallet balance:", error)
    throw error
  }
}

export const getHistory = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: WalletBalance[] }>("GET", "/wallet/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching wallet history:", error)
    throw error
  }
}

export const redeemPoints = async (data: CreateRewardDto) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: WalletBalance[] }>("POST", "/wallet/redeem", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error redeeming points:", error)
    throw error
  }
}

export const getRewards = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: WalletReward[] }>("GET", "/wallet/rewards", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching rewards:", error)
    throw error
  }
}

export const createReward = async (data: RewardAdminDto) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: WalletReward }>("POST", "/wallet/rewards", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error creating reward:", error.response)
    }
    console.error("Error creating reward:", error)
    throw error
  }
}
