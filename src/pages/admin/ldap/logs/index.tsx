import Loader from '@/components/feedback/Loader'
import AdminRoute from '@/components/hocs/AdminRoute'
import PaginationTable from '@/components/pagination/PaginationTable'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import { showToastError } from '@/helpers/toastHelper'
import usePagination from '@/hooks/usePaginateUsers'
import useProfileStore from '@/stores/profile.store'
import LogType from '@/types/log.type'
import LogsTable from '@/views/admin/ldap/LogsTable'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const LogsPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [logs, setLogs] = useState<LogType[]>([])
  const url = router.asPath.replace('/admin/ldap', '').replace('/?', '?')
  console.log('url', url)

  const [pagination, setPagination] = useState({ page: 1, rowsPerPage: 25 })
  const { roles } = useProfileStore()
  const paginatedLogs = usePagination(logs, pagination)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await withAuthAxiosInstance.get(url)
      const { data } = response
      setLogs(data.logs)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      if (error.response !== undefined) {
        const { data } = error.response
        showToastError(data.message)
      } else {
        showToastError(error.message)
      }
    }
  }

  useEffect(() => {
    if (!roles.includes('superadmin')) {
      router.push('/')
    } else {
      fetchData()
    }
  }, [router.query])

  return (
    <div>
      <h1>{`Registro de Logs`}</h1>
      {loading && <Loader message={`Cargando Logs`} />}
      {!loading && <LogsTable logs={paginatedLogs} loading={loading} />}
      {!loading && paginatedLogs.length > 0 && (
        <PaginationTable pagination={pagination} setPagination={setPagination} entries={logs} />
      )}
    </div>
  )
}

export default AdminRoute(LogsPage)
