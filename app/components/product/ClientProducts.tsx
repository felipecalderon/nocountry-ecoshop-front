"use client"

import { useEffect, useState } from "react"
import { useProductStore } from "@/stores/useProductStore"
import { Product } from "@/types"
import { Plus, Edit, Trash2, Loader2, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { deleteProduct } from "@/actions/products"
import { toast } from "sonner"
import { useAuth } from "@/stores/useAuthStore"

interface ClientProductsProps {
  initialProducts: Product[]
}

export default function ClientProducts({
  initialProducts,
}: ClientProductsProps) {
  const { products, setProducts } = useProductStore()
  const { user } = useAuth()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts, setProducts])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteProduct(id)
      // removeProduct(id)
      toast.success("Producto eliminado correctamente")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Error al eliminar el producto")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona el catálogo de productos
          </p>
        </div>
        <Link
          href={`/dashboard/${user?.role || "brand_admin"}/products/new`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre, SKU o descripción..."
          className="pl-8 max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col justify-between"
          >
            <div className="p-6 pt-0 mt-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold leading-none tracking-tight">
                    {product.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </span>
                </div>
                {product.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
              </div>

              <div className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">${product.price}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  {product.stock} unids.
                </span>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-2">
              <Link
                href={`/dashboard/${user?.role || "brand_admin"}/products/${
                  product.id
                }/edit`}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(product.id)}
                disabled={deletingId === product.id}
              >
                {deletingId === product.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && products.length > 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border rounded-lg border-dashed">
            <h3 className="text-lg font-semibold">
              No se encontraron productos
            </h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}
        {products.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border rounded-lg border-dashed">
            <h3 className="text-lg font-semibold">No hay productos</h3>
            <p className="text-muted-foreground mb-4">
              ¡Comienza creando tu primer producto sustentable!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
