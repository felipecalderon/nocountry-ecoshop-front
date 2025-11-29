"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"

export function CartBadge() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  const hasHydrated = useCartStore((state) => state.hasHydrated)

  if (!hasHydrated) {
    return null
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold dark:bg-secondary dark:text-secondary-foreground">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  )
}
