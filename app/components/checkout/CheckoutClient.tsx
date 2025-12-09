"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { useCheckoutStore } from "@/stores/checkoutStore"
import { createOrder } from "@/actions/orders"
import { createCheckoutSession } from "@/actions/payments"
import { Button } from "@/app/components/ui/button"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import AddressSelector from "./AddressSelector"
import CheckoutSummary from "./CheckoutSummary"
import CouponInput from "./CouponInput"
import { Address } from "@/types"

export default function CheckoutClient({
  addresses,
}: {
  addresses: Address[]
}) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { items, clearCart } = useCartStore()
  const {
    selectedAddressId,
    couponCode,
    isProcessing,
    error,
    setIsProcessing,
    setError,
    reset,
  } = useCheckoutStore()

  useEffect(() => {
    setIsMounted(true)
    setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.push("/cart")
    }
  }, [isMounted, items.length, router])

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      setError("Por favor selecciona una dirección de envío")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const orderData = {
        addressId: selectedAddressId,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        ...(couponCode && { couponCode }),
      }

      const orderResponse = await createOrder(orderData)

      const sessionResponse = await createCheckoutSession({
        orderId: orderResponse.data.orderId,
      })

      clearCart()
      reset()

      window.location.href = sessionResponse.data.url
    } catch (err) {
      console.error("Error en checkout:", err)
      setError(
        "Hubo un error al procesar tu pedido. Por favor intenta nuevamente."
      )
      setIsProcessing(false)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isMounted) {
    return (
      <section className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <p>Cargando...</p>
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto p-8">
      <header className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al carrito
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </header>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <section className="grid gap-8 lg:grid-cols-3">
        <aside className="lg:col-span-2 space-y-6">
          <AddressSelector addresses={addresses} />
          <CouponInput />
        </aside>

        <CheckoutSummary
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
          canCheckout={!!selectedAddressId}
        />
      </section>
    </section>
  )
}
