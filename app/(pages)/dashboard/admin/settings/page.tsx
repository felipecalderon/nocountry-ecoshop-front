import { getMaterials } from "@/actions/materials"
import { MaterialsManager } from "@/app/components/materials/materials-manager"
import { ProfileForm } from "@/app/components/profile/profile-form"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs"

export default async function AdminSettingsPage() {
  const { data: materials } = await getMaterials()

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-10">
      <section>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Mi Perfil</TabsTrigger>
            <TabsTrigger value="materials">
              Base de datos de Materiales
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <h1 className="text-2xl font-bold mb-1">Configuración y Perfil</h1>
            <p className="text-muted-foreground mb-6">
              Gestiona tu información personal y los recursos del sistema.
            </p>
            <div className="bg-card w-full max-w-2xl rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Mi Perfil</h2>
              <ProfileForm />
            </div>
          </TabsContent>
          <TabsContent value="materials">
            <h1 className="text-2xl font-bold mb-1">
              Base de Datos de Materiales
            </h1>
            <p className="text-muted-foreground mb-6">
              Administra los materiales disponibles, actualiza sus estadísticas
              de impacto y crea nuevos registros.
            </p>
            <MaterialsManager initialMaterials={materials} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
