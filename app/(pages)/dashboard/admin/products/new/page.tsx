import { Suspense } from "react"
import ProductForm from "@/app/components/product/ProductForm"

export default function NewProductPage() {
  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
      <ProductForm />
    </Suspense>
  )
}
