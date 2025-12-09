// Mock data para el dashboard del Brand Admin (Gestor de Tienda)

export interface SalesStat {
  label: string
  value: string
  change: number
  trend: "up" | "down"
}

export interface RecentSale {
  id: string
  orderNumber: string
  customer: string
  date: Date
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

export interface InventoryItem {
  id: string
  productName: string
  sku: string
  currentStock: number
  minStock: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  lastRestocked: Date
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

// Estadísticas generales
export const mockSalesStats: SalesStat[] = [
  {
    label: "Ventas Totales",
    value: "$45,231",
    change: 20.1,
    trend: "up",
  },
  {
    label: "Pedidos",
    value: "234",
    change: 12.5,
    trend: "up",
  },
  {
    label: "Clientes Nuevos",
    value: "54",
    change: -5.2,
    trend: "down",
  },
  {
    label: "Tasa de Conversión",
    value: "3.2%",
    change: 8.3,
    trend: "up",
  },
]

// Ventas recientes
export const mockRecentSales: RecentSale[] = [
  {
    id: "sale-1",
    orderNumber: "ORD-2025-001",
    customer: "Ana Martínez",
    date: new Date("2025-11-26"),
    total: 1250.5,
    status: "processing",
  },
  {
    id: "sale-2",
    orderNumber: "ORD-2025-002",
    customer: "Pedro López",
    date: new Date("2025-11-25"),
    total: 890.0,
    status: "shipped",
  },
  {
    id: "sale-3",
    orderNumber: "ORD-2025-003",
    customer: "Laura Fernández",
    date: new Date("2025-11-25"),
    total: 2100.75,
    status: "delivered",
  },
  {
    id: "sale-4",
    orderNumber: "ORD-2025-004",
    customer: "Carlos Ruiz",
    date: new Date("2025-11-24"),
    total: 450.0,
    status: "pending",
  },
  {
    id: "sale-5",
    orderNumber: "ORD-2025-005",
    customer: "Sofía García",
    date: new Date("2025-11-24"),
    total: 1680.25,
    status: "processing",
  },
]

// Inventario con stock bajo
export const mockLowStockItems: InventoryItem[] = [
  {
    id: "inv-1",
    productName: "Botella Reutilizable Eco",
    sku: "BOT-ECO-001",
    currentStock: 5,
    minStock: 20,
    status: "low_stock",
    lastRestocked: new Date("2025-11-15"),
  },
  {
    id: "inv-2",
    productName: "Bolsa de Tela Orgánica",
    sku: "BOL-ORG-002",
    currentStock: 0,
    minStock: 30,
    status: "out_of_stock",
    lastRestocked: new Date("2025-11-10"),
  },
  {
    id: "inv-3",
    productName: "Cepillo de Bambú",
    sku: "CEP-BAM-003",
    currentStock: 12,
    minStock: 25,
    status: "low_stock",
    lastRestocked: new Date("2025-11-20"),
  },
  {
    id: "inv-4",
    productName: "Jabón Natural Lavanda",
    sku: "JAB-LAV-004",
    currentStock: 8,
    minStock: 40,
    status: "low_stock",
    lastRestocked: new Date("2025-11-18"),
  },
]

// Productos más vendidos
export const mockTopProducts: TopProduct[] = [
  {
    id: "prod-1",
    name: "Set de Cubiertos de Bambú",
    sales: 156,
    revenue: 7800,
    image: "/placeholder-product.jpg",
  },
  {
    id: "prod-2",
    name: "Botella Térmica Acero Inoxidable",
    sales: 142,
    revenue: 8520,
    image: "/placeholder-product.jpg",
  },
  {
    id: "prod-3",
    name: "Shampoo Sólido Natural",
    sales: 128,
    revenue: 3840,
    image: "/placeholder-product.jpg",
  },
  {
    id: "prod-4",
    name: "Bolsa de Compras Reutilizable",
    sales: 98,
    revenue: 1960,
    image: "/placeholder-product.jpg",
  },
  {
    id: "prod-5",
    name: "Velas de Soja Aromáticas",
    sales: 87,
    revenue: 2610,
    image: "/placeholder-product.jpg",
  },
]

// Datos para gráficos de ventas (últimos 7 días)
export const mockSalesChartData = [
  { day: "Lun", sales: 4200 },
  { day: "Mar", sales: 5100 },
  { day: "Mié", sales: 4800 },
  { day: "Jue", sales: 6200 },
  { day: "Vie", sales: 7500 },
  { day: "Sáb", sales: 8900 },
  { day: "Dom", sales: 6800 },
]
