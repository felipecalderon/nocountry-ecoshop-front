import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateAddressDto } from "@/types"
import { addressSchema } from "@/lib/validations/address.schema"
import { AddressFormValues } from "@/types/address.types"
import { createAddress } from "@/actions/addresses"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function useAddressForm({ onCancel }: { onCancel?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { refresh } = useRouter()
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      city: "",
      postalCode: "",
      country: "Argentina",
      addressType: "shipping",
    },
  })

  const onSubmit = async (data: AddressFormValues) => {
    try {
      setIsSubmitting(true)

      const addressData: CreateAddressDto = {
        street: data.street,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        addressType: data.addressType,
      }

      const newAddress = await createAddress(addressData)

      if (newAddress) {
        toast.success("Dirección creada exitosamente")
        onCancel?.()
        form.reset()
        refresh()
      } else {
        toast.error("Error al crear la dirección")
      }
      console.log("Address created successfully")
    } catch (error) {
      console.error("Error creating address:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    isSubmitting,
    onSubmit,
  }
}
