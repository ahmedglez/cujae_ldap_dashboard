import ProtectedRoute from '@/components/ProtectedRoute'
import Dashboard from '@/containers/Dashboard'

const IndexPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

export default IndexPage
