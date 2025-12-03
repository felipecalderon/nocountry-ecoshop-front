import { fetcher } from "@/lib/fetcher"
import { Product } from "@/types"
import { auth0 } from "@/lib/auth0"

export const getProducts = async () => {
  try {
    return await fetcher<Product[]>("GET", "/products")
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export const createProduct = async (data: any) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<Product>("POST", "/products", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

export const getProduct = async (term: string) => {
  try {
    return await fetcher<Product>("GET", `/products/${term}`)
  } catch (error) {
    console.error(`Error fetching product ${term}:`, error)
    return null
  }
}

export const updateProduct = async (id: string, data: any) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("PATCH", `/products/${id}`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error updating product ${id}:`, error)
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("DELETE", `/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw error
  }
}
