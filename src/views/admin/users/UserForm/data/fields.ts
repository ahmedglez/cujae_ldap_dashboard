import UserType from '@/types/user.type'
import StudentType from '@/types/student.type'
import EmployeeType from '@/types/employee.type'

interface FieldConfig {
  label: string
  value: string | number
}

export const formFields = (user: UserType): FieldConfig[] => [
  {
    label: 'Username',
    value: user?.uid
  },
  {
    label: 'Dn',
    value: user?.dn
  },
  {
    label: 'Nombre',
    value: user?.cn
  },
  {
    label: 'Apellidos',
    value: user?.sn
  },
  {
    label: 'Email',
    value: user?.maildrop
  },
  {
    label: 'CI',
    value: user?.CI
  },
  {
    label: 'Tipo de usuario',
    value: user?.userType
  },
  {
    label: 'Estado actual',
    value: user?.userStatus
  },
  {
    label: 'Area',
    value: user?.area
  },
  {
    label: 'Pais',
    value: user?.country
  },
  {
    label: 'Creado',
    value: user?.dayRegister
  },
  {
    label: 'Modificado',
    value: !!user?.lastTimeChange ? new Date(user?.lastTimeChange).toLocaleDateString() : ''
  }
]

export const studentFields = (student: StudentType): FieldConfig[] => [
  { label: 'Carrera', value: student.career },
  { label: 'Año', value: student.studentYear },
  { label: 'Grupo', value: student.studentClassGroup },
  { label: 'Curso', value: student.userInformation },
  { label: 'Condicion', value: student.userCondition },
  { label: 'UJC', value: student.UJC }
]

export const employeeFields = (employee: EmployeeType): FieldConfig[] => [
  { label: 'Fecha de Contrato', value: employee.dateContract.toLocaleDateString() },
  { label: 'Fin de Contrato', value: employee.dateEndContract.toLocaleDateString() },
  { label: 'Categoria Educacional', value: employee.educationalCategory },
  { label: 'Rol Organizacional', value: employee.orgRole },
  { label: 'Nivel de Escolaridad', value: employee.schoolLevel },
  { label: 'Categoria Cientifica', value: employee.scientificCategory },
  { label: 'Años laborales', value: employee.userYears },
  { label: 'Contrato de trabajo', value: employee.workerContract },
  { label: 'Area de Trabajo', value: employee.workArea },
  { label: 'Id de trabajador', value: employee.workerID },
  { label: 'UJC', value: employee.UJC }
]
