import React, { useState, useEffect } from 'react'
import AdminRoute from '@/components/hocs/AdminRoute'
import useProfileStore from '@/stores/profile.store'
import useUserStore from '@/stores/users.store' // Import the UserStore type
import { withAuthAxiosInstance } from '@/constants/axiosInstance'

interface User {
  // Define your user object's properties here
}

interface ResponseData {
  // Define the structure of your response data
  data: User[] // Replace 'User' with your actual user object structure
  // Add other properties if needed
}

const UsersPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null) // Use a more specific type if possible
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const baseDN = useProfileStore(state => state.baseDN)
  const usersStore = useUserStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await withAuthAxiosInstance.post<ResponseData>(`/users/baseDN?page=${page}&limit=${limit}`, {
          baseDN: baseDN
        })
        // Handle the response, e.g., set the users in the usersStore
        usersStore.setUsers(response.data.data) // Assuming you have a users state in usersStore
        usersStore.setPagination({ page, limit })
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err)
      }
    }

    fetchData()
  }, [page, limit, baseDN, usersStore])

  return (
    <div>
      <h1>Users Page</h1>
      {/* Render your users data here */}
    </div>
  )
}

export default AdminRoute(UsersPage)
