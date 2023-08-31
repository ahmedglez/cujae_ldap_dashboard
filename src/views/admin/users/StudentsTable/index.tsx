// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import StudentType from '@/types/student.type'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Data
import columns from './data/columns'
import attributeMapping from './data/attributeMapping'

// ** Styles
import useStyles from './styles'

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
            {open ? <ChevronUp /> : <ChevronDown />}
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

interface StudentsTableProps {
  students: StudentType[] // Using the StudentArray type defined earlier
}
const StudentsTable: React.FC<StudentsTableProps> = ({ students }) => {
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
          {students.map((student, index) => (
            <StudentRow key={student.uid} student={student} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentsTable
