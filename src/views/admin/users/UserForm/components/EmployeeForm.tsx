// ** React Imports
import React from 'react'

// ** MUI Imports
import EmployeeType from '@/types/employee.type'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputComponent from './InputField'
import { employeeFields } from '../data/fields'

interface EmployeeProps {
  employee?: EmployeeType | null | undefined
}

const renderFormFields = (fields: Array<{ label: string | null; value: string | number | null; att: string }>) => {
  return fields.map(field => <InputComponent field={field} />)
}

const EmployeeForm: React.FC<EmployeeProps> = ({ employee }) => {
  const fields = employeeFields(employee as EmployeeType)
  return (
    <Grid container spacing={7}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          {`Datos de trabajador`}
        </Typography>
      </Grid>
      {renderFormFields(fields)}
    </Grid>
  )
}

export default EmployeeForm
