import { Suspense } from "react"
import ClientProducts from "@/app/components/product/ClientProducts"
import { getProducts } from "@/actions/products"
import { Button } from "@/app/components/ui/button"
import { Link } from "next-view-transitions"

export default async function ProductsPage() {
  try {
    const products = await getProducts()
    return (
      <Suspense fallback={<div>Cargando productos...</div>}>
        <ClientProducts initialProducts={products.data || []} />
      </Suspense>
    )
  } catch (error) {
    return (
      <>
        <h2 className="text-2xl font-bold mb-2">Aún no tienes una tienda</h2>
        <p className="text-muted-foreground mb-6">
          Crea y configura tu tienda para poder agregar productos.
        </p>
        <Link href="/dashboard/brand_admin/stores">
          <Button>Crear tienda</Button>
        </Link>
      </>
    )
  }
}
