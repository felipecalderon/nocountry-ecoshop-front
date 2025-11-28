import { ProductBreakdownProps } from "@/types"

function ProductBreakdown({ breakdown }: ProductBreakdownProps) {
  if (!breakdown || breakdown.length === 0) return null

  return (
    <section className="space-y-2 pt-4 border-t">
      <p className="text-sm font-medium">Desglose por producto:</p>
      <ul className="space-y-2">
        {breakdown.map((item) => (
          <li key={item.productId} className="flex justify-between text-xs">
            <p className="text-gray-500 truncate flex-1">
              {item.productName} (x{item.quantity})
            </p>
            <p className="font-medium ml-2">
              {item.subtotalCO2.toFixed(2)} kg CO₂
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductBreakdown
