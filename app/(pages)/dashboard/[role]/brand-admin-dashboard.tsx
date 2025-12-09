"use client"

import { useEffect, useState } from "react"
import StatsWidget from "@/app/components/dashboard/StatsWidget"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { DollarSign, ShoppingBag, Package } from "lucide-react"
import { getBrandStats } from "@/actions/brands"
import { BrandStatsDto } from "@/types"

export default function BrandAdminDashboard() {
  const [stats, setStats] = useState<BrandStatsDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBrandStats()
        if (data) {
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching brand stats:", error)
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsWidget
          label="Ingresos Totales"
          value={`$${stats?.totalRevenue?.toFixed(2) || "0.00"}`}
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <StatsWidget
          label="Unidades Vendidas"
          value={stats?.totalUnitsSold?.toString() || "0"}
          icon={Package}
          iconColor="text-blue-600"
        />
        <StatsWidget
          label="Órdenes Recibidas"
          value={stats?.totalOrders?.toString() || "0"}
          icon={ShoppingBag}
          iconColor="text-purple-600"
        />
      </div>

      {/* Welcome Message */}
      <DashboardCard title="Panel de Marca">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Bienvenido al panel de administración de tu marca
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Aquí puedes ver las estadísticas de ventas de tus productos
          </p>
        </div>
      </DashboardCard>
    </div>
  )
}
