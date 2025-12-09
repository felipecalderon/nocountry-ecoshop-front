"use client"

import { useFavoritesStore } from "@/stores/useFavoritesStore"
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Heart } from "lucide-react"
import { Product } from "@/types"

export default function FavoritesClient({ products }: { products: Product[] }) {
  const { favoriteIds } = useFavoritesStore()
  const [mounted, setMounted] = useState(false)

  // Filter products based on stored IDs
  const favorites = products.filter((p) => favoriteIds.includes(p.id))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="h-10 w-48 bg-muted/20 animate-pulse rounded mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-96 bg-muted/20 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3 text-primary">
        <Heart className="text-red-500 fill-red-500" size={40} />
        Mis Favoritos
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="w-24 h-24 text-muted-foreground/20" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No tienes favoritos aún
          </h2>
          <p className="text-muted-foreground/80 max-w-sm">
            Explora nuestra tienda y dale corazón a los productos que más te
            gusten para guardarlos aquí.
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
