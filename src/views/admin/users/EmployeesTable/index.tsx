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
import columns from './data/columns'
import attributeMapping from './data/attributeMapping'
import useStyles from './styles'
import Skeleton from '@mui/material/Skeleton'
import EmployeeType from '@/types/employee.type'

interface EmployeeRowProps {
  employee: EmployeeType
  index: number
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, index }) => {
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
            {employee[attribute as keyof EmployeeType]}
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
                    <TableCell></TableCell>
                    <TableCell sx={classes.tableCell}>Contrato</TableCell>
                    <TableCell sx={classes.tableCell}>Rol Organizacional</TableCell>
                    <TableCell sx={classes.tableCell}>Nivel de Escolaridad</TableCell>
                    <TableCell sx={classes.tableCell}>Categoría Científica</TableCell>
                    <TableCell sx={classes.tableCell}>ID de Trabajador</TableCell>
                    <TableCell sx={classes.tableCell}>Años Laborales</TableCell>
                    <TableCell sx={classes.tableCell}>Contrato de Trabajo</TableCell>
                    <TableCell sx={classes.tableCell}>Estado</TableCell>
                    <TableCell sx={classes.tableCell}>UJC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>

                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {`Desde ${new Date(employee.dateContract).toLocaleDateString()} hasta ${new Date(
                        employee.dateEndContract
                      ).toLocaleDateString()}`}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.orgRole}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.schoolLevel}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.scientificCategory}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.workerID}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.userYears}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.workerContract}
                    </TableCell>

                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.userStatus}
                    </TableCell>
                    <TableCell sx={classes.tableCell} component='th' scope='row'>
                      {employee.UJC.toUpperCase()}
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

interface EmployeesTableProps {
  employees: EmployeeType[]
  loading: boolean
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees, loading }) => {
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
            employees.length > 0 &&
            employees.map((employee, index) => <EmployeeRow key={employee.uid} employee={employee} index={index} />)}
          {(loading || employees.length === 0) && (
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

export default EmployeesTable
