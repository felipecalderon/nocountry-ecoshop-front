"use server"

import { fetcher } from "@/lib/fetcher"
import { CreateOrderDto } from "@/types"
import { auth0 } from "@/lib/auth0"

export const createOrder = async (data: CreateOrderDto) => {
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

export const getOrders = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: any[] }>("GET", "/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return { data: [] }
  }
}
