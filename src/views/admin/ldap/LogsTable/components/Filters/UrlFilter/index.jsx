import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Magnify from 'mdi-material-ui/Magnify'
import { useState } from 'react'

const UrlFilter = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const { pathname, query } = router
  const { url } = query

  const handleChangeUsername = e => {
    const { value } = e.target
    setSearchTerm(value.trim())
  }

  const handleSearch = async () => {
    router.push({
      pathname: pathname,
      query: {
        ...query,
        url: searchTerm
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
      onChange={handleChangeUsername}
      onKeyDown={handleKeyDown}
      label={`Url`}
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

export default UrlFilter
