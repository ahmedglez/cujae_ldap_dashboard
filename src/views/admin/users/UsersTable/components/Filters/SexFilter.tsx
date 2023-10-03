import useUserStore from '@/stores/users.store'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const filterOptions = ['ALL', 'M', 'F']

const SexFilter = () => {
  const { filters, setFilters } = useUserStore.getState()
  const { userType } = filters

  // Handle filter change
  const handleUserTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters({
      ...filters,
      sex: event.target.value as string
    })
  }

  return (
    <FormControl>
      <InputLabel id='demo-simple-select-label'>Sexo</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        label='Sexo'
        value={userType}
        onChange={handleUserTypeFilterChange}
      >
        {filterOptions.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SexFilter
