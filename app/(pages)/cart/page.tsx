"use client"

import Link from "next/link"
import { useMemo } from "react"
import { ShoppingBag, ArrowRight } from "lucide-react"
import CarbonFootprintDisplay from "@/app/components/cart/CarbonFootprintDisplay"
import { useCartStore } from "@/stores/cartStore"
import { CartItemCard } from "@/app/components/cart/CartItemCard"
import { Button } from "@/app/components/ui/button"
import { Separator } from "@/app/components/ui/separator"
import { demoProducts } from "@/app/components/product/demo-products"
import { calculateCartCarbonFootprint } from "@/lib/carbonCalculator"

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()

  const carbonFootprint = useMemo(() => {
    return calculateCartCarbonFootprint(items, demoProducts)
  }, [items])

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-8 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-6">
          Agrega productos para comenzar tu compra sostenible
        </p>
        <Button asChild size="lg">
          <Link href="/store">
            Explorar productos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  }

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  const shippingCost = totalPrice > 50 ? 0 : 5
  const finalTotal = totalPrice + shippingCost

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Carrito de Compras</h1>
        <p className="text-muted-foreground">
          Tienes {totalItems} {totalItems === 1 ? "producto" : "productos"} en
          tu carrito
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          <CarbonFootprintDisplay
            footprint={carbonFootprint}
            showBreakdown={true}
          />

          <Button variant="outline" onClick={clearCart} className="w-full">
            Vaciar carrito
          </Button>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4 space-y-4">
            <h2 className="text-xl font-bold">Resumen del pedido</h2>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-medium">
                  {shippingCost === 0 ? (
                    <span className="text-green-600 font-semibold">
                      ¡Gratis!
                    </span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              {shippingCost > 0 && totalPrice < 50 && (
                <p className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-950 p-2 rounded">
                  💡 ¡Agrega ${(50 - totalPrice).toFixed(2)} más para envío
                  gratis!
                </p>
              )}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground bg-green-50 dark:bg-green-950 p-2 rounded">
                  <span>🌱 Huella de carbono</span>
                  <span className="font-semibold">
                    {carbonFootprint.totalCO2.toFixed(2)} kg CO₂
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">
                Proceder al pago
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/store">Continuar comprando</Link>
            </Button>

            <div className="pt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Envío sostenible con packaging reciclable</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Compra segura y protegida</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>30 días para devoluciones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
