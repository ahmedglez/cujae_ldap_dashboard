import PaginationTable from '@/components/pagination/PaginationTable'
import AdminRoute from '@/components/hocs/AdminRoute'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import usePagination from '@/hooks/usePaginateUsers'
import useProfileStore from '@/stores/profile.store'
import LDAPGroup from '@/types/ldapGroup'
import GroupsTable from '@/views/admin/groups/GroupsTable'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

// Create a custom styled component for the empty message

const emptyMessageStyle = {
  textAlign: 'center',
  height: '100%',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px'
}

const headerStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0'
}

const messageStyle = {
  fontSize: '18px',
  margin: '10px 0'
}
const buttonStyle = {
  marginTop: '20px'
}

type GroupsPageProps = {
  ou: string
}

const LIMIT = 5000
const GroupsPage: React.FC<GroupsPageProps> = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [groups, setGroups] = useState<LDAPGroup[]>([])
  const [pagination, setPagination] = useState({ page: 1, rowsPerPage: 25 })
  const base = useProfileStore(state => state.base)
  const ou = router.query.ou
  const baseDN = `ou=roles,ou=${ou},${base}`
  const paginatedGroups = usePagination(groups, pagination)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await withAuthAxiosInstance.post(`/groups/getChilds?limit=50000`, {
          baseDN
        })
        setGroups(response.data.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
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
