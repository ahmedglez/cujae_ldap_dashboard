// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Logo
import logo from '/src/assets/images/favicon.png'

// ** Utils
import { checkRoles, getLastTimeLogged, saveToken } from '@/helpers/jwtUtils'

// ** Stores
import useProfileStore from '@/stores/profile.store'

// ** Custom Hooks
import useRememberCredentials from '@/hooks/useRememberCredentials'

// ** Others
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

const LoginPage = () => {
  // ** State
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isValid = isLoading === false && username !== '' && password !== ''
  const user = useProfileStore(state => state.user)
  const login = useProfileStore(state => state.login)
  const logout = useProfileStore(state => state.logout)

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()
  const { rememberMe, rememberedUsername, rememberedPassword, handleRememberMe, saveRememberedCredentials } =
    useRememberCredentials()

  useEffect(() => {
    if (rememberedUsername) setUsername(rememberedUsername)
    if (rememberedPassword) setPassword(rememberedPassword)
  }, [rememberedUsername, rememberedPassword])

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setUsername(value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null) // Reset error state before attempting login

    if (isValid) {
      try {
        const response = await withoutAuthAxiosInstance.post('/login', { username, password })
        const responseData = response.data
        const { data, success, message } = responseData
        const { token, refreshToken, user } = data
        saveToken(token)
        const isAdmin = checkRoles('admin')
        const last_time_logged = getLastTimeLogged()
        login(user, isAdmin, last_time_logged)
        saveRememberedCredentials(username, password)
        router.push('/')
      } catch (err) {
        setError('Failed to log in. Please check your credentials.')
        console.log(err)
      }
    }
    setIsLoading(false)
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        {error && <Box sx={{ my: 2, color: 'error.main', textAlign: 'center' }}>{error}</Box>}
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 50, height: 50, borderRadius: '50%' }}>
              <Image src={logo} width={'100%'} height={'100%'} alt='Logo CUJAE' objectFit='cover' />
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
              Bienvenido a {themeConfig.templateName}!
            </Typography>
            <Typography variant='body2'>Por favor ingresa tus credenciales para acceder </Typography>
          </Box>
          <form noValidate autoComplete='off'>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='Username'
              value={username}
              sx={{ marginBottom: 4 }}
              onChange={handleChangeUsername}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={password}
                id='auth-login-password'
                onChange={handleChangePassword}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={handleRememberMe} />}
                label='Recuérdame'
              />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Olvidaste la contraseña?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleLogin}
              disabled={!isValid}
            >
              {isLoading && (
                <CircularProgress
                  style={{
                    color: 'blue'
                  }}
                />
              )}
              {!isLoading && 'Iniciar sesión'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
