import { Package, Home } from "lucide-react"

export const addressTypeLabels = {
  shipping: "Envío",
  billing: "Facturación",
}

export const addressTypeColors = {
  shipping: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  billing:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export const addressTypeIcons = {
  shipping: Package,
  billing: Home,
}
