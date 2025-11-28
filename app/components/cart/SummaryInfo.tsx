import { CheckCircle } from "lucide-react"

function SummaryInfo() {
  return (
    <ul className="pt-4 space-y-2 text-muted-foreground [&>li]:flex [&>li]:items-center [&>li]:gap-2">
      <li>
        <CheckCircle className="h-4 w-4 text-green-600" />
        <small>Envío sostenible con packaging reciclable</small>
      </li>
      <li>
        <CheckCircle className="h-4 w-4 text-green-600" />
        <small>Compra segura y protegida</small>
      </li>
      <li>
        <CheckCircle className="h-4 w-4 text-green-600" />
        <small>30 días para devoluciones</small>
      </li>
    </ul>
  )
}

export default SummaryInfo
