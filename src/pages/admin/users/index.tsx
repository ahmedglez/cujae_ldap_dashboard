import PaginationTable from '@/components/PaginationTable'
import AdminRoute from '@/components/hocs/AdminRoute'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import usePaginateUsers from '@/hooks/usePaginateUsers'
import useProfileStore from '@/stores/profile.store'
import useUserStore from '@/stores/users.store'
import UserType from '@/types/user.type'
import UsersTable from '@/views/admin/users/UsersTable'
import { Typography, Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type UsersPageProps = {
  ou: string
}

const LIMIT = 5000
const UsersPage: React.FC<UsersPageProps> = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [responsedUsers, setResponsedUsers] = useState<any>([])
  const [error, setError] = useState<any>(null)
  const base = useProfileStore(state => state.base)
  const ou = router.query.ou
  const baseDN = `ou=usuarios,ou=${ou},${base}`
  const { setUsers, users } = useUserStore(state => state)

  const paginatedUsers = usePaginateUsers()

  // Create a custom styled component for the empty message

  const emptyMessageStyle = {
    textAlign: 'center',
    height: '100%',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px'
  }

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0'
  }

  const messageStyle = {
    fontSize: '18px',
    margin: '10px 0'
  }
  const buttonStyle = {
    marginTop: '20px'
  }

  const EmptyMessage = () => (
    <Box sx={emptyMessageStyle}>
      <Typography sx={messageStyle}>No se encontraron usuarios.</Typography>
      <Typography sx={messageStyle}>Por favor, agregue usuarios para verlos aquí.</Typography>
      <Button variant='contained' color='primary' sx={buttonStyle}>
        Agregar Usuario
      </Button>
    </Box>
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await withAuthAxiosInstance.post(`/users/baseDN?limit=50000`, {
          baseDN
        })
        setResponsedUsers(response.data.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err)
      }
    }

    fetchData()
  }, [baseDN, ou])

  useEffect(() => {
    if (!loading) {
      const typedUsers = responsedUsers as UserType[]
      setUsers(typedUsers)
    }
  }, [ou, loading, responsedUsers])

  return (
    <div>
      <h1>{`Listado de Usuarios`}</h1>
      {(paginatedUsers.length > 0 || loading) && <UsersTable users={paginatedUsers} loading={loading} />}
      {paginatedUsers.length === 0 && !loading && <EmptyMessage />}
      {!loading && UsersPage.length > 0 && <PaginationTable />}
    </div>
  )
}

export default AdminRoute(UsersPage)
