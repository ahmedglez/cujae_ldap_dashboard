// ** Icon imports
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import useProfileStore from '@/stores/profile.store'
import Account from 'mdi-material-ui/Account'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Login from 'mdi-material-ui/Login'
import Logout from 'mdi-material-ui/Logout'
import { useEffect, useState } from 'react'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

type OrganizationalGroup = {
  objectClass: string[]
  ou: string
  objectName: string
  dn: string
}

const navigation = (): VerticalNavItemsType => {
  const profile = useProfileStore()
  const [groups, setGroups] = useState<OrganizationalGroup[] | null>([])
  const [groupsJson, setGroupsJson] = useState<any>([])

  const scope = profile.roles.includes('superadmin') ? 'one' : 'base'
  const baseDN = profile.roles.includes('superadmin')
    ? 'dc=cujae,dc=edu,dc=cu'
    : `ou=${profile.groups[1]},dc=cujae,dc=edu,dc=cu`

  const getGroups = async () => {
    try {
      const response = await withAuthAxiosInstance.post(`/groups?scope=${scope}`, {
        baseDN: baseDN
      })
      const groupsData = response.data.data // Assuming response contains data property with the groups
      setGroups(groupsData)
    } catch (error) {
      // Handle error appropriately.
    }
  }

  const parseGroup = (group: OrganizationalGroup) => ({
    menuTitle: group.ou.charAt(0).toUpperCase() + group.ou.slice(1),
    childrens: [
      {
        title: 'Usuarios',
        icon: Account,
        path: `/admin/users?ou=${group.ou}`
      },
      {
        title: 'Grupos',
        icon: AccountGroup,
        path: `/admin/groups?ou=${group.ou}`
      },
      {
        title: 'Roles',
        icon: AccountCogOutline,
        path: `/admin/roles?ou=${group.ou}`
      }
    ]
  })

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    const parsedGroups = groups?.map(group => parseGroup(group))
    const parsedGroupsWithHeader = parsedGroups as any[]

    if (parsedGroupsWithHeader.length > 0) {
      parsedGroupsWithHeader?.unshift({
        sectionTitle: `ÁREAS`
      })
    }
    setGroupsJson(parsedGroupsWithHeader)
  }, [groups])

  return [
    {
      title: 'Panel de control',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Perfil de Usuario',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    ...groupsJson,
    {
      sectionTitle: 'Enlaces'
    },
    {
      title: 'Iniciar sesión',
      icon: Login,
      path: '/login',
      openInNewTab: true
    },
    {
      title: 'Cerrar sesión',
      icon: Logout,
      path: '/logout',
      openInNewTab: true
    }
  ]
}

export default navigation
