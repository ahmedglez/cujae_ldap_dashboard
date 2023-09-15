import React, { useState, Fragment } from 'react'
import {
  Box,
  Paper,
  Table,
  Collapse,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  Typography
} from '@mui/material'
import ChevronUpIcon from 'mdi-material-ui/ChevronUp'
import ChevronDownIcon from 'mdi-material-ui/ChevronDown'
import StudentType from '@/types/student.type'
import columns from './data/columns'
import attributeMapping from './data/attributeMapping'
import useStyles from './styles'
import Skeleton from '@mui/material/Skeleton'

interface StudentRowProps {
  student: StudentType
  index: number
}

const StudentRow: React.FC<StudentRowProps> = ({ student, index }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        </TableCell>
        {attributeMapping.map(attribute => (
          <TableCell sx={classes.tableCell} key={attribute} size='small' align='center'>
            {student[attribute as keyof StudentType]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={classes.tableCell}>Carrera</TableCell>
                    <TableCell sx={classes.tableCell}>Año</TableCell>
                    <TableCell sx={classes.tableCell}>Grupo</TableCell>
                    <TableCell sx={classes.tableCell}>Tipo de Curso</TableCell>
                    <TableCell sx={classes.tableCell}>Condición</TableCell>
                    <TableCell sx={classes.tableCell}>Estado</TableCell>
                    <TableCell sx={classes.tableCell}>UJC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {student.career}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {student.studentYear}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {student.studentClassGroup}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {student.userInformation}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {student.userCondition}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {student.userStatus}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {student.UJC.toUpperCase()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default StudentRow
