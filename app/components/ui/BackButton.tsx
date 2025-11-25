"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "./button"
import { useRouter } from "next/navigation"

export function BackButton() {
  const { back } = useRouter()

  return (
    <Button
      className="dark:hover:text-white"
      variant="outline"
      onClick={() => back()}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Volver atrás
    </Button>
  )
}
