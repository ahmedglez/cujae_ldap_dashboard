// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Stores
import useProfileStore from '@/stores/profile.store'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = () => {
  // ** State
  const [date, setDate] = useState<Date | null | undefined>(null)
  const user = useProfileStore(state => state.user)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          {/* <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              defaultValue='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
            />
          </Grid> */}
          {/*  <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={(date: Date) => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='CI' value={user?.CI} aria-readonly InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Direccion'
              value={user?.homeAddress}
              aria-readonly
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Municipio'
              value={user?.sedeMunicipio}
              aria-readonly
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Pais' value={user?.country} aria-readonly InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Telefono'
              value={user?.telephoneNumber}
              aria-readonly
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Languages</InputLabel>
              <Select
                multiple
                defaultValue={['English']}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Languages' id='select-multiple-language' />}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Genero'
              value={user?.sex === 'M' ? 'Masculino' : user?.sex === 'F' ? 'Femenino' : null}
              aria-readonly
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Guardar cambios
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
