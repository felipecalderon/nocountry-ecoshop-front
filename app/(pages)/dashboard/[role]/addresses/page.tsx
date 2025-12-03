"use client"

import { useEffect, useState } from "react"
import AddressList from "@/app/components/addresses/address-list"
import AddressForm from "@/app/components/addresses/address-form"
import { getAddresses } from "@/actions/addresses"
import { Button } from "@/app/components/ui/button"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses()
      if (data?.data) {
        setAddresses(data.data)
      }
    } catch (error) {
      console.error("Error fetching addresses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleSuccess = () => {
    setShowForm(false)
    fetchAddresses()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mis Direcciones</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tus direcciones de envío y facturación
          </p>
        </div>
        {!showForm && addresses.length > 0 && (
          <Button onClick={() => setShowForm(true)}>Agregar Dirección</Button>
        )}
      </div>

      {showForm ? (
        <AddressForm
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <AddressList
          addresses={addresses}
          loading={loading}
          onAddressDeleted={fetchAddresses}
          onAddNew={() => setShowForm(true)}
        />
      )}
    </div>
  )
}
