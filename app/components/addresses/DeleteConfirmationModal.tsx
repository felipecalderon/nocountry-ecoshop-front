"use client"

import { useState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"
import { Button } from "@/app/components/ui/button"
import AddressCardDetails from "./AddressCardDetails"
import { DeleteConfirmationModalProps } from "@/types"
import { useDeleteAddressConfirmation } from "@/hooks/useDeleteAddressConfirmation"

function DeleteConfirmationModal({
  isOpen,
  onClose,
  address,
}: DeleteConfirmationModalProps) {
  const { handleConfirm } = useDeleteAddressConfirmation({ address })

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-xl">
              ¿Eliminar dirección?
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-base text-foreground/80 pt-2">
            Esta acción no se puede deshacer. Se eliminará permanentemente la
            dirección:
          </AlertDialogDescription>

          {address && <AddressCardDetails address={address} />}
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 [&>button]:cursor-pointer">
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto dark:hover:text-white"
            >
              Cancelar
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              className="w-full sm:w-auto"
            >
              Sí, eliminar dirección
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmationModal
