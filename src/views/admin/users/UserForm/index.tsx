// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import UserType from '@/types/user.type'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { formFields, studentFields } from './data/fields'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

interface Props {
  user?: UserType | null
}

interface StudentProps {
  student?: StudentType | null | undefined
}

interface EmployeeProps {
  employee?: EmployeeType | null | undefined
}

const renderFormFields = (fields: Array<{ label: string; value: string | number }>) => {
  return fields.map(field => (
    <Grid item xs={12} sm={6} key={field.label}>
      <TextField fullWidth label={field.label} value={field.value} InputLabelProps={{ shrink: true }} />
    </Grid>
  ))
}

const StudentForm: React.FC<StudentProps> = ({ student }) => {
  const fields = studentFields(student as StudentType)
  return (
    <Grid mt={2} container spacing={7}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          {`Datos de estudiante`}
        </Typography>
      </Grid>
      {renderFormFields(fields)}
    </Grid>
  )
}

const EmployeeForm: React.FC<EmployeeProps> = ({ employee }) => {
  const fields = employeeFields(employee as EmployeeType)
  return (
    <Grid mt={2} container spacing={7}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          {`Datos de trabajador`}
        </Typography>
      </Grid>
      {renderFormFields(fields)}
    </Grid>
  )
}

const UserForm: React.FC<Props> = ({ user }) => {
  // ** State
  const router = useRouter()
  const username = router.query.username as string
  const [loading, setLoading] = useState<boolean>(false)
  const [student, setStudent] = useState<StudentType | null>(null)
  const [employee, setEmployee] = useState<EmployeeType | null>(null)

  useEffect(() => {
    if (!!user) {
      console.log(user.userType)
      // Assuming the user type is specified in the user object as 'type'
      if (user?.userType === 'Estudiante') {
        setStudent(user as StudentType)
      } else if (user?.userType === 'Trabajador' || user?.userType === 'Trabajador Docente') {
        setEmployee(user as EmployeeType)
      }
    }
  }, [user])

  const userFields = formFields(user as UserType)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom>
              {`Información de perfil`}
            </Typography>
          </Grid>
          {renderFormFields(userFields)}
        </Grid>
        <Grid mt={2} container spacing={7}>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom>
              {`Datos personales`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Direccion' value={user?.homeAddress} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Municipio' value={user?.sedeMunicipio} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Sexo' value={user?.sex} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Color de piel' value={user?.skinColor} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Telefono fijo'
              value={user?.telephoneNumber}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Area' value={user?.area} InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
        {!!student && <StudentForm student={student} />}
        {!!employee && <EmployeeForm employee={employee} />}
      </form>
    </CardContent>
  )
}

export default UserForm
