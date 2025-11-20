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

type ProductProps = { product: Product }
export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="w-full max-w-xs h-full bg-primary/30 border-none p-0 shadow-none hover:shadow-lg hover:scale-105 transition-all">
      <MagicCard className="p-0 text-center flex flex-col h-full">
        <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
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
        <CardContent className="p-4 bg-primary/20">
          <div className="text-2xl text-red-700 font-bold">
            ${product.price} USD
          </div>
        </CardContent>
        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
          <Button className="w-full">
            Agregar al carrito <ShoppingCart />
          </Button>
        </CardFooter>
      </MagicCard>
    </Card>
  )
}
