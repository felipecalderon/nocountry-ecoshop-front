import { useEffect, useState } from "react"
import { AlertDialogHeader } from "@/app/components/ui/alert-dialog"
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Material } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { generateMaterialComposition } from "@/actions/llm"
import { toast } from "sonner"

const materialSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  isEcoFriendly: z.boolean(),
  carbonFootprintPerKg: z.string().min(1, "Debe ser mayor o igual a 0"),
  waterUsagePerKg: z.string().min(1, "Debe ser mayor o igual a 0"),
})

type MaterialFormValues = z.infer<typeof materialSchema>

export default function MaterialFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialValues,
  title,
  isLoading,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: MaterialFormValues) => void
  initialValues?: Material
  title: string
  isLoading: boolean
}) {
  const [isAiLoading, setIsAiLoading] = useState(false)
  const isGlobalLoading = isLoading || isAiLoading

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: "",
      isEcoFriendly: false,
      carbonFootprintPerKg: "0",
      waterUsagePerKg: "0",
    },
  })

  const handleCompleteWithAI = async () => {
    const name = form.getValues("name")
    if (name.length < 3) {
      toast.error("Debe ingresar el nombre completo")
      return
    }

    try {
      setIsAiLoading(true)
      const composition = await generateMaterialComposition(name)
      form.setValue(
        "carbonFootprintPerKg",
        composition.carbonFootprintPerKg.toString()
      )
      form.setValue("waterUsagePerKg", composition.waterUsagePerKg.toString())
      form.setValue("isEcoFriendly", composition.isEcoFriendly)
      toast.success("Material completado con IA")
    } catch (error) {
      console.error(error)
      toast.error("Error al completar con IA")
    } finally {
      setIsAiLoading(false)
    }
  }
  useEffect(() => {
    if (open) {
      form.reset({
        name: initialValues?.name || "",
        isEcoFriendly: initialValues?.isEcoFriendly || false,
        carbonFootprintPerKg: initialValues?.carbonFootprintPerKg || "0",
        waterUsagePerKg: initialValues?.waterUsagePerKg || "0",
      })
    }
  }, [open, initialValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Complete los detalles del material a continuación.
          </DialogDescription>
        </AlertDialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre</label>
            <Input
              {...form.register("name")}
              placeholder="Ej. Algodón Orgánico"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isEcoFriendly"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              {...form.register("isEcoFriendly")}
            />
            <label htmlFor="isEcoFriendly" className="text-sm font-medium">
              ¿Es Eco Friendly?
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Huella Carbono</label>
              <Input
                type="number"
                step="0.01"
                {...form.register("carbonFootprintPerKg")}
              />
              {form.formState.errors.carbonFootprintPerKg && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.carbonFootprintPerKg.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Uso Agua</label>
              <Input type="text" {...form.register("waterUsagePerKg")} />
              {form.formState.errors.waterUsagePerKg && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.waterUsagePerKg.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isGlobalLoading}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleCompleteWithAI}
              disabled={isGlobalLoading}
              className="bg-sky-500 hover:bg-sky-600 text-primary-foreground"
            >
              {isAiLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Completa con IA
            </Button>
            <Button type="submit" disabled={isGlobalLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
