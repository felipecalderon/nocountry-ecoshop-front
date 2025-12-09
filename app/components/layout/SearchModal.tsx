"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { getProducts } from "@/actions/products"
import { Product } from "@/types"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (open && products.length === 0) {
      setLoading(true)
      getProducts()
        .then((res) => {
          if (res?.data) {
            setProducts(res.data)
          }
        })
        .catch((err) => console.error("Error fetching products", err))
        .finally(() => setLoading(false))
    }
  }, [open, products.length])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProductClick = (id: string) => {
    setOpen(false)
    router.push(`/store/${id}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-secondary dark:text-white hover:bg-primary/80 hover:text-secondary"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar productos</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent align="center" side="bottom">
          <p>Buscar productos</p>
        </TooltipContent>
      </Tooltip>
      <DialogTitle hidden>Buscar productos</DialogTitle>
      <DialogContent className="sm:max-w-[550px] w-full p-0 gap-0 overflow-hidden bg-white dark:bg-slate-950">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="mr-2 h-5 w-5 opacity-50" />
          <Input
            className="flex-1 border-none shadow-none focus-visible:ring-0 text-lg h-auto py-1"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : searchTerm === "" ? (
            <div className="text-center p-8 text-muted-foreground text-sm">
              Escribe para buscar productos...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid gap-1">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/10 cursor-pointer transition-colors"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="h-12 w-12 relative rounded-md overflow-hidden border bg-muted shrink-0">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary/10 text-xs">
                        No img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{product.name}</h4>
                    <p className="text-xs dark:text-secondary line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="font-semibold text-sm">${product.price}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              No se encontraron productos.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
