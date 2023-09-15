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

export default EmployeeRow
