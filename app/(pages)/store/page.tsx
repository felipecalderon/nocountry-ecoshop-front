import { demoProducts } from "@/app/components/product/demo-products"
import ProductCard from "@/app/components/product/ProductCard"

export default function StorePage() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {demoProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
