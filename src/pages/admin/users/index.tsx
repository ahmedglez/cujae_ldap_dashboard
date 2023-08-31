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
import useUserStore from '@/stores/users.store'
import usePaginateUsers from '@/hooks/usePaginateUsers'
import PaginationTable from '@/components/PaginationTable'

type UsersPageProps = {
  userType: string
}

const LIMIT = 5000
const UsersPage: React.FC<UsersPageProps> = ({ userType }) => {
  const router = useRouter()
  const baseDN = useProfileStore(state => state.baseDN)
  const { setUsers } = useUserStore(state => state)

  const {
    loading,
    error,
    users: responseUsers
  } = useFetchUsers(`/users/baseDN?userType=${userType}&page=${1}&limit=${LIMIT}`, baseDN)

  const paginatedUsers = usePaginateUsers()

  const students = paginatedUsers?.filter((user: UserType) => user.userType === userTypes[0]) as StudentType[]
  const employees = paginatedUsers?.filter((user: UserType) => user.userType === userTypes[1]) as EmployeeType[]

  useEffect(() => {
    if (!loading && responseUsers.length > 0) {
      const typedUsers = responseUsers as UserType[]
      setUsers(typedUsers)
    }
  }, [responseUsers, userType, loading])

  return (
    <div>
      <h1>Listado de usuarios</h1>
      {!loading && paginatedUsers && (
        <>
          {userType === user_types_query[0] && <StudentsTable students={students} />}
          {userType === user_types_query[1] && <EmployeesTable employees={employees} />}
        </>
      )}
      {!loading && UsersPage.length > 0 && <PaginationTable />}
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
