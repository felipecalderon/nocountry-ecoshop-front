"use client"

import BrandOrders from "@/app/components/brand/brand-orders"

export default function BrandOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Órdenes de Productos</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona las órdenes que contienen tus productos
        </p>
      </div>

      <BrandOrders />
    </div>
  )
}
