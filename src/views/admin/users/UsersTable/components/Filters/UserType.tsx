import React from 'react'
import useUserStore from '@/stores/users.store'
import { MenuItem, Select, Box, Typography, InputLabel, FormControl } from '@mui/material'
import { filterOptions } from '../../data/filters'

const useStyles = () => ({
  container: {
    width: 'fit-content',
    minWidth: 120,
    heigth: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})

const UserTypeFilter = () => {
  const classes = useStyles()
  const { filters, setFilters } = useUserStore.getState()
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
