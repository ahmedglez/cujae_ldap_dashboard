import AdminRoute from '@/components/hocs/AdminRoute'
import useFetchUsers from '@/hooks/useFetchUsers'
import useProfileStore from '@/stores/profile.store'
import EmployeeType from '@/types/employee.type'
import StudentType from '@/types/student.type'
import EmployeesTable from '@/views/admin/users/EmployeesTable'
import StudentsTable from '@/views/admin/users/StudentsTable'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface UsersPageProps {
  // Define the props passed by the AdminRoute HOC, if any
  // For example: isAdmin: boolean;
}

const UsersPage: React.FC<UsersPageProps> = (
  {
    /* isAdmin */
  }
) => {
  const router = useRouter()
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const baseDN = useProfileStore(state => state.baseDN)

  // Use the generic type parameter to specify the response data structure
  const { loading, error, users: responseUsers } = useFetchUsers(`/users/baseDN`, baseDN, page, limit)
  const userType = router.query.userType as string // Assuming the route parameter is "userType"
  const [students, setStudents] = useState<StudentType[]>([])
  const [employees, setEmployees] = useState<EmployeeType[]>([]) // Use an array here

  useEffect(() => {
    if (!loading && responseUsers.length > 0) {
      if (userType === 'students') {
        setStudents(responseUsers as StudentType[]) // Cast responseUsers to StudentType[]
      } else if (userType === 'employees') {
        setEmployees(responseUsers as EmployeeType[]) // Cast responseUsers to EmployeeType[]
      }
    }
  }, [responseUsers, userType, loading])

  return (
    <div>
      <h1>Listado de usuarios</h1>
      {!loading && responseUsers.length > 0 && (
        <>
          {userType === 'students' && <StudentsTable students={students} />}
          {userType === 'employees' && <EmployeesTable employees={employees} />}
        </>
      )}
    </div>
  )
}

export default AdminRoute(UsersPage)
