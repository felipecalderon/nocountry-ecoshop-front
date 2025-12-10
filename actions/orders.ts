"use server"

import { fetcher } from "@/lib/fetcher"
import {
  CreateOrderDto,
  ApiResponse,
  Order,
  CreatedOrderResponse,
  OrderFromUser,
} from "@/types"
import { auth0 } from "@/lib/auth0"

export const createOrder = async (
  data: CreateOrderDto
): Promise<ApiResponse<CreatedOrderResponse>> => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("POST", "/orders", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const getOrders = async (): Promise<ApiResponse<OrderFromUser[]>> => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("GET", "/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return { data: [], timestamp: "", status: "" }
  }
}

export const getOrder = async (id: string): Promise<ApiResponse<Order>> => {
  const { token } = await auth0.getAccessToken()

  try {
    return (await fetcher("GET", `/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })) as ApiResponse<Order>
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error)
    throw error
  }
}
