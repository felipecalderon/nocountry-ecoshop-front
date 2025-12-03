import { Address } from "./user.types"
import { ApiResponse } from "./api.types"

export interface CreateAddressDto {
  street: string
  city: string
  postalCode: string
  country: string
  addressType?: "shipping" | "billing"
}

export interface AddressCardDetailsProps {
  address: Address
}

export interface AddressesErrorStateProps {
  onRetry: () => void
}

export interface DetailItemProps {
  label: string
  value: string | null
}

export interface UseDeleteAddressConfirmationProps {
  onConfirm: (id: string) => Promise<void>
}

export type AddressesCache = AddressesResponse

export interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  address: Address | null
  isLoading?: boolean
}

export interface AddressFormValues {
  street: string
  city: string
  postalCode: string
  country: string
  addressType?: "shipping" | "billing"
}

export interface AddressFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export interface UseAddressFormProps {
  onSuccess?: () => void
}

export type AddressesResponse = ApiResponse<Address[]>
export type AddressResponse = ApiResponse<Address>
export type EmptyResponse = ApiResponse<null>
