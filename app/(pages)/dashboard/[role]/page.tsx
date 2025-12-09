"use client"

import { useAuth } from "@/stores/useAuthStore"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import CustomerDashboard from "./customer-dashboard"
import AdminDashboard from "./admin-dashboard"
import BrandAdminDashboard from "./brand-admin-dashboard"
import { useParams } from "next/navigation"

export default function RoleDashboardPage() {
  const { user, isHydrated } = useAuth()
  const params = useParams()

  useEffect(() => {
    // Esperar a que se hidrate el estado antes de redirigir
    if (!isHydrated) return

    if (!user) {
      redirect("/auth/login")
      return
    }

    // Verificar que el rol del usuario coincida con la ruta
    if (user.role !== params.role) {
      redirect(`/dashboard/${user.role}`)
    }
  }, [user, params.role, isHydrated])

  console.log(user)

  if (!isHydrated || !user) {
    return <div>Cargando...</div>
  }

  // Renderizar contenido específico según el rol
  if (params.role === "customer") {
    return <CustomerDashboard />
  }

  if (params.role === "admin") {
    return <AdminDashboard />
  }

  if (params.role === "brand_admin") {
    return <BrandAdminDashboard />
  }

  return <div>Rol no reconocido</div>
}
