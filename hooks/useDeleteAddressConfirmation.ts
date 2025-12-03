"use client"

import { useState, useCallback } from "react"
import { Address, UseDeleteAddressConfirmationProps } from "@/types"

export function useDeleteAddressConfirmation({
  onConfirm,
}: UseDeleteAddressConfirmationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openModal = useCallback((address: Address) => {
    setAddressToDelete(address)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    if (!isDeleting) {
      setIsModalOpen(false)
      setAddressToDelete(null)
    }
  }, [isDeleting])

  const handleConfirm = useCallback(async () => {
    if (!addressToDelete) return

    try {
      setIsDeleting(true)
      await onConfirm(addressToDelete.id)
      closeModal()
    } catch (error) {
      console.error("Error deleting address:", error)
    } finally {
      setIsDeleting(false)
    }
  }, [addressToDelete, onConfirm, closeModal])

  return {
    isModalOpen,
    addressToDelete,
    isDeleting,
    openModal,
    closeModal,
    handleConfirm,
  }
}
