"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useProductStore } from "@/stores/useProductStore"
import { useOptionsStore } from "@/stores/useOptionsStore"
import { createProduct, updateProduct } from "@/actions/products"
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
import { Loader2, Trash2, Plus, Upload, ImageIcon } from "lucide-react"
import { uploadImage } from "@/actions/upload-image"
import { toast } from "sonner"
import { useAuth } from "@/stores/useAuthStore"
import { Product } from "@/types"
import {
  ProductFormValues,
  productSchema,
} from "@/lib/validations/product.schema"

interface ProductFormProps {
  initialData?: Product
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const { addProduct, updateProduct: updateProductInStore } = useProductStore()
  const {
    materials,
    certifications,
    fetchMaterials,
    fetchCertifications,
    isLoading: isOptionsLoading,
  } = useOptionsStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const { user } = useAuth()

  // Map initialData to form values
  const defaultValues: ProductFormValues = {
    name: initialData?.name || "",
    image:
      initialData?.image ||
      "https://res.cloudinary.com/demo/image/upload/v1/sample.jpg",
    description: initialData?.description || "",
    price: initialData?.price ? parseFloat(initialData.price) : 0,
    stock: initialData?.stock || 0,
    originCountry: initialData?.originCountry || "",
    weightKg: 0, // Not present in Product interface shown, defaulting to 0
    imageAltText: initialData?.imageAltText || "",
    environmentalImpact: {
      recycledContent: initialData?.environmentalImpact?.recycledContent || 0,
      materials:
        initialData?.materials?.map((m) => ({
          materialCompositionId: m.materialComposition.id, // Assuming structure based on types
          percentage: m.percentage,
        })) || [],
    },
    certificationIds: initialData?.certifications?.map((c) => c.id) || [],
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const imageUrl = form.watch("image")

  const [currentId, setCurrentId] = useState(initialData?.id)

  useEffect(() => {
    if (initialData && initialData.id !== currentId) {
      setCurrentId(initialData.id)
      form.reset({
        name: initialData.name,
        image: initialData.image,
        description: initialData.description,
        price: parseFloat(initialData.price),
        stock: initialData.stock,
        originCountry: initialData.originCountry,
        weightKg: 0, // Product interface needs update if this is real data
        imageAltText: initialData.imageAltText,
        environmentalImpact: {
          recycledContent:
            initialData.environmentalImpact?.recycledContent || 0,
          materials:
            initialData.materials?.map((m) => ({
              materialCompositionId: m.materialComposition.id,
              percentage: m.percentage,
            })) || [],
        },
        certificationIds: initialData.certifications?.map((c) => c.id) || [],
      })
    }
  }, [initialData, form, currentId])

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
      if (initialData) {
        console.log("Updating product:", data)
        const updated = await updateProduct(initialData.id, data)
        if (updated.data) {
          toast.success("Producto actualizado exitosamente")
          router.push(`/dashboard/${user?.role || "brand_admin"}/products`)
          router.refresh()
        }
      } else {
        // Create new product
        const newProduct = await createProduct(data)
        if (newProduct.data) {
          addProduct(newProduct.data)
          toast.success("Producto creado exitosamente")
          router.push(`/dashboard/${user?.role || "brand_admin"}/products`)
          router.refresh()
        }
      }
    } catch (error) {
      console.error("Failed to save product:", error)
      toast.error(
        initialData
          ? "Error al actualizar el producto"
          : "Error al crear el producto"
      )
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await uploadImage(formData)
      if (response?.data?.url) {
        form.setValue("image", response.data.url)
        toast.success("Imagen subida correctamente")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Error al subir la imagen")
    } finally {
      setIsUploadingImage(false)
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
        <h2 className="text-2xl font-bold">
          {initialData ? "Editar Producto" : "Crear Nuevo Producto"}
        </h2>
        <p className="text-muted-foreground">
          {initialData
            ? "Modifica los detalles del producto existente."
            : "Ingresa los detalles del producto para añadirlo al catálogo."}
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

          <div className="grid gap-2 col-span-1 md:col-span-2">
            <Label>Imagen del Producto</Label>
            <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/20">
              <div className="relative aspect-square w-32 min-w-[128px] overflow-hidden rounded-lg border bg-background">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 rounded-md border p-2 hover:bg-muted/50 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">Subir nueva imagen</span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                      />
                    </div>
                  </Label>
                  {isUploadingImage && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" /> Subiendo
                      imagen...
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="imageAltText">Texto Alternativo (Alt)</Label>
                  <Input
                    {...form.register("imageAltText")}
                    id="imageAltText"
                    placeholder="Descripción de la imagen para accesibilidad"
                  />
                </div>
              </div>
            </div>
            <input type="hidden" {...form.register("image")} />
            {form.formState.errors.image && (
              <p className="text-sm text-red-500">
                {form.formState.errors.image.message}
              </p>
            )}
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
        <Button type="submit" disabled={isSubmitting || isUploadingImage}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Actualizar Producto" : "Crear Producto"}
        </Button>
      </div>
    </form>
  )
}
