"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ShoppingCart, Check, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Product } from "@/types/product.types"

function AddToCartButton({ product }: { product: Product }) {
  const { addItem, isInCart, getItemQuantity, updateQuantity } = useCartStore()
  const [isAdding, setIsAdding] = useState(false)

  const inCart = isInCart(product.id)
  const cartQuantity = getItemQuantity(product.id)

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)

    if (!isNaN(value) && value >= 1) {
      setSelectedQuantity(Math.min(value, product.stock))
    } else if (event.target.value === "") {
      setSelectedQuantity(1)
    }
  }

  const increase = () => {
    setSelectedQuantity((q) => Math.min(q + 1, product.stock))
  }

  const decrease = () => {
    setSelectedQuantity((q) => Math.max(q - 1, 1))
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("No hay stock para este producto.")
      return
    }

    setIsAdding(true)

    const newQuantity = cartQuantity + selectedQuantity
    const finalQuantity = Math.min(newQuantity, product.stock)
    const addedAmount = finalQuantity - cartQuantity

    if (addedAmount <= 0) {
      toast.warning("Stock máximo alcanzado.", {
        description: `Ya tienes ${cartQuantity} en el carrito y el stock es ${product.stock}.`,
      })
      setSelectedQuantity(1)
      setIsAdding(false)
      return
    }

    try {
      if (!inCart) {
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          imageAltText: product.imageAltText,
          price: product.price,
          maxStock: product.stock,
          sku: product.sku,
        })
      }

      updateQuantity(product.id, finalQuantity)

      const toastMessage =
        addedAmount > 1
          ? "Productos agregados al carrito"
          : "Producto agregado al carrito"

      toast.success(toastMessage, {
        description: `${addedAmount} x ${product.name} (Total: ${finalQuantity})`,
      })
    } catch (err) {
      console.error("Error al agregar/actualizar carrito:", err)
      toast.error("No se pudo actualizar el carrito.")
    } finally {
      setSelectedQuantity(1)
      setIsAdding(false)
    }
  }

  return (
    <section className="flex items-end space-x-4 pt-4">
      <aside className="flex flex-col space-y-2">
        <Label htmlFor="quantity">Cantidad</Label>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            className={selectedQuantity <= 1 ? "opacity-50" : "cursor-pointer"}
            onClick={decrease}
            disabled={selectedQuantity <= 1 || isAdding}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="quantity"
            type="number"
            min="1"
            max={product.stock}
            value={selectedQuantity}
            onChange={handleQuantityChange}
            className="w-20 text-center"
          />
          <Button
            variant="outline"
            size="icon"
            className={
              selectedQuantity >= product.stock
                ? "opacity-50"
                : "cursor-pointer"
            }
            onClick={increase}
            disabled={selectedQuantity >= product.stock || isAdding}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      <Button
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding}
        className="flex-1 max-w-xs dark:bg-white dark:hover:bg-gray-200 dark:text-primary cursor-pointer"
      >
        {product.stock === 0 ? (
          "Agotado"
        ) : isAdding ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Actualizando
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir al carrito ({selectedQuantity})
          </>
        )}
      </Button>
    </section>
  )
}

export default AddToCartButton
