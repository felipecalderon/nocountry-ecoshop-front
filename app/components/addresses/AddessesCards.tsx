"use client"
import { cn } from "@/lib/utils"
import { Address } from "@/types"
import {
  addressTypeColors,
  addressTypeIcons,
  addressTypeLabels,
} from "@/lib/data/addressItems"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Eye, Loader2, Trash2 } from "lucide-react"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import { useState } from "react"
import AddressCardDetails from "./AddressCardDetails"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

interface DashboardCardProps {
  addresses: Address[]
}

export default function AddessesCards({ addresses }: DashboardCardProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  )

  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-border shadow-sm overflow-hidden"
      )}
    >
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Lista de direcciones
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {addresses.map((address) => {
            const Icon = addressTypeIcons[address.addressType]

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

                <div className="flex flex-wrap gap-2 [&>button]:cursor-pointer">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAddressId(address.id)}
                    className="hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-100"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={address.id}>
                      <AccordionTrigger>
                        <Button className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Button>
                      </AccordionTrigger>
                      <AccordionContent>
                        <AddressCardDetails address={address} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <DeleteConfirmationModal
                  isOpen={selectedAddressId === address.id}
                  onClose={() => setSelectedAddressId(null)}
                  address={address}
                />
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
