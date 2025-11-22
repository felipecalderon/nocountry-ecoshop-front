import { useEffect } from "react"
/**
 * Hook para aplicar la clase 'dark' al <html> basado en el estado de Zustand.
 * Asegura que el CSS se aplique correctamente.
 */
export function useApplyTheme(isDark: boolean) {
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])
}
