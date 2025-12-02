"use client"

import StatsWidget from "@/app/components/dashboard/StatsWidget"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  AlertTriangle,
  Package,
} from "lucide-react"
import {
  mockSalesStats,
  mockRecentSales,
  mockLowStockItems,
  mockTopProducts,
} from "@/lib/data/mockDashboardData"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"

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

const stockStatusColors = {
  in_stock: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  low_stock:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  out_of_stock: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const stockStatusLabels = {
  in_stock: "En Stock",
  low_stock: "Stock Bajo",
  out_of_stock: "Sin Stock",
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsWidget
          label={mockSalesStats[0].label}
          value={mockSalesStats[0].value}
          change={mockSalesStats[0].change}
          trend={mockSalesStats[0].trend}
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <StatsWidget
          label={mockSalesStats[1].label}
          value={mockSalesStats[1].value}
          change={mockSalesStats[1].change}
          trend={mockSalesStats[1].trend}
          icon={ShoppingBag}
          iconColor="text-blue-600"
        />
        <StatsWidget
          label={mockSalesStats[2].label}
          value={mockSalesStats[2].value}
          change={mockSalesStats[2].change}
          trend={mockSalesStats[2].trend}
          icon={Users}
          iconColor="text-purple-600"
        />
        <StatsWidget
          label={mockSalesStats[3].label}
          value={mockSalesStats[3].value}
          change={mockSalesStats[3].change}
          trend={mockSalesStats[3].trend}
          icon={TrendingUp}
          iconColor="text-orange-600"
        />
      </div>

      {/* Recent Sales and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <DashboardCard
          title="Ventas Recientes"
          headerAction={
            <Button variant="ghost" size="sm">
              Ver todas
            </Button>
          }
        >
          <div className="space-y-4">
            {mockRecentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {sale.orderNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {sale.customer}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sale.date.toLocaleDateString("es-AR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    ${sale.total.toFixed(2)}
                  </p>
                  <Badge className={statusColors[sale.status]}>
                    {statusLabels[sale.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Low Stock Alert */}
        <DashboardCard
          title="Alertas de Inventario"
          headerAction={
            <Button variant="ghost" size="sm">
              Ver inventario
            </Button>
          }
        >
          <div className="space-y-4">
            {mockLowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {item.productName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    SKU: {item.sku}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={stockStatusColors[item.status]}>
                      {stockStatusLabels[item.status]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Stock: {item.currentStock}/{item.minStock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Top Products */}
      <DashboardCard
        title="Productos Más Vendidos"
        headerAction={
          <Button variant="ghost" size="sm">
            Ver reporte completo
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {mockTopProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                {product.name}
              </h4>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Ventas: <span className="font-semibold">{product.sales}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Ingresos:{" "}
                  <span className="font-semibold text-green-600">
                    ${product.revenue}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}
