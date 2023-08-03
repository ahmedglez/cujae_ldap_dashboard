import useAuthGuard from '@/hooks/useAuthGuard'

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthGuard()

  return <>{isLoggedIn ? children : null}</>
}

export default ProtectedRoute
