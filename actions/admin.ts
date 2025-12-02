import { fetcher } from "@/lib/fetcher"
import { AdminStatsDto, BanUserDto } from "@/types"

export const getDashboardStats = async () => {
  try {
    return await fetcher<AdminStatsDto>("GET", "/admin/dashboard/stats")
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return null
  }
}

export const toggleUserBan = async (id: string, data: BanUserDto) => {
  try {
    return await fetcher("PATCH", `/admin/users/${id}/ban`, { data })
  } catch (error) {
    console.error(`Error toggling ban for user ${id}:`, error)
    throw error
  }
}

export const getUsers = async (page = 1, limit = 10) => {
  try {
    return await fetcher("GET", `/admin/users?page=${page}&limit=${limit}`)
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}
