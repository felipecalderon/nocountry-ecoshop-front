"use client"

import Link from "next/link"
import { Tag, Wallet } from "lucide-react"
import { useCheckoutStore } from "@/stores/checkoutStore"
import { Label } from "@/app/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Button } from "@/app/components/ui/button"
import { Coupon } from "@/types"

export default function CouponSelector({ coupons }: { coupons: Coupon[] }) {
  const { couponCode, setCouponCode } = useCheckoutStore()

  const validCoupons = coupons.filter((coupon) => {
    if (coupon.isUsed) return false
    if (coupon.discountPercentage === 0) return false
    if (!coupon.expiresAt) return true
    return new Date(coupon.expiresAt) > new Date()
  })

  if (validCoupons.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Cupón de descuento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground dark:text-neutral-100">
            No tienes cupones válidos actualmente
          </p>

          <Button
            variant="outline"
            className="w-full dark:hover:text-gray-200"
            asChild
          >
            <Link href="/dashboard/customer/wallet">
              <Wallet className="mr-2 h-4 w-4" />
              Ir a mi billetera para canjear cupones
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Cupón de descuento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={couponCode || "none"}
          onValueChange={(value) =>
            setCouponCode(value === "none" ? "" : value)
          }
        >
          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900/50 transition-colors">
            <RadioGroupItem value="none" id="no-coupon" />
            <Label htmlFor="no-coupon" className="flex-1 cursor-pointer">
              <div className="font-medium">No usar cupón</div>
              <div className="text-sm text-muted-foreground">
                Continuar sin descuento
              </div>
            </Label>
          </div>

          {validCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900/50 transition-colors"
            >
              <RadioGroupItem value={coupon.code} id={coupon.id} />
              <Label htmlFor={coupon.id} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-lg font-bold text-green-600 dark:text-green-200">
                    {coupon.discountPercentage}% OFF
                  </div>
                  <div className="font-medium">{coupon.code}</div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Válido hasta: {formatExpiryDate(coupon.expiresAt)}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {couponCode && couponCode !== "none" && (
          <p className="text-sm text-green-600 dark:text-green-100 mt-2">
            ✓ Cupón seleccionado: {couponCode}
          </p>
        )}

        <Button
          variant="outline"
          className="w-full dark:hover:text-gray-200"
          asChild
        >
          <Link href="/dashboard/customer/wallet">
            <Wallet className="mr-2 h-4 w-4" />
            Ir a mi billetera
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
