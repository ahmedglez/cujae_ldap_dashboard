import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'

const filterOptions = ['GET', 'POST', 'PUT', 'ALL']

const MethodFilter = () => {
  const router = useRouter()
  const { pathname, query } = router
  const { method } = query

  const handleSexFilterChange = event => {
    const { value } = event.target
    router.push({
      pathname: pathname,
      query: {
        ...query,
        method: value.toUpperCase()
      }
    })
  }

  return (
    <FormControl>
      <InputLabel id='demo-simple-select-label'>Method</InputLabel>
      <Select
        value={method.toUpperCase()}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        label='Sexo'
        onChange={handleSexFilterChange}
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

export default MethodFilter
