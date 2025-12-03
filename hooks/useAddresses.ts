"use client"

import useSWR, { useSWRConfig } from "swr"
import {
  Address,
  CreateAddressDto,
  AddressResponse,
  AddressesCache,
} from "@/types"
import {
  getAddresses,
  getAddress,
  createAddress,
  deleteAddress,
  AddressesResponse,
} from "@/actions/addresses"
import { toast } from "sonner"

export function useAddresses() {
  const { data, error, isLoading, mutate, isValidating } =
    useSWR<AddressesResponse>("/api/addresses", getAddresses, {
      revalidateOnMount: true,
      refreshWhenHidden: false,
    })

  return {
    addresses: data?.data || [],
    isLoading,
    isValidating,
    isError: !!error,
    error,
    mutate,
    refetch: () => mutate(),
  }
}

export function useAddress(id?: string) {
  const { data, error, isLoading, mutate, isValidating } =
    useSWR<AddressResponse | null>(
      id ? `/api/addresses/${id}` : null,
      () => getAddress(id!) as Promise<AddressResponse>,
      {
        revalidateOnMount: true,
        refreshWhenHidden: false,
      }
    )

  return {
    address: data,
    isLoading,
    isValidating,
    isError: !!error,
    error,
    mutate,
    refetch: () => mutate(),
  }
}

export function useAddressMutations() {
  const { mutate } = useSWRConfig()

  const create = async (data: CreateAddressDto) => {
    try {
      const result = await createAddress(data)

      mutate(
        "/api/addresses",
        async (
          current: AddressesCache | undefined
        ): Promise<AddressesCache> => {
          if (!current) {
            return {
              data: [result.data],
              timestamp: new Date().toISOString(),
              status: "success",
            }
          }
          return {
            ...current,
            data: [...current.data, result.data],
          }
        },
        { revalidate: false }
      )

      toast.success("Dirección creada correctamente")
      return result
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al crear la dirección"
      toast.error(errorMessage)
      throw error
    }
  }

  const remove = async (id: string) => {
    try {
      await deleteAddress(id)

      mutate(
        "/api/addresses",
        async (
          current: AddressesCache | undefined
        ): Promise<AddressesCache> => {
          if (!current) return { data: [], timestamp: "", status: "" }
          return {
            ...current,
            data: current.data.filter((addr: Address) => addr.id !== id),
          }
        },
        false
      )

      toast.success("Dirección eliminada correctamente")
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al eliminar la dirección"
      toast.error(errorMessage)
      throw error
    }
  }

  return {
    createAddress: create,
    deleteAddress: remove,
  }
}
