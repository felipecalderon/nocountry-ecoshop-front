import z from "zod"

export const productSchema = z.object({
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

export type ProductFormValues = z.infer<typeof productSchema>
