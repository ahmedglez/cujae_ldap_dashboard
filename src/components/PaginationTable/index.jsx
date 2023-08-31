import useUserStore from '@/stores/users.store'
import TablePagination from '@mui/material/TablePagination'
import { useState } from 'react'

const PaginationTable = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const { pagination, setPagination, users } = useUserStore(state => state)
  const { page, rowsPerPage } = pagination

  console.log('pagination', pagination)

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
      count={users.length}
      page={page - 1}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}

export default PaginationTable
