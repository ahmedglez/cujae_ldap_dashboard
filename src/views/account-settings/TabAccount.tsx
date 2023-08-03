// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Stores
import useProfileStore from '@/stores/profile.store'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const user = useProfileStore(state => state.user)

  console.log('user', user)

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              {/*  <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box> */}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem'
              }}
            >
              {`Datos de usuario`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Username' value={user.uid} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Tipo de usuario' value={user.userType} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' value={user.cn} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Last Name' value={user.sn} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Correo' value={user.mail} disabled={true} />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Rol' value={user.right === 'Todos' ? 'Admin' : 'User'} disabled={true} />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem'
              }}
            >
              {`Datos escolares`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Area' value={user.area} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Carrera' value={user.career} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Año escolar' value={user.studentYear} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Grupo' value={user.studentClassGroup} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='UJC'
              value={user.UJC.toString().charAt(0).toUpperCase() + user.UJC.toString().slice(1)}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Estado' value={user.userStatus} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Condicion' value={user.userCondition} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Curso' value={user.userInformation} disabled={true} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem'
              }}
            >
              {`Datos personales`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='CI' value={user.CI} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Municipio' value={user.sedeMunicipio} disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Telefono' value={user.telephoneNumber} disabled={true} />
          </Grid>

          {/* <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
