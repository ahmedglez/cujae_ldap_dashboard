import AdminRoute from '@/components/hocs/AdminRoute'
import { user_types_query, userTypes } from '@/constants/userTypes'
import useFetchUsers from '@/hooks/useFetchUsers'
import useProfileStore from '@/stores/profile.store'
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import EmployeesTable from '@/views/admin/users/EmployeesTable'
import StudentsTable from '@/views/admin/users/StudentsTable'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import UserType from '@/types/user.type'

type UsersPageProps = {
  userType: string
}

const UsersPage: React.FC<UsersPageProps> = ({ userType }) => {
  const router = useRouter()
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(50)
  const baseDN = useProfileStore(state => state.baseDN)

  const {
    loading,
    error,
    users: responseUsers
  } = useFetchUsers(`/users/baseDN?userType=${userType}&page=${page}&limit=${limit}`, baseDN)

  const [users, setUsers] = useState<UserType[]>([])
  const students = users?.filter(user => user.userType === userTypes[0]) as StudentType[]
  const employees = users?.filter(user => user.userType === userTypes[1]) as EmployeeType[]

  useEffect(() => {
    if (!loading && responseUsers.length > 0) {
      const typedUsers = responseUsers as UserType[]
      setUsers(typedUsers)
    }
  }, [responseUsers, userType, loading])

  return (
    <div>
      <h1>Listado de usuarios</h1>
      {!loading && users && (
        <>
          {userType === user_types_query[0] && <StudentsTable students={students} />}
          {userType === user_types_query[1] && <EmployeesTable employees={employees} />}
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { userType } = context.query // Extract userType from query parameter
  return {
    props: {
      userType
    }
  }
}

export default AdminRoute(UsersPage)
