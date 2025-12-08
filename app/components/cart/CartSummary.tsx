import Link from "next/link"
import { ArrowRight, Lightbulb, Sprout } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Separator } from "@/app/components/ui/separator"
import SummaryInfo from "./SummaryInfo"
import { CartSummaryProps } from "@/types"

export default function CartSummary({
  totalItems,
  totalPrice,
  carbonFootprint,
}: CartSummaryProps) {
  const shippingCost = totalPrice > 50 ? 0 : 5
  const finalTotal = totalPrice + shippingCost

  return (
    <section className="lg:col-span-1">
      <article className="border rounded-lg p-6 sticky top-4 space-y-4 dark:bg-gray-800/60">
        <h2 className="text-xl font-bold">Resumen del pedido</h2>

        <Separator />

        <ul className="space-y-3">
          <li className="flex justify-between text-sm">
            <p className="text-muted-foreground">
              Subtotal ({totalItems} items)
            </p>
            <p className="font-medium">${totalPrice.toFixed(2)}</p>
          </li>

          <li className="flex justify-between text-sm">
            <p className="text-muted-foreground">Envío</p>
            <p className="font-medium">
              {shippingCost === 0 ? (
                <span className="text-green-600 font-semibold dark:text-green-200">
                  ¡Gratis!
                </span>
              ) : (
                `$${shippingCost.toFixed(2)}`
              )}
            </p>
          </li>

          {shippingCost > 0 && totalPrice < 50 && (
            <li className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-950 p-2 rounded">
              <Lightbulb className="h-4 w-4 text-yellow-800 dark:text-yellow-200" />
              <small>
                ¡Agrega ${(50 - totalPrice).toFixed(2)} más para envío gratis!
              </small>
            </li>
          )}

          <Separator />

          <li className="space-y-2">
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${finalTotal.toFixed(2)}</p>
            </div>

            {totalItems > 0 && (
              <div className="flex justify-between bg-green-50 dark:bg-green-950 p-2 rounded">
                <aside className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-green-800 dark:text-green-200" />
                  <small>Huella de carbono</small>
                </aside>
                <p className="font-semibold">
                  {carbonFootprint.toFixed(2)} kg CO₂
                </p>
              </div>
            )}
          </li>
        </ul>

        {totalItems > 0 && (
          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout">
              Proceder al pago
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
        <Button
          variant="outline"
          className="w-full dark:hover:text-gray-200"
          asChild
        >
          <Link href="/store">Continuar comprando</Link>
        </Button>

        <SummaryInfo />
      </article>
    </section>
  )
}
