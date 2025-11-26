import HeroBannerSlider from "./components/home/HeroBannerSlider"
import ProductCard from "./components/product/ProductCard"
import { demoProducts } from "./components/product/demo-products"
import WhyChooseUs from "./components/home/WhyChooseUs"
import NewsletterSubscription from "./components/home/NewsletterSubscription"
import { auth0 } from "@/lib/auth0"

export default async function Home() {
  const session = await auth0.getSession()
  console.log(session)
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
