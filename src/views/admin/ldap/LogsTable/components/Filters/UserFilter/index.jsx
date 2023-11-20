import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Magnify from 'mdi-material-ui/Magnify'
import { useState } from 'react'

const UserFilter = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const { pathname, query } = router
  const { user } = query

  const handleChangeUsername = e => {
    const { value } = e.target
    setSearchTerm(value.trim())
  }

  const handleSearch = async () => {
    router.push({
      pathname: pathname,
      query: {
        ...query,
        user: searchTerm
      }
    })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <TextField
      value={searchTerm}
      onChange={handleChangeUsername}
      onKeyDown={handleKeyDown}
      label={`User`}
      size='small'
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 4,
          height: '40px'
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Magnify onClick={handleSearch} fontSize='small' />
          </InputAdornment>
        )
      }}
    />
  )
}

export default UserFilter
