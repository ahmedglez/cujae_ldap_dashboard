import React from 'react'
import { useRouter } from 'next/router'
import useProfileStore from '@/stores/profile.store'

const AdminRoute = WrappedComponent => {
  const WithAdminAccess = props => {
    const router = useRouter()
    const { isAdmin } = useProfileStore.getState()

    // Check if the user is an admin
    if (!isAdmin) {
      router.replace('/')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithAdminAccess
}

export default AdminRoute
