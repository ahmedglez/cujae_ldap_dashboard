import { useEffect } from 'react'
import useProfileStore from '@/stores/profile.store'
import { useRouter } from 'next/router'
import NewUserForm from '../views/admin/users/NewUser'

const AddNewUserPage = () => {
  const router = useRouter()
  const ou = router.query.ou
  const { base, roles } = useProfileStore()
  const baseDN = `ou=usuarios,ou=${ou},${base}`

  useEffect(() => {
    if (!roles.includes('admin')) {
      router.push('/')
    }
  }, [])

  return <NewUserForm />
}

export default AddNewUserPage
