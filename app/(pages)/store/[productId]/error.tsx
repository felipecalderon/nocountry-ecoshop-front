"use client"

import { BackButton } from "@/app/components/ui/BackButton"

export default function Error({ error }: { error: Error }) {
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
      <BackButton />
    </div>
  )
}
