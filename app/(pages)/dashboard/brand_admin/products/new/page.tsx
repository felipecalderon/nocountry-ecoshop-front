import { Suspense } from "react"
import ProductForm from "@/app/components/product/ProductForm"
import { getMaterials } from "@/actions/materials"
import { getCertifications } from "@/actions/certifications"

export default async function NewProductPage() {
  const materialsData = getMaterials()
  const certificationsData = getCertifications()

  const [materials, certifications] = await Promise.all([
    materialsData,
    certificationsData,
  ])

  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
      <ProductForm
        materials={materials.data || []}
        certifications={certifications.data || []}
      />
    </Suspense>
  )
}
