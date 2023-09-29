// ** React Imports
import React from 'react'

// ** MUI Imports
import StudentType from '@/types/student.type'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { studentFields } from '../data/fields'
import InputComponent from './InputField'

interface StudentProps {
  student?: StudentType | null | undefined
}

const renderFormFields = (fields: Array<{ label: string | null; value: string | number | null; att: string }>) => {
  return fields.map(field => <InputComponent field={field} />)
}
const StudentForm: React.FC<StudentProps> = ({ student }) => {
  const fields = studentFields(student as StudentType)
  return (
    <Grid container spacing={7}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          {`Datos de estudiante`}
        </Typography>
      </Grid>
      {renderFormFields(fields)}
    </Grid>
  )
}

export default StudentForm
