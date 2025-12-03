"use client"

import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { Package, Calendar, DollarSign } from "lucide-react"

interface Order {
  id: string
  status: string
  totalAmount: number
  createdAt: string
  items?: any[]
}

interface OrderListProps {
  orders: Order[]
  loading?: boolean
  onOrderClick?: (orderId: string) => void
}

const statusColors: Record<string, string> = {
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

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  paid: "Pagado",
  completed: "Completado",
}

export default function OrderList({
  orders,
  loading = false,
  onOrderClick,
}: OrderListProps) {
  if (loading) {
    return (
      <DashboardCard title="Mis Pedidos">
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Cargando pedidos...</div>
        </div>
      </DashboardCard>
    )
  }

  if (orders.length === 0) {
    return (
      <DashboardCard title="Mis Pedidos">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-2">
            No tienes pedidos aún
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Cuando realices tu primera compra, aparecerá aquí
          </p>
          <Button>Ir a la tienda</Button>
        </div>
      </DashboardCard>
    )
  }

  return (
    <DashboardCard title="Mis Pedidos">
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => onOrderClick?.(order.id)}
            className={`p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors ${
              onOrderClick ? "cursor-pointer" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <p className="font-medium text-foreground">
                    Orden #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {order.items && (
                    <span>
                      {order.items.length} producto
                      {order.items.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              {/* Price and Status */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 mb-2 justify-end">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <p className="font-semibold text-foreground text-lg">
                    ${order.totalAmount?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <Badge
                  className={statusColors[order.status] || statusColors.pending}
                >
                  {statusLabels[order.status] || order.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
