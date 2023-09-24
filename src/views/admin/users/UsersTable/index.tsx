import { userTypes } from '@/constants/userTypes'
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import UserType from '@/types/user.type'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import React, { useState } from 'react'
import EmployeeRow from '../EmployeesRow'
import StudentRow from '../StudentsRow'
import columns from './data/columns'
import useStyles from './styles'

interface UsersTableProps {
  users: UserType[]
  loading: boolean
}

const NoResultsMessage = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    message: {
      width: '100%',

      fontSize: '18px',
      margin: '10px 0'
    }
  }

  return (
    <TableRow>
      <TableCell colSpan={100} width={'100%'}>
        <Typography sx={styles.message}>No results found.</Typography>
      </TableCell>
    </TableRow>
  )
}

const filterOptions = ['All', 'Estudiante', 'Trabajador', 'Trabajador Docente' /* Add more options if needed */]

const UsersTable: React.FC<UsersTableProps> = ({ users, loading }) => {
  const classes = useStyles()
  const [filter, setFilter] = useState('All')

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string)
  }

  // Filtering logic
  const filteredUsers = users.filter(user => {
    if (filter === 'All') {
      return true // Show all users
    }
    return user.userType === filter
  })

  return (
    <Paper>
      <div style={classes.filter}>
        <label>Filter by User Type:</label>
        <Select value={filter} onChange={handleFilterChange}>
          {filterOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
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
              filteredUsers.length > 0 &&
              filteredUsers.map((user, index) => {
                if (user.userType === userTypes[0])
                  return <StudentRow key={user.uid} student={user as StudentType} index={index} />
                else if (user.userType === userTypes[1])
                  return <EmployeeRow key={user.uid} employee={user as EmployeeType} index={index} />
                else if (user.userType === userTypes[2])
                  return <EmployeeRow key={user.uid} employee={user as EmployeeType} index={index} />
              })}
            {loading && (
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

            {filteredUsers.length === 0 && <NoResultsMessage />}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default UsersTable
