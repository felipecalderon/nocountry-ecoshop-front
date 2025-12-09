"use client"

import { useState } from "react"
import { Eye, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  addressTypeColors,
  addressTypeIcons,
  addressTypeLabels,
} from "@/lib/data/addressItems"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import AddressCardDetails from "./AddressCardDetails"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Address } from "@/types"

export default function AddessesCards({ addresses }: { addresses: Address[] }) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  )

  return (
    <section
      className={cn(
        "bg-card rounded-lg border border-border shadow-sm overflow-hidden"
      )}
    >
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Lista de direcciones
        </h3>
      </div>

      <div className="space-y-4 p-6">
        {addresses.map((address) => {
          const Icon = addressTypeIcons[address.addressType]

          return (
            <article
              key={address.id}
              className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4 mb-4">
                <section className="flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <figure className="shrink-0 w-12 h-12 bg-primary/10 dark:bg-secondary rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </figure>
                    <div>
                      <p className="font-semibold sm:text-lg text-foreground">
                        {address.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="sm:hidden">
                    <Badge className={addressTypeColors[address.addressType]}>
                      {addressTypeLabels[address.addressType]}
                    </Badge>
                  </div>
                </section>

                <aside className="flex flex-col sm:items-end gap-2">
                  <Badge
                    className={`hidden sm:flex ${
                      addressTypeColors[address.addressType]
                    }`}
                  >
                    {addressTypeLabels[address.addressType]}
                  </Badge>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAddressId(address.id)}
                    className="hover:text-red-700 hover:bg-red-50 dark:hover:bg-neutral-900/60 dark:hover:text-red-100 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </aside>
              </div>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value={address.id} className="border-0">
                  <AccordionTrigger className="bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/20 hover:no-underline py-2 px-4 cursor-pointer">
                    <span className="flex items-center text-sm font-medium">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 mb-0 pb-0">
                    <AddressCardDetails address={address} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <DeleteConfirmationModal
                isOpen={selectedAddressId === address.id}
                onClose={() => setSelectedAddressId(null)}
                address={address}
              />
            </article>
          )
        })}
      </div>
    </section>
  )
}
