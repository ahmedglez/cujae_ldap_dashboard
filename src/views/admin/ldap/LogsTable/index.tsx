import React, { useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import LogType from '@/types/log.type'
import LogsRow from './components/LogsRow'
import columns from './data/columns'
import TableFilters from './components/Filters'

interface LogsTableProps {
  logs: LogType[]
  loading: boolean
}

const NoResultsMessage = () => (
  <TableRow>
    <TableCell colSpan={100} width={'100%'}>
      <Typography variant='body1' align='center' color='textSecondary'>
        No results found.
      </Typography>
    </TableCell>
  </TableRow>
)

const LogsTable: React.FC<LogsTableProps> = ({ logs, loading }) => {
  return (
    <Paper>
      <TableFilters />
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' width={'auto'}></TableCell>
              {columns.map(column => (
                <TableCell key={column} align='center' width={'auto'}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && logs.length > 0 && logs.map((log, index) => <LogsRow key={index} log={log} />)}
            {loading && (
              <>
                {Array(10)
                  .fill(null)
                  .map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell colSpan={1}>
                        <Skeleton animation='wave' />
                      </TableCell>
                      <TableCell colSpan={1}>
                        <Skeleton animation='wave' />
                      </TableCell>
                      <TableCell colSpan={1}>
                        <Skeleton animation='wave' />
                      </TableCell>
                      {/* Add more cells for additional columns */}
                    </TableRow>
                  ))}
              </>
            )}
            {logs.length === 0 && !loading && <NoResultsMessage />}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default LogsTable
