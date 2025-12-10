"use client"

import { Brand } from "@/types"
import { BrandView } from "@/app/components/brand/BrandView"

interface BrandManagerProps {
  initialBrand: Brand
}

export function BrandManager({ initialBrand }: BrandManagerProps) {
  return <BrandView brand={initialBrand} />
}
