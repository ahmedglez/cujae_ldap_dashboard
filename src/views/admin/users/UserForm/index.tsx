// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import UserType from '@/types/user.type'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

// ** Custom Components
import InputComponent from './components/InputField'
import { employeeFields, formFields, personalFields, studentFields } from './data/fields'
import StudentForm from './components/StudentForm'
import EmployeeForm from './components/EmployeeForm'

interface Props {
  user?: UserType | null
  student?: StudentType | null | undefined
}

const UserForm: React.FC<Props> = ({ user }) => {
  // ** State
  const router = useRouter()
  const username = router.query.username as string
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(0) // Track the active tab
  const [updatedUser, setUpdatedUser] = useState<UserType | null>()
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }
  const userFields = formFields(user as UserType)
  const personaFields = personalFields(user as UserType)

  useEffect(() => {
    setUpdatedUser(user)
  }, [user])

  const renderFormFields = (fields: Array<{ label: string | null; value: string | number | null; att: string }>) => {
    return fields.map(field => <InputComponent field={field} />)
  }

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
