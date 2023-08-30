import AdminRoute from '@/components/hocs/AdminRoute'
import { user_types_query } from '@/constants/userTypes'
import useFetchUsers from '@/hooks/useFetchUsers'
import useProfileStore from '@/stores/profile.store'
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import EmployeesTable from '@/views/admin/users/EmployeesTable'
import StudentsTable from '@/views/admin/users/StudentsTable'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const UsersPage = ({ userType }) => {
  const router = useRouter()
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const baseDN = useProfileStore(state => state.baseDN)

  const {
    loading,
    error,
    users: responseUsers
  } = useFetchUsers(`/users/baseDN?userType=${userType}&page=${page}&limit=${limit}`, baseDN, page, limit)
  const [students, setStudents] = useState<StudentType[]>([])
  const [employees, setEmployees] = useState<EmployeeType[]>([])

  useEffect(() => {
    if (!loading && responseUsers.length > 0) {
      if (userType === user_types_query[0]) {
        setStudents(responseUsers as StudentType[])
      } else if (userType === user_types_query[1]) {
        setEmployees(responseUsers as EmployeeType[])
      }
    }
  }, [responseUsers, userType, loading])

  return (
    <div>
      <h1>Listado de usuarios</h1>
      {!loading && responseUsers.length > 0 && (
        <>
          {userType === user_types_query[0] && <StudentsTable students={students} />}
          {userType === user_types_query[1] && <EmployeesTable employees={employees} />}
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { userType } = context.query // Extract userType from query parameter
  return {
    props: {
      userType
    }
  }
}

export default AdminRoute(UsersPage)
