import { getMaterials } from "@/actions/materials"
import { ProfileForm } from "@/app/components/profile/profile-form"

export default async function AdminSettingsPage() {
  const { data: materials } = await getMaterials()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Configuración y Perfil</h1>
      <p className="text-muted-foreground mb-6">
        Gestiona tu información personal y los recursos del sistema.
      </p>
      <div className="bg-card w-full max-w-2xl rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Mi Perfil</h2>
        <ProfileForm />
      </div>
    </div>
  )
}
