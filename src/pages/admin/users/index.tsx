import AdminRoute from '@/components/hocs/AdminRoute'
import useFetchUsers from '@/hooks/useFetchUsers'
import useProfileStore from '@/stores/profile.store'
import React, { useState } from 'react'
import UsersTable from '@/views/admin/users/UsersTable'

interface User {
  // Define your user object's properties here
}

interface ResponseData {
  // Define the structure of your response data
  data: User[] // Replace 'User' with your actual user object structure
  // Add other properties if needed
}

const UsersPage: React.FC = () => {
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const baseDN = useProfileStore(state => state.baseDN)
  const { loading, error, users } = useFetchUsers(`/users/baseDN`, baseDN, page, limit)

  console.log('users', users)
  console.log('error', error)
  return (
    <div>
      <h1>Listado de usuarios</h1>
      {!loading && users.length > 0 && <UsersTable />}
    </div>
  )
}

export default AdminRoute(UsersPage)
