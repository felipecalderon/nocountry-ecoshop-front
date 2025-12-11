"use server"
import { fetcher } from "@/lib/fetcher"
import {
  CreateBrandDto,
  UpdateBrandDto,
  BrandStatsDto,
  UpdateOrderStatusDto,
  OrderItemDto,
  Brand,
  OrderFromUser,
} from "@/types"
import { auth0 } from "@/lib/auth0"

export const createBrand = async (data: CreateBrandDto) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: Brand }>("POST", "/brands", {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error("Error creating brand:", error)
    throw error
  }
}

export const getMyBrands = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: Brand }>("GET", "/brands", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching my brand:", error)
    throw error
  }
}

export const getBrandOrders = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: OrderFromUser[]; totalPages: number }>(
      "GET",
      "/brands/orders",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  } catch (error) {
    console.error("Error fetching brand orders:", error)
    throw error
  }
}

export const updateBrandOrderStatus = async (
  id: string,
  data: UpdateOrderStatusDto
) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("PATCH", `/brands/orders/${id}/status`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error updating order status ${id}:`, error)
    throw error
  }
}

export const getBrandStats = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<BrandStatsDto>("GET", "/brands/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching brand stats:", error)
    return null
  }
}
