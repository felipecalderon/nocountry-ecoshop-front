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

export default function UserMenu() {
  const { user } = useAuth()
  if (!user)
    return (
      <a href="/auth/login">
        <User className="cursor-pointer mt-1" />
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
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Mis Pedidos</DropdownMenuItem>
          <DropdownMenuItem>Favoritos</DropdownMenuItem>
          <DropdownMenuItem>Perfil</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <a href="/auth/logout">
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
