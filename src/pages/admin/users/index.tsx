import React, { useState, useEffect } from 'react'
import AdminRoute from '@/components/hocs/AdminRoute'
import useProfileStore from '@/stores/profile.store'
import useUserStore from '@/stores/users.store'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'

interface User {
  // Define your user object's properties here
}

const UsersPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const profileStore = useProfileStore(state => state.baseDN)
  const usersStore = useUserStore()

  console.log('profile', profileStore)
  console.log('usersStore', usersStore)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('profileStore.baseDN', profileStore)
        setLoading(true)
        const response = await withAuthAxiosInstance.post(`/users/baseDN?page=${page}&limit=${limit}`, {
          baseDN: profileStore
        })
        // Handle the response, e.g., set the users in the usersStore
        usersStore.setUsers(response.data.data) // Assuming you have a users state in usersStore
        usersStore.setPagination({ page, limit })
        setLoading(false)
      } catch (err) {
        console.error('Error', err)
        setLoading(false)
      }
    }

    fetchData()
  }, [page, limit, profileStore, usersStore])

  return (
    <div>
      <h1>Users Page</h1>
      {/* Render your users data here */}
    </div>
  )
}

export default AdminRoute(UsersPage)
