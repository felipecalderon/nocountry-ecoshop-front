import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { AddressType, User, UserRole } from "@/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  mockLogin: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user })
      },

      mockLogin: (role: UserRole) => {
        const mockUsers: Record<UserRole, User> = {
          [UserRole.CUSTOMER]: {
            id: "customer-123",
            email: "cliente@ecoshop.com",
            role: UserRole.CUSTOMER,
            firstName: "Juan",
            lastName: "Pérez",
            nationalId: "12345678",
            phone: "+54 9 11 1234-5678",
            birthDate: new Date("1990-05-15"),
            paymentCustomerIds: null,
            providerId: null,
            emailVerified: true,
            isBanned: false,
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2025-11-20"),
            deletedAt: null,
            addresses: [
              {
                id: "addr-1",
                street: "Av. Corrientes 1234",
                city: "Buenos Aires",
                postalCode: "C1043",
                country: "Argentina",
                addressType: AddressType.SHIPPING,
                deletedAt: null,
              },
            ],
          },
          [UserRole.BRAND_ADMIN]: {
            id: "admin-456",
            email: "gestor@ecoshop.com",
            role: UserRole.BRAND_ADMIN,
            firstName: "María",
            lastName: "González",
            nationalId: "87654321",
            phone: "+54 9 11 8765-4321",
            birthDate: new Date("1985-08-20"),
            paymentCustomerIds: null,
            providerId: null,
            emailVerified: true,
            isBanned: false,
            createdAt: new Date("2023-06-10"),
            updatedAt: new Date("2025-11-25"),
            deletedAt: null,
          },
          [UserRole.ADMIN]: {
            id: "superadmin-789",
            email: "admin@ecoshop.com",
            role: UserRole.ADMIN,
            firstName: "Carlos",
            lastName: "Rodríguez",
            nationalId: "11223344",
            phone: "+54 9 11 1122-3344",
            birthDate: new Date("1980-03-10"),
            paymentCustomerIds: null,
            providerId: null,
            emailVerified: true,
            isBanned: false,
            createdAt: new Date("2023-01-01"),
            updatedAt: new Date("2025-11-26"),
            deletedAt: null,
          },
        }

        const user = mockUsers[role]
        set({ user, isAuthenticated: true })
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
