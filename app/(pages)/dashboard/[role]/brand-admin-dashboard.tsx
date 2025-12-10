"use client"

import { useEffect, useState } from "react"
import StatsWidget from "@/app/components/dashboard/StatsWidget"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { DollarSign, ShoppingBag, Package } from "lucide-react"
import { getBrandOrders, getBrandStats } from "@/actions/brands"
import { BrandStatsDto, OrderFromUser } from "@/types"
import BrandOrders from "@/app/components/brand/brand-orders"

export default function BrandAdminDashboard() {
  const [stats, setStats] = useState<BrandStatsDto | null>(null)
  const [orders, setOrders] = useState<OrderFromUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBrandStats()
        const ordersData = await getBrandOrders()
        if (data) {
          setStats(data)
        }
        if (ordersData) {
          setOrders(ordersData.data)
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

      <BrandOrders orders={orders} />
    </div>
  )
}
