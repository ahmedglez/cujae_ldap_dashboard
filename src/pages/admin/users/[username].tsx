// ** React Imports
import { ChangeEvent, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material'
import UserType from '@/types/user.type'
import StudentType from '@/types/student.type'
import EmployeeType from '@/types/employee.type'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import AdminRoute from '@/components/hocs/AdminRoute'
import { showToastError, showToastSuccess, showToastInfo, showToastWarning } from '@/helpers/toastHelper'
import UserForm from '@/views/admin/users/UserForm'

// ** Stores
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

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const UserPage = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const router = useRouter()
  const username = router.query.username as string
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [student, setStudent] = useState<StudentType | null>(null)
  const [employee, setEmployee] = useState<EmployeeType | null>(null)

  const getByUsername = async () => {
    const response = await withAuthAxiosInstance.get(`/users?uid=${username}`)
    const user = response.data.data[0]
    return user
  }

  const getByEmail = async () => {
    const response = await withAuthAxiosInstance.get(`/users?email=${username}`)
    const user = response.data.data[0]
    return user
  }

  const getByCI = async () => {
    const response = await withAuthAxiosInstance.get(`/users?CI=${username}`)
    const user = response.data.data[0]
    return user
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
            showToastInfo('No user found for the provided username.')
          }
        } else {
          setLoading(false)
          setUser(null)
          showToastWarning('Invalid input. Please enter a valid username, email, or CI.')
        }
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      showToastError('Ups, something wrong happened')
    }
  }

  useEffect(() => {
    handleGetUser()
  }, [username])

  return (
    <CardContent>
      {!loading && (user === null || user === undefined) && <NoResultsMessage />}
      {!loading && !!user && <UserForm user={user} />}
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
