"use client"

import { useAuth } from "@/stores/useAuthStore"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isHydrated } = useAuth()

  useEffect(() => {
    // Esperar a que se hidrate el estado antes de redirigir
    if (!isHydrated) return

    if (user) {
      redirect(`/dashboard/${user.role}`)
    } else {
      redirect("/auth/login")
    }
  }, [user, isHydrated])

  return <div>Redirigiendo...</div>
}
