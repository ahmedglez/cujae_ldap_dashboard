import useUserStore from '@/stores/users.store'
import { Box } from '@mui/material'
import useStyles from '../../styles'
import AreaFilter from './AreaFilter'
import UserTypeFilter from './UserType'
import SexFilter from './SexFilter'

const TableFilters = () => {
  const classes = useStyles()
  const store = useUserStore.getState()
  const { filters, setFilters } = store
  const { userType } = filters

  return (
    <Box sx={classes.filters}>
      <UserTypeFilter />
      <AreaFilter />
      <SexFilter />
    </Box>
  )
}

export default TableFilters
