"use client"

import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { getBrandOrders, updateBrandOrderStatus } from "@/actions/brands"
import { Package, Calendar, DollarSign } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import DashboardCard from "../dashboard/DashboardCard"
import { OrderFromUser, OrderItemDto } from "@/types"

const statusColors: Record<string, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  shipped: "Enviado",
  completed: "Completado",
  cancelled: "Cancelado",
}

export default function BrandOrders({ orders }: { orders: OrderFromUser[] }) {
  const [updating, setUpdating] = useState<string | null>(null)

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    try {
      await updateBrandOrderStatus(orderId, { status: newStatus as any })
    } catch (error) {
      console.error("Error updating order status:", error)
      alert("Error al actualizar el estado. Por favor intenta de nuevo.")
    } finally {
      setUpdating(null)
    }
  }

  if (orders.length === 0) {
    return (
      <DashboardCard title="Órdenes de Productos">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-2">
            No hay órdenes aún
          </p>
          <p className="text-sm text-muted-foreground">
            Cuando los clientes compren tus productos, aparecerán aquí
          </p>
        </div>
      </DashboardCard>
    )
  }

  return (
    <DashboardCard title="Órdenes de Productos">
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-primary/20 hover:bg-primary/10 dark:bg-secondary/20 dark:hover:bg-secondary/30 rounded-lg transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                  <p className="font-medium text-foreground">
                    Orden #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("es-AR")}
                    </span>
                  </div>
                  {order.items && (
                    <span>
                      {order.items.length} producto
                      {order.items.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Estado:</span>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order.id, value)
                    }
                    disabled={updating === order.id}
                  >
                    <SelectTrigger className="w-[180px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="paid">Pagado</SelectItem>
                      <SelectItem value="shipped">Enviado</SelectItem>
                      <SelectItem value="completed">Completado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 mb-2 justify-end">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <p className="font-semibold text-foreground text-lg">
                    ${order.totalPrice || "0.00"}
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
