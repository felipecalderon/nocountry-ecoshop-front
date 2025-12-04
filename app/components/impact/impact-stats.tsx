"use client"

import { Leaf, Award, TreeDeciduous, TrendingUp } from "lucide-react"
import { ImpactStatsDto } from "@/types"
import DashboardCard from "../dashboard/DashboardCard"

interface ImpactStatsProps {
  stats: ImpactStatsDto | null
  loading?: boolean
}

export default function ImpactStats({
  stats,
  loading = false,
}: ImpactStatsProps) {
  if (loading) {
    return (
      <DashboardCard title="Tu Impacto Ambiental">
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Cargando estadísticas...</div>
        </div>
      </DashboardCard>
    )
  }

  if (!stats) {
    return (
      <DashboardCard title="Tu Impacto Ambiental">
        <div className="text-center py-12">
          <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-2">
            Aún no tienes datos de impacto
          </p>
          <p className="text-sm text-muted-foreground">
            Realiza tu primera compra para comenzar a ver tu impacto ambiental
          </p>
        </div>
      </DashboardCard>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Impact Card */}
      <DashboardCard title="Tu Impacto Ambiental">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CO2 Saved */}
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-4xl font-bold text-green-600 mb-1">
              {stats.co2SavedKg}
            </p>
            <p className="text-sm text-muted-foreground">kg de CO₂ Ahorrado</p>
          </div>

          {/* Trees Equivalent */}
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <TreeDeciduous className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <p className="text-4xl font-bold text-blue-600 mb-1">
              {stats.treesEquivalent}
            </p>
            <p className="text-sm text-muted-foreground">
              Árboles Equivalentes
            </p>
          </div>

          {/* Eco Level */}
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Award className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <p className="text-2xl font-bold text-purple-600 mb-1">
              {stats.ecoLevel}
            </p>
            <p className="text-sm text-muted-foreground">Tu Nivel Eco</p>
          </div>

          {/* Total Orders */}
          <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <p className="text-4xl font-bold text-orange-600 mb-1">
              {stats.totalOrders}
            </p>
            <p className="text-sm text-muted-foreground">Compras Sostenibles</p>
          </div>
        </div>
      </DashboardCard>

      {/* Progress to Next Level */}
      {stats.nextLevelGoal && (
        <DashboardCard title="Progreso al Siguiente Nivel">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Meta: {stats.nextLevelGoal} kg CO₂
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((stats.co2SavedKg / stats.nextLevelGoal) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (stats.co2SavedKg / stats.nextLevelGoal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Te faltan{" "}
              {Math.max(stats.nextLevelGoal - stats.co2SavedKg, 0).toFixed(1)}{" "}
              kg de CO₂ para alcanzar el siguiente nivel
            </p>
          </div>
        </DashboardCard>
      )}

      {/* Impact Explanation */}
      <DashboardCard title="¿Qué significa tu impacto?">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              CO₂ Ahorrado
            </h4>
            <p className="text-sm text-muted-foreground">
              Al elegir productos sostenibles, has evitado que{" "}
              <span className="font-semibold text-green-600">
                {stats.co2SavedKg} kg de CO₂
              </span>{" "}
              sean emitidos a la atmósfera. Esto es equivalente a plantar{" "}
              <span className="font-semibold">
                {stats.treesEquivalent} árboles
              </span>
              .
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Nivel Eco
            </h4>
            <p className="text-sm text-muted-foreground">
              Tu nivel actual es{" "}
              <span className="font-semibold text-purple-600">
                {stats.ecoLevel}
              </span>
              . Sigue comprando productos sostenibles para subir de nivel y
              desbloquear beneficios exclusivos.
            </p>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}
