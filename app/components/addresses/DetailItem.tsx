import { DetailItemProps } from "@/types"

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  )
}

export default DetailItem
