import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'

const filterOptions = [
  { code: '200', text: 'OK' },
  { code: '201', text: 'Created' },
  { code: '204', text: 'No Content' },
  { code: '400', text: 'Bad Request' },
  { code: '401', text: 'Unauthorized' },
  { code: '403', text: 'Forbidden' },
  { code: '404', text: 'Not Found' },
  { code: '500', text: 'Internal Server Error' },
  { code: '502', text: 'Bad Gateway' },
  { code: '503', text: 'Service Unavailable' },
  {
    code: '',
    text: 'ALL'
  }
]

const StatusFilter = () => {
  const router = useRouter()
  const { pathname, query } = router
  const { status } = query

  const handleSexFilterChange = event => {
    const { value } = event.target
    router.push({
      pathname: pathname,
      query: {
        ...query,
        status: value.toUpperCase()
      }
    })
  }

  return (
    <FormControl>
      <InputLabel id='demo-simple-select-label'>Status</InputLabel>
      <Select
        sx={{
          height: '40px'
        }}
        value={status.toUpperCase()}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        label='Sexo'
        onChange={handleSexFilterChange}
      >
        {filterOptions.map(option => (
          <MenuItem key={option} value={option.code}>
            {option.code + ' ' + option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default StatusFilter
