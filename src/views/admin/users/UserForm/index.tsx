// ** React Imports
import React, { ChangeEvent, useEffect, useState } from 'react'

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
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons
import { PencilOutline, Restore, ContentSaveOutline, ContentSaveCheckOutline } from 'mdi-material-ui'

import IconButton from '@mui/material/IconButton'

interface Props {
  user?: UserType | null
}

interface StudentProps {
  student?: StudentType | null | undefined
}

interface EmployeeProps {
  employee?: EmployeeType | null | undefined
}

interface InputProps {
  field: {
    label: string | null
    value: string | number | null
    att: string
  }
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

  const InputComponent: React.FC<InputProps> = ({ field }) => {
    const [allowEdit, setAllowEdit] = useState(false)
    const [value, setValue] = useState<string | number | null>(field.value)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const handleReset = () => {
      setValue(field.value)
    }

    const handleToogleEdit = () => {
      setAllowEdit(prev => !prev)
    }

    return (
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          onChange={handleChange}
          value={value}
          label={field.label}
          disabled={!allowEdit}
          placeholder={field.value as string}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton sx={{ padding: 0 }} onClick={handleToogleEdit}>
                  <PencilOutline />
                </IconButton>
                <IconButton sx={{ padding: 0 }} onClick={handleReset}>
                  <Restore />
                </IconButton>
                <IconButton sx={{ padding: 0 }}>
                  <ContentSaveOutline />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              backgroundColor: allowEdit ? 'white' : '#f0f0f0'
            }
          }}
        />
      </Grid>
    )
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
