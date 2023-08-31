import UserType from './user.type'

interface StudentType extends UserType {
  career: string
  studentYear: string
  studentClassGroup: string
  userInformation: string
  userCondition: string
  userStatus: string
  UJC: string
}

export default StudentType
