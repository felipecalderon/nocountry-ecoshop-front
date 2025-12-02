"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/stores/useAuthStore"
import { redirect } from "next/navigation"
import DashboardSidebar, {
  NavItem,
} from "@/app/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/app/components/dashboard/DashboardHeader"
import { getDashboardConfig, getIconByName } from "@/lib/config/dashboard-menus"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isHydrated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [config, setConfig] = useState({
    title: "Dashboard",
    headerTitle: "Dashboard",
  })

  useEffect(() => {
    // Esperar a que se hidrate el estado antes de redirigir
    if (!isHydrated) return

    if (!user) {
      redirect("/auth/login")
      return
    }

    // Obtener configuración del dashboard según el rol
    const dashboardConfig = getDashboardConfig(user.role)

    // Convertir los items del config a NavItems con iconos reales
    const items: NavItem[] = dashboardConfig.items.map((item) => ({
      label: item.label,
      href: item.href,
      icon: getIconByName(item.icon),
    }))

    setNavItems(items)
    setConfig({
      title: dashboardConfig.title,
      headerTitle: dashboardConfig.headerTitle,
    })
  }, [user, isHydrated])

  // Mostrar nada mientras se hidrata el estado
  if (!isHydrated || !user) {
    return null // o un loading spinner
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        title={config.title}
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title={config.headerTitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
