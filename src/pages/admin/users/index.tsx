import AdminRoute from '@/components/hocs/AdminRoute'
import PaginationTable from '@/components/PaginationTable'
import useFetchUsers from '@/hooks/useFetchUsers'
import usePaginateUsers from '@/hooks/usePaginateUsers'
import useProfileStore from '@/stores/profile.store'
import useUserStore from '@/stores/users.store'
import UserType from '@/types/user.type'
import UsersTable from '@/views/admin/users/UsersTable'
import React, { useEffect } from 'react'

type UsersPageProps = {
  ou: string
}

const LIMIT = 5000
const UsersPage: React.FC<UsersPageProps> = ({ ou }) => {
  const base = useProfileStore(state => state.base)
  const baseDN = `ou=usuarios,ou=${ou},${base}`
  const { setUsers, users } = useUserStore(state => state)

  const { loading, error, users: responseUsers } = useFetchUsers(`/users/baseDN?page=${1}&limit=${LIMIT}`, baseDN)

  const paginatedUsers = usePaginateUsers()

  useEffect(() => {
    if (!loading && responseUsers.length > 0) {
      const typedUsers = responseUsers as UserType[]
      setUsers(typedUsers)
    }
  }, [responseUsers, ou, loading])

  return (
    <div>
      <h1>{`Listado de Usuarios`}</h1>
      <>
        <UsersTable users={paginatedUsers} loading={loading} />
      </>
      {!loading && UsersPage.length > 0 && <PaginationTable />}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { ou } = context.query // Extract userType from query parameter
  return {
    props: {
      ou
    }
  }
}

export default AdminRoute(UsersPage)
