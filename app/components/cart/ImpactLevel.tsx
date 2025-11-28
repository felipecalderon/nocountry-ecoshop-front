import { ImpactLevelProps } from "@/types"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"

function ImpactLevel({ impact, progressPercent }: ImpactLevelProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Nivel de impacto</p>
        <Badge
          variant={impact.level === "low" ? "default" : "secondary"}
          className={impact.color}
        >
          {impact.label}
        </Badge>
      </div>
      <Progress
        value={progressPercent}
        className="h-2 dark:bg-gray-500"
        aria-label="Progress bar"
      />
      <p className="text-xs text-muted-foreground">{impact.description}</p>
    </section>
  )
}

export default ImpactLevel
