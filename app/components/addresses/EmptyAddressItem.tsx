import { MapPin } from "lucide-react"
import CreateAddressModal from "./CreateAddressModal"

function EmptyAddressItem() {
  return (
    <article className="text-center py-12">
      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No tienes direcciones guardadas
      </h3>
      <p className="text-muted-foreground mb-6">
        Agrega una dirección para facilitar tus compras
      </p>
      <CreateAddressModal />
    </article>
  )
}

export default EmptyAddressItem
