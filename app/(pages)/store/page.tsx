import { demoProducts } from "@/lib/data/demo-products"
import ProductCard from "@/app/components/product/ProductCard"
import ProductFilters from "@/app/components/product/ProductFilters"
import {
  EcoBadgeLevel,
  RecyclabilityStatus,
  MaterialComposition,
} from "@/types/product.types"

interface StorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const params = await searchParams
  const name = (params.name as string) || ""
  const sku = (params.sku as string) || ""
  const originCountry = (params.originCountry as string) || ""
  const recyclabilityStatus = (params.recyclabilityStatus as string) || ""
  const ecoBadgeLevel = (params.ecoBadgeLevel as string) || ""
  const material = (params.material as string) || ""

  const filteredProducts = demoProducts.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(name.toLowerCase())
    const matchesSku = product.sku.toLowerCase().includes(sku.toLowerCase())
    const matchesCountry = product.originCountry
      .toLowerCase()
      .includes(originCountry.toLowerCase())
    const matchesRecyclability =
      !recyclabilityStatus ||
      product.recyclabilityStatus ===
        (recyclabilityStatus as RecyclabilityStatus)
    const matchesEcoBadge =
      !ecoBadgeLevel ||
      product.enviromentalImpact.ecoBadgeLevel ===
        (ecoBadgeLevel as EcoBadgeLevel)
    const matchesMaterial =
      !material ||
      product.materialComposition.some((m: MaterialComposition) =>
        m.name.toLowerCase().includes(material.toLowerCase())
      )

    return (
      matchesName &&
      matchesSku &&
      matchesCountry &&
      matchesRecyclability &&
      matchesEcoBadge &&
      matchesMaterial
    )
  })

  return (
    <div className="flex flex-col md:flex-row gap-8 px-4">
      <aside className="w-full md:w-auto">
        <ProductFilters />
      </aside>
      <div className="flex-1">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="text-center w-full py-10 text-muted-foreground">
              No se encontraron productos con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
