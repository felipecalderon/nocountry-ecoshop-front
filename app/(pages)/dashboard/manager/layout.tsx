"use client"

import { useState } from "react"
import DashboardSidebar, {
  NavItem,
} from "@/app/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/app/components/dashboard/DashboardHeader"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react"

const navItems: NavItem[] = [
  {
    label: "Resumen",
    href: "/dashboard/manager",
    icon: LayoutDashboard,
  },
  {
    label: "Productos",
    href: "/dashboard/manager/products",
    icon: Package,
  },
  {
    label: "Inventario",
    href: "/dashboard/manager/inventory",
    icon: ShoppingCart,
  },
  {
    label: "Ventas",
    href: "/dashboard/manager/sales",
    icon: BarChart3,
  },
  {
    label: "Configuración",
    href: "/dashboard/manager/settings",
    icon: Settings,
  },
]

export default function ManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        title="Mi Empresa"
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
