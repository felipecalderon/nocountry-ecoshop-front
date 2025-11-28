"use client"

import { CartItem } from "@/stores/cartStore"
import { useCartStore } from "@/stores/cartStore"
import { Button } from "../ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow">
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <Image
          src={item.image}
          alt={item.imageAltText}
          width={96}
          height={96}
          className="rounded-md object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.slug}`}>
          <h3 className="font-semibold hover:text-primary transition-colors truncate">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
        <p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-10 text-center font-semibold">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.maxStock}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right min-w-20">
        <p className="text-sm text-muted-foreground">Subtotal</p>
        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.id)}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
