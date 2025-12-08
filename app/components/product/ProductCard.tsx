"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Product, RecyclabilityStatus } from "@/types/product.types"
import { useTransitionRouter } from "next-view-transitions"
import { useCartStore } from "@/stores/cartStore"
import { toast } from "sonner"
import { MagicCard } from "../ui/magic-card"
import { Leaf, MapPin, Package, Recycle, ShoppingCart } from "lucide-react"

const ecoBadgeConfig = {
  LOW: {
    label: "Eco Bajo",
    className:
      "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/50",
    icon: "🌱",
  },
  MEDIUM: {
    label: "Eco Medio",
    className:
      "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/50",
    icon: "🌿",
  },
  HIGH: {
    label: "Eco Alto",
    className:
      "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/50",
    icon: "🌳",
  },
}

// Configuración para estados de reciclabilidad
const recyclabilityConfig = {
  [RecyclabilityStatus.NOT_APPLICABLE]: {
    label: "N/A",
    className: "bg-gray-500/20 text-gray-700 dark:text-gray-300",
  },
  [RecyclabilityStatus.NOT_RECYCLABLE]: {
    label: "No Reciclable",
    className: "bg-red-500/20 text-red-700 dark:text-red-300",
  },
  [RecyclabilityStatus.PARTIALLY_RECYCLABLE]: {
    label: "Parcialmente",
    className: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  },
  [RecyclabilityStatus.FULLY_RECYCLABLE]: {
    label: "100% Reciclable",
    className: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  },
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useTransitionRouter()
  const { addItem } = useCartStore()

  const goToProduct = () => {
    router.push(`store/${product.id}`)
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toast.success(`Agregado ${product.name} al carrito`)
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      imageAltText: product.imageAltText,
      price: product.price,
      maxStock: product.stock,
      sku: product.sku,
    })
  }

  const ecoBadge = ecoBadgeConfig[product.environmentalImpact.ecoBadgeLevel]
  const recyclability = recyclabilityConfig[product.recyclabilityStatus] || {
    label: "N/A",
    className: "bg-gray-500/20 text-gray-700 dark:text-gray-300",
  }
  const isLowStock = product.stock > 0 && product.stock <= 5
  const isOutOfStock = product.stock === 0

  return (
    <Card className="w-full max-w-72 h-full bg-primary/30 dark:bg-secondary/30 border-none p-0 shadow-none hover:shadow-lg hover:scale-[1.02] transition-all">
      <MagicCard className="p-0 h-full">
        <div className="flex flex-col h-full">
          {/* Header con imagen y badges */}
          <CardHeader
            className="border-border border-b p-4 dark:bg-secondary/20 rounded-t-lg cursor-pointer relative"
            onClick={goToProduct}
          >
            {/* Badges superiores */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              <Badge
                className={`${ecoBadge.className} text-xs font-semibold border`}
              >
                <Leaf className="w-3 h-3 mr-1" />
                {ecoBadge.label}
              </Badge>

              {isOutOfStock && (
                <Badge className="bg-red-600 text-white text-xs font-semibold">
                  Sin Stock
                </Badge>
              )}
              {isLowStock && (
                <Badge className="bg-orange-600 text-white text-xs font-semibold">
                  ¡Últimas {product.stock}!
                </Badge>
              )}
            </div>

            {/* Imagen del producto */}
            <div className="relative mt-8 mb-3 w-full aspect-square rounded-md bg-muted/20">
              <Image
                src={product.image}
                alt={product.imageAltText || product.name}
                fill
                className="object-cover rounded-md"
                style={{ viewTransitionName: `product-image-${product.id}` }}
                unoptimized
              />

              {/* Certificaciones como medallas - Superior derecha */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="absolute z-50  -top-2 -left-2 z-10 flex flex-col gap-1">
                  {product.certifications.slice(0, 3).map((cert, index) => (
                    <div
                      key={cert.id}
                      className="w-12 h-12 rounded-full bg-white dark:bg-secondary border-2 border-primary dark:border-lime-500 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      title={cert.name}
                      style={{
                        animation: `swing 2s ease-in-out ${
                          index * 0.2
                        }s infinite`,
                      }}
                    >
                      <Image
                        src={cert.badgeUrl}
                        alt={cert.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                        unoptimized
                      />
                    </div>
                  ))}
                  {product.certifications.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-primary/80 dark:bg-lime-500/80 border-2 border-primary/30 dark:border-lime-500/50 flex items-center justify-center shadow-md text-[10px] font-bold text-white">
                      +{product.certifications.length - 3}
                    </div>
                  )}
                </div>
              )}

              {/* Botón agregar al carrito */}
              <Button
                className="absolute hover:scale-110 z-50 w-12 h-12 -bottom-3 -right-3 dark:bg-lime-500 dark:hover:bg-lime-400 bg-green-600 hover:bg-green-500 text-white font-black cursor-pointer shadow-lg rounded-full"
                onClick={handleAddToCart}
                title="Agregar al carrito"
                disabled={isOutOfStock}
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>

            {/* Título y descripción */}
            <CardTitle className="text-base line-clamp-2 min-h-[3rem]">
              {product.name}
            </CardTitle>
            <CardDescription className="text-xs line-clamp-2 min-h-[2.5rem]">
              {product.description}
            </CardDescription>
          </CardHeader>

          {/* Content con información adicional */}
          <CardContent className="p-4 bg-primary/20 dark:bg-secondary/50 flex-grow space-y-3">
            {/* Precio */}
            <div className="text-2xl text-red-700 dark:text-lime-400 font-black text-center">
              ${product.price} USD
            </div>

            {/* Información ecológica */}
            <div className="space-y-2 text-xs">
              {/* País de origen */}
              <div className="flex items-center gap-2 ">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{product.originCountry}</span>
              </div>

              {/* Reciclabilidad */}
              <div className="flex items-center gap-2">
                <Recycle className="w-3 h-3 flex-shrink-0 " />
                <Badge
                  className={`${recyclability.className} text-[10px] px-2 py-0`}
                >
                  {recyclability.label}
                </Badge>
              </div>

              {/* Contenido reciclado */}
              {product.environmentalImpact.recycledContent > 0 && (
                <div className="flex items-center gap-2 ">
                  <Package className="w-3 h-3 flex-shrink-0" />
                  <span>
                    {product.environmentalImpact.recycledContent}% reciclado
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </MagicCard>
    </Card>
  )
}
