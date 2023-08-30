// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Login from 'mdi-material-ui/Login'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import School from 'mdi-material-ui/School'

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
      sectionTitle: 'Administrar usuarios'
    },
    {
      title: 'Estudiantes',
      icon: School,
      path: '/admin/users?userType=students'
    },
    {
      title: 'Empleados',
      icon: AccountGroup,
      path: '/admin/users?userType=employees'
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

    /* {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/register',
      openInNewTab: true
    } */
    /*  {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/error',
      openInNewTab: true
    } */
    /*  {
      sectionTitle: 'User Interface'
    }, */
    /* {
      title: 'Typography',
      icon: null,
      path: '/typography'
    }, */
    /*   {
      title: 'Icons',
      path: '/icons',
      icon: null
    }, */
    /*  {
      title: 'Cards',
      icon: null,
      path: '/cards'
    }, */
    /* {
      title: 'Tables',
      icon: null,
      path: '/tables'
    }, */
    /*  {
      icon: null,
      title: 'Form Layouts',
      path: '/form-layouts'
    } */
  ]
}

export default navigation
