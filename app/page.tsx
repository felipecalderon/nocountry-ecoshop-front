import HeroBannerSlider from "./components/home/HeroBannerSlider"
import ProductCard from "./components/product/ProductCard"
import { demoProducts } from "./components/product/demo-products"
import WhyChooseUs from "./components/home/WhyChooseUs"
import NewsletterSubscription from "./components/home/NewsletterSubscription"

export default async function Home() {
  return (
    <div>
      <HeroBannerSlider />
      <div className="flex flex-wrap gap-6 justify-center py-12">
        {demoProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <WhyChooseUs />
      <NewsletterSubscription />
    </div>
  )
}
