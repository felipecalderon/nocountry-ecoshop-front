import Image from "next/image"
import HeroBannerSlider from "./components/home/HeroBannerSlider"
import ProductCard from "./components/product/ProductCard"
import { demoProducts } from "./components/product/demo-products"

export default function Home() {
  return (
    <div className="space-y-20">
      <HeroBannerSlider />
      <div className="flex flex-wrap gap-6 justify-center">
        {demoProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
