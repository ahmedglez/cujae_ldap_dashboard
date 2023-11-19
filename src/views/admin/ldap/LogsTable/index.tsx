import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import LogType from '@/types/log.type'

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

const LogsTable: React.FC<LogsTableProps> = ({ logs, loading }) => (
  <Paper>
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' width={'auto'}></TableCell>
            <TableCell align='center' width={'auto'}>
              Timestamp
            </TableCell>
            <TableCell align='center' width={'auto'}>
              Level
            </TableCell>
            <TableCell align='center' width={'auto'}>
              Message
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            logs.length > 0 &&
            logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell align='center'>{/* Render any specific content for this cell */}</TableCell>
                <TableCell align='center'>{log.timestamp}</TableCell>
                <TableCell align='center'>{log.level}</TableCell>
                <TableCell align='center'>{log.message}</TableCell>
                {/* Add more cells for additional columns */}
              </TableRow>
            ))}
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

export default LogsTable
