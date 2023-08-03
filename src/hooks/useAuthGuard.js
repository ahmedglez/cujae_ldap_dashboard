import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useProfileStore from '@/stores/profile.store'

const useAuthGuard = () => {
  const isLoggedIn = useProfileStore(state => state.isLoggedIn)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login page if the user is not logged in
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return isLoggedIn
}

export default useAuthGuard
