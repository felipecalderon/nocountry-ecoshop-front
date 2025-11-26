import { ReactNode } from "react"
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsWidgetProps {
  label: string
  value: string
  change?: number
  trend?: "up" | "down"
  icon?: LucideIcon
  iconColor?: string
}

export default function StatsWidget({
  label,
  value,
  change,
  trend,
  icon: Icon,
  iconColor = "text-primary",
}: StatsWidgetProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {change !== undefined && trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === "up" ? "text-green-600" : "text-red-600"
            )}
          >
            {trend === "up" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}
