"use client"

import { useAuth } from "@/stores/useAuthStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { User } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "next-view-transitions"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export default function UserMenu() {
  const { user } = useAuth()
  if (!user)
    return (
      <a href="/auth/login">
        <Tooltip>
          <TooltipTrigger asChild>
            <User className="cursor-pointer mt-1" />
          </TooltipTrigger>
          <TooltipContent align="center" side="bottom">
            <p>Iniciar Sesión</p>
          </TooltipContent>
        </Tooltip>
      </a>
    )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="sm:hidden cursor-pointer">
        <Button>
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuTrigger className="hidden sm:block cursor-pointer px-3">
        Bienvenido Eco-{user.firstName}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
          <Link href="/favorites">
            <DropdownMenuItem>Favoritos</DropdownMenuItem>
          </Link>
          <Link href={`/dashboard/${user.role}/settings`}>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <a href="/auth/logout">
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
