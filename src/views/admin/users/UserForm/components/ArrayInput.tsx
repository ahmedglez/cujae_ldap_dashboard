import React, { useState, useEffect, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { ContentSaveOutline, ContentSaveCheckOutline, PencilOutline, Restore, DeleteOutline } from 'mdi-material-ui'

import { Plus } from 'mdi-material-ui'
import TagRemove from 'mdi-material-ui'

interface ArrayInputProps {
  label: string
  value: string[]
  onSave: (updatedValue: string[]) => void
}

const ArrayInput: React.FC<ArrayInputProps> = ({ label, value, onSave }) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState<string[]>(value)

  console.log('editedValue', editedValue)

  useEffect(() => {
    setEditedValue(value)
  }, [value])

  const handleToggleEdit = () => {
    setEditing(!editing)
  }

  const handleReset = () => {
    setEditedValue(value)
    setEditing(false)
  }

  const handleChange = (index: number, newValue: string) => {
    const updatedValue = [...editedValue]
    updatedValue[index] = newValue
    setEditedValue(updatedValue)
  }

  const handleAdd = () => {
    setEditedValue([...editedValue, ''])
  }

  const handleRemove = (index: number) => {
    const updatedValue = [...editedValue]
    updatedValue.splice(index, 1)
    setEditedValue(updatedValue)
  }

  const handleSave = () => {
    onSave(editedValue)
    setEditing(false)
  }

  return (
    <Grid item xs={12} sm={6}>
      <>
        {editing ? (
          <>
            {editedValue.map((val, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  label={`${label} ${index + 1}`}
                  value={val}
                  onChange={e => handleChange(index, e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => handleRemove(index)}>
                          <DeleteOutline />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            ))}
            <Button onClick={handleAdd} variant='outlined' color='primary'>
              <Plus />
            </Button>
            <Button onClick={handleSave} variant='contained' color='primary'>
              Save
            </Button>
            <Button onClick={handleReset} variant='outlined' color='primary'>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <TextField fullWidth label={label} value={value.join(', ')} InputProps={{ readOnly: true }} />
            <Button onClick={handleToggleEdit} variant='outlined' color='primary' endIcon={<PencilOutline />}>
              Edit
            </Button>
          </>
        )}
      </>
    </Grid>
  )
}

export default ArrayInput
