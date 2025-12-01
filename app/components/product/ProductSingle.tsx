"use client"

import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { Card, CardContent } from "@/app/components/ui/card"
import AddToCartButton from "./AddToCartButton"
import { Truck, Leaf, Info, Sprout } from "lucide-react"
import { Product } from "@/types/product.types"
import BadgeLevel from "../BadgeLevel"
import BadgeRecyclability from "../BadgeRecyclability"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs"
import Image from "next/image"

export default function ProductSingleClient({ product }: { product: Product }) {
  return (
    <>
      <Card className="border-0 shadow-none">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/product-noimg.jpg"
                  alt={product.imageAltText || product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ viewTransitionName: `product-image-${product.id}` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight">
                {product.name}
              </h1>
              <div className="flex flex-row flex-wrap items-center gap-3">
                <div className="flex flex-row items-center">
                  <Info className="h-5 w-5 mr-2" />
                  <h3 className="text-xl font-semibold">Certificaciones:</h3>
                </div>
                {product.certifications.map((cert) => (
                  <Badge
                    key={cert.id}
                    variant="secondary"
                    className="text-sm p-2 bg-secondary/80"
                  >
                    {cert.name}
                  </Badge>
                ))}
              </div>
              <div className="flex items-baseline space-x-4">
                <p className="text-3xl font-bold text-primary dark:text-secondary">
                  ${product.price.toFixed(2)}
                </p>
                <Badge
                  variant="outline"
                  className="text-xs font-light tracking-wider"
                >
                  SKU: <span className="font-semibold">{product.sku}</span>
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4">
                <BadgeLevel level={product.enviromentalImpact.ecoBadgeLevel} />
                <BadgeRecyclability status={product.recyclabilityStatus} />
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Origen: {product.originCountry}</span>
                </div>
              </div>

              <Separator />

              <p className="text-lg text-gray-600 dark:text-gray-400">
                {product.description.substring(0, 150)}...
              </p>

              <AddToCartButton product={product} />

              {product.stock > 0 && (
                <div className="flex flex-row items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {product.stock} unidades en stock
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-8" />

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full h-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="description">
                Descripción Completa
              </TabsTrigger>
              <TabsTrigger value="materials">Composición Material</TabsTrigger>
              <TabsTrigger value="impact">
                Impacto Ambiental & Cert.
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-4">
              <h3 className="text-2xl font-semibold mb-3 text-center">
                Detalles del Producto
              </h3>
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 text-center">
                {product.description}
              </p>
            </TabsContent>

            <TabsContent value="materials" className="py-4">
              <h3 className="text-2xl font-semibold mb-3 text-center">
                Composición Material
              </h3>
              <ul className="space-y-3">
                {product.materialComposition.map((material) => (
                  <li
                    key={material.id}
                    className="flex max-w-xl justify-between items-center border-b pb-2 last:border-b-0 mx-auto"
                  >
                    <span className="font-medium flex items-center space-x-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          material.isEcoFriendly ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      {material.material}
                    </span>
                    <div className="text-right">
                      <span className="font-bold text-lg">
                        {material.percentage}%
                      </span>
                      <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                        <span title="Huella de Carbono">
                          <Info className="inline h-3 w-3 mr-1" />
                          {material.carbonFootprint} kg CO2e
                        </span>
                        <span title="Uso de Agua">
                          <Info className="inline h-3 w-3 mr-1" />
                          {material.waterUsage} L
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="impact" className="py-4 space-y-6">
              <div className="flex justify-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600" />
                <h3 className="text-xl font-semibold">Impacto Ambiental</h3>
              </div>
              <div className="border p-4 rounded-lg bg-secondary/20 dark:bg-secondary/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
                  <div>
                    <span className="font-medium">Nivel de Eco-Insignia:</span>
                    <BadgeLevel
                      level={product.enviromentalImpact.ecoBadgeLevel}
                    />
                  </div>
                  <div>
                    <span className="font-medium">
                      Estado de Reciclabilidad:
                    </span>
                    <BadgeRecyclability status={product.recyclabilityStatus} />
                  </div>
                  <div>
                    <span className="font-medium">Contenido Reciclado:</span>
                    <Badge variant="outline" className="ml-2">
                      {product.enviromentalImpact.recycledContent}%
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}
