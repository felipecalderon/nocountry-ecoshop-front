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
import { Product } from "./product.interface"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

type ProductProps = { product: Product }

export default function ProductCard({ product }: ProductProps) {
  const router = useRouter()
  const goToProduct = () => {
    router.push(`store/${product.id}`)
  }

  return (
    <Card
      className="cursor-pointer w-full max-w-56 h-full bg-primary/30 dark:bg-secondary/30 border-none p-0 shadow-none hover:shadow-lg hover:scale-105 transition-all"
      onClick={goToProduct}
    >
      <MagicCard className="p-0 text-center h-full">
        <div className="flex flex-col h-full">
          <CardHeader className="border-border border-b p-4 [.border-b]:pb-4 dark:bg-secondary/20 rounded-t-2xl-lg">
            <Image
              src="/product-noimg.jpg"
              alt=""
              width={200}
              height={200}
              className="mx-auto rounded-md"
            />
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent className="p-4 bg-primary/20 dark:bg-secondary/50 grow">
            <div className="text-2xl text-red-700 dark:text-white font-black">
              ${product.price} USD
            </div>
          </CardContent>

          <CardFooter className="border-border border-t p-4 [.border-t]:pt-4 dark:bg-secondary/20 ">
            <Button className="w-full dark:bg-white dark:hover:bg-white/80 dark:text-gray-800 text-white font-black">
              Agregar al carrito <ShoppingCart />
            </Button>
          </CardFooter>
        </div>
      </MagicCard>
    </Card>
  )
}
