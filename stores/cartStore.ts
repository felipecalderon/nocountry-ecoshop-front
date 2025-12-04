import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartStore } from "@/types/cart.types"

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          const newQuantity = existingItem.quantity + 1
          if (newQuantity > product.maxStock) {
            console.warn(`No hay suficiente stock. Máximo: ${product.maxStock}`)
            return
          }

          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, quantity: newQuantity } : item
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) })
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        const items = get().items
        const item = items.find((i) => i.id === itemId)

        if (item && quantity > item.maxStock) {
          console.warn(`No hay suficiente stock. Máximo: ${item.maxStock}`)
          return
        }

        set({
          items: items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + Number(item.price) * item.quantity,
          0
        )
      },

      isInCart: (itemId) => {
        return get().items.some((item) => item.id === itemId)
      },

      getItemQuantity: (itemId) => {
        const item = get().items.find((i) => i.id === itemId)
        return item?.quantity || 0
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
