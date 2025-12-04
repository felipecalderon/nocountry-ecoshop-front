import UsersTable from "@/app/components/admin/users-table"
import { getUsers } from "@/actions/admin"

interface Props {
  searchParams: Promise<{
    currentPage: string
  }>
}
export default async function AdminUsersPage({ searchParams }: Props) {
  const data = await getUsers(Number((await searchParams).currentPage || 1), 10)
  console.log(data)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <p className="text-muted-foreground mt-2">
          Administra los usuarios de la plataforma
        </p>
      </div>

      {data && <UsersTable res={data} />}
    </div>
  )
}
