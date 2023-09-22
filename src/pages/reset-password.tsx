// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Logo

// ** Utils
import { withoutAuthAxiosInstance } from '@/constants/axiosInstance'
import { showToastError, showToastSuccess, showToastWarning } from '@/helpers/toastHelper'
import { getPasswordRequirements, passwordSchema } from '@/schemas/passwordSchema.schema'

import Card from '@mui/material/Card'
import { useRouter } from 'next/router'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

const ResetPassword = () => {
  const router = useRouter()
  // ** States
  const [token, setToken] = useState<string | null>(null)
  const [isValid, setIsValid] = useState<boolean | null>(false)
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null)
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

  useEffect(() => {
    const jwt = sessionStorage.getItem('recover-password-token')
    if (jwt === null) {
      showToastError('An error ocurred')
      setTimeout(() => {
        router.push('/login')
      })
    } else {
      setToken(jwt)
      sessionStorage.removeItem('recover-password-token')
    }
  }, [])

  useEffect(() => {
    if (recoveryCode === null) {
      setIsValid(false)
    } else if (values.newPassword === '') {
      setIsValid(false)
    } else if (values.confirmNewPassword === '') {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [recoveryCode, values.confirmNewPassword, values.newPassword])

  const handleSavePassword = async () => {
    // Destructure values from the state
    const { newPassword, confirmNewPassword } = values
    // Check if all fields are complete
    if (!recoveryCode || !newPassword || !confirmNewPassword) {
      showToastWarning('Please complete all fields.')
      return
    }
    // Validate the newPassword against the password schema
    if (!passwordSchema.validate(newPassword)) {
      const requirements = getPasswordRequirements()
      const validationErrors = passwordSchema.validate(newPassword, {
        list: true
      }) as string[]
      const displayError = requirements.find(error => error.id === validationErrors[0])
      showToastError(`New password does not meet security requirements. ${!!displayError ? displayError.error : ''}`)
      return
    }

    // Check if the confirm password matches the new password
    if (newPassword !== confirmNewPassword) {
      showToastError('Confirm password does not match the new password.')
      return
    }
    try {
      // If all checks pass, show a success message
      const response = await withoutAuthAxiosInstance.post(
        '/reset-password',
        {
          recoveryCode: recoveryCode,
          newPassword: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const { success, message } = response.data

      if (success) {
        showToastSuccess('Password changed successfully.')
        router.push('/login')
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('profileStoreState')
        localStorage.removeItem('rememberedPassword')
        localStorage.removeItem('rememberedUsername')
        localStorage.removeItem('rememberMe')

        return
      } else {
        showToastError(message ? message : 'An error has ocurred')
      }
    } catch (err) {
      console.log(err)
      showToastError('An error has ocurred')
    }
  }

  const handleRecoveryCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecoveryCode(event.target.value)
  }

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{
            maxWidth: 'sm',
            padding: theme => `${theme.spacing(12, 9, 7)} !important`
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='account-settings-recoveryCode'>Recovery Code</InputLabel>
                    <OutlinedInput
                      label='Recovery Code'
                      value={recoveryCode}
                      id='account-settings-recoveryCode'
                      type={'text'}
                      onChange={handleRecoveryCodeChange}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                    <OutlinedInput
                      label='New Password'
                      disabled={recoveryCode === null}
                      value={values.newPassword}
                      id='account-settings-new-password'
                      onChange={handleNewPasswordChange('newPassword')}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            aria-label='toggle password visibility'
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                    <OutlinedInput
                      disabled={recoveryCode === null}
                      label='Confirm New Password'
                      value={values.confirmNewPassword}
                      id='account-settings-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sm={6}
              xs={12}
              sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
            >
              <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ margin: 0 }} />

        <CardContent>
          <Box sx={{ mt: 11 }}>
            <Button disabled={!isValid} onClick={handleSavePassword} variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button
              type='reset'
              variant='outlined'
              color='secondary'
              onClick={() => {
                setValues({ ...values, newPassword: '', confirmNewPassword: '' })
                setRecoveryCode(null)
              }}
            >
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
