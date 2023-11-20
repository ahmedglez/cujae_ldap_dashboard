import useUserStore from '@/stores/users.store'
import { Box } from '@mui/material'
import useStyles from '../../styles'
import MethodFilter from './MethodFilter'
import UserFilter from './UserFilter'

const TableFilters = () => {
  const classes = useStyles()
  const store = useUserStore.getState()
  const { filters, setFilters } = store
  const { userType } = filters

  return (
    <Box sx={classes.filters}>
      <MethodFilter />
      <UserFilter />
    </Box>
  )
}

export default TableFilters
