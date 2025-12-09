"use client"

import { useEffect } from "react"
import { useProductStore } from "@/stores/useProductStore"
import { Product } from "@/types"
import { Plus } from "lucide-react"
import Link from "next/link"

interface ClientProductsProps {
  initialProducts: Product[]
}

export default function ClientProducts({
  initialProducts,
}: ClientProductsProps) {
  const { products, setProducts } = useProductStore()

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts, setProducts])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona el catálogo de productos
          </p>
        </div>
        <Link
          href="/dashboard/admin/products/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 pt-0 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold leading-none tracking-tight">
                  {product.name}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {product.sku}
                </span>
              </div>
              <div className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {product.description}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">${product.price}</span>
                <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                  {product.stock} unid.
                </span>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No hay productos registrados. ¡Crea el primero!
          </div>
        )}
      </div>
    </div>
  )
}
