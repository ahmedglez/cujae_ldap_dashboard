import { userTypes } from '@/constants/userTypes'
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import UserType from '@/types/user.type'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import EmployeeRow from '../EmployeesRow'
import StudentRow from '../StudentsRow'
import columns from './data/columns'
import useStyles from './styles'

interface UsersTableProps {
  users: UserType[]
  loading: boolean
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading }) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' width={'auto'}></TableCell>
            {columns.map(column => (
              <TableCell key={column} align='center' width={'auto'} sx={classes.tableCell}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            users.length > 0 &&
            users.map((user, index) => {
              if (user.userType === userTypes[0])
                return <StudentRow key={user.uid} student={user as StudentType} index={index} />
              else if (user.userType === userTypes[1])
                return <EmployeeRow key={user.uid} employee={user as EmployeeType} index={index} />
              else if (user.userType === userTypes[2])
                return <EmployeeRow key={user.uid} employee={user as EmployeeType} index={index} />
            })}
          {(loading || users.length === 0) && (
            <>
              {Array(10)
                .fill(null)
                .map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell colSpan={1}>
                      {' '}
                      <Skeleton animation='wave' />
                    </TableCell>
                    {columns.map((column, columnIndex) => (
                      <TableCell key={columnIndex} colSpan={1}>
                        {' '}
                        {/* Adjust colSpan */}
                        <Skeleton animation='wave' />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
