import { MenuItem, Select, Box, Typography } from '@mui/material'
import React from 'react'
import useStyles from '../../styles'
import useUserStore from '@/stores/users.store'
import { filterOptions } from '../../data/filters'
import UserTypeFilter from './UserType'

const TableFilters = () => {
  const classes = useStyles()
  const store = useUserStore.getState()
  const { filters, setFilters } = store
  const { userType } = filters

  return (
    <Box sx={classes.filter}>
      <UserTypeFilter />
    </Box>
  )
}

export default TableFilters
