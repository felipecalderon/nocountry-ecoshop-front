import { MetricCardProps } from "@/types"

function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  iconColor,
}: MetricCardProps) {
  return (
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <span className="text-sm font-medium">{label}</span>
      </li>
      <li>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-gray-500">{unit}</p>
      </li>
    </ul>
  )
}

export default MetricCard
