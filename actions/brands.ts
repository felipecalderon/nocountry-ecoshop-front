"use server"
import { fetcher } from "@/lib/fetcher"
import {
  CreateBrandDto,
  BrandStatsDto,
  UpdateOrderStatusDto,
  OrderItemDto,
} from "@/types"
import { auth0 } from "@/lib/auth0"

export const createBrand = async (data: CreateBrandDto) => {
  const formData = new FormData()
  formData.append("name", data.name)
  if (data.description) formData.append("description", data.description)
  // Logo handling would need file input, assuming logic handled in component to pass FormData or similar
  // For now, keeping it simple as per DTO which implies multipart but DTO shows JSON fields in my type definition.
  // The endpoint says multipart/form-data.
  // I'll assume the caller passes FormData if it involves files, or I construct it here.
  // Let's stick to the DTO type for now.

  // Actually, the endpoint /brands POST expects multipart/form-data.
  // My CreateBrandDto in types is just an object.
  // I should probably accept FormData or construct it.
  // Let's assume the component handles the FormData construction if there's a file,
  // or I can change the signature to accept FormData.
  // Given the complexity, I'll accept FormData directly for creation if files are involved,
  // or just the DTO and convert it.

  // Let's try to be smart.
  // If the user passes an object with a file, I should convert to FormData.
  // But for now, let's just use the fetcher with the data provided.

  try {
    // If data has a file property (not in DTO but possible), we'd need FormData.
    // For now, sending as JSON might fail if backend enforces multipart.
    // The endpoint definition says:
    // content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/CreateBrandDto" } } }
    // So it expects multipart.

    // I will assume the caller might pass a FormData object if they have a file,
    // or I should convert it.
    // Since I defined CreateBrandDto without File, I'll stick to JSON for the non-file parts
    // and maybe the user will use a different method for files.
    // BUT, to be safe, I will use FormData here.

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string | Blob)
    })

    const { token } = await auth0.getAccessToken()

    return await fetcher("POST", "/brands", {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error("Error creating brand:", error)
    throw error
  }
}

export const getMyBrand = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("GET", "/brands", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching my brand:", error)
    return null
  }
}

export const getBrandOrders = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: OrderItemDto[]; totalPages: number }>(
      "GET",
      "/brands/orders",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  } catch (error) {
    console.error("Error fetching brand orders:", error)
    return null
  }
}

export const updateBrandOrderStatus = async (
  id: string,
  data: UpdateOrderStatusDto
) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("PATCH", `/brands/orders/${id}/status`, {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(`Error updating order status ${id}:`, error)
    throw error
  }
}

export const getBrandStats = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<BrandStatsDto>("GET", "/brands/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error fetching brand stats:", error)
    return null
  }
}
