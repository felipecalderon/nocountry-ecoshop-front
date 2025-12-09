"use client"

import { useState } from "react"
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createReward } from "@/actions/wallet"
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { RewardType } from "@/types"

const rewardSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  costInPoints: z.coerce.number().min(1, "El costo debe ser mayor a 0"),
  stock: z.coerce.number().min(0, "El stock no puede ser negativo"),
  type: z.nativeEnum(RewardType),
  isActive: z.boolean(),
  discountPercentage: z.coerce.number().optional(),
  validDays: z.coerce.number().optional(),
})

type RewardFormValues = z.infer<typeof rewardSchema>

export default function CreateRewardForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<RewardFormValues>({
    resolver: zodResolver(rewardSchema) as Resolver<RewardFormValues>,
    defaultValues: {
      name: "",
      description: "",
      costInPoints: 0,
      stock: 0,
      type: RewardType.COUPON,
      isActive: true,
      discountPercentage: 0,
      validDays: 30,
    },
  })

  const onSubmit: SubmitHandler<RewardFormValues> = async (data) => {
    setIsLoading(true)
    try {
      const payload = {
        name: data.name,
        description: data.description,
        costInPoints: data.costInPoints,
        stock: data.stock,
        type: data.type,
        isActive: data.isActive,
        metadata:
          data.type === RewardType.COUPON
            ? {
                discountPercentage: data.discountPercentage || 0,
                validDays: data.validDays || 0,
              }
            : null,
      }

      await createReward(payload)
      toast.success("Recompensa creada exitosamente")

      form.reset({
        name: "",
        description: "",
        costInPoints: 0,
        stock: 0,
        type: RewardType.COUPON,
        isActive: true,
        discountPercentage: 0,
        validDays: 30,
      })

      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Error al crear la recompensa")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="">
      <div className="mb-6">
        <h3 className="text-lg font-medium">Crear Nueva Recompensa</h3>
        <p className="text-sm text-muted-foreground">
          Completa el formulario para agregar una nueva recompensa al sistema.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Descuento 10%" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value={RewardType.DONATION}>Donación</option>
                      <option value={RewardType.COUPON}>Cupón</option>
                      <option value={RewardType.PRODUCT}>Producto</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe los detalles de la recompensa..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="costInPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo en Puntos</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Disponible</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Activa</FormLabel>
                  <FormDescription>
                    La recompensa será visible para los usuarios inmediatamente.
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <span className="text-sm text-muted-foreground">
                      {field.value ? "Visible" : "Oculta"}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="border-t pt-4">
            <h4 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Metadatos (Opcional)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porcentaje de Descuento</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="validDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Días de Validez</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creando..." : "Crear Recompensa"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
