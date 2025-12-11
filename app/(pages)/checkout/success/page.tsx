"use client"

import Link from "next/link"
import { useEffect } from "react"
import { CheckCircle, Package, Home, Sprout } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { useCartStore } from "@/stores/cartStore"

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <section className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center border-none shadow-none">
          <CardContent className="pt-12 pb-8 space-y-6">
            <header className="flex flex-col justify-center space-y-2">
              <figure className="w-fit rounded-full bg-green-100 dark:bg-green-950 p-6 mx-auto">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
              </figure>
              <h1 className="text-3xl font-bold">¡Pago exitoso!</h1>
              <p className="text-muted-foreground text-lg">
                Tu orden ha sido procesada correctamente
              </p>
            </header>

            <div className="bg-gray-100 rounded-lg p-6 space-y-3 dark:bg-neutral-900/50">
              <p className="text-sm text-muted-foreground dark:text-neutral-100">
                Recibirás un correo electrónico con los detalles de tu compra y
                el número de seguimiento cuando tu pedido sea enviado.
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm font-medium">
                  Gracias por tu compra sostenible
                </p>
                <Sprout className="h-4 w-4" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/dashboard/customer/orders">
                  <Package className="mr-2 h-4 w-4" />
                  Ver mis pedidos
                </Link>
              </Button>
              <Button
                className="dark:hover:text-white"
                variant="outline"
                asChild
                size="lg"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
