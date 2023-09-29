// ** React Imports
import React, { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ** Icons
import { ContentSaveOutline, PencilOutline, Restore } from 'mdi-material-ui'
import IconButton from '@mui/material/IconButton'

interface InputProps {
  field: {
    label: string | null
    value: string | number | null
    att: string
  }
}

const InputComponent: React.FC<InputProps> = ({ field }) => {
  const [allowEdit, setAllowEdit] = useState(false)
  const [value, setValue] = useState<string | number | null>(field.value)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleReset = () => {
    setValue(field.value)
  }

  const handleToogleEdit = () => {
    setAllowEdit(prev => !prev)
  }

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        onChange={handleChange}
        value={value}
        label={field.label}
        disabled={!allowEdit}
        placeholder={field.value as string}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton sx={{ padding: 0 }} onClick={handleToogleEdit}>
                <PencilOutline />
              </IconButton>
              <IconButton sx={{ padding: 0 }} onClick={handleReset}>
                <Restore />
              </IconButton>
              <IconButton sx={{ padding: 0 }}>
                <ContentSaveOutline />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            backgroundColor: allowEdit ? 'white' : '#f0f0f0'
          }
        }}
      />
    </Grid>
  )
}

export default InputComponent
