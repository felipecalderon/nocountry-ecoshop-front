import { create } from "zustand"

interface CheckoutStore {
  selectedAddressId: string | null
  couponCode: string
  isProcessing: boolean
  error: string | null

  setSelectedAddressId: (id: string | null) => void
  setCouponCode: (code: string) => void
  setIsProcessing: (processing: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  selectedAddressId: null,
  couponCode: "",
  isProcessing: false,
  error: null,

  setSelectedAddressId: (id) => set({ selectedAddressId: id }),
  setCouponCode: (code) => set({ couponCode: code }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      selectedAddressId: null,
      couponCode: "",
      isProcessing: false,
      error: null,
    }),
}))
