import { fetcher } from "@/lib/fetcher"
import { CreateCertificationDto } from "@/types"

export const createCertification = async (data: CreateCertificationDto) => {
  const formData = new FormData()
  formData.append("name", data.name)
  if (data.description) formData.append("description", data.description)
  if (data.file) formData.append("file", data.file)

  try {
    return await fetcher("POST", "/certifications", {
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  } catch (error) {
    console.error("Error creating certification:", error)
    throw error
  }
}

export const getCertifications = async () => {
  try {
    return await fetcher("GET", "/certifications")
  } catch (error) {
    console.error("Error fetching certifications:", error)
    return []
  }
}
