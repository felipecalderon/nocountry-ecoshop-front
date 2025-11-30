"use client"

import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { useTransitionRouter } from "next-view-transitions"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { RecyclabilityStatus } from "@/types/product.types"
import { Button } from "../ui/button"

export default function ProductFilters() {
  const router = useTransitionRouter()
  const searchParams = useSearchParams()

  const [name, setName] = useState(searchParams.get("name") || "")
  const [sku, setSku] = useState(searchParams.get("sku") || "")
  const [originCountry, setOriginCountry] = useState(
    searchParams.get("originCountry") || ""
  )
  const [material, setMaterial] = useState(searchParams.get("material") || "")

  useEffect(() => {
    setName(searchParams.get("name") || "")
    setSku(searchParams.get("sku") || "")
    setOriginCountry(searchParams.get("originCountry") || "")
    setMaterial(searchParams.get("material") || "")
  }, [searchParams])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const debouncedUpdate = useDebouncedCallback(
    (name: string, value: string) => {
      router.push(`?${createQueryString(name, value)}`)
    },
    500
  )

  const handleTextChange = (
    key: "name" | "sku" | "originCountry" | "material",
    value: string
  ) => {
    if (key === "name") setName(value)
    if (key === "sku") setSku(value)
    if (key === "originCountry") setOriginCountry(value)
    if (key === "material") setMaterial(value)

    debouncedUpdate(key, value)
  }

  const handleSelectChange = (name: string, value: string) => {
    router.push(`?${createQueryString(name, value)}`)
  }

  const clearFilters = () => {
    router.push("/store")
  }

  return (
    <div className="w-full md:w-64 space-y-6 p-4 border rounded-lg h-fit">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filtros</h3>
        {searchParams.toString().length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs h-8"
          >
            Limpiar
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          placeholder="Buscar por nombre..."
          value={name}
          onChange={(e) => handleTextChange("name", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sku">SKU</Label>
        <Input
          id="sku"
          placeholder="Buscar por SKU..."
          value={sku}
          onChange={(e) => handleTextChange("sku", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="originCountry">País de Origen</Label>
        <Input
          id="originCountry"
          placeholder="Ej: Argentina"
          value={originCountry}
          onChange={(e) => handleTextChange("originCountry", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recyclabilityStatus">Reciclabilidad</Label>
        <Select
          value={searchParams.get("recyclabilityStatus") || "ALL"}
          onValueChange={(value) =>
            handleSelectChange(
              "recyclabilityStatus",
              value === "ALL" ? "" : value
            )
          }
        >
          <SelectTrigger id="recyclabilityStatus">
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            {Object.values(RecyclabilityStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ecoBadgeLevel">Impacto Ambiental</Label>
        <Select
          value={searchParams.get("ecoBadgeLevel") || "ALL"}
          onValueChange={(value) =>
            handleSelectChange("ecoBadgeLevel", value === "ALL" ? "" : value)
          }
        >
          <SelectTrigger id="ecoBadgeLevel">
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="LOW">Bajo</SelectItem>
            <SelectItem value="MEDIUM">Medio</SelectItem>
            <SelectItem value="HIGH">Alto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="material">Composición Material</Label>
        <Input
          id="material"
          placeholder="Ej: Algodón"
          value={material}
          onChange={(e) => handleTextChange("material", e.target.value)}
        />
      </div>
    </div>
  )
}
