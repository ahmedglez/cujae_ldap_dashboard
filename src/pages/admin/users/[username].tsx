// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import AdminRoute from '@/components/hocs/AdminRoute'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import { showToastError, showToastInfo, showToastWarning } from '@/helpers/toastHelper'
import useUserFormStore from '@/stores/from.store'
import useProfileStore from '@/stores/profile.store'
import UserForm from '@/views/admin/users/UserForm'
import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import UserType from '@/types/user.type'

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
  const [user, setUser] = useState<UserType | null>(null)
  const store = useProfileStore()
  const { roles } = store

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
          const newUser = await getByEmail()
          if (newUser) {
            setUser(newUser)
          } else {
            setUser(null)
            showToastInfo('No user found for the provided email.')
          }
        } else if (ciPattern.test(username)) {
          const newUser = await getByCI()
          if (newUser) {
            setUser(newUser)
          } else {
            setUser(null)
            showToastInfo('No user found for the provided CI.')
          }
        } else if (usernamePattern.test(username)) {
          const newUser = await getByUsername()
          if (newUser) {
            setUser(newUser)
          } else {
            setUser(null)
            showToastInfo('No usxer found for the provided username.')
          }
        } else {
          setUser(null)
          showToastWarning('Invalid input. Please enter a valid username, email, or CI.')
        }
        setLoading(false)
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
    console.log('entro')
    handleGetUser()
    setLoading(true)
  }, [username])

  return (
    <CardContent>
      {!loading && (user === null || user === undefined) && <NoResultsMessage />}
      {!loading && user !== null && <UserForm user={user} username={username} />}
      {loading && (
        <form>
          <Grid container spacing={7}>
            {new Array(16).fill(null).map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Skeleton variant='rectangular' width={'100%'} height={'35px'} />
              </Grid>
            ))}
          </Grid>
        </form>
      )}
    </CardContent>
  )
}

export default AdminRoute(UserPage)
