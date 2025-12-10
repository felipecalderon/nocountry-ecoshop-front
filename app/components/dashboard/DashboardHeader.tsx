"use client"

import { Menu, Bell, LogOut } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { useAuth } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { TooltipArrow } from "@radix-ui/react-tooltip"

interface DashboardHeaderProps {
  title: string
  onMenuClick: () => void
}

export default function DashboardHeader({
  title,
  onMenuClick,
}: DashboardHeaderProps) {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/auth/logout")
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {user && (
              <p className="text-sm text-muted-foreground">
                Bienvenido, {user.firstName || user.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              Cerrar sesión
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
