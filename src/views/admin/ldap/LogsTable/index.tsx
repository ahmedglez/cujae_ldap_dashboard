import LogType from '@/types/log.type'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import TableFilters from './components/Filters'
import LogsRow from './components/LogsRow'
import columns from './data/columns'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'

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
  const handleGetLogsFile = async () => {
    try {
      const response = await withAuthAxiosInstance.get('/logs/log-file', {
        responseType: 'blob' // Set responseType to 'blob' to handle binary data
      })

      const contentDisposition = response.headers['content-disposition']
      const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/)
      const suggestedFilename = filenameMatch ? filenameMatch[1] : 'logs.txt'

      // Create a link element
      const link = document.createElement('a')
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: response.data.type })
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob)

      // Set the link's properties
      link.href = url
      link.download = suggestedFilename

      // Append the link to the document
      document.body.appendChild(link)

      // Trigger a click on the link to start the download
      link.click()

      // Remove the link from the document
      document.body.removeChild(link)

      // Revoke the URL to free up resources
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading logs:', error)
      // Handle error, show a message, etc.
    }
  }

  return (
    <Paper>
      <TableFilters />
      <Button
        sx={{
          bgColor: 'gray'
        }}
        variant='contained'
        color='secondary'
        onClick={handleGetLogsFile}
      >
        Descargar logs
      </Button>
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
