// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import AdminRoute from '@/components/hocs/AdminRoute'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import { showToastError, showToastInfo, showToastWarning } from '@/helpers/toastHelper'
import UserType from '@/types/user.type'
import UserForm from '@/views/admin/users/UserForm'
import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import useUserFormStore from '@/stores/from.store'
import { AxiosError } from 'axios'
import useProfileStore from '@/stores/profile.store'

const NoResultsMessage = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    message: {
      width: '100%',

      fontSize: '18px',
      margin: '10px 0'
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Typography sx={styles.message}>No results found.</Typography>
    </Box>
  )
}

const UserPage = () => {
  // ** State
  const router = useRouter()
  const username = router.query.username as string
  const [loading, setLoading] = useState<boolean>(false)
  const { user, setUser } = useUserFormStore.getState()
  const { roles } = useProfileStore()

  const getByUsername = async () => {
    try {
      const response = await withAuthAxiosInstance.get(`/users?uid=${username}`)
      const user = response.data.data[0]
      return user
    } catch (error: any) {
      // Manejo de error, por ejemplo, imprimir el error o lanzar una excepción personalizada
      console.error('Error en getByUsername:', error)
      throw error // O lanzar una excepción personalizada
    }
  }

  const getByEmail = async () => {
    try {
      const response = await withAuthAxiosInstance.get(`/users?email=${username}`)
      const user = response.data.data[0]
      return user
    } catch (error: any) {
      console.error('Error en getByEmail:', error)
      throw error
    }
  }

  const getByCI = async () => {
    try {
      const response = await withAuthAxiosInstance.get(`/users?CI=${username}`)
      const user = response.data.data[0]
      return user
    } catch (error: any) {
      console.error('Error en getByCI:', error)
      throw error
    }
  }

  const handleGetUser = async () => {
    try {
      setLoading(true)
      if (!!username) {
        // Check if the input matches the username pattern
        const usernamePattern = /^[a-zA-Z0-9.-_]+$/ // Customize the pattern as needed
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Customize the pattern as needed
        const ciPattern = /^[0-9]{11}$/ // Customize the pattern as needed

        if (emailPattern.test(username)) {
          const user = await getByEmail()
          if (user) {
            setLoading(false)
            setUser(user)
          } else {
            setLoading(false)
            setUser(null)
            showToastInfo('No user found for the provided email.')
          }
        } else if (ciPattern.test(username)) {
          const user = await getByCI()
          if (user) {
            setLoading(false)
            setUser(user)
          } else {
            setLoading(false)
            setUser(null)
            showToastInfo('No user found for the provided CI.')
          }
        } else if (usernamePattern.test(username)) {
          const user = await getByUsername()
          if (user) {
            setLoading(false)
            setUser(user)
          } else {
            setLoading(false)
            setUser(null)
            showToastInfo('No usxer found for the provided username.')
          }
        } else {
          setLoading(false)
          setUser(null)
          showToastWarning('Invalid input. Please enter a valid username, email, or CI.')
        }
      }
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      console.log(err)
      showToastError(err.message)
    }
  }

  useEffect(() => {
    if (!roles.includes('admin')) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    if (!roles.includes('admin')) {
      handleGetUser()
    }
  }, [username])

  return (
    <CardContent>
      {!loading && (user === null || user === undefined) && <NoResultsMessage />}
      {!loading && !!user && <UserForm />}
      {loading && (
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='rectangular' width={'100%'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='rectangular' width={'100%'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='rectangular' width={'100%'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='rectangular' width={'100%'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='rectangular' width={'100%'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant='rectangular' width={'100%'} />
            </Grid>
          </Grid>
        </form>
      )}
    </CardContent>
  )
}

export default AdminRoute(UserPage)
