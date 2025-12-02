import { fetcher } from "@/lib/fetcher"
import { CreateOrderDto } from "@/types"

export const createOrder = async (data: CreateOrderDto) => {
  try {
    return await fetcher("POST", "/orders", { data })
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const getOrders = async () => {
  try {
    return await fetcher("GET", "/orders")
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}
