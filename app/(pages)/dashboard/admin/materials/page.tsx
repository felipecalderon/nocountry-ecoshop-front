import { getMaterials } from "@/actions/materials"
import { MaterialsManager } from "@/app/components/materials/materials-manager"

export default async function MaterialsPage() {
  const { data: materials } = await getMaterials()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Base de Datos de Materiales</h1>
      <p className="text-muted-foreground mb-6">
        Administra los materiales disponibles, actualiza sus estadísticas de
        impacto y crea nuevos registros.
      </p>
      <MaterialsManager initialMaterials={materials} />
    </div>
  )
}
