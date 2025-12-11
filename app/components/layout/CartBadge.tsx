"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"

export function CartBadge() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  const hasHydrated = useCartStore((state) => state.hasHydrated)

  if (!hasHydrated) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/cart">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-secondary dark:text-white hover:bg-secondary hover:text-white cursor-pointer bg-transparent dark:hover:text-white dark:bg-transparent dark:hover:bg-secondary"
          >
            <ShoppingCart className="h-8 w-8" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold dark:bg-secondary dark:text-secondary-foreground">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Ver Carrito</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        <p>Ver Carrito</p>
      </TooltipContent>
    </Tooltip>
  )
}
