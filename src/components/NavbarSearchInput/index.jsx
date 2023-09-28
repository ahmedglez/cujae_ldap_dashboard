import React, { useState } from 'react'
import useUserStore from '@/stores/users.store'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Magnify from 'mdi-material-ui/Magnify'
import { useRouter } from 'next/router'

const NavbarSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleChangeUsername = e => {
    const { value } = e.target
    setSearchTerm(value.trim())
  }

  const handleSearch = async () => {
    if (searchTerm !== '' && !!searchTerm) {
      router.push(`/admin/users/${searchTerm}`)
    }
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
      onClick={handleSearch}
      size='small'
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Magnify fontSize='small' />
          </InputAdornment>
        )
      }}
    />
  )
}

export default NavbarSearchInput
