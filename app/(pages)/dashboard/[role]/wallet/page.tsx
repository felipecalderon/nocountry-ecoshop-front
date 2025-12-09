import { Suspense } from "react"
import { getBalance, getHistory, getRewards } from "@/actions/wallet"
import WalletBalance from "@/app/components/wallet/WalletBalance"
import WalletHistory from "@/app/components/wallet/WalletHistory"
import WalletRewards from "@/app/components/wallet/WalletRewards"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs"
import CreateRewardForm from "@/app/components/wallet/CreateRewardForm"

export default async function WalletPage({
  params,
}: {
  params: Promise<{ role: string }>
}) {
  const { role } = await params
  const balanceData = await getBalance()
  const historyData = await getHistory()
  const rewardsData = await getRewards()

  // Extract balance value safely
  const balance = balanceData ? balanceData.data.balance || 0 : 0
  const isAdmin = role === "admin"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isAdmin ? "Gestión de Wallet (Recompensas)" : "Mi Billetera"}
          </h2>
          <p className="text-muted-foreground">
            {isAdmin
              ? "Gestiona puntos, recompensas y crea nuevas promociones."
              : "Gestiona tus puntos y canjea recompensas."}
          </p>
        </div>
      </div>

      {!isAdmin && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <WalletBalance balance={balance} />
        </div>
      )}

      <Tabs defaultValue={isAdmin ? "admin" : "history"} className="space-y-4">
        <TabsList>
          {isAdmin && <TabsTrigger value="admin">Crear Recompensa</TabsTrigger>}
          {!isAdmin && <TabsTrigger value="history">Historial</TabsTrigger>}
          <TabsTrigger value="rewards">Ver recompensas disponibles</TabsTrigger>
        </TabsList>

        {isAdmin && (
          <TabsContent value="admin" className="space-y-4">
            <div className="grid gap-4">
              <CreateRewardForm />
            </div>
          </TabsContent>
        )}

        <TabsContent value="history" className="space-y-4">
          <WalletHistory history={historyData.data} />
        </TabsContent>
        <TabsContent value="rewards" className="space-y-4">
          <WalletRewards rewards={rewardsData.data} userPoints={balance} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
