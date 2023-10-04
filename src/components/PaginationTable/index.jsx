import useUserStore from '@/stores/users.store'
import TablePagination from '@mui/material/TablePagination'

const PaginationTable = () => {
  const { pagination, setPagination, filteredUsers } = useUserStore(state => state)
  const { page, rowsPerPage } = pagination

  const handleChangePage = (event, newPage) => {
    setPagination({
      ...pagination,
      page: newPage + 1
    })
  }

  const handleChangeRowsPerPage = event => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 1
    })
  }

  return (
    <TablePagination
      component='div'
      count={filteredUsers.length}
      page={page - 1}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}

export default PaginationTable
