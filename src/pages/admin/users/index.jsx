import React from 'react'
import AdminRoute from '@/components/hocs/AdminRoute'

const UsersPage = () => {
  return (
    <div>
      <h1>Users Page</h1>
      {/* Add your users page content */}
    </div>
  )
}

export default AdminRoute(UsersPage)
