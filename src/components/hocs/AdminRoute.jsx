import React from 'react'
import { useRouter } from 'next/router'
import useProfileStore from '@/stores/profile.store'

const AdminRoute = WrappedComponent => {
  const WithAdminAccess = props => {
    const router = useRouter()

    // Wrap the isAdmin check in a useEffect to run on the client side
    React.useEffect(() => {
      const { isAdmin } = useProfileStore.getState()

      // Check if the user is an admin
      if (!isAdmin) {
        router.replace('/')
      }
    }, [])

    // Render the WrappedComponent regardless of the isAdmin check
    return <WrappedComponent {...props} />
  }

  return WithAdminAccess
}

export default AdminRoute
