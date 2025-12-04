"use client"

import { deleteAddress } from "@/actions/addresses"
import { Address } from "@/types"
import { useState, useCallback } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function useDeleteAddressConfirmation({
  address,
}: {
  address: Address | null
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const handleConfirm = useCallback(async () => {
    if (!address) return

    try {
      setIsDeleting(true)
      await deleteAddress(address.id)
      toast.success("Dirección eliminada exitosamente")
      router.refresh()
    } catch (error) {
      console.error("Error deleting address:", error)
    } finally {
      setIsDeleting(false)
    }
  }, [address, deleteAddress])

  return {
    isModalOpen,
    address,
    isDeleting,
    handleConfirm,
  }
}
