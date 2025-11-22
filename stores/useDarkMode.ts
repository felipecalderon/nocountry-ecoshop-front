import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}
/**
 * Store para almacenar si el tema es dark en localstorage usando zustand.
 * Tiene mejor rendimiento que llamar a localstorage directamente desde el componente.
 */
export const useDarkMode = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (isDark) => set({ isDark }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isDark: state.isDark }),
    }
  )
)
