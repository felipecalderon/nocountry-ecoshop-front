import { fetcher } from "@/lib/fetcher"
import { Product } from "@/types"

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
    return await fetcher<Product>("POST", "/products", { data })
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
    return await fetcher("PATCH", `/products/${id}`, { data })
  } catch (error) {
    console.error(`Error updating product ${id}:`, error)
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    return await fetcher("DELETE", `/products/${id}`)
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw error
  }
}
