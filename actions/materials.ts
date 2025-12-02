import { fetcher } from "@/lib/fetcher"
import {
  CreateMaterialCompositionDto,
  UpdateMaterialCompositionDto,
} from "@/types"

export const createMaterial = async (data: CreateMaterialCompositionDto) => {
  try {
    return await fetcher(
      "POST",
      "/material-composition/material-compositions",
      { data }
    )
  } catch (error) {
    console.error("Error creating material:", error)
    throw error
  }
}

export const getMaterials = async () => {
  try {
    return await fetcher("GET", "/material-composition/material-compositions")
  } catch (error) {
    console.error("Error fetching materials:", error)
    return []
  }
}

export const getMaterial = async (id: string) => {
  try {
    return await fetcher(
      "GET",
      `/material-composition/material-compositions/${id}`
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
    return await fetcher(
      "PATCH",
      `/material-composition/material-compositions/${id}`,
      { data }
    )
  } catch (error) {
    console.error(`Error updating material ${id}:`, error)
    throw error
  }
}

export const deleteMaterial = async (id: string) => {
  try {
    return await fetcher(
      "DELETE",
      `/material-composition/material-compositions/${id}`
    )
  } catch (error) {
    console.error(`Error deleting material ${id}:`, error)
    throw error
  }
}
