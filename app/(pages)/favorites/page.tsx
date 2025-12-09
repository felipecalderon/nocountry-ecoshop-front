import { getProducts } from "@/actions/products"
import FavoritesClient from "@/app/components/product/FavoritesClient"

export default async function FavoritesPage() {
  const { data: products } = await getProducts()

  return <FavoritesClient products={products} />
}
