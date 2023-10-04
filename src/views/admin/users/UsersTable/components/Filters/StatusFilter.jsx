import React from 'react'
import useUserStore from '@/stores/users.store'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

const StatusFilter = () => {
  const { filters, setFilters, users } = useUserStore.getState()
  const [options, setOptions] = useState([])
  const [value, setValue] = React.useState('ALL')
  const [inputValue, setInputValue] = React.useState('')

  useEffect(() => {
    const uniqueStatus = new Set()
    users.forEach(user => {
      uniqueStatus.add(user.userStatus)
    })
    const uniqueStatusArray = Array.from(uniqueStatus)
    setOptions(uniqueStatusArray)
  }, [])

  useEffect(() => {
    if (value === null || value === '') {
      setFilters({
        ...filters,
        status: 'ALL'
      })
    } else {
      setFilters({
        ...filters,
        status: value
      })
    }
  }, [value])

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
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
          xs: 150,
        }
      }}
      renderInput={params => <TextField {...params} label='Estado' />}
    />
  )
}

export default StatusFilter
