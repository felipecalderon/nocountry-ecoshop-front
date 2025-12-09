"use server"
import { auth0 } from "@/lib/auth0"
import { fetcher } from "@/lib/fetcher"
import {
  CreateMaterialCompositionDto,
  Material,
  MaterialComposition,
  UpdateMaterialCompositionDto,
} from "@/types"

export const createMaterial = async (data: CreateMaterialCompositionDto) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: MaterialComposition }>(
      "POST",
      "/material-composition",
      { data, headers: { Authorization: `Bearer ${token}` } }
    )
  } catch (error) {
    console.error("Error creating material:", error)
    throw error
  }
}

export const getMaterials = async () => {
  try {
    return await fetcher<{
      data: Material[]
    }>("GET", "/material-composition")
  } catch (error) {
    console.error("Error fetching materials:", error)
    throw error
  }
}

export const getMaterial = async (id: string) => {
  try {
    return await fetcher<{ data: MaterialComposition["materialComposition"] }>(
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
    const { token } = await auth0.getAccessToken()
    return await fetcher("PATCH", `/material-composition/${id}`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error updating material ${id}:`, error)
    throw error
  }
}

export const deleteMaterial = async (id: string) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("DELETE", `/material-composition/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error deleting material ${id}:`, error)
    throw error
  }
}
