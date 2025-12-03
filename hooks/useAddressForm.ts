import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateAddressDto } from "@/types"
import { useAddressMutations } from "@/hooks/useAddresses"
import { addressSchema } from "@/lib/validations/address.schema"
import { AddressFormValues, UseAddressFormProps } from "@/types/address.types"

export function useAddressForm({ onSuccess }: UseAddressFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { createAddress } = useAddressMutations()

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

      await createAddress(addressData)

      form.reset()

      console.log("Address created successfully")

      if (onSuccess) {
        onSuccess()
      }
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
