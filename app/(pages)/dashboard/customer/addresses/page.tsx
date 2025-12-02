"use client"

import { useEffect, useState } from "react"
import { MapPin, Eye, Trash2, Plus, Home, Package, Loader2 } from "lucide-react"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Address } from "@/types"
import { deleteAddress, getAddresses } from "@/actions/addresses"
import { toast } from "sonner"

const addressTypeLabels = {
  shipping: "Envío",
  billing: "Facturación",
}

const addressTypeColors = {
  shipping: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  billing:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

const addressTypeIcons = {
  shipping: Package,
  billing: Home,
}

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadAddresses()
  }, [])

  const loadAddresses = async () => {
    try {
      setLoading(true)
      const response = await getAddresses()

      setAddresses(response.data)
    } catch (error) {
      toast.error("No se pudieron cargar las direcciones")
      console.error("Error loading addresses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
      return
    }

    try {
      setDeleting(id)
      await deleteAddress(id)
      setAddresses(addresses.filter((addr) => addr.id !== id))
      if (selectedAddress?.id === id) {
        setSelectedAddress(null)
      }
      toast.success("Dirección eliminada correctamente")
    } catch (error) {
      toast.error("No se pudo eliminar la dirección")
      console.error("Error deleting address:", error)
    } finally {
      setDeleting(null)
    }
  }

  const handleViewDetails = (address: Address) => {
    setSelectedAddress(selectedAddress?.id === address.id ? null : address)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Mis Direcciones
          </h2>
          <p className="text-muted-foreground mt-1">
            Gestiona tus direcciones de envío y facturación
          </p>
        </div>
        <Button className="dark:bg-secondary dark:hover:bg-secondary/80 dark:text-white cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Nueva dirección
        </Button>
      </div>

      {addresses.length > 0 ? (
        <DashboardCard
          title={`Total: ${addresses.length} ${
            addresses.length === 1 ? "dirección" : "direcciones"
          }`}
        >
          <div className="space-y-4">
            {addresses.map((address) => {
              const Icon = addressTypeIcons[address.addressType]
              const isExpanded = selectedAddress?.id === address.id

              return (
                <div
                  key={address.id}
                  className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-12 h-12 bg-primary/10 dark:bg-secondary rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-foreground">
                          {address.street}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.postalCode}
                        </p>
                      </div>
                    </div>
                    <Badge className={addressTypeColors[address.addressType]}>
                      {addressTypeLabels[address.addressType]}
                    </Badge>
                  </div>

                  {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted-foreground/10 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Calle</p>
                        <p className="font-medium text-foreground">
                          {address.street}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ciudad</p>
                        <p className="font-medium text-foreground">
                          {address.city}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Código Postal
                        </p>
                        <p className="font-medium text-foreground">
                          {address.postalCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">País</p>
                        <p className="font-medium text-foreground">
                          {address.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tipo</p>
                        <p className="font-medium text-foreground">
                          {addressTypeLabels[address.addressType]}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 [&>button]:cursor-pointer">
                    <Button
                      className="dark:hover:text-white"
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(address)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {isExpanded ? "Ocultar detalles" : "Ver detalles"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                      disabled={deleting === address.id}
                      className="hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-100"
                    >
                      {deleting === address.id ? (
                        <Loader2 className="h-4 w-4 mr-2" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Eliminar
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </DashboardCard>
      ) : (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No tienes direcciones guardadas
          </h3>
          <p className="text-muted-foreground mb-6">
            Agrega una dirección para facilitar tus compras
          </p>
          <Button className="dark:bg-secondary dark:hover:bg-secondary/80 dark:text-white cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Agregar dirección
          </Button>
        </div>
      )}
    </div>
  )
}
