import { MenuItem, Select, Box, Typography } from '@mui/material'
import React from 'react'
import useStyles from '../../styles'
import useUserStore from '@/stores/users.store'
import { filterOptions } from '../../data/filters'
import UserTypeFilter from './UserType'
import AreaFilter from './AreaFilter'

const TableFilters = () => {
  const classes = useStyles()
  const store = useUserStore.getState()
  const { filters, setFilters } = store
  const { userType } = filters

  return (
    <Box sx={classes.filters}>
      <UserTypeFilter />
      <AreaFilter />
    </Box>
  )
}

export default TableFilters
