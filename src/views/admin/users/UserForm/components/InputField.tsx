// ** React Imports
import React, { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ** Icons
import { ContentSaveOutline, ContentSaveCheckOutline, PencilOutline, Restore } from 'mdi-material-ui'
import IconButton from '@mui/material/IconButton'

// ** Others
import useUserFormStore from '@/stores/from.store'

interface InputProps {
  field: {
    label: string
    value: string
    att: string
  }
}

const InputComponent: React.FC<InputProps> = ({ field }) => {
  const [allowEdit, setAllowEdit] = useState<boolean>(false)
  const { user, unsaveField, formFields, updateField } = useUserFormStore.getState()
  const [value, setValue] = useState<string | null | any>(!!formFields[field.att] ? formFields[field.att] : field.value)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  useEffect(() => {
    setIsSaved(value === formFields[field.att])
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleReset = () => {
    setValue(user[field.att])
    setAllowEdit(false)
    setIsSaved(false)
  }

  const handleToogleEdit = () => {
    setAllowEdit(prev => !prev)
  }

  const handleSave = () => {
    updateField(field.att, value)
    setAllowEdit(false)
    setIsSaved(true)
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
                <PencilOutline sx={{ color: allowEdit ? 'black' : 'gray' }} />
              </IconButton>
              <IconButton sx={{ padding: 0 }} onClick={handleReset} disabled={!allowEdit}>
                <Restore sx={{ color: allowEdit ? 'black' : 'gray' }} />
              </IconButton>
              <IconButton sx={{ padding: 0 }} onClick={handleSave} disabled={!allowEdit}>
                {isSaved ? (
                  <ContentSaveCheckOutline sx={{ color: allowEdit ? 'black' : 'gray' }} />
                ) : (
                  <ContentSaveOutline sx={{ color: allowEdit ? 'black' : 'gray' }} />
                )}
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
