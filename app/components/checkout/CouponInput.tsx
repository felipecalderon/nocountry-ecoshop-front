"use client"

import { useState } from "react"
import { Tag, Check } from "lucide-react"
import { useCheckoutStore } from "@/stores/checkoutStore"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"

export default function CouponInput() {
  const { couponCode, setCouponCode } = useCheckoutStore()
  const [inputValue, setInputValue] = useState(couponCode)
  const [isApplied, setIsApplied] = useState(!!couponCode)

  const handleApply = () => {
    if (inputValue.trim()) {
      setCouponCode(inputValue.trim())
      setIsApplied(true)
    }
  }

  const handleRemove = () => {
    setInputValue("")
    setCouponCode("")
    setIsApplied(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Cupón de descuento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ingresa tu cupón (ej: ECO-A1B2C3)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            disabled={isApplied}
            className="flex-1"
          />
          {isApplied ? (
            <Button
              variant="outline"
              onClick={handleRemove}
              className="whitespace-nowrap dark:hover:text-gray-200 cursor-pointer"
            >
              Remover
            </Button>
          ) : (
            <Button
              onClick={handleApply}
              disabled={!inputValue.trim()}
              className="whitespace-nowrap cursor-pointer"
            >
              <Check className="mr-2 h-4 w-4" />
              Aplicar
            </Button>
          )}
        </div>
        {isApplied && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            ✓ Cupón aplicado: {couponCode}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
