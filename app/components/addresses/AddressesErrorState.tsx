import { AlertCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { AddressesErrorStateProps } from "@/types"

function AddressesErrorState({ onRetry }: AddressesErrorStateProps) {
  return (
    <section className="py-12">
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">
          Error cargando direcciones. Por favor, intenta nuevamente.
        </AlertDescription>
      </Alert>
      <div className="flex justify-center mt-4">
        <Button onClick={onRetry} className="cursor-pointer">
          Reintentar
        </Button>
      </div>
    </section>
  )
}

export default AddressesErrorState
