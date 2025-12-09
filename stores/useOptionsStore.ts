import { create } from "zustand"
import { Material, Certification } from "@/types"
import { getMaterials } from "@/actions/materials"
import { getCertifications } from "@/actions/certifications"

interface OptionsState {
  materials: Material[]
  certifications: Certification[]
  isLoading: boolean
  error: string | null
  fetchMaterials: () => Promise<void>
  fetchCertifications: () => Promise<void>
}

export const useOptionsStore = create<OptionsState>((set) => ({
  materials: [],
  certifications: [],
  isLoading: false,
  error: null,
  fetchMaterials: async () => {
    set({ isLoading: true })
    try {
      const response = await getMaterials()
      set({ materials: response.data })
    } catch (err) {
      set({ error: "Failed to fetch materials" })
    } finally {
      set({ isLoading: false })
    }
  },
  fetchCertifications: async () => {
    set({ isLoading: true })
    try {
      const response = await getCertifications()
      set({ certifications: response.data })
    } catch (err) {
      set({ error: "Failed to fetch certifications" })
    } finally {
      set({ isLoading: false })
    }
  },
}))
