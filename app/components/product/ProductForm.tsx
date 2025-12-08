"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProductStore } from "@/stores/useProductStore"
import { createProduct } from "@/actions/products"
import {
  MaterialComposition,
  Certification,
  CreateProductDto,
  RecyclabilityStatus,
  Material,
} from "@/types"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Loader2 } from "lucide-react"

interface ProductFormProps {
  materials: Material[]
  certifications: Certification[]
}

export default function ProductForm({
  materials,
  certifications,
}: ProductFormProps) {
  const router = useRouter()
  const { addProduct } = useProductStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    sku: "",
    originCountry: "",
    materials: [],
    certificationIds: [],
    environmentalImpact: {
      recycledContent: 0,
      materials: [],
    },
    image: "https://google.com",
    recyclabilityStatus: RecyclabilityStatus.NOT_RECYCLABLE,
    weightKg: 0,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Basic validation and formatting
      const payload: Partial<CreateProductDto> = {
        ...formData,
        materials: formData.materials || [],
      }
      console.log(payload)
      // Remove temporary fields not in DTO if necessary
      const newProduct = await createProduct(payload)
      if (newProduct) {
        addProduct(newProduct)
        router.push("/dashboard/brand_admin/products")
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to create product:", error)
      // Handle error (e.g., show toast)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Crear Nuevo Producto</h2>
        <p className="text-muted-foreground">
          Ingresa los detalles del producto para añadirlo al catálogo.
        </p>
      </div>

      <div className="grid gap-4">
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
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="originCountry">País de Origen</Label>
          <Input
            id="originCountry"
            name="originCountry"
            value={formData.originCountry}
            onChange={handleChange}
            required
          />
        </div>

        {/* Material Selection (Simplified for MVP) */}
        <div className="grid gap-2">
          <Label htmlFor="material">Material Principal</Label>
          <Select
            onValueChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                materialCompositionIds: [val],
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear Producto
        </Button>
      </div>
    </form>
  )
}
