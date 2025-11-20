import { demoProducts } from "@/app/components/product/demo-products"
import ProductCard from "@/app/components/product/ProductCard"

export default function DemoPage() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {demoProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
