import ProtectedRoute from '@/components/ProtectedRoute'
import Dashboard from '@/views/dashboard'

const IndexPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

export default IndexPage
