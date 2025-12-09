import { Suspense } from "react"
import { getProduct } from "@/actions/products"
import ProductForm from "@/app/components/product/ProductForm"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params

  try {
    const response = await getProduct(id)
    const product = response?.data

    if (!product) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="text-xl font-bold text-red-500">
            Producto no encontrado
          </h2>
          <p className="text-muted-foreground">
            No se pudo cargar la información del producto.
          </p>
        </div>
      )
    }

    return (
      <Suspense
        fallback={<div className="p-8 text-center">Cargando formulario...</div>}
      >
        <ProductForm initialData={product} />
      </Suspense>
    )
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-red-500">Error</h2>
        <p className="text-muted-foreground">
          Ocurrió un error al cargar el producto.
        </p>
      </div>
    )
  }
}
