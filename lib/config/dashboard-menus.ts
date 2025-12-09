import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

export interface DashboardMenuItem {
  label: string
  href: string
  icon: string // nombre del icono de lucide-react
}

export interface DashboardConfig {
  title: string
  headerTitle: string
  items: DashboardMenuItem[]
}

// Mapeo de roles a configuraciones de dashboard
export const dashboardConfigs: Record<string, DashboardConfig> = {
  customer: {
    title: "Mi Cuenta",
    headerTitle: "Mi Dashboard",
    items: [
      {
        label: "Inicio",
        href: "/dashboard/customer",
        icon: "LayoutDashboard",
      },
      {
        label: "Mis Pedidos",
        href: "/dashboard/customer/orders",
        icon: "ShoppingBag",
      },
      {
        label: "Favoritos",
        href: "/dashboard/customer/favorites",
        icon: "Heart",
      },
      {
        label: "Mi Perfil",
        href: "/dashboard/customer/profile",
        icon: "User",
      },
      {
        label: "Direcciones",
        href: "/dashboard/customer/addresses",
        icon: "MapPin",
      },
      {
        label: "Eco Puntos",
        href: "/dashboard/customer/rewards",
        icon: "Award",
      },
    ],
  },
  admin: {
    title: "Administración",
    headerTitle: "Panel de Administración",
    items: [
      {
        label: "Resumen",
        href: "/dashboard/admin",
        icon: "LayoutDashboard",
      },
      {
        label: "Usuarios",
        href: "/dashboard/admin/users",
        icon: "Users",
      },
      {
        label: "Productos",
        href: "/dashboard/admin/products",
        icon: "Package",
      },
      {
        label: "Órdenes",
        href: "/dashboard/admin/orders",
        icon: "ShoppingCart",
      },
      {
        label: "Materiales",
        href: "/dashboard/admin/materials",
        icon: "Hammer",
      },
      {
        label: "Configuración",
        href: "/dashboard/admin/settings",
        icon: "Settings",
      },
    ],
  },
  brand_admin: {
    title: "Mi Marca",
    headerTitle: "Dashboard de Marca",
    items: [
      {
        label: "Resumen",
        href: "/dashboard/brand_admin",
        icon: "LayoutDashboard",
      },
      {
        label: "Mis Productos",
        href: "/dashboard/brand_admin/products",
        icon: "Package",
      },
      {
        label: "Órdenes",
        href: "/dashboard/brand_admin/orders",
        icon: "ShoppingBag",
      },
      {
        label: "Estadísticas",
        href: "/dashboard/brand_admin/stats",
        icon: "BarChart3",
      },
      {
        label: "Mi Marca",
        href: "/dashboard/brand_admin/brand",
        icon: "Store",
      },
      {
        label: "Configuración",
        href: "/dashboard/brand_admin/settings",
        icon: "Settings",
      },
    ],
  },
}

// Helper para obtener el icono de lucide-react por nombre
export const getIconByName = (iconName: string): LucideIcon => {
  const IconComponent = (Icons as any)[iconName]
  return IconComponent || Icons.Circle // fallback a Circle si no existe
}

// Helper para obtener la configuración del dashboard según el rol
export const getDashboardConfig = (role: string): DashboardConfig => {
  return (
    dashboardConfigs[role] || {
      title: "Dashboard",
      headerTitle: "Dashboard",
      items: [],
    }
  )
}
