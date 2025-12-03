"use server"

import { fetcher } from "@/lib/fetcher"
import { AdminStatsDto, BanUserDto, User } from "@/types"
import { auth0 } from "@/lib/auth0"

export const getDashboardStats = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<AdminStatsDto>("GET", "/admin/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return null
  }
}

export const toggleUserBan = async (id: string, data: BanUserDto) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("PATCH", `/admin/users/${id}/ban`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error toggling ban for user ${id}:`, error)
    throw error
  }
}

export interface RespUsersFromAdmin {
  data: {
    data: User[]
    meta: { total: number; page: number; lastPage: number }
  }
  timestamp: string
  status: string
}

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<RespUsersFromAdmin>(
      "GET",
      `/admin/users?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  } catch (error) {
    console.error("Error fetching users:", error)
    return null
  }
}
