import { Card, CardContent } from "../ui/card"
import { FeatureItemProps } from "@/types"

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="flex flex-col items-center text-center space-y-3 pt-6">
        <figure className="text-muted-foreground mb-2 dark:text-white">
          {icon}
        </figure>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs dark:text-gray-300">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default FeatureItem
