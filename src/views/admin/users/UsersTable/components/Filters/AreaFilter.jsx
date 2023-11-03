import React from 'react'
import useUserStore from '@/stores/users.store'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

const AreaFilter = () => {
  const { filters, setFilters, users, loading } = useUserStore.getState()
  const [options, setOptions] = useState([])
  const [value, setValue] = React.useState('ALL')
  const [inputValue, setInputValue] = React.useState('')

  useEffect(() => {
    const uniqueAreas = new Set()
    users.forEach(user => {
      uniqueAreas.add(user.area)
    })
    const uniqueAreasArray = Array.from(uniqueAreas)
    setOptions(uniqueAreasArray)
  }, [users])

  useEffect(() => {
    if (value === null || value === '') {
      setFilters({
        ...filters,
        area: 'ALL'
      })
    } else {
      setFilters({
        ...filters,
        area: value
      })
    }
  }, [value])

  // Handle filter change
  const handleAreaFilterChange = e => {
  }

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      disabled={loading}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      options={options}
      sx={{
        width: {
          xs: '100%',
          sm: 400
        }
      }}
      renderInput={params => <TextField {...params} label='Area' />}
    />
  )
}

export default AreaFilter
