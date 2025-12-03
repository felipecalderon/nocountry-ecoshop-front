import { fetcher } from "@/lib/fetcher"
import { CreateCheckoutSessionDto } from "@/types"
import { auth0 } from "@/lib/auth0"

export const createCheckoutSession = async (data: CreateCheckoutSessionDto) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("POST", "/payments/create-checkout-session", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}
