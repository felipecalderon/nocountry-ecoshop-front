"use client"

import { CreateBrandDto } from "@/types"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { Button } from "../ui/button"
import { createBrand } from "@/actions/brands"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateBrand() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateBrandDto>({
    name: "",
    description: "",
    image: "https://placehold.co/600x400/EEE/31343C?text=No+Image",
  })

  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true)
      e.preventDefault()
      const newBrand = await createBrand(formData)
      if (newBrand.data) {
        toast.success("Tienda creada exitosamente")
        router.refresh()
      } else {
        toast.error("No se pudo crear la tienda")
      }
    } catch (error) {
      console.error("Error al crear la tienda:", error)
      toast.error("Error al crear la tienda")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Imagen</Label>
            <Input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear nueva tienda"}
        </Button>
      </div>
    </form>
  )
}
