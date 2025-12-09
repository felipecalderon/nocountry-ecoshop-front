"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { WalletBalance } from "@/types"

interface WalletHistoryProps {
  history: WalletBalance[]
}

export default function WalletHistory({ history }: WalletHistoryProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Historial de Transacciones</CardTitle>
        <CardDescription>Tus últimos movimientos de puntos.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Concepto
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Fecha
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Puntos
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {history && history.length > 0 ? (
                history.map((tx: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {tx.description || "Movimiento"}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {new Date(tx.date || tx.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className={`p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0 text-right ${
                        tx.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : ""}
                      {tx.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="p-4 text-center text-muted-foreground"
                  >
                    No hay transacciones recientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
