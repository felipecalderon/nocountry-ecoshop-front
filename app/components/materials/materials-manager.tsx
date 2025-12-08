"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { AnimatePresence, motion } from "motion/react"
import {
  Loader2,
  Plus,
  Search,
  Trash2,
  Pencil,
  Leaf,
  Droplets,
  Cloud,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Badge } from "@/app/components/ui/badge"

import {
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "@/actions/materials"
import { Material } from "@/types"
import MaterialFormDialog from "./material-form"
import MaterialRow from "./material-table"
import { AxiosError } from "axios"
import { generateMaterialComposition } from "@/actions/llm"

// Zod Schema for Form
const materialSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  isEcoFriendly: z.boolean(),
  carbonFootprintPerKg: z.string().min(1, "Debe ser mayor o igual a 0"),
  waterUsagePerKg: z.string().min(1, "Debe ser mayor o igual a 0"),
})

type MaterialFormValues = z.infer<typeof materialSchema>

interface MaterialsManagerProps {
  initialMaterials: Material[]
}

export function MaterialsManager({ initialMaterials }: MaterialsManagerProps) {
  const router = useRouter()
  const [materials, setMaterials] = useState<Material[]>(initialMaterials)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMaterials(initialMaterials)
  }, [initialMaterials])

  const itemsPerPage = 8

  const filteredMaterials = materials.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage)
  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCreate = async (data: MaterialFormValues) => {
    try {
      setIsLoading(true)
      console.log(data)
      await createMaterial(data)
      toast.success("Material creado exitosamente")
      setIsCreateOpen(false)
      refreshData()
    } catch (error) {
      toast.error("Error al crear el material")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (data: MaterialFormValues) => {
    if (!editingMaterial) return
    try {
      setIsLoading(true)
      console.log(editingMaterial.id, data)
      await updateMaterial(editingMaterial.id, data)
      toast.success("Material actualizado exitosamente")
      setEditingMaterial(null)
      refreshData()
    } catch (error) {
      console.log(error)
      toast.error("Error al actualizar el material")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    try {
      setIsLoading(true)
      await deleteMaterial(deletingId)
      toast.success("Material eliminado exitosamente")
      setDeletingId(null)
      refreshData()
    } catch (error) {
      toast.error("Error al eliminar el material")
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    router.refresh()
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar materiales..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Material
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm bg-card overflow-hidden">
        <div className="grid grid-cols-1 divide-y">
          {filteredMaterials.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No se encontraron materiales.
            </div>
          ) : (
            paginatedMaterials.map((material) => (
              <MaterialRow
                key={material.id}
                material={material}
                isExpanded={expandedId === material.id}
                onToggle={() => toggleExpand(material.id)}
                onEdit={() => setEditingMaterial(material)}
                onDelete={() => setDeletingId(material.id)}
              />
            ))
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      <MaterialFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        title="Crear Material"
        isLoading={isLoading}
      />

      <MaterialFormDialog
        open={!!editingMaterial}
        onOpenChange={(open) => !open && setEditingMaterial(null)}
        onSubmit={handleUpdate}
        initialValues={editingMaterial || undefined}
        title="Editar Material"
        isLoading={isLoading}
      />

      <AlertDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar material?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el material.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
