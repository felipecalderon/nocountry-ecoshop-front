"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "./button"

export function BackButton() {
  return (
    <Button
      className="dark:hover:text-white"
      variant="outline"
      onClick={() => window.history.back()}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Volver atrás
    </Button>
  )
}
