import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  children: ReactNode
  className?: string
  headerAction?: ReactNode
}

export default function DashboardCard({
  title,
  children,
  className,
  headerAction,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-border shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}
