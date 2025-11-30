import { getProductById } from "@/actions/products"
import { demoProducts } from "@/lib/data/demo-products"
import ProductSingleClient from "@/app/components/product/ProductSingle"

interface PageProps {
  params: Promise<{
    productId: string
  }>
}

export default async function SingleProductPage({ params }: PageProps) {
  const { productId } = await params
  // const product = await getProductById(productId)
  const product = demoProducts.find((p) => p.id === productId)
  if (!product) return <p>Producto no encontrado</p>
  return <ProductSingleClient product={product} />
}
