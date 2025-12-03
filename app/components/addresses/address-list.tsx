"use client"

import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { MapPin, Trash2 } from "lucide-react"
import { deleteAddress } from "@/actions/addresses"

interface Address {
  id: string
  street: string
  city: string | null
  postalCode: string | null
  country: string
  addressType: "shipping" | "billing"
}

interface AddressListProps {
  addresses: Address[]
  loading?: boolean
  onAddressDeleted?: () => void
  onAddNew?: () => void
}

const addressTypeLabels = {
  shipping: "Envío",
  billing: "Facturación",
}

const addressTypeColors = {
  shipping: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  billing:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export default function AddressList({
  addresses,
  loading = false,
  onAddressDeleted,
  onAddNew,
}: AddressListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta dirección?")) {
      return
    }

    try {
      await deleteAddress(id)
      onAddressDeleted?.()
    } catch (error) {
      console.error("Error deleting address:", error)
      alert("Error al eliminar la dirección. Por favor intenta de nuevo.")
    }
  }

  if (loading) {
    return (
      <DashboardCard title="Mis Direcciones">
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Cargando direcciones...</div>
        </div>
      </DashboardCard>
    )
  }

  if (addresses.length === 0) {
    return (
      <DashboardCard
        title="Mis Direcciones"
        headerAction={
          onAddNew && (
            <Button onClick={onAddNew} size="sm">
              Agregar Dirección
            </Button>
          )
        }
      >
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-2">
            No tienes direcciones guardadas
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Agrega una dirección para facilitar tus compras futuras
          </p>
          {onAddNew && <Button onClick={onAddNew}>Agregar Dirección</Button>}
        </div>
      </DashboardCard>
    )
  }

  return (
    <DashboardCard
      title="Mis Direcciones"
      headerAction={
        onAddNew && (
          <Button onClick={onAddNew} size="sm">
            Agregar Dirección
          </Button>
        )
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Badge className={addressTypeColors[address.addressType]}>
                  {addressTypeLabels[address.addressType]}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(address.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">{address.street}</p>
              {address.city && address.postalCode && (
                <p className="text-muted-foreground">
                  {address.city}, {address.postalCode}
                </p>
              )}
              {address.city && !address.postalCode && (
                <p className="text-muted-foreground">{address.city}</p>
              )}
              {!address.city && address.postalCode && (
                <p className="text-muted-foreground">{address.postalCode}</p>
              )}
              <p className="text-muted-foreground">{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
