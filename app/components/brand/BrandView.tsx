"use client"

import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Brand } from "@/types"
import { Store, Mail, Package, Edit } from "lucide-react"

interface BrandViewProps {
  brand: Brand
}

export function BrandView({ brand }: BrandViewProps) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mi Tienda</CardTitle>
            <CardDescription>Información de la tienda</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-lg bg-muted flex items-center justify-center">
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Store className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{brand.name}</h3>
              <p className="text-muted-foreground">
                {brand.description || "Sin descripción"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/20">
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Propietario</p>
                  <p className="font-medium">{brand.owner.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/20">
                <div className="p-2 rounded-full bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Productos</p>
                  <p className="font-medium text-2xl">
                    {brand.products.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-muted/10">
              <p className="text-sm text-muted-foreground mb-1">Slug</p>
              <p className="font-mono text-sm">{brand.slug}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
