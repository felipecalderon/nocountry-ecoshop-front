export enum UserRole {
  CUSTOMER = "customer",
  BRAND_ADMIN = "brand_admin",
  ADMIN = "admin",
}

export enum AddressType {
  SHIPPING = "shipping",
  BILLING = "billing",
}

export interface Address {
  id: string
  street: string
  city: string | null
  postalCode: string | null
  country: string
  addressType: AddressType
  deletedAt: Date | null
}

export interface User {
  id: string
  email: string
  role: UserRole
  firstName: string | null
  lastName: string | null
  nationalId: string | null
  phone: string | null
  birthDate: string | null
  paymentCustomerIds: Record<string, object> | null
  providerId: string | null
  emailVerified: boolean
  isBanned: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  // addresses?: Address[]
}
