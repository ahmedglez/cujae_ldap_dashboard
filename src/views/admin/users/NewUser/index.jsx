import { userTypes } from '@/constants/userTypes'
import { ldapEntrySchema } from '@/schemas/ldapEntrySchema'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { initialState } from './data/fields'
import { municipalities } from './data/localization'
import { UJCOptions, colorSkinOptions } from './data/options'
import { showToastError, showToastInfo, showToastSuccess, showToastWarning } from '@/helpers/toastHelper'
import { useRouter } from 'next/router'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
const NewUserForm = () => {
  const router = useRouter()
  const ou = router.query.ou
  const [user, setUser] = useState(initialState)

  const cnWithoutSpaces = user?.cn.replace(/\s/g, '').toLowerCase()
  const snWithoutSpaces = user?.sn.split(' ')[0].replace(/\s/g, '').toLowerCase()
  const uid = cnWithoutSpaces + '.' + snWithoutSpaces

  const [errors, setErrors] = useState({})

  const autoCompleteFields = () => {
    const { sn, cn } = user
    setUser({
      ...user,
      uid: uid,
      name: cn,
      lastName: sn,
      givenName: cn,
      displayName: cn,
      middleName: cn.split(' ').slice(1).join(' ') !== '' ? cn.split(' ').slice(1).join(' ') : cn,
      userPassword: user.CI,
      mail: [`${uid}@cujae.edu.cu`],
      maildrop: [`${uid}@cujae.edu.cu`]
    })
  }

  useEffect(() => {
    if (!!ou) {
      const capitalizedOU = ou.charAt(0).toUpperCase() + ou.slice(1)
      setUser({
        ...initialState,
        area: `INGENIERIA ${capitalizedOU}`
      })
    }
  }, [ou])

  useEffect(() => {
    autoCompleteFields()
  }, [user.cn, user.sn, user.mail])

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleChangeMunicipios = (event, newValue) => {
    setUser({ ...user, sedeMunicipio: newValue })
  }

  const handleSubmit = async () => {
    try {
      autoCompleteFields()
      const { error } = ldapEntrySchema.validate(user, { abortEarly: false })

      if (error) {
        const newErrors = {}
        error.details.forEach(detail => {
          newErrors[detail.path[0]] = detail.message
          showToastError(detail)
        })
        setErrors(newErrors)
        showToastError(error.details[0].message)
      } else {
        const dn = `uid=${uid},ou=usuarios,ou=${ou},ou=cujae,ou=edu,ou=cu`
        const response = await withAuthAxiosInstance.post('/users/newUser', {
          newUser: user,
          userDN: dn
        })
        console.log('response')
        console.log('data', response.data)
        console.log('status', response.status)
      }
    } catch (error) {
      console.error(error)
      showToastError(error.message)
    }
  }

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3' pb={4} fullWidth>
            Nuevo Usuario
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' pb={4} fullWidth>
            Datos de Usuario
          </Typography>
        </Grid>

        {/* Username */}
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            label='Username autogenerado'
            name='Username'
            aria-readonly
            disabled
            value={uid}
          />
        </Grid>

        {/* Carnet de Identidad */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            id='outlined-required'
            label='CI'
            name='CI'
            value={user.CI}
            onChange={e => {
              const regex = /^[0-9]{10}$/
              handleChange(e)
              const ci = user.CI
              const isValid = regex.test(ci)
              if (isValid) {
                setErrors({})
              } else {
                setErrors({ CI: 'CI invalido, debe contener 11 digitos, sin letras ni caracteres especiales' })
              }
            }}
            error={!!errors.CI}
            helperText={errors.CI}
          />
        </Grid>

        {/* Nombre */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            id='outlined-required'
            label='Nombre'
            name='cn'
            value={user.cn}
            onChange={e => {
              const regex = /^[a-zA-Z\s]*$/
              const cn = user.cn
              const isValid = regex.test(cn + e.target.value)
              if (isValid) {
                setErrors({})
              } else {
                setErrors({ cn: 'Nombre invalido, debe contener solo letras' })
              }
              handleChange(e)
            }}
            error={!!errors.cn}
            helperText={errors.cn}
          />
        </Grid>

        {/* Apellidos */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            id='outlined-required'
            label='Apellidos'
            name='sn'
            value={user.sn}
            onChange={e => {
              const regex = /^[a-zA-Z\s]*$/
              const sn = user.sn
              const isValid = regex.test(sn + e.target.value)
              if (isValid) {
                setErrors({})
              } else {
                setErrors({ sn: 'Apellido invalido, debe contener solo letras' })
              }
              handleChange(e)
            }}
            error={!!errors.sn}
            helperText={errors.sn}
          />
        </Grid>

        {/* User Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>User Type</InputLabel>
            <Select
              defaultValue={userTypes[0]}
              name='userType'
              value={user.userType}
              onChange={handleChange}
              label='User Type'
            >
              {userTypes.map(userType => (
                <MenuItem key={userType} value={userType}>
                  {userType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Area */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Area'
            name='area'
            value={user.area}
            onChange={e => {
              const regex = /^[a-zA-Z\s]*$/
              const area = user.area
              const isValid = regex.test(area + e.target.value)
              if (isValid) {
                setErrors({})
              } else {
                setErrors({ area: 'Area invalida, debe contener solo letras' })
              }
              handleChange(e)
            }}
            error={!!errors.area}
            helperText={errors.area}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            InputLabelProps={{ shrink: true }}
            id='outlined-required'
            fullWidth
            name={`mail`}
            label='Mail'
            value={`${uid}@cujae.edu.cu`}
            error={!!errors.mail}
            helperText={errors.mail}
            type='email'
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' pb={4} pt={4} fullWidth>
            Informacion Adicional
          </Typography>
        </Grid>

        {/* Direccion */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Home Address'
            name='homeAddress'
            value={user.homeAddress}
            onChange={handleChange}
            error={!!errors.homeAddress}
            helperText={errors.homeAddress}
          />
        </Grid>

        {/* Telefono */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Telephone Number'
            name='telephoneNumber'
            value={user.telephoneNumber}
            onChange={e => {
              const regex = /^[0-9]{7}$/
              handleChange(e)
              const telephoneNumber = user.telephoneNumber
              const isValid = regex.test(telephoneNumber)
              if (isValid) {
                setErrors({})
              } else {
                setErrors({ telephoneNumber: 'Numero de telefono invalido, debe contener 8 digitos' })
              }
            }}
            error={!!errors.telephoneNumber}
            helperText={errors.telephoneNumber}
          />
        </Grid>

        {/* Sexo */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sexo</InputLabel>
            <Select label='Sexo' name='sex' value={user.sex} onChange={handleChange} error={!!errors.sex}>
              <MenuItem value='M'>Masculino</MenuItem>
              <MenuItem value='F'>Femenino</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Municipio */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            onChange={handleChangeMunicipios}
            fullWidth
            options={municipalities}
            renderInput={params => <TextField {...params} label='Municipio' />}
          />
        </Grid>

        {/* Pais */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Country'
            name='country'
            value={'Cuba'}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          />
        </Grid>

        {/* UJC */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>UJC</InputLabel>
            <Select defaultValue={user.UJC} name='UJC' value={user.UJC} onChange={handleChange} label='UJC'>
              {UJCOptions.map(userType => (
                <MenuItem key={userType} value={userType}>
                  {userType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Color de Piel */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Color de Piel</InputLabel>
            <Select
              defaultValue={colorSkinOptions[0]}
              name='skinColor'
              value={user.skinColor}
              onChange={handleChange}
              label='Color de Piel'
            >
              {colorSkinOptions.map(userType => (
                <MenuItem key={userType} value={userType}>
                  {userType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} mt={5} display={'flex'} justifyContent={'center'} gap={5}>
          {/* ObjectClass */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography
                variant='h5'
                sx={{
                  width: '100%'
                }}
              >
                Object Class
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                {user.objectClass.map((mail, index) => (
                  <div
                    style={{
                      width: '50%'
                    }}
                    key={index}
                  >
                    <TextField disbaled={true} fullWidth name={`objectClass[${index}]`} value={mail} aria-readonly />
                  </div>
                ))}
              </Box>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '50px',
          width: '100%'
        }}
      >
        <Button sx={{ width: { xs: '100%', sm: '50%' } }} variant='contained' color='primary' onClick={handleSubmit}>
          Create User
        </Button>
      </Box>
    </form>
  )
}

export default NewUserForm
