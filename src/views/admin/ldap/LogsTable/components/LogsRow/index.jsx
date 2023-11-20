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

  const { method } = parsedMessage

  const transformedDate = new Date(log.timestamp).toUTCString()
  return (
    <TableRow>
      <TableCell align='center'>{/* Render any specific content for this cell */}</TableCell>
      <TableCell sx={classes.tableCell}>{transformedDate}</TableCell>
      <TableCell sx={classes.tableCell}>{log.level}</TableCell>
      <TableCell sx={classes.tableCell}>{method}</TableCell>

      <TableCell>{log.message}</TableCell>
      {/* Add more cells for additional columns */}
    </TableRow>
  )
}

export default LogsRow
