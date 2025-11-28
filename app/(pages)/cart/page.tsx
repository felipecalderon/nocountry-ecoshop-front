"use client"

import { useMemo } from "react"
import { useCartStore } from "@/stores/cartStore"
import EmptyCartItem from "@/app/components/cart/EmptyCartItem"
import CartItemCard from "@/app/components/cart/CartItemCard"
import CartSummary from "@/app/components/cart/CartSummary"
import CarbonFootprintDisplay from "@/app/components/cart/CarbonFootprintDisplay"
import { Button } from "@/app/components/ui/button"
import { demoProducts } from "@/app/components/product/demo-products"
import { calculateCartCarbonFootprint } from "@/lib/carbonCalculator"

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()

  const carbonFootprint = useMemo(() => {
    return calculateCartCarbonFootprint(items, demoProducts)
  }, [items])

  if (items.length === 0) {
    return <EmptyCartItem />
  }

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <section className="container mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Carrito de Compras</h1>
        <p className="text-muted-foreground">
          Tienes {totalItems} {totalItems === 1 ? "producto" : "productos"} en
          tu carrito
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-3">
        <aside className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          <CarbonFootprintDisplay
            footprint={carbonFootprint}
            showBreakdown={true}
          />

          <Button
            variant="outline"
            onClick={clearCart}
            className="w-full dark:hover:text-gray-200 cursor-pointer"
          >
            Vaciar carrito
          </Button>
        </aside>

        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          carbonFootprint={carbonFootprint.totalCO2}
        />
      </section>
    </section>
  )
}
