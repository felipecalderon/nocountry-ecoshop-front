import AddessesCards from "@/app/components/addresses/AddessesCards"
import CreateAddressModal from "@/app/components/addresses/CreateAddressModal"
import EmptyAddressItem from "@/app/components/addresses/EmptyAddressItem"
import { getAddresses } from "@/actions/addresses"

export default async function CustomerAddressesPage() {
  const { data: addresses } = await getAddresses()
  // const { addresses, isLoading, isError, refetch } = useAddresses()
  // const { deleteAddress } = useAddressMutations()
  // const {
  //   isModalOpen,
  //   addressToDelete,
  //   isDeleting,
  //   openModal,
  //   closeModal,
  //   handleConfirm,
  // } = useDeleteAddressConfirmation({ onConfirm: deleteAddress })
  // const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  // const handleViewDetails = (id: string) => {
  //   setSelectedAddress(selectedAddress === id ? null : id)
  // }

  // if (isLoading) return <AddressesLoadingState />

  // if (isError) return <AddressesErrorState onRetry={() => refetch()} />

  return (
    <>
      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <aside>
            <h2 className="text-3xl font-bold text-foreground">
              Mis Direcciones
            </h2>
            <p className="text-muted-foreground mt-1">
              Gestiona tus direcciones de envío y facturación
            </p>
          </aside>
          <CreateAddressModal />
        </header>

        {addresses.length > 0 ? (
          <AddessesCards addresses={addresses} />
        ) : (
          <EmptyAddressItem />
        )}
      </section>
    </>
  )
}
