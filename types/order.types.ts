export interface OrderItemDto {
  productId: string
  quantity: number
}

export interface CreateOrderDto {
  addressId: string
  items: OrderItemDto[]
}

export interface UpdateOrderStatusDto {
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled"
}
