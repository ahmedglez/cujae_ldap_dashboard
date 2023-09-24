// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Login from 'mdi-material-ui/Login'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import Account from 'mdi-material-ui/Account'
import { user_types_query } from '@/constants/userTypes'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Facultades'
    },
    {
      menuTitle: 'Informática',
      childrens: [
        {
          title: 'Usuarios',
          icon: Account,
          path: `/admin/users?userType=${user_types_query[0]}`
        },
        { title: 'Grupos', icon: AccountGroup, path: `/admin/users?userType=${user_types_query[0]}` },
        { title: 'Roles', icon: AccountCogOutline, path: `/admin/users?userType=${user_types_query[0]}` }
      ]
    },

    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/login',
      openInNewTab: true
    }
  ]
}

export default navigation
