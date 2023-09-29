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

const UserForm: React.FC<Props> = ({ user }) => {
  // ** State
  const router = useRouter()
  const username = router.query.username as string
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(0) // Track the active tab

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const userFields = formFields(user as UserType)
  const personaFields = personalFields(user as UserType)

  console.log('activeTab', activeTab)
  console.log('type', user?.userType)
  console.log(user)

  return (
    <CardContent>
      <Tabs
        sx={{
          marginBottom: 5
        }}
        value={activeTab}
        onChange={handleTabChange}
      >
        <Tab value={0} label='Información de perfil' />
        <Tab label='Datos personales' value={1} />
        {user?.userType === 'Estudiante' ? (
          <Tab label='Datos de estudiante' value={2} />
        ) : (
          <Tab label='Datos de trabajador' value={2} />
        )}
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
        {activeTab === 2 && user?.userType === 'Estudiante' && user?.userType !== undefined && (
          <StudentForm student={user as StudentType} />
        )}
        {activeTab === 2 && user?.userType !== 'Estudiante' && user?.userType !== undefined && (
          <EmployeeForm employee={user as EmployeeType} />
        )}
      </form>
    </CardContent>
  )
}

export default UserForm
