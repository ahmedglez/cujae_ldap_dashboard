import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'

const filterOptions = [
  {
    text: 'Hoy',
    value: 'today'
  },
  {
    text: 'Hace 3 días',
    value: '3days'
  },
  {
    text: 'Hace 5 días',
    value: '5days'
  },
  {
    text: 'Esta semana',
    value: 'week'
  },
  {
    text: 'Este mes',
    value: 'month'
  }
]

const PeriodFilter = () => {
  const router = useRouter()
  const { pathname, query } = router
  const { timeframe } = query

  const handleSexFilterChange = event => {
    const { value } = event.target
    router.push({
      pathname: pathname,
      query: {
        ...query,
        timeframe: value.toLowerCase()
      }
    })
  }

  return (
    <FormControl>
      <InputLabel id='demo-simple-select-label'>Period</InputLabel>
      <Select
        sx={{
          height: '40px'
        }}
        value={timeframe.toUpperCase()}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        onChange={handleSexFilterChange}
      >
        {filterOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default PeriodFilter
