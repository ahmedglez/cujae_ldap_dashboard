// ** React Imports
import { ChangeEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Icons Imports

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Logo
/* import logo from '../assets/images/favicon.png' */

// ** Utils
import { showToastError, showToastSuccess } from '@/helpers/toastHelper'

// ** Stores

// ** Custom Hooks

// ** Others
import { validateEmail } from '@/helpers/validations'
import { withoutAuthAxiosInstance } from 'src/constants/axiosInstance'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

interface DecodedToken {
  uid: string
  groups: string[]
  base: string
  localBase: string
  // Add other properties here if necessary
}

const ForgotPassword = () => {
  // ** State
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState<boolean | null>(false)

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setIsValid(validateEmail(value))
    setEmail(value)
  }

  const handleSubmit = async () => {
    const isValidEmail = validateEmail(email)
    if (isValidEmail) {
      try {
        const response = await withoutAuthAxiosInstance.post('/forgot-password', {
          emailOrUsername: email
        })
        const { status } = response
        const { message, token } = response.data
        sessionStorage.setItem('recover-password-token', token)
        if (status === 200) {
          showToastSuccess('Correo electrónico enviado correctamente')
          setTimeout(() => {
            router.push('/reset-password')
          }, 3000)
          return
        } else {
          throw new Error('User not found')
        }
      } catch (error) {
        showToastError('User not found')
        router.push('/login')
        return
      }
    } else {
      showToastError('Invalid Email')
      return
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        {error && <Box sx={{ my: 2, color: 'error.main', textAlign: 'center' }}>{error}</Box>}
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 50, height: 50, borderRadius: '50%' }}>
              <Image src={'../assets/images/favicon.png'} width={'100%'} height={'100%'} alt='Logo CUJAE' objectFit='cover' />
            </Box>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              {`Recuperación de contraseña`}
            </Typography>
            <Typography variant='body2'>
              Por favor ingresa tu correo electrónico para recuperar tu contraseña{' '}
            </Typography>
          </Box>
          <form noValidate autoComplete='off'>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Email'
              value={email}
              sx={{ marginBottom: 4 }}
              onChange={handleChangeEmail}
            />

            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleSubmit}
              disabled={!isValid}
            >
              {isLoading && (
                <CircularProgress
                  style={{
                    color: 'blue'
                  }}
                />
              )}
              {!isLoading && `Recibir código de verificación`}
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
