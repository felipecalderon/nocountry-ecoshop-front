"use client"

import { useEffect, useState } from "react"
import StatsWidget from "@/app/components/dashboard/StatsWidget"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { DollarSign, ShoppingBag, Users, Leaf } from "lucide-react"
import { getDashboardStats } from "@/actions/admin"
import { AdminStatsDto } from "@/types"

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStatsDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardStats()
        if (data) {
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsWidget
          label="Ingresos Totales"
          value={`$${stats?.totalRevenue?.toFixed(2) || "0.00"}`}
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <StatsWidget
          label="Órdenes Totales"
          value={stats?.totalOrders?.toString() || "0"}
          icon={ShoppingBag}
          iconColor="text-blue-600"
        />
        <StatsWidget
          label="Usuarios Totales"
          value={stats?.totalUsers?.toString() || "0"}
          icon={Users}
          iconColor="text-purple-600"
        />
        <StatsWidget
          label="CO₂ Total Ahorrado"
          value={`${stats?.totalCo2Saved || 0} kg`}
          icon={Leaf}
          iconColor="text-green-700"
        />
      </div>

      {/* Welcome Message */}
      <DashboardCard title="Panel de Administración">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Bienvenido al panel de administración de EcoShop
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Aquí puedes ver las estadísticas globales de la plataforma
          </p>
        </div>
      </DashboardCard>
    </div>
  )
}
