import { getBrandOrders } from "@/actions/brands"
import BrandOrders from "@/app/components/brand/brand-orders"

export default async function BrandOrdersPage() {
  const { data } = await getBrandOrders()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Órdenes de Productos</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona las órdenes que contienen tus productos
        </p>
      </div>

      <BrandOrders orders={data} />
    </div>
  )
}
