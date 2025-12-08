import { getProducts } from "@/actions/products"
import CartClient from "@/app/components/cart/CartClient"

export default async function CartPage() {
  const { data: products } = await getProducts()
  return <CartClient allProducts={products} />
}
