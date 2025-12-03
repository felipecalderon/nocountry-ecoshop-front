import DetailItem from "./DetailItem"
import { AddressCardDetailsProps } from "@/types"
import { addressTypeLabels } from "@/lib/data/addressItems"

function AddressCardDetails({ address }: AddressCardDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted-foreground/10 rounded-lg">
      <DetailItem label="Calle" value={address.street} />
      <DetailItem label="Ciudad" value={address.city} />
      <DetailItem label="Código Postal" value={address.postalCode} />
      <DetailItem label="País" value={address.country} />
      <DetailItem label="Tipo" value={addressTypeLabels[address.addressType]} />
    </div>
  )
}

export default AddressCardDetails
