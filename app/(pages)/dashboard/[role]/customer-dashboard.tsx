"use client"

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
import {
  mockCustomerStats,
  mockCustomerOrders,
  mockFavoriteProducts,
  mockRecommendedProducts,
} from "@/lib/data/mockCustomerData"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  delivered:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const statusLabels = {
  pending: "Pendiente",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
}

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsWidget
          label="Total de Pedidos"
          value={mockCustomerStats.totalOrders.toString()}
          icon={ShoppingBag}
          iconColor="text-blue-600"
        />
        <StatsWidget
          label="Total Gastado"
          value={`$${mockCustomerStats.totalSpent}`}
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <StatsWidget
          label="Eco Puntos"
          value={mockCustomerStats.ecoPoints.toString()}
          icon={Award}
          iconColor="text-purple-600"
        />
        <StatsWidget
          label="CO₂ Ahorrado"
          value={`${mockCustomerStats.carbonSaved} kg`}
          icon={Leaf}
          iconColor="text-green-700"
        />
      </div>

      {/* Recent Orders and Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="space-y-4">
            {mockCustomerOrders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.itemsCount} producto{order.itemsCount > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.date.toLocaleDateString("es-AR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    ${order.total.toFixed(2)}
                  </p>
                  <Badge className={statusColors[order.status]}>
                    {statusLabels[order.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Favorites Preview */}
        <DashboardCard
          title="Mis Favoritos"
          headerAction={
            <Link href="/dashboard/customer/favorites">
              <Button variant="ghost" size="sm">
                Ver todos
              </Button>
            </Link>
          }
        >
          <div className="space-y-4">
            {mockFavoriteProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-semibold text-green-600">
                      ${product.price.toFixed(2)}
                    </p>
                    {!product.inStock && (
                      <Badge variant="outline" className="text-xs">
                        Sin stock
                      </Badge>
                    )}
                  </div>
                </div>
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Recommended Products */}
      <DashboardCard
        title="Recomendado para ti"
        headerAction={
          <Button variant="ghost" size="sm">
            Ver más
          </Button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockRecommendedProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-center w-full h-32 bg-primary/10 rounded-lg mb-3">
                <Package className="h-12 w-12 text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h4>
              <div className="flex items-center justify-between mb-3">
                <p className="text-lg font-semibold text-green-600">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-1">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    {product.ecoScore}
                  </span>
                </div>
              </div>
              <Button className="w-full" size="sm">
                Agregar al carrito
              </Button>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Eco Impact Card */}
      <DashboardCard title="Tu Impacto Ecológico">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-green-600 mb-1">
              {mockCustomerStats.carbonSaved} kg
            </p>
            <p className="text-sm text-muted-foreground">CO₂ Ahorrado</p>
          </div>
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-blue-600 mb-1">
              {mockCustomerStats.ecoPoints}
            </p>
            <p className="text-sm text-muted-foreground">Eco Puntos</p>
          </div>
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <ShoppingBag className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-purple-600 mb-1">
              {mockCustomerStats.totalOrders}
            </p>
            <p className="text-sm text-muted-foreground">Compras Sostenibles</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}
