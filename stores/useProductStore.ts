import { create } from "zustand"
import { Product } from "@/types"

interface ProductState {
  products: Product[]
  isLoading: boolean
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
  setLoading: (loading: boolean) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
    })),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}))
