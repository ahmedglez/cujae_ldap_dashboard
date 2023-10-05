import useUserStore from '@/stores/users.store'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { filterOptions } from '../../data/filters'

const UserTypeFilter = () => {
  const { filters, setFilters, loading } = useUserStore.getState()
  const { userType } = filters

  // Handle filter change
  const handleUserTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters({
      ...filters,
      userType: event.target.value as string
    })
  }

  return (
    <FormControl>
      <InputLabel id='demo-simple-select-label'>Tipo de Usuario</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        label='Tipo de Usuario'
        disabled={loading}
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

export default UserTypeFilter
