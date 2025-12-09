"use server"
import { fetcher } from "@/lib/fetcher"
import { Certification, CreateCertificationDto } from "@/types"
import { auth0 } from "@/lib/auth0"

export const createCertification = async (data: CreateCertificationDto) => {
  const formData = new FormData()
  formData.append("name", data.name)
  if (data.description) formData.append("description", data.description)
  if (data.file) formData.append("file", data.file)

  try {
    const { token } = await auth0.getAccessToken()
    return await fetcher("POST", "/certifications", {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error("Error creating certification:", error)
    throw error
  }
}

export const getCertifications = async () => {
  try {
    return await fetcher<{ data: Certification[] }>("GET", "/certifications")
  } catch (error) {
    console.error("Error fetching certifications:", error)
    throw error
  }
}
