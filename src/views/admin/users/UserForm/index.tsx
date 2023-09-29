// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import UserType from '@/types/user.type'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { formFields, studentFields, employeeFields, personalFields } from './data/fields'
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
  const [activeTab, setActiveTab] = useState<number>(0) // Track the active tab

  useEffect(() => {
    if (!!user) {
      // Assuming the user type is specified in the user object as 'type'
      if (user?.userType === 'Estudiante') {
        setStudent(user as StudentType)
      } else if (user?.userType === 'Trabajador' || user?.userType === 'Trabajador Docente') {
        setEmployee(user as EmployeeType)
      }
    }
  }, [user])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const userFields = formFields(user as UserType)
  const personaFields = personalFields(user as UserType)

  return (
    <CardContent>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label='Información de perfil' />
        <Tab label='Datos personales' />
        {student && <Tab label='Datos de estudiante' />}
        {employee && <Tab label='Datos de trabajador' />}
      </Tabs>
      <form>
        {activeTab === 0 && (
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <Typography variant='h4' gutterBottom>
                {`Información de perfil`}
              </Typography>
            </Grid>
            {renderFormFields(userFields)}
          </Grid>
        )}
        {activeTab === 1 && (
          <Grid container spacing={7}>
            <Grid item xs={12}>
              <Typography variant='h4' gutterBottom>
                {`Datos Personales`}
              </Typography>
            </Grid>
            {renderFormFields(personaFields)}
          </Grid>
        )}

        {activeTab === 2 && student && <StudentForm student={student} />}
        {activeTab === 3 && employee && <EmployeeForm employee={employee} />}
      </form>
    </CardContent>
  )
}

export default UserForm
