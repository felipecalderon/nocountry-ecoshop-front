"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { toast } from "sonner"
import { createReward, redeemPoints } from "@/actions/wallet"
import { CreateRewardDto } from "@/types"
import { useRouter } from "next/navigation"

interface WalletRewardsProps {
  rewards: any[] | null
  userPoints: number
}

export default function WalletRewards({
  rewards,
  userPoints,
}: WalletRewardsProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const handleRedeem = async (rewardId: string, amount: number) => {
    if (userPoints < amount) {
      toast.error("No tienes suficientes puntos para canjear este premio.")
      return
    }

    setLoading(rewardId)
    try {
      const data: CreateRewardDto = {
        rewardId,
        amount,
      }
      await redeemPoints(data)
      toast.success("¡Premio canjeado con éxito!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Error al canjear el premio.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rewards?.map((reward) => (
        <Card key={reward._id || reward.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{reward.name}</CardTitle>
            <CardDescription>{reward.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-xl font-bold">
              {reward.costInPoints} Puntos
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() =>
                handleRedeem(reward._id || reward.id, reward.costInPoints)
              }
            >
              {loading === (reward._id || reward.id)
                ? "Canjeando..."
                : "Canjear"}
            </Button>
          </CardFooter>
        </Card>
      ))}
      {(!rewards || rewards.length === 0) && (
        <div className="col-span-full text-center text-muted-foreground">
          No hay recompensas disponibles en este momento.
        </div>
      )}
    </div>
  )
}
