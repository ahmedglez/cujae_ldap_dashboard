import { userTypes } from '@/constants/userTypes'
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import UserType from '@/types/user.type'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import React, { useEffect, useState } from 'react'
import columns from './data/columns'
import useStyles from './styles'
import LDAPGroup from '@/types/ldapGroup'
import GroupRow from './components/GroupRow'

interface UsersTableProps {
  groups: LDAPGroup[]
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

const GroupsTable: React.FC<UsersTableProps> = ({ groups, loading }) => {
  const classes = useStyles()

  return (
    <Paper>
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
              groups.length > 0 &&
              groups.map((group: LDAPGroup, index: number) => {
                return <GroupRow group={group} index={index} />
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

            {groups.length === 0 && !loading && <NoResultsMessage />}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default GroupsTable
