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
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { RecyclabilityStatus } from "@/types"
import { Button } from "../ui/button"
import {
  Search,
  Tag,
  Globe,
  Recycle,
  Leaf,
  Layers,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react"
import { Badge } from "../ui/badge"

// Mapeo de etiquetas amigables para RecyclabilityStatus
const RECYCLABILITY_LABELS: Record<RecyclabilityStatus, string> = {
  [RecyclabilityStatus.NOT_APPLICABLE]: "No Aplica",
  [RecyclabilityStatus.NOT_RECYCLABLE]: "No Reciclable",
  [RecyclabilityStatus.PARTIALLY_RECYCLABLE]: "Parcialmente Reciclable",
  [RecyclabilityStatus.FULLY_RECYCLABLE]: "Totalmente Reciclable",
}

// Mapeo de etiquetas amigables para EcoBadgeLevel
const ECO_BADGE_LABELS: Record<string, string> = {
  LOW: "Bajo Impacto",
  MEDIUM: "Impacto Medio",
  HIGH: "Alto Impacto",
}

interface FilterState {
  name: string
  sku: string
  originCountry: string
  material: string
}

export default function ProductFilters() {
  const router = useTransitionRouter()
  const searchParams = useSearchParams()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Estado consolidado para filtros de texto
  const [filters, setFilters] = useState<FilterState>({
    name: searchParams.get("name") || "",
    sku: searchParams.get("sku") || "",
    originCountry: searchParams.get("originCountry") || "",
    material: searchParams.get("material") || "",
  })

  // Sincronizar estado con URL params
  useEffect(() => {
    setFilters({
      name: searchParams.get("name") || "",
      sku: searchParams.get("sku") || "",
      originCountry: searchParams.get("originCountry") || "",
      material: searchParams.get("material") || "",
    })
  }, [searchParams])

  // Contar filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.name) count++
    if (filters.sku) count++
    if (filters.originCountry) count++
    if (filters.material) count++
    if (searchParams.get("recyclabilityStatus")) count++
    if (searchParams.get("ecoBadgeLevel")) count++
    return count
  }, [filters, searchParams])

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

  // Handler genérico para cambios de texto
  const handleTextChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    debouncedUpdate(key, value)
  }

  // Handler para selects
  const handleSelectChange = (name: string, value: string) => {
    router.push(`?${createQueryString(name, value)}`)
  }

  // Limpiar todos los filtros
  const clearFilters = () => {
    router.push("/store")
  }

  return (
    <div className="w-full sticky top-20 md:w-64 space-y-4 p-5 border rounded-xl h-fit bg-linear-to-br from-background from-10% to-muted/20 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header con contador de filtros */}
      <div className="flex justify-between items-center pb-3 border-b">
        <div className="flex items-center gap-2">
          <Filter className="size-5 text-primary" />
          <h3 className="font-semibold text-lg">Filtros</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs h-7 px-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="size-3 mr-1" />
              Limpiar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="md:hidden h-7 w-7 p-0"
          >
            {isCollapsed ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Contenido de filtros */}
      <div
        className={`space-y-4 transition-all duration-300 ${
          isCollapsed ? "hidden md:block" : "block"
        }`}
      >
        {/* Filtro por Nombre */}
        <div className="space-y-2 group">
          <Label
            htmlFor="name"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Search className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            Nombre del Producto
          </Label>
          <Input
            id="name"
            placeholder="Buscar por nombre..."
            value={filters.name}
            onChange={(e) => handleTextChange("name", e.target.value)}
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        {/* Filtro por SKU */}
        <div className="space-y-2 group">
          <Label
            htmlFor="sku"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Tag className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            Código SKU
          </Label>
          <Input
            id="sku"
            placeholder="Buscar por SKU..."
            value={filters.sku}
            onChange={(e) => handleTextChange("sku", e.target.value)}
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        {/* Filtro por País de Origen */}
        <div className="space-y-2 group">
          <Label
            htmlFor="originCountry"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Globe className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            País de Origen
          </Label>
          <Input
            id="originCountry"
            placeholder="Ej: Argentina"
            value={filters.originCountry}
            onChange={(e) => handleTextChange("originCountry", e.target.value)}
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        {/* Filtro por Reciclabilidad */}
        <div className="space-y-2 group">
          <Label
            htmlFor="recyclabilityStatus"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Recycle className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            Reciclabilidad
          </Label>
          <Select
            value={searchParams.get("recyclabilityStatus") || "ALL"}
            onValueChange={(value) =>
              handleSelectChange(
                "recyclabilityStatus",
                value === "ALL" ? "" : value
              )
            }
          >
            <SelectTrigger
              id="recyclabilityStatus"
              className="transition-all duration-200 hover:border-primary/50"
            >
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              {Object.entries(RECYCLABILITY_LABELS).map(([status, label]) => (
                <SelectItem key={status} value={status}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Impacto Ambiental */}
        <div className="space-y-2 group">
          <Label
            htmlFor="ecoBadgeLevel"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Leaf className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            Impacto Ambiental
          </Label>
          <Select
            value={searchParams.get("ecoBadgeLevel") || "ALL"}
            onValueChange={(value) =>
              handleSelectChange("ecoBadgeLevel", value === "ALL" ? "" : value)
            }
          >
            <SelectTrigger
              id="ecoBadgeLevel"
              className="transition-all duration-200 hover:border-primary/50"
            >
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              {Object.entries(ECO_BADGE_LABELS).map(([level, label]) => (
                <SelectItem key={level} value={level}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Material */}
        <div className="space-y-2 group">
          <Label
            htmlFor="material"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Layers className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            Composición Material
          </Label>
          <Input
            id="material"
            placeholder="Ej: Algodón, Poliéster..."
            value={filters.material}
            onChange={(e) => handleTextChange("material", e.target.value)}
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  )
}
