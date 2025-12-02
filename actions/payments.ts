import { fetcher } from "@/lib/fetcher"
import { CreateCheckoutSessionDto } from "@/types"

export const createCheckoutSession = async (data: CreateCheckoutSessionDto) => {
  try {
    return await fetcher("POST", "/payments/create-checkout-session", { data })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}
