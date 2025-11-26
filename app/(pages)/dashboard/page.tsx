"use client"

import { useAuthStore } from "@/stores/useAuthStore"
import { UserRole } from "@/types"
import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"
import { User, Store, Shield } from "lucide-react"

export default function DashboardDemoPage() {
  const { mockLogin, user } = useAuthStore()
  const router = useRouter()

  const handleLogin = (role: UserRole) => {
    mockLogin(role)

    // Redirigir según el rol
    if (role === UserRole.CUSTOMER) {
      router.push("/dashboard/customer")
    } else if (role === UserRole.BRAND_ADMIN) {
      router.push("/dashboard/manager")
    } else {
      router.push("/dashboard/admin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Demo de Dashboards
          </h1>
          <p className="text-lg text-muted-foreground">
            Selecciona un rol para acceder al dashboard correspondiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Card */}
          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Cliente
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Accede a tu historial de pedidos, favoritos y perfil
              </p>
              <Button
                onClick={() => handleLogin(UserRole.CUSTOMER)}
                className="w-full"
                size="lg"
              >
                Ingresar como Cliente
              </Button>
            </div>
          </div>

          {/* Brand Admin Card */}
          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Store className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Gestor de Tienda
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Gestiona productos, inventario y ventas de tu marca
              </p>
              <Button
                onClick={() => handleLogin(UserRole.BRAND_ADMIN)}
                className="w-full"
                size="lg"
              >
                Ingresar como Gestor
              </Button>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Administrador
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Control total de la plataforma (próximamente)
              </p>
              <Button
                onClick={() => handleLogin(UserRole.ADMIN)}
                className="w-full"
                size="lg"
                disabled
              >
                Próximamente
              </Button>
            </div>
          </div>
        </div>

        {user && (
          <div className="mt-8 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-center text-green-800 dark:text-green-200">
              ✓ Sesión activa como: <strong>{user.email}</strong> (
              {user.role})
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Esta es una demostración con datos de prueba (mock data)
          </p>
        </div>
      </div>
    </div>
  )
}
