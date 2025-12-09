export interface OrderItemDto {
  productId: string
  quantity: number
}

export interface CreateOrderDto {
  addressId: string
  items: OrderItemDto[]
  couponCode?: string
}

export interface UpdateOrderStatusDto {
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled"
}

export interface Order {
  id: string
  userId: string
  addressId: string
  items: OrderItemDto[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  status: UpdateOrderStatusDto["status"]
  couponCode?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentWebhookDto {
  stripeSignature: string
  payload: string
}
