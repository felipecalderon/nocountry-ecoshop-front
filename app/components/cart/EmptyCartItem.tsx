import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"

function EmptyCartItem() {
  return (
    <article className="container mx-auto p-8 min-h-[60vh] flex flex-col items-center justify-center">
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
    </article>
  )
}

export default EmptyCartItem
