import { Suspense } from "react"
import CheckoutClient from "@/app/components/checkout/CheckoutClient"
import { getAddresses } from "@/actions/addresses"

export default async function CheckoutPage() {
  const addressesResponse = await getAddresses()

  return (
    <Suspense
      fallback={
        <section className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <p>Cargando...</p>
        </section>
      }
    >
      <CheckoutClient addresses={addressesResponse.data} />
    </Suspense>
  )
}
