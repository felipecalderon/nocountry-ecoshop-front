"use client"

import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error({ error }: { error: Error }) {
  const { back } = useRouter()
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <p className="px-10 pt-20 pb-10">
          Hubo un error al obtener la data del producto, inténtalo nuevamente en
          unos minutos
        </p>
        <p className="italic">Detalle del error:</p>
        <pre className="bg-gray-900/30 w-fit mx-auto px-2 py-4 rounded-md">
          {error.message}
        </pre>
      </div>
      <Button
        className="bg-secondary hover:bg-secondary/65 mt-6"
        onClick={() => back()}
      >
        Regresar
      </Button>
    </div>
  )
}
