import useUserStore from '@/stores/users.store'
import { useEffect, useState } from 'react'

const usePaginateUsers = () => {
  const [paginatedUsers, setPaginatedUsers] = useState([])
  const { users, pagination, setRendered } = useUserStore(state => state)

  useEffect(() => {
    // Get the initial rendered users
    const initialRenderedUsers = users.slice(
      (pagination.page - 1) * pagination.rowsPerPage,
      pagination.page * pagination.rowsPerPage
    )
    // Set the initial rendered users
    setPaginatedUsers(initialRenderedUsers)
  }, [users])

  // Update the rendered users whenever the pagination changes
  useEffect(() => {
    const newRenderedUsers = users.slice(
      (pagination.page - 1) * pagination.rowsPerPage,
      pagination.page * pagination.rowsPerPage
    )

    // Set the new rendered users
    setPaginatedUsers(newRenderedUsers)
  }, [pagination])

  return paginatedUsers
}

export default usePaginateUsers
