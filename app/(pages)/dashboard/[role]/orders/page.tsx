"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import OrderList from "@/app/components/orders/order-list"
import { getOrders } from "@/actions/orders"

export default function OrdersPage() {
  const params = useParams()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders()
        console.log(data)
        if (data?.data) {
          setOrders(data.data)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mis Pedidos</h1>
        <p className="text-muted-foreground mt-2">
          Revisa el estado de tus pedidos y su historial
        </p>
      </div>

      <OrderList orders={orders} loading={loading} />
    </div>
  )
}
