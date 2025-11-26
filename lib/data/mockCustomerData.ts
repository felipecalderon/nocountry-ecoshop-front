// Mock data para el dashboard del Cliente

export interface CustomerOrder {
  id: string
  orderNumber: string
  date: Date
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  itemsCount: number
  trackingNumber?: string
}

export interface FavoriteProduct {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
  ecoScore: number
}

export interface CustomerStats {
  totalOrders: number
  totalSpent: number
  ecoPoints: number
  carbonSaved: number
}

// Estadísticas del cliente
export const mockCustomerStats: CustomerStats = {
  totalOrders: 12,
  totalSpent: 8450.75,
  ecoPoints: 1250,
  carbonSaved: 45.5, // kg de CO2
}

// Pedidos del cliente
export const mockCustomerOrders: CustomerOrder[] = [
  {
    id: "order-1",
    orderNumber: "ORD-2025-089",
    date: new Date("2025-11-20"),
    total: 1250.5,
    status: "delivered",
    itemsCount: 3,
    trackingNumber: "ECO-TRK-123456",
  },
  {
    id: "order-2",
    orderNumber: "ORD-2025-067",
    date: new Date("2025-11-10"),
    total: 890.0,
    status: "delivered",
    itemsCount: 2,
    trackingNumber: "ECO-TRK-123455",
  },
  {
    id: "order-3",
    orderNumber: "ORD-2025-045",
    date: new Date("2025-10-28"),
    total: 2100.75,
    status: "delivered",
    itemsCount: 5,
    trackingNumber: "ECO-TRK-123454",
  },
  {
    id: "order-4",
    orderNumber: "ORD-2025-023",
    date: new Date("2025-10-15"),
    total: 450.0,
    status: "delivered",
    itemsCount: 1,
    trackingNumber: "ECO-TRK-123453",
  },
  {
    id: "order-5",
    orderNumber: "ORD-2025-012",
    date: new Date("2025-10-05"),
    total: 1680.25,
    status: "delivered",
    itemsCount: 4,
    trackingNumber: "ECO-TRK-123452",
  },
]

// Productos favoritos
export const mockFavoriteProducts: FavoriteProduct[] = [
  {
    id: "fav-1",
    name: "Set de Cubiertos de Bambú",
    price: 50.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 95,
  },
  {
    id: "fav-2",
    name: "Botella Térmica Acero Inoxidable",
    price: 60.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 92,
  },
  {
    id: "fav-3",
    name: "Shampoo Sólido Natural",
    price: 30.0,
    image: "/placeholder-product.jpg",
    inStock: false,
    ecoScore: 88,
  },
  {
    id: "fav-4",
    name: "Bolsa de Compras Reutilizable",
    price: 20.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 90,
  },
  {
    id: "fav-5",
    name: "Velas de Soja Aromáticas",
    price: 30.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 85,
  },
  {
    id: "fav-6",
    name: "Cepillo de Dientes de Bambú",
    price: 15.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 93,
  },
]

// Recomendaciones personalizadas
export const mockRecommendedProducts: FavoriteProduct[] = [
  {
    id: "rec-1",
    name: "Jabón Natural de Lavanda",
    price: 25.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 89,
  },
  {
    id: "rec-2",
    name: "Pañuelos Reutilizables de Tela",
    price: 18.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 91,
  },
  {
    id: "rec-3",
    name: "Copa Menstrual de Silicona",
    price: 45.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 94,
  },
  {
    id: "rec-4",
    name: "Esponja Natural de Luffa",
    price: 12.0,
    image: "/placeholder-product.jpg",
    inStock: true,
    ecoScore: 87,
  },
]
