"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { Button } from "../ui/button"
import { CartItemCardProps } from "@/types/cart.types"

function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <section className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-800/60">
      <figure className="shrink-0">
        <Image
          src={item.image}
          alt={item.imageAltText}
          width={96}
          height={96}
          className="rounded-md object-cover"
        />
      </figure>

      <div className="flex-1 min-w-0">
        <Link href={`/store/${item.id}`} title="Ver producto">
          <h2 className="font-semibold hover:text-primary transition-colors truncate">
            {item.name}
          </h2>
        </Link>
        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
        <p className="text-lg font-bold mt-1">${item.price} USD</p>
      </div>

      <div className="flex items-center gap-2 [&>button]:cursor-pointer [&>button]:dark:hover:text-gray-300">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Decrement quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-10 text-center font-semibold">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.maxStock}
          aria-label="Increment quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right min-w-20">
        <p className="text-sm text-muted-foreground">Subtotal</p>
        <p className="font-bold">
          ${(Number(item.price) * item.quantity).toFixed(2)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.id)}
        className="text-destructive hover:text-destructive hover:bg-gray-200 dark:text-red-400 dark:hover:text-gray-200 cursor-pointer"
        aria-label="Remove item from cart"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </section>
  )
}

export default CartItemCard
