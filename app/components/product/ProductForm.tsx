"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useProductStore } from "@/stores/useProductStore"
import { useOptionsStore } from "@/stores/useOptionsStore"
import { createProduct } from "@/actions/products"
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
import { Loader2, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/stores/useAuthStore"

// Schema definition matching the requested payload
const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  image: z.string().url("Debe ser una URL válida"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z.number().min(0, "El precio no puede ser negativo"),
  stock: z.number().min(0, "El stock no puede ser negativo"),
  originCountry: z.string().min(1, "El país de origen es requerido"),
  weightKg: z.number().min(0, "El peso debe ser positivo"),
  imageAltText: z.string().optional(),
  environmentalImpact: z.object({
    recycledContent: z.number().min(0).max(100, "Debe estar entre 0 y 100"),
    materials: z.array(
      z.object({
        materialCompositionId: z.string().min(1, "Selecciona un material"),
        percentage: z.number().min(1).max(100, "Debe estar entre 1 y 100"),
      })
    ),
  }),
  certificationIds: z.array(z.string()),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function ProductForm() {
  const router = useRouter()
  const { addProduct } = useProductStore()
  const {
    materials,
    certifications,
    fetchMaterials,
    fetchCertifications,
    isLoading: isOptionsLoading,
  } = useOptionsStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      image: "https://res.cloudinary.com/demo/image/upload/v1/sample.jpg",
      description: "",
      price: 0,
      stock: 0,
      originCountry: "",
      weightKg: 0,
      imageAltText: "",
      environmentalImpact: {
        recycledContent: 0,
        materials: [],
      },
      certificationIds: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "environmentalImpact.materials",
  })

  useEffect(() => {
    fetchMaterials()
    fetchCertifications()
  }, [fetchMaterials, fetchCertifications])

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true)
    try {
      console.log("Submitting payload:", data)
      // The schema already matches CreateProductPayload structure
      const newProduct = await createProduct(data)

      if (newProduct) {
        addProduct(newProduct)
        toast.success("Producto creado exitosamente")
        router.push(`/dashboard/${user?.role}/products`)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to create product:", error)
      toast.error("Error al crear el producto")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCertificationChange = (certId: string, isChecked: boolean) => {
    const currentCerts = form.getValues("certificationIds")
    if (isChecked) {
      form.setValue("certificationIds", [...currentCerts, certId])
    } else {
      form.setValue(
        "certificationIds",
        currentCerts.filter((id) => id !== certId)
      )
    }
  }

  if (isOptionsLoading && materials.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto py-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Crear Nuevo Producto</h2>
        <p className="text-muted-foreground">
          Ingresa los detalles del producto para añadirlo al catálogo.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Info */}
        <div className="grid gap-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Información Básica</h3>

          <div className="grid gap-2">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input {...form.register("name")} id="name" />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea {...form.register("description")} id="description" />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                {...form.register("price", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0"
                id="price"
              />
              {form.formState.errors.price && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                {...form.register("stock", { valueAsNumber: true })}
                type="number"
                min="0"
                id="stock"
              />
              {form.formState.errors.stock && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.stock.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weightKg">Peso (Kg)</Label>
              <Input
                {...form.register("weightKg", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0"
                id="weightKg"
              />
              {form.formState.errors.weightKg && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.weightKg.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="originCountry">País de Origen</Label>
              <Input {...form.register("originCountry")} id="originCountry" />
              {form.formState.errors.originCountry && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.originCountry.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="image">URL de Imagen</Label>
              <Input {...form.register("image")} id="image" />
              {form.formState.errors.image && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.image.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageAltText">Texto Alt de Imagen</Label>
              <Input {...form.register("imageAltText")} id="imageAltText" />
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="grid gap-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Impacto Ambiental</h3>

          <div className="grid gap-2">
            <Label htmlFor="recycledContent">Contenido Reciclado (%)</Label>
            <Input
              {...form.register("environmentalImpact.recycledContent", {
                valueAsNumber: true,
              })}
              type="number"
              min="0"
              max="100"
              step="0.1"
              id="recycledContent"
            />
            {form.formState.errors.environmentalImpact?.recycledContent && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.environmentalImpact.recycledContent
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Materiales del Producto</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ materialCompositionId: "", percentage: 0 })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Añadir Material
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-end p-4 border rounded-md bg-muted/20"
              >
                <div className="flex-1 space-y-2">
                  <Label>Material</Label>
                  <Controller
                    control={form.control}
                    name={`environmentalImpact.materials.${index}.materialCompositionId`}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          {materials.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="w-32 space-y-2">
                  <Label>Porcentaje (%)</Label>
                  <Input
                    {...form.register(
                      `environmentalImpact.materials.${index}.percentage`,
                      { valueAsNumber: true }
                    )}
                    type="number"
                    min="1"
                    max="100"
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {form.formState.errors.environmentalImpact?.materials && (
              <p className="text-sm text-red-500">
                {form.formState.errors.environmentalImpact.materials.root
                  ?.message || "Error en los materiales"}
              </p>
            )}
          </div>
        </div>

        {/* Certifications */}
        <div className="grid gap-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Certificaciones</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`cert-${cert.id}`}
                  value={cert.id}
                  checked={form.watch("certificationIds").includes(cert.id)}
                  onChange={(e) =>
                    handleCertificationChange(cert.id, e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor={`cert-${cert.id}`}>{cert.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear Producto
        </Button>
      </div>
    </form>
  )
}
