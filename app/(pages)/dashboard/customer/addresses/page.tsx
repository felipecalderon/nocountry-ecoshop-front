"use client"

import { useState } from "react"
import { Eye, Trash2, Loader2 } from "lucide-react"
import { useAddresses, useAddressMutations } from "@/hooks/useAddresses"
import { useDeleteAddressConfirmation } from "@/hooks/useDeleteAddressConfirmation"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import AddressCardDetails from "@/app/components/addresses/AddressCardDetails"
import AddressesErrorState from "@/app/components/addresses/AddressesErrorState"
import AddressesLoadingState from "@/app/components/addresses/AddressesLoadingState"
import CreateAddressModal from "@/app/components/addresses/CreateAddressModal"
import DeleteConfirmationModal from "@/app/components/addresses/DeleteConfirmationModal"
import EmptyAddressItem from "@/app/components/addresses/EmptyAddressItem"
import {
  addressTypeColors,
  addressTypeLabels,
  addressTypeIcons,
} from "@/lib/data/addressItems"

export default function CustomerAddressesPage() {
  const { addresses, isLoading, isError, refetch } = useAddresses()
  const { deleteAddress } = useAddressMutations()
  const {
    isModalOpen,
    addressToDelete,
    isDeleting,
    openModal,
    closeModal,
    handleConfirm,
  } = useDeleteAddressConfirmation({ onConfirm: deleteAddress })
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  const handleViewDetails = (id: string) => {
    setSelectedAddress(selectedAddress === id ? null : id)
  }

  if (isLoading) return <AddressesLoadingState />

  if (isError) return <AddressesErrorState onRetry={() => refetch()} />

  return (
    <>
      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <aside>
            <h2 className="text-3xl font-bold text-foreground">
              Mis Direcciones
            </h2>
            <p className="text-muted-foreground mt-1">
              Gestiona tus direcciones de envío y facturación
            </p>
          </aside>
          <CreateAddressModal />
        </header>

        {addresses.length > 0 ? (
          <DashboardCard
            title={`Total: ${addresses.length} ${
              addresses.length === 1 ? "dirección" : "direcciones"
            }`}
          >
            <div className="space-y-4">
              {addresses.map((address) => {
                const Icon = addressTypeIcons[address.addressType]
                const isExpanded = selectedAddress === address.id

                return (
                  <article
                    key={address.id}
                    className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <aside className="flex items-center gap-4">
                        <figure className="shrink-0 w-12 h-12 bg-primary/10 dark:bg-secondary rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </figure>
                        <aside>
                          <p className="font-semibold text-lg text-foreground">
                            {address.street}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.postalCode}
                          </p>
                        </aside>
                      </aside>
                      <Badge className={addressTypeColors[address.addressType]}>
                        {addressTypeLabels[address.addressType]}
                      </Badge>
                    </div>

                    {isExpanded && <AddressCardDetails address={address} />}

                    <div className="flex flex-wrap gap-2 [&>button]:cursor-pointer">
                      <Button
                        className="dark:hover:text-white"
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(address.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {isExpanded ? "Ocultar detalles" : "Ver detalles"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(address)}
                        disabled={isLoading || isError}
                        className="hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-100"
                      >
                        {isLoading || isError ? (
                          <Loader2 className="h-4 w-4 mr-2" />
                        ) : (
                          <Trash2 className="h-4 w-4 mr-2" />
                        )}
                        Eliminar
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          </DashboardCard>
        ) : (
          <EmptyAddressItem />
        )}
      </section>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        address={addressToDelete}
        isLoading={isDeleting}
      />
    </>
  )
}
