import { Box } from '@mui/material'
import useStyles from '../../styles'
import MethodFilter from './MethodFilter'
import StatusFilter from './StatusFilter'
import UserFilter from './UserFilter'
import PeriodFilter from './PeriodFilter'

const TableFilters = () => {
  const classes = useStyles()

  return (
    <Box sx={classes.filters}>
      <MethodFilter />
      <UserFilter />
      <StatusFilter />
      <PeriodFilter />
    </Box>
  )
}

export default TableFilters
