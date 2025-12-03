"use server"

import { fetcher } from "@/lib/fetcher"
import { auth0 } from "@/lib/auth0"
import {
  AddressType,
  CreateAddressDto,
  AddressResponse,
  AddressesResponse,
  EmptyResponse,
} from "@/types"

export const createAddress = async (
  data: CreateAddressDto
): Promise<AddressResponse> => {
  const { token } = await auth0.getAccessToken()

  try {
    return (await fetcher("POST", "/addresses", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })) as AddressResponse
  } catch (error) {
    console.error("Error creating address:", error)
    throw error
  }
}

export const getAddresses = async (): Promise<AddressesResponse> => {
  const { token } = await auth0.getAccessToken()

  try {
    return (await fetcher("GET", "/addresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as AddressesResponse
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return { data: [], timestamp: "", status: "" }
  }
}

export const getAddress = async (id: string): Promise<AddressResponse> => {
  const { token } = await auth0.getAccessToken()

  try {
    return (await fetcher("GET", `/addresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })) as AddressResponse
  } catch (error) {
    console.error(`Error fetching address ${id}:`, error)
    return {
      data: {
        id: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        addressType: AddressType.BILLING,
        deletedAt: null,
      },
      timestamp: new Date().toISOString(),
      status: "error",
    }
  }
}

export const deleteAddress = async (id: string): Promise<EmptyResponse> => {
  const { token } = await auth0.getAccessToken()

  try {
    return (await fetcher("DELETE", `/addresses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as EmptyResponse
  } catch (error) {
    console.error(`Error deleting address ${id}:`, error)
    throw error
  }
}
