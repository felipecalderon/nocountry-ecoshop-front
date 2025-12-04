"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { RespUsersFromAdmin, toggleUserBan } from "@/actions/admin"
import { User, ShieldOff, ShieldCheck } from "lucide-react"
import { User as IUser } from "@/types"
import DashboardCard from "../dashboard/DashboardCard"

export default function UsersTable({ res }: { res: RespUsersFromAdmin }) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [updating, setUpdating] = useState<string | null>(null)

  const handleToggleBan = async (userId: string, currentBanStatus: boolean) => {
    if (
      !confirm(
        `¿Estás seguro de que deseas ${
          currentBanStatus ? "desbanear" : "banear"
        } a este usuario?`
      )
    ) {
      return
    }

    setUpdating(userId)
    try {
      await toggleUserBan(userId, { isBanned: !currentBanStatus })
    } catch (error) {
      console.error("Error toggling user ban:", error)
      alert("Error al actualizar el usuario. Por favor intenta de nuevo.")
    } finally {
      setUpdating(null)
    }
  }

  return (
    <DashboardCard title="Gestión de Usuarios">
      <div className="space-y-4">
        {/* Users List */}
        <div className="space-y-3">
          {res.data.data.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.email}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      {user.isBanned && (
                        <Badge variant="destructive" className="text-xs">
                          Baneado
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant={user.isBanned ? "outline" : "destructive"}
                  size="sm"
                  onClick={() => handleToggleBan(user.id, user.isBanned)}
                  disabled={updating === user.id}
                  className="flex-shrink-0"
                >
                  {user.isBanned ? (
                    <>
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Desbanear
                    </>
                  ) : (
                    <>
                      <ShieldOff className="h-4 w-4 mr-2" />
                      Banear
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </DashboardCard>
  )
}
