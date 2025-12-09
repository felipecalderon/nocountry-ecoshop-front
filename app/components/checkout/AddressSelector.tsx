"use client"

import Link from "next/link"
import { MapPin, Plus } from "lucide-react"
import { useCheckoutStore } from "@/stores/checkoutStore"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Address, AddressType } from "@/types"

export default function AddressSelector({
  addresses,
}: {
  addresses: Address[]
}) {
  const { selectedAddressId, setSelectedAddressId } = useCheckoutStore()

  const shippingAddresses = addresses.filter(
    (addr) => addr.addressType === AddressType.SHIPPING && !addr.deletedAt
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Dirección de envío
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {shippingAddresses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No tienes direcciones de envío registradas
            </p>
            <Button asChild>
              <Link href="/dashboard/customer/addresses">
                <Plus className="mr-2 h-4 w-4" />
                Agregar dirección
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <RadioGroup
              value={selectedAddressId || ""}
              onValueChange={setSelectedAddressId}
            >
              {shippingAddresses.map((address) => (
                <div
                  key={address.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <RadioGroupItem value={address.id} id={address.id} />
                  <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">{address.street}</div>
                    <div className="text-sm text-muted-foreground">
                      {address.city}, {address.postalCode}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {address.country}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              variant="outline"
              className="w-full dark:hover:text-gray-200"
              asChild
            >
              <Link href="/dashboard/customer/addresses">
                <Plus className="mr-2 h-4 w-4" />
                Agregar nueva dirección
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
