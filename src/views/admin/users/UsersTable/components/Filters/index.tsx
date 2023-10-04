import useUserStore from '@/stores/users.store'
import { Box } from '@mui/material'
import useStyles from '../../styles'
import AreaFilter from './AreaFilter'
import UserTypeFilter from './UserType'
import SexFilter from './SexFilter'
import StatusFilter from './StatusFilter'

const TableFilters = () => {
  const classes = useStyles()
  const store = useUserStore.getState()
  const { filters, setFilters } = store
  const { userType } = filters

  return (
    <Box sx={classes.filters}>
      <UserTypeFilter />
      <SexFilter />
      <StatusFilter />
      <AreaFilter />
    </Box>
  )
}

export default TableFilters
