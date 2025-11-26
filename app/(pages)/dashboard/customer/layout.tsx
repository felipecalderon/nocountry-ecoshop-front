"use client"

import { useState } from "react"
import DashboardSidebar, {
  NavItem,
} from "@/app/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/app/components/dashboard/DashboardHeader"
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  Award,
} from "lucide-react"

const navItems: NavItem[] = [
  {
    label: "Inicio",
    href: "/dashboard/customer",
    icon: LayoutDashboard,
  },
  {
    label: "Mis Pedidos",
    href: "/dashboard/customer/orders",
    icon: ShoppingBag,
  },
  {
    label: "Favoritos",
    href: "/dashboard/customer/favorites",
    icon: Heart,
  },
  {
    label: "Mi Perfil",
    href: "/dashboard/customer/profile",
    icon: User,
  },
  {
    label: "Direcciones",
    href: "/dashboard/customer/addresses",
    icon: MapPin,
  },
  {
    label: "Eco Puntos",
    href: "/dashboard/customer/rewards",
    icon: Award,
  },
]

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        title="Mi Cuenta"
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Mi Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
