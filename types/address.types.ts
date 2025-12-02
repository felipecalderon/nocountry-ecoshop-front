export interface CreateAddressDto {
  street: string
  city: string
  postalCode: string
  country: string
  addressType?: "shipping" | "billing"
}
