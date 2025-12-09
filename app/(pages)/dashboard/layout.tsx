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
    if (!isHydrated) return

    if (!user) {
      redirect("/auth/login")
      return
    }

    const dashboardConfig = getDashboardConfig(user.role)

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

  if (!isHydrated || !user) {
    return null
  }

  return (
    <div className="flex">
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
