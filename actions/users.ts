"use server"

import { auth0 } from "@/lib/auth0"
import { fetcher } from "@/lib/fetcher"
import { User, ImpactStatsDto } from "@/types"
import { AxiosError } from "axios"

export const getProfile = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    const res = await fetcher<{ data: User }>("GET", "/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching profile:", error.toJSON())
    }
    console.error("Error fetching profile:", error)
    return null
  }
}

export const updateProfile = async (data: Partial<User>) => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: User }>("PATCH", "/users/profile", {
      data,
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    throw error
  }
}

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  const { token } = await auth0.getAccessToken()

  try {
    return await fetcher<{ data: User }>("POST", "/users/profile/image", {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error("Error uploading profile image:", error)
    throw error
  }
}

export const getImpactStats = async () => {
  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher<{ data: ImpactStatsDto }>(
      "GET",
      "/users/dashboard/impact",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  } catch (error) {
    console.error("Error fetching impact stats:", error)
    return null
  }
}
