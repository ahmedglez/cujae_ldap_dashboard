import PaginationTable from '@/components/pagination/PaginationTable'
import AdminRoute from '@/components/hocs/AdminRoute'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import usePagination from '@/hooks/usePaginateUsers'
import useProfileStore from '@/stores/profile.store'
import LDAPGroup from '@/types/ldapGroup'
import GroupsTable from '@/views/admin/groups/GroupsTable'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { showToastError } from '@/helpers/toastHelper'

type GroupsPageProps = {
  ou: string
}

const URL = `/groups/getChilds?limit=50000`
const GroupsPage: React.FC<GroupsPageProps> = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [groups, setGroups] = useState<LDAPGroup[]>([])
  const [pagination, setPagination] = useState({ page: 1, rowsPerPage: 25 })
  const { base, roles } = useProfileStore()
  const ou = router.query.ou
  const baseDN = `ou=roles,ou=${ou},${base}`
  const paginatedGroups = usePagination(groups, pagination)

  useEffect(() => {
    if (!roles.includes('admin')) {
      router.push('/')
    }
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await withAuthAxiosInstance.post(URL, {
          baseDN
        })
        setGroups(response.data.data)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        if (!!error.response) {
          const { data } = error.response
          showToastError(data.message)
        } else {
          showToastError(error.message)
        }
      }
    }
    fetchData()
  }, [ou])

  return (
    <div>
      <h1>{`Listado de Roles`}</h1>
      {<GroupsTable groups={paginatedGroups} loading={loading} />}
      {!loading && paginatedGroups.length > 0 && (
        <PaginationTable pagination={pagination} setPagination={setPagination} entries={groups} />
      )}
    </div>
  )
}

export default AdminRoute(GroupsPage)
