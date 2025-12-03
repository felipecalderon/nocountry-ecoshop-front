"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import DashboardCard from "@/app/components/dashboard/DashboardCard"
import { createAddress } from "@/actions/addresses"
import { CreateAddressDto } from "@/types"
import { MapPin } from "lucide-react"

interface AddressFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function AddressForm({ onSuccess, onCancel }: AddressFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateAddressDto>({
    street: "",
    city: "",
    postalCode: "",
    country: "Argentina",
    addressType: "shipping",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createAddress(formData)
      onSuccess?.()
    } catch (error) {
      console.error("Error creating address:", error)
      alert("Error al crear la dirección. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof CreateAddressDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardCard title="Nueva Dirección">
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="space-y-4">
          {/* Street */}
          <div>
            <Label htmlFor="street">Calle y Número *</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Ej: Av. Corrientes 1234"
              required
            />
          </div>

          {/* City and Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                value={formData.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Ej: Buenos Aires"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Código Postal</Label>
              <Input
                id="postalCode"
                value={formData.postalCode || ""}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="Ej: C1043"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <Label htmlFor="country">País *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="Ej: Argentina"
              required
            />
          </div>

          {/* Address Type */}
          <div>
            <Label htmlFor="addressType">Tipo de Dirección *</Label>
            <Select
              value={formData.addressType}
              onValueChange={(value) =>
                handleChange("addressType", value as "shipping" | "billing")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shipping">Envío</SelectItem>
                <SelectItem value="billing">Facturación</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Dirección"}
          </Button>
        </div>
      </form>
    </DashboardCard>
  )
}
