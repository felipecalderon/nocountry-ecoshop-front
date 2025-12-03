import { z } from "zod"

export const addressSchema = z.object({
  street: z.string().min(5, "La calle debe tener al menos 5 caracteres"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  postalCode: z
    .string()
    .min(4, "El código postal debe tener al menos 4 caracteres"),
  country: z.string().min(2, "El país debe tener al menos 2 caracteres"),
  addressType: z.enum(["shipping", "billing"]).default("shipping").optional(),
})

export type AddressFormValues = z.infer<typeof addressSchema>
