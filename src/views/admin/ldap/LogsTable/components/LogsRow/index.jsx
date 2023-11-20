import { TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import useStyles from '../../styles'

const LogsRow = ({ log }) => {
  const [parsedMessage, setParsedMessage] = useState(parseLog(log))
  const classes = useStyles()
  function parseLog(log) {
    try {
      const jsonString = log.message.replace(/'/g, '"')
      const validJsonString = jsonString
        .replace(/(\w+)\s*:/g, '"$1":')
        .replace(/undefined/g, 'null')
        .replace(/'/g, '"')
      const obj = JSON.parse(validJsonString)
      return obj
    } catch (error) {
      console.log('error', error.message)
      return {
        method: null,
        url: null,
        status: null,
        content_length: null,
        response_time: null,
        user: null,
        dn: null,
        branch: null
      }
    }
  }

  const getRowColor = level => {
    switch (level) {
      case 'info':
        return '#e6f7ff' // Change this to the color you want for info level
      case 'error':
        return '#ffd6cc' // Change this to the color you want for error level
      case 'warning':
        return '#fff2cc' // Change this to the color you want for warning level
      default:
        return '#ffffff' // Change this to the default color
    }
  }

  const { method, url, status, user, dn, branch, content_length, response_time } = parsedMessage

  const transformedDate = new Date(log.timestamp).toUTCString()
  const rowColor = getRowColor(log.level)
  return (
    <TableRow
      sx={{
        backgroundColor: rowColor
      }}
    >
      <TableCell align='center'>{/* Render any specific content for this cell */}</TableCell>
      <TableCell sx={classes.tableCell}>{transformedDate}</TableCell>
      <TableCell sx={classes.tableCell}>{log.level}</TableCell>
      <TableCell sx={classes.tableCell}>{method}</TableCell>
      <TableCell sx={classes.tableCell}>{url}</TableCell>
      <TableCell sx={classes.tableCell}>{status}</TableCell>
      <TableCell sx={classes.tableCell}>{user}</TableCell>
      <TableCell sx={classes.tableCell}>{dn}</TableCell>
      <TableCell sx={classes.tableCell}>{branch}</TableCell>
      <TableCell sx={classes.tableCell}>{content_length}</TableCell>
      <TableCell sx={classes.tableCell}>{response_time}</TableCell>

      <TableCell sx={classes.tableCell}>{log.message}</TableCell>
      {/* Add more cells for additional columns */}
    </TableRow>
  )
}

export default LogsRow
