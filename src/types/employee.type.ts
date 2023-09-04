import UserType from './user.type'

interface EmployeeType extends UserType {
  dateContract: Date
  dateEndContract: Date
  educationalCategory: string
  orgRole: string
  schoolLevel: string
  scientificCategory: string
  userYears: string
  workerContract: string
  workArea: string
  workerID: string
  UJC: string
}

export default EmployeeType
