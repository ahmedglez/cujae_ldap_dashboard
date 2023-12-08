import UserType from '@/types/user.type'
import StudentType from '@/types/student.type'
import EmployeeType from '@/types/employee.type'

interface FieldConfig {
  label: string
  value: string
  att: string
}

export const userFields = (user: UserType): FieldConfig[] => [
  {
    label: 'Username',
    value: user?.uid,
    att: 'uid'
  },
  {
    label: 'Dn',
    value: user?.dn,
    att: 'dn'
  },
  {
    label: 'Nombre',
    value: user?.cn,
    att: 'cn'
  },
  {
    label: 'Apellidos',
    value: user?.sn,
    att: 'sn'
  },
  {
    label: 'CI',
    value: user?.CI,
    att: 'CI'
  },
  {
    label: 'Tipo de usuario',
    value: user?.userType,
    att: 'userType'
  },
  {
    label: 'Estado actual',
    value: user?.userStatus,
    att: 'userStatus'
  },
  {
    label: 'Area',
    value: user?.area,
    att: 'area'
  },
  {
    label: 'Pais',
    value: user?.country,
    att: 'country'
  },
  {
    label: 'Modificado',
    value: !!user?.lastTimeChange ? new Date(user?.lastTimeChange).toLocaleDateString() : '',
    att: 'lastTimeChange'
  }
]

export const personalFields = (user: UserType): FieldConfig[] => [
  {
    label: 'Direccion',
    value: user?.homeAddress,
    att: 'homeAddress'
  },
  {
    label: 'Municipio',
    value: user?.sedeMunicipio,
    att: 'sedeMunicipio'
  },
  {
    label: 'Sexo',
    value: user?.sex,
    att: 'sex'
  },
  {
    label: 'Color de piel',
    value: user?.skinColor,
    att: 'skinColor'
  },
  {
    label: 'Telefono fijo',
    value: user?.telephoneNumber,
    att: 'telephoneNumber'
  },
  {
    label: 'CI',
    value: user?.CI,
    att: 'CI'
  }
]

export const studentFields = (student: StudentType): FieldConfig[] => [
  { label: 'Carrera', value: student.career, att: 'career' },
  { label: 'Año', value: student.studentYear, att: 'studentYear' },
  { label: 'Grupo', value: student.studentClassGroup, att: 'studentClassGroup' },
  { label: 'Curso', value: student.userInformation, att: 'userInformation' },
  { label: 'Condicion', value: student.userCondition, att: 'userCondition' },
  { label: 'UJC', value: student.UJC, att: 'UJC' }
]

export const employeeFields = (employee: EmployeeType): FieldConfig[] => [
  { label: 'Fecha de Contrato', value: new Date(employee.dateContract).toLocaleDateString(), att: 'dateContract' },
  { label: 'Fin de Contrato', value: new Date(employee.dateEndContract).toLocaleDateString(), att: 'dateEndContract' },
  { label: 'Categoria Educacional', value: employee.educationalCategory, att: 'educationalCategory' },
  { label: 'Rol Organizacional', value: employee.orgRole, att: 'orgRole' },
  { label: 'Nivel de Escolaridad', value: employee.schoolLevel, att: 'schoolLevel' },
  { label: 'Categoria Cientifica', value: employee.scientificCategory, att: 'scientificCategory' },
  { label: 'Años laborales', value: employee.userYears, att: 'userYears' },
  { label: 'Contrato de trabajo', value: employee.workerContract, att: 'workerContract' },
  { label: 'Area de Trabajo', value: employee.workArea, att: 'workArea' },
  { label: 'Id de trabajador', value: employee.workerID, att: 'workerID' },
  { label: 'UJC', value: employee.UJC, att: 'UJC' }
]
