"use client"

import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { mockCustomerOrders } from "@/lib/data/mockCustomerData"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Package, Truck, Eye } from "lucide-react"

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const statusLabels = {
  pending: "Pendiente",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
}

export default function CustomerOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Mis Pedidos</h2>
          <p className="text-muted-foreground mt-1">
            Historial completo de tus compras
          </p>
        </div>
      </div>

      <DashboardCard title={`Total: ${mockCustomerOrders.length} pedidos`}>
        <div className="space-y-4">
          {mockCustomerOrders.map((order) => (
            <div
              key={order.id}
              className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-foreground">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.date.toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Badge className={statusColors[order.status]}>
                  {statusLabels[order.status]}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Productos</p>
                  <p className="font-medium text-foreground">
                    {order.itemsCount} artículo{order.itemsCount > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-semibold text-lg text-green-600">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Número de seguimiento
                    </p>
                    <p className="font-medium text-foreground font-mono text-sm">
                      {order.trackingNumber}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver detalles
                </Button>
                {order.trackingNumber && order.status !== "delivered" && (
                  <Button variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Rastrear envío
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    Comprar de nuevo
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}
