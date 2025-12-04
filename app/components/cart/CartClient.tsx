"use client"

import { calculateCartCarbonFootprint } from "@/lib/carbonCalculator"
import { useCartStore } from "@/stores/cartStore"
import { Product } from "@/types"
import CartItemCard from "./CartItemCard"
import CarbonFootprintDisplay from "./CarbonFootprintDisplay"
import { Button } from "../ui/button"
import CartSummary from "./CartSummary"

export default function CartClient({
  allProducts,
}: {
  allProducts: Product[]
}) {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const carbonFootprint = calculateCartCarbonFootprint(items, allProducts)
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
