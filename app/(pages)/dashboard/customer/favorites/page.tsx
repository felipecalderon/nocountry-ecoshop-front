"use client"

import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { mockFavoriteProducts } from "@/lib/data/mockCustomerData"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Heart, ShoppingCart, Leaf, Trash2 } from "lucide-react"

export default function CustomerFavoritesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Mis Favoritos</h2>
          <p className="text-muted-foreground mt-1">
            Productos que te encantan
          </p>
        </div>
      </div>

      <DashboardCard
        title={`${mockFavoriteProducts.length} productos guardados`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFavoriteProducts.map((product) => (
            <div
              key={product.id}
              className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  <Leaf className="h-12 w-12 text-primary" />
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-2xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {product.ecoScore}
                    </span>
                  </div>
                </div>

                {!product.inStock && (
                  <Badge
                    variant="outline"
                    className="mb-3 bg-red-50 dark:bg-red-900/20 text-red-600 border-red-200"
                  >
                    Sin stock
                  </Badge>
                )}

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    size="sm"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Agregar" : "No disponible"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Empty state (opcional, para cuando no hay favoritos) */}
      {mockFavoriteProducts.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No tienes favoritos aún
          </h3>
          <p className="text-muted-foreground mb-6">
            Explora nuestros productos y guarda tus favoritos aquí
          </p>
          <Button>Explorar productos</Button>
        </div>
      )}
    </div>
  )
}
