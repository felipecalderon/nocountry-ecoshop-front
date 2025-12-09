"use server"
import { fetcher } from "@/lib/fetcher"
import { auth0 } from "@/lib/auth0"

export const uploadImage = async (formData: FormData) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: { url: string } }>("POST", "/files/upload", {
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}
