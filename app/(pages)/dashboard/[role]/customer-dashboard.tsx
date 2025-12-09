"use client"

import { useEffect, useState } from "react"
import StatsWidget from "@/app/components/dashboard/StatsWidget"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import {
  ShoppingBag,
  DollarSign,
  Award,
  Leaf,
  Heart,
  Package,
} from "lucide-react"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"
import { getImpactStats } from "@/actions/users"
import { getOrders } from "@/actions/orders"
import { ImpactStatsDto } from "@/types"

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  delivered:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

const statusLabels = {
  pending: "Pendiente",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  paid: "Pagado",
  completed: "Completado",
}

export default function CustomerDashboard() {
  const [impactStats, setImpactStats] = useState<ImpactStatsDto | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [impactData, ordersData] = await Promise.all([
          getImpactStats(),
          getOrders(),
        ])

        if (impactData?.data) {
          setImpactStats(impactData.data)
        }

        if (ordersData?.data) {
          setOrders(ordersData.data)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
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
          label="Total de Pedidos"
          value={impactStats?.totalOrders?.toString() || "0"}
          icon={ShoppingBag}
          iconColor="text-blue-600"
        />
        <StatsWidget
          label="CO₂ Ahorrado"
          value={`${impactStats?.co2SavedKg || 0} kg`}
          icon={Leaf}
          iconColor="text-green-700"
        />
        <StatsWidget
          label="Árboles Equivalentes"
          value={impactStats?.treesEquivalent?.toString() || "0"}
          icon={Leaf}
          iconColor="text-green-600"
        />
        <StatsWidget
          label="Nivel Eco"
          value={impactStats?.ecoLevel || "🌱 Nuevo"}
          icon={Award}
          iconColor="text-purple-600"
        />
      </div>

      {/* Recent Orders */}
      <DashboardCard
        title="Pedidos Recientes"
        headerAction={
          <Link href="/dashboard/customer/orders">
            <Button variant="ghost" size="sm">
              Ver todos
            </Button>
          </Link>
        }
      >
        {orders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No tienes pedidos aún
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 4).map((order: any) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    Orden #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.items?.length || 0} producto
                    {order.items?.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("es-AR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    ${order.totalAmount?.toFixed(2) || "0.00"}
                  </p>
                  <Badge
                    className={
                      statusColors[order.status as keyof typeof statusColors] ||
                      statusColors.pending
                    }
                  >
                    {statusLabels[order.status as keyof typeof statusLabels] ||
                      order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>

      {/* Eco Impact Card */}
      {impactStats && (
        <DashboardCard title="Tu Impacto Ecológico">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-green-600 mb-1">
                {impactStats.co2SavedKg} kg
              </p>
              <p className="text-sm text-muted-foreground">CO₂ Ahorrado</p>
            </div>
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Leaf className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-blue-600 mb-1">
                {impactStats.treesEquivalent}
              </p>
              <p className="text-sm text-muted-foreground">
                Árboles Equivalentes
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-purple-600 mb-1">
                {impactStats.ecoLevel}
              </p>
              <p className="text-sm text-muted-foreground">Tu Nivel Eco</p>
              {impactStats.nextLevelGoal && (
                <p className="text-xs text-muted-foreground mt-2">
                  Próximo nivel: {impactStats.nextLevelGoal} kg CO₂
                </p>
              )}
            </div>
          </div>
        </DashboardCard>
      )}
    </div>
  )
}
