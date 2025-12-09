import DetailItem from "./DetailItem"
import { AddressCardDetailsProps } from "@/types"
import { addressTypeLabels } from "@/lib/data/addressItems"

function AddressCardDetails({ address }: AddressCardDetailsProps) {
  return (
    <div
      className="grid gap-4 mb-2 p-4 bg-muted-foreground/10 rounded-lg
  grid-cols-[repeat(auto-fit,minmax(120px,1fr))]"
    >
      <DetailItem label="Calle" value={address.street} />
      <DetailItem label="Ciudad" value={address.city} />
      <DetailItem label="Código Postal" value={address.postalCode} />
      <DetailItem label="País" value={address.country} />
      <DetailItem label="Tipo" value={addressTypeLabels[address.addressType]} />
    </div>
  )
}

export default AddressCardDetails
