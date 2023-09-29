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

const StudentForm: React.FC<StudentProps> = ({ student }) => {
  return (
    <Grid mt={2} container spacing={7}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          {`Datos de estudiante`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Carrera' value={student?.career} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label={`Año`} value={student?.studentYear} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Grupo' value={student?.studentClassGroup} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Curso' value={student?.userInformation} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Condicion' value={student?.userCondition} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='UJC' value={student?.UJC} InputLabelProps={{ shrink: true }} />
      </Grid>
    </Grid>
  )
}

const EmployeeForm: React.FC<EmployeeProps> = ({ employee }) => {
  return (
    <Grid mt={2} container spacing={7}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          {`Datos de trabajador`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Fecha de Contrato'
          value={employee?.dateContract.toLocaleDateString()}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={`Fin de Contrato`}
          value={employee?.dateContract.toLocaleDateString()}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Categoria Educacional'
          value={employee?.educationalCategory}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Rol Organizacional' value={employee?.orgRole} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Nivel de Escolaridad'
          value={employee?.schoolLevel}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Categoria Cientifica'
          value={employee?.scientificCategory}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Años laborales' value={employee?.userYears} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Contrato de trabajo'
          value={employee?.workArea}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Area de Trabajo' value={employee?.workArea} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='Id de trabajador' value={employee?.workerID} InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label='UJC' value={employee?.UJC} InputLabelProps={{ shrink: true }} />
      </Grid>
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
  console.log(employee)
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

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom>
              {`Información de perfil`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Username' value={user?.uid} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Dn' value={user?.dn} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Nombre' value={user?.cn} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Apellidos' value={user?.sn} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Email' value={user?.maildrop} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='CI' value={user?.CI} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Tipo de usuario' value={user?.userType} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Estado actual' value={user?.userStatus} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Area' value={user?.area} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Pais' value={user?.country} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Creado' value={user?.dayRegister} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Modificado'
              value={!!user?.lastTimeChange ? new Date(user?.lastTimeChange).toLocaleDateString : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
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
