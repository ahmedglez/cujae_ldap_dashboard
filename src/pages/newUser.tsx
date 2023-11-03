import useProfileStore from '@/stores/profile.store'
import { useRouter } from 'next/router'
import NewUserForm from '../views/admin/users/NewUser'

const AddNewUserPage = () => {
  const router = useRouter()
  const ou = router.query.ou
  const base = useProfileStore(state => state.base)
  const baseDN = `ou=usuarios,ou=${ou},${base}`

  return <NewUserForm />
}

export default AddNewUserPage
