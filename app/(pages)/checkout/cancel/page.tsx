import Link from "next/link"
import { XCircle, ShoppingCart, Home } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"

export default function CheckoutCancelPage() {
  return (
    <section className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center border-none shadow-none">
          <CardContent className="pt-12 pb-8 space-y-6">
            <header className="flex flex-col justify-center space-y-2">
              <figure className="w-fit rounded-full bg-yellow-100 dark:bg-yellow-950 p-6 mx-auto">
                <XCircle className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
              </figure>
              <h1 className="text-3xl font-bold">Pago cancelado</h1>
              <p className="text-muted-foreground text-lg">
                Tu pedido no ha sido procesado
              </p>
            </header>

            <p className="text-sm bg-gray-100 dark:bg-neutral-900/40 px-6 p-4 rounded-lg">
              No se ha realizado ningún cargo a tu cuenta. Tu carrito sigue
              disponible y puedes intentar nuevamente cuando estés listo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/cart">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Volver al carrito
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
