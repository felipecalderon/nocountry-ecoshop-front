import { getMyBrands } from "@/actions/brands"
import CreateBrand from "@/app/components/brand/create-brand"

export default async function StoresPage() {
  const brands = await getMyBrands()

  if (!brands.data) {
    return (
      <div>
        <h1 className="text-xl font-bold mb-6">
          Por ahora no tienes una tienda creada, haz una!
        </h1>
        <CreateBrand />
      </div>
    )
  }
  return (
    <div>
      <h1>Mi tienda</h1>
      <p>{brands.data.name}</p>
      <p>{brands.data.description}</p>
      <p>{brands.data.logoUrl}</p>
      <p>{brands.data.owner.email}</p>
      <p>Productos: {brands.data.products.length}</p>
    </div>
  )
}
