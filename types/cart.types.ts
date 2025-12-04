export interface CartItem {
  id: string
  slug: string
  name: string
  image: string
  imageAltText: string
  price: string
  quantity: number
  maxStock: number
  sku: string
}

export interface CartStore {
  items: CartItem[]

  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void

  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void

  getTotalItems: () => number
  getTotalPrice: () => number
  isInCart: (itemId: string) => boolean
  getItemQuantity: (itemId: string) => number
}

export interface CartSummaryProps {
  totalItems: number
  totalPrice: number
  carbonFootprint: number
}

export interface CartItemCardProps {
  item: CartItem
}

export interface MetricCardProps {
  icon: React.FC<React.ComponentProps<"svg">>
  label: string
  value: string
  unit: string
  iconColor: string
}
