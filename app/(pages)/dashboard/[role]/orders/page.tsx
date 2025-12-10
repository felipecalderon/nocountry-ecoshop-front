import OrderList from "@/app/components/orders/order-list"
import { getOrders } from "@/actions/orders"

export default async function OrdersPage() {
  const { data: orders } = await getOrders()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Pedidos</h1>
        <p className="text-muted-foreground mt-2">
          Revisa el estado de tus pedidos y su historial
        </p>
      </div>

      <OrderList orders={orders} />
    </div>
  )
}
