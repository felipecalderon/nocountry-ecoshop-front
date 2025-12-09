"use client"

import { Loader2, CreditCard } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Separator } from "@/app/components/ui/separator"
import { useCartStore } from "@/stores/cartStore"

interface CheckoutSummaryProps {
  onCheckout: () => void
  isProcessing: boolean
  canCheckout: boolean
}

export default function CheckoutSummary({
  onCheckout,
  isProcessing,
  canCheckout,
}: CheckoutSummaryProps) {
  const { items, getTotalPrice } = useCartStore()
  const totalItems = useCartStore((state) => state.getTotalItems())

  const totalPrice = getTotalPrice()
  const shippingCost = totalPrice > 50 ? 0 : 5
  const finalTotal = totalPrice + shippingCost

  return (
    <Card className="lg:col-span-1 sticky top-4">
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
                <span className="text-green-600 dark:text-green-400">
                  ¡Gratis!
                </span>
              ) : (
                `$${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <Button
            onClick={onCheckout}
            disabled={!canCheckout || isProcessing}
            className={`w-full ${
              !canCheckout || isProcessing
                ? "cursor-not-allowed"
                : "cursor-pointer dark:hover:text-white"
            }`}
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pagar con Stripe
              </>
            )}
          </Button>

          {!canCheckout && (
            <p className="text-sm text-center text-muted-foreground">
              Selecciona una dirección de envío para continuar
            </p>
          )}
        </div>

        <div className="pt-4 border-t">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Productos:</h4>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-muted-foreground"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
