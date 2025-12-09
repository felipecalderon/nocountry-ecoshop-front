import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface FavoritesState {
  favoriteIds: string[]
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (productId) => {
        const { favoriteIds } = get()
        if (favoriteIds.includes(productId)) {
          set({
            favoriteIds: favoriteIds.filter((id) => id !== productId),
          })
        } else {
          set({ favoriteIds: [...favoriteIds, productId] })
        }
      },
      isFavorite: (productId) => {
        return get().favoriteIds.includes(productId)
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
