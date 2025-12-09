"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import AddressForm from "./AddressForm"

function CreateAddressModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="dark:bg-secondary dark:hover:bg-secondary/80 dark:text-white cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Nueva dirección
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle>Agregar Nueva Dirección</DialogTitle>
          <DialogDescription>
            Completa los datos de tu nueva dirección de envío o facturación.
          </DialogDescription>
        </DialogHeader>
        <AddressForm onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateAddressModal
