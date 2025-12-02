import { fetcher } from "@/lib/fetcher"
import { CreateAddressDto } from "@/types"

export const createAddress = async (data: CreateAddressDto) => {
  try {
    return await fetcher("POST", "/addresses", { data })
  } catch (error) {
    console.error("Error creating address:", error)
    throw error
  }
}

export const getAddresses = async () => {
  try {
    return await fetcher("GET", "/addresses")
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return []
  }
}

export const getAddress = async (id: string) => {
  try {
    return await fetcher("GET", `/addresses/${id}`)
  } catch (error) {
    console.error(`Error fetching address ${id}:`, error)
    return null
  }
}

export const deleteAddress = async (id: string) => {
  try {
    return await fetcher("DELETE", `/addresses/${id}`)
  } catch (error) {
    console.error(`Error deleting address ${id}:`, error)
    throw error
  }
}
