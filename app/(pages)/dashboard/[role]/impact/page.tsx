"use client"

import { useEffect, useState } from "react"
import ImpactStats from "@/app/components/impact/impact-stats"
import { getImpactStats } from "@/actions/users"
import { ImpactStatsDto } from "@/types"

export default function ImpactPage() {
  const [stats, setStats] = useState<ImpactStatsDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getImpactStats()
        if (data?.data) {
          setStats(data.data)
        }
      } catch (error) {
        console.error("Error fetching impact stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mi Impacto Ambiental</h1>
        <p className="text-muted-foreground mt-2">
          Descubre cómo tus compras sostenibles están ayudando al planeta
        </p>
      </div>

      <ImpactStats stats={stats} loading={loading} />
    </div>
  )
}
