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
import { Button, Box } from '@mui/material'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'

// ** Custom Components
import InputComponent from './components/InputField'
import { employeeFields, userFields, personalFields, studentFields } from './data/fields'
import StudentForm from './components/StudentForm'
import EmployeeForm from './components/EmployeeForm'

// ** Others
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import { showToastError, showToastInfo, showToastSuccess, showToastWarning } from '@/helpers/toastHelper'
import useUserFormStore from '@/stores/from.store'

interface Props {
  user?: UserType
}

const UserForm: React.FC<Props> = () => {
  // ** State
  const [loading, setLoading] = useState<boolean>(false)
  const store = useUserFormStore()
  const { user, setUser, unsaveField, formFields, updateField, setFormFields } = store
  const [activeTab, setActiveTab] = useState<number>(0)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue as number)
  }
  const renderedUserFields = userFields(user as UserType)
  const personaFields = personalFields(user as UserType)

  const handleSave = async () => {
    setLoading(true)
    try {
      const payload = {
        dn: user?.dn,
        attributes: {
          ...formFields
        }
      }
      const res = await withAuthAxiosInstance.post(`/users/modify-ldap`, payload)
      showToastSuccess('Usuario actualizado')
      setActiveTab(100)
      setTimeout(() => {
        setActiveTab(0)
      }, 50)
    } catch (error) {
      showToastError('Error al actualizar el usuario')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setUser(user)
    setActiveTab(100)
    setTimeout(() => {
      setActiveTab(0)
    }, 50)
    showToastWarning(`Se han restaurados todos los campos`)
  }

  const renderFormFields = (fields: Array<{ label: string; value: string; att: string }>) => {
    return fields.map(field => <InputComponent field={field} />)
  }

  return (
    <CardContent>
      <Tabs
        sx={{
          marginBottom: 5,
          maxWidth: '100%', // Limit the maximum width of the Tabs
          overflowX: 'auto' // Enable horizontal scrolling
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
            {renderFormFields(renderedUserFields)}
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px'
        }}
      >
        <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSave}>
          {loading ? <CircularProgress sx={{ color: 'white' }} /> : 'Save'}
        </Button>
        <Button type='reset' variant='outlined' color='secondary' onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </CardContent>
  )
}

export default UserForm
