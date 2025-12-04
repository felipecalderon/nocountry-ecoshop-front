import { fetcher } from "@/lib/fetcher"
import {
  CreateMaterialCompositionDto,
  MaterialComposition,
  UpdateMaterialCompositionDto,
} from "@/types"

export const createMaterial = async (data: CreateMaterialCompositionDto) => {
  try {
    return await fetcher<{ data: MaterialComposition }>(
      "POST",
      "/material-composition",
      { data }
    )
  } catch (error) {
    console.error("Error creating material:", error)
    throw error
  }
}

export const getMaterials = async () => {
  try {
    return await fetcher<{ data: MaterialComposition[] }>(
      "GET",
      "/material-composition"
    )
  } catch (error) {
    console.error("Error fetching materials:", error)
    throw error
  }
}

export const getMaterial = async (id: string) => {
  try {
    return await fetcher<{ data: MaterialComposition }>(
      "GET",
      `/material-composition/${id}`
    )
  } catch (error) {
    console.error(`Error fetching material ${id}:`, error)
    return null
  }
}

export const updateMaterial = async (
  id: string,
  data: UpdateMaterialCompositionDto
) => {
  try {
    return await fetcher("PATCH", `/material-composition/${id}`, { data })
  } catch (error) {
    console.error(`Error updating material ${id}:`, error)
    throw error
  }
}

export const deleteMaterial = async (id: string) => {
  try {
    return await fetcher("DELETE", `/material-composition/${id}`)
  } catch (error) {
    console.error(`Error deleting material ${id}:`, error)
    throw error
  }
}
