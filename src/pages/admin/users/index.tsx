import React, { useState, useEffect } from 'react'
import AdminRoute from '@/components/hocs/AdminRoute'
import useProfileStore from '@/stores/profile.store'
import useUserStore from '@/stores/users.store' // Import the UserStore type
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import useFetchUsers from '@/hooks/useFetchUsers'

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
  const { loading, error, users } = useFetchUsers(baseDN, page, limit)

  return (
    <div>
      <h1>Users Page</h1>
      {/* Render your users data here */}
    </div>
  )
}

export default AdminRoute(UsersPage)
