"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { MagicCard } from "../ui/magic-card"
import { Product } from "@/types/product.types"
import { ShoppingCart } from "lucide-react"
import { useTransitionRouter } from "next-view-transitions"
import { useCartStore } from "@/stores/cartStore"
import { useState } from "react"

export default function ProductCard({ product }: { product: Product }) {
  const router = useTransitionRouter()
  const { addItem } = useCartStore()

  const goToProduct = () => {
    router.push(`store/${product.id}`)
  }

  const handleAddToCart = () => {
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

  return (
    <Card className="w-full max-w-56 h-full bg-primary/30 dark:bg-secondary/30 border-none p-0 shadow-none hover:shadow-lg hover:scale-105 transition-all">
      <MagicCard className="p-0 text-center h-full">
        <div className="flex flex-col h-full">
          <CardHeader
            className="border-border border-b p-4 [.border-b]:pb-4 dark:bg-secondary/20 rounded-t-2xl-lg cursor-pointer"
            onClick={goToProduct}
            title="Ver detalles del producto"
          >
            <div className="relative">
              <Image
                src={product.image}
                alt={product.imageAltText || product.name}
                width={200}
                height={200}
                className="mx-auto rounded-md"
                style={{ viewTransitionName: `product-image-${product.id}` }}
                unoptimized
              />
              <Button
                className="absolute bottom-4 right-4 w-full dark:bg-white dark:hover:bg-white/80 dark:text-gray-800 text-white font-black cursor-pointer"
                onClick={handleAddToCart}
              >
                Agregar al carrito <ShoppingCart />
              </Button>
            </div>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent className="p-4 bg-primary/20 dark:bg-secondary/50 grow">
            <div className="text-2xl text-red-700 dark:text-white font-black">
              ${product.price} USD
            </div>
          </CardContent>
          {/* 
          <CardFooter className="border-border border-t p-4 [.border-t]:pt-4 dark:bg-secondary/20 ">
            <Button
              className="w-full dark:bg-white dark:hover:bg-white/80 dark:text-gray-800 text-white font-black cursor-pointer"
              onClick={handleAddToCart}
            >
              Agregar al carrito <ShoppingCart />
            </Button>
          </CardFooter> */}
        </div>
      </MagicCard>
    </Card>
  )
}
