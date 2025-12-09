import ProductSingleClient from "@/app/components/product/ProductSingle"
import { getProduct } from "@/actions/products"

interface PageProps {
  params: Promise<{
    productId: string
  }>
}

export default async function SingleProductPage({ params }: PageProps) {
  const { productId } = await params
  const { data: product } = await getProduct(productId)
  if (!product) return <p>Producto no encontrado</p>
  return <ProductSingleClient product={product} />
}
