import { fetcher } from "@/lib/fetcher"
import { CreateAddressDto } from "@/types"
import { auth0 } from "@/lib/auth0"

export const createAddress = async (data: CreateAddressDto) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("POST", "/addresses", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error creating address:", error)
    throw error
  }
}

export const getAddresses = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: any[] }>("GET", "/addresses", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return { data: [] }
  }
}

export const getAddress = async (id: string) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("GET", `/addresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error fetching address ${id}:`, error)
    return null
  }
}

export const deleteAddress = async (id: string) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("DELETE", `/addresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error deleting address ${id}:`, error)
    throw error
  }
}
