import { fetcher } from "@/lib/fetcher"

export const getProducts = async () => {
  return fetcher("GET", `/products/`)
}

export const getProductById = async (productId: string) => {
  return fetcher("GET", `/products/${productId}`)
}
