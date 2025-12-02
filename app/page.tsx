import HeroBannerSlider from "./components/home/HeroBannerSlider"
import ProductCard from "./components/product/ProductCard"
import { demoProducts } from "../lib/data/demo-products"
import WhyChooseUs from "./components/home/WhyChooseUs"
import NewsletterSubscription from "./components/home/NewsletterSubscription"
import { Button } from "./components/ui/button"
import Link from "next/link"

export default async function Home() {
  return (
    <div>
      <HeroBannerSlider />
      <div className="flex flex-wrap gap-6 justify-center py-12">
        {demoProducts
          .map((p) => <ProductCard key={p.id} product={p} />)
          .slice(0, 5)}
      </div>
      <div className="flex justify-center mb-10">
        <Link href="/store">
          <Button>Ver todos los productos</Button>
        </Link>
      </div>
      <WhyChooseUs />
      <NewsletterSubscription />
    </div>
  )
}
