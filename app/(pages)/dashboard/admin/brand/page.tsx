import { getMyBrands } from "@/actions/brands"
import CreateBrand from "@/app/components/brand/create-brand"
import { BrandManager } from "@/app/components/brand/BrandManager"

export default async function MyBrandPage() {
  const brands = await getMyBrands()

  if (!brands.data) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mi Tienda</h1>
          <p className="text-muted-foreground">
            Aún no tienes una tienda creada. ¡Crea una para empezar a vender!
          </p>
        </div>
        <CreateBrand />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <BrandManager initialBrand={brands.data} />
    </div>
  )
}
