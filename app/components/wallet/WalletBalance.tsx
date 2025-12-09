"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Wallet } from "lucide-react"

interface WalletBalanceProps {
  balance: number | null
}

export default function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Balance Total</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {balance !== null ? balance.toLocaleString() : "..."} Puntos
        </div>
        <p className="text-xs text-muted-foreground">
          Disponibles para canjear
        </p>
      </CardContent>
    </Card>
  )
}
