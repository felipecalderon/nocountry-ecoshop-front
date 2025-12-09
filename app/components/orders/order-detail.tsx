"use client"

import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Package, Calendar, DollarSign, MapPin, ArrowLeft } from "lucide-react"
import DashboardCard from "../dashboard/DashboardCard"

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product?: {
    name: string
    sku?: string
  }
}

interface Order {
  id: string
  status: string
  totalAmount: number
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}

interface OrderDetailProps {
  order: Order | null
  loading?: boolean
  onBack?: () => void
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

export default function OrderDetail({
  order,
  loading = false,
  onBack,
}: OrderDetailProps) {
  if (loading) {
    return (
      <DashboardCard title="Detalle del Pedido">
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Cargando...</div>
        </div>
      </DashboardCard>
    )
  }

  if (!order) {
    return (
      <DashboardCard title="Detalle del Pedido">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Pedido no encontrado</p>
          {onBack && (
            <Button onClick={onBack} variant="outline" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          )}
        </div>
      </DashboardCard>
    )
  }

  return (
    <DashboardCard
      title={`Pedido #${order.id.slice(0, 8).toUpperCase()}`}
      headerAction={
        onBack && (
          <Button onClick={onBack} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        )
      }
    >
      <div className="space-y-6">
        {/* Order Status */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Estado</p>
            <Badge
              className={statusColors[order.status] || statusColors.pending}
            >
              {statusLabels[order.status] || order.status}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold text-foreground">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Fecha de pedido</p>
            </div>
            <p className="text-foreground">
              {new Date(order.createdAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {order.address && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Dirección de envío</p>
              </div>
              <p className="text-foreground text-sm">
                {order.address.street}
                <br />
                {order.address.city}, {order.address.postalCode}
                <br />
                {order.address.country}
              </p>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Productos</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {item.product?.name ||
                        `Producto ${item.productId.slice(0, 8)}`}
                    </p>
                    {item.product?.sku && (
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.product.sku}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} c/u
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-green-600">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
