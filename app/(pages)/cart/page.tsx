import EmptyCartItem from "@/app/components/cart/EmptyCartItem"
import { getProducts } from "@/actions/products"
import CartClient from "@/app/components/cart/CartClient"

export default async function CartPage() {
  const { data: products } = await getProducts()
  if (products.length === 0) {
    return <EmptyCartItem />
  }
  return <CartClient allProducts={products} />
}
