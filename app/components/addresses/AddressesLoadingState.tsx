import { Skeleton } from "@/app/components/ui/skeleton"
import DashboardCard from "@/app/components/dashboard/DashboardCard"

function AddressesLoadingState() {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <aside className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-80" />
        </aside>
        <Skeleton className="h-10 w-32" />
      </header>

      <DashboardCard title="Cargando...">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </section>
  )
}

export default AddressesLoadingState
